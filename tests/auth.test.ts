import { verifyAdminCredentials } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

jest.mock("@/lib/rate-limit", () => ({
  checkRateLimit: jest.fn(),
}));

describe("admin auth", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.ADMIN_EMAIL = "admin@remembereverything.local";
    process.env.ADMIN_PASSWORD = "RememberEverything-Admin-2026!";
  });

  it("rejects invalid credentials", async () => {
    (checkRateLimit as jest.Mock).mockResolvedValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60_000,
    });

    const result = await verifyAdminCredentials({
      email: "wrong@example.com",
      password: "bad-password",
      ipAddress: "127.0.0.1",
    });

    expect(result.ok).toBe(false);
  });

  it("accepts the configured admin account", async () => {
    (checkRateLimit as jest.Mock).mockResolvedValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60_000,
    });

    const result = await verifyAdminCredentials({
      email: "admin@remembereverything.local",
      password: "RememberEverything-Admin-2026!",
      ipAddress: "127.0.0.1",
    });

    expect(result).toEqual({
      ok: true,
      email: "admin@remembereverything.local",
    });
  });
});
