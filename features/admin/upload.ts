import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import { serverEnv } from "@/lib/env";

const allowedImageTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

const signatureMatchers = {
  jpg: (bytes: Uint8Array) =>
    bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  png: (bytes: Uint8Array) =>
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47,
  webp: (bytes: Uint8Array) =>
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50,
} as const;

function getMaxUploadBytes() {
  const parsed = Number.parseInt(serverEnv.ADMIN_UPLOAD_MAX_IMAGE_BYTES, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3 * 1024 * 1024;
}

export async function saveAdminImageUpload(
  file: FormDataEntryValue | null,
  directory: "company" | "products" | "industries" | "blog",
) {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  const normalizedType = file.type.toLowerCase();
  const extension = allowedImageTypes[normalizedType as keyof typeof allowedImageTypes];

  if (!extension) {
    throw new Error("Only JPG, PNG, and WEBP images are allowed.");
  }

  if (file.size > getMaxUploadBytes()) {
    throw new Error("The uploaded image is too large.");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const signatureMatches = signatureMatchers[extension](bytes);

  if (!signatureMatches) {
    throw new Error("The uploaded file failed image signature validation.");
  }

  const fileName = `${crypto.randomUUID()}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "admin", directory);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), bytes);

  return `/uploads/admin/${directory}/${fileName}`;
}
