import type { PublishStatus } from "@prisma/client";

export function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function getOptionalString(formData: FormData, key: string) {
  const value = getFormString(formData, key);
  return value ? value : null;
}

export function getPublishStatus(formData: FormData, key = "publishStatus"): PublishStatus {
  const value = getFormString(formData, key);

  if (value === "PUBLISHED" || value === "ARCHIVED") {
    return value;
  }

  return "DRAFT";
}

export function parseLineList(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function stringifyLineList(value?: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .join("\n");
}

export function parseSpecificationLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return {
        label: label.trim(),
        value: rest.join(":").trim(),
      };
    })
    .filter((item) => item.label && item.value);
}

export function stringifySpecificationLines(value?: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .map((item) => {
      if (
        item &&
        typeof item === "object" &&
        "label" in item &&
        "value" in item &&
        typeof item.label === "string" &&
        typeof item.value === "string"
      ) {
        return `${item.label}: ${item.value}`;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n");
}

export function stringifyContentSections(value?: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .map((section) => {
      if (
        section &&
        typeof section === "object" &&
        "paragraphs" in section &&
        Array.isArray(section.paragraphs)
      ) {
        return section.paragraphs
          .map((paragraph: unknown) =>
            typeof paragraph === "string" ? paragraph.trim() : "",
          )
          .filter(Boolean)
          .join("\n");
      }

      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}
