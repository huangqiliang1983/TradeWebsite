import { submitInquiry } from "@/features/inquiry/service";
import { checkRateLimit } from "@/lib/rate-limit";
import { db } from "@/lib/db";
import { sendInquiryNotification } from "@/lib/email";

jest.mock("@/lib/db", () => ({
  db: {
    product: {
      findUnique: jest.fn(),
    },
    inquiry: {
      create: jest.fn(),
    },
  },
}));

jest.mock("@/lib/email", () => ({
  sendInquiryNotification: jest.fn(),
}));

jest.mock("@/lib/rate-limit", () => ({
  checkRateLimit: jest.fn(),
}));

describe("submitInquiry", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.INQUIRY_MIN_SUBMIT_MS = "1500";
    process.env.INQUIRY_RATE_LIMIT_MAX = "5";
    process.env.INQUIRY_RATE_LIMIT_WINDOW_MS = "900000";
  });

  it("returns field errors when required values are invalid", async () => {
    const result = await submitInquiry({
      rawValues: {
        inquiryType: "CONTACT",
        name: "A",
        email: "not-an-email",
        company: "",
        country: "",
        phone: "",
        message: "short",
        sourcePage: "/contact",
        sourceProduct: "",
        productSlug: "",
        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
        utmTerm: "",
        utmContent: "",
        referrer: "",
        website: "",
        formStartedAt: `${Date.now() - 5000}`,
      },
      ipAddress: "127.0.0.1",
      requestReferer: "https://www.remembereverything.com/contact",
      userAgent: "jest",
    });

    expect(result.status).toBe("error");
    expect(result.fieldErrors.name).toBeDefined();
    expect(result.fieldErrors.email).toBeDefined();
    expect(result.fieldErrors.message).toBeDefined();
  });

  it("stores the inquiry and triggers notification on valid submission", async () => {
    (checkRateLimit as jest.Mock).mockResolvedValue({
      allowed: true,
      remaining: 4,
      resetAt: Date.now() + 60_000,
    });
    (db.product.findUnique as jest.Mock).mockResolvedValue({
      id: "product_1",
      slug: "smart-warehouse-scanner",
      name: "Smart Warehouse Scanner",
    });
    (db.inquiry.create as jest.Mock).mockResolvedValue({ id: "inq_1" });
    (sendInquiryNotification as jest.Mock).mockResolvedValue({ delivered: true });

    const result = await submitInquiry({
      rawValues: {
        inquiryType: "QUOTE",
        name: "Ada Lovelace",
        email: "ada@example.com",
        company: "Analytical Engines Ltd.",
        country: "United Kingdom",
        phone: "+44 20 7946 0958",
        message: "We need a quote for 5,000 units with private label packaging and CE documentation.",
        sourcePage: "/products/smart-warehouse-scanner",
        sourceProduct: "Smart Warehouse Scanner",
        productSlug: "smart-warehouse-scanner",
        utmSource: "google",
        utmMedium: "cpc",
        utmCampaign: "warehouse-launch",
        utmTerm: "",
        utmContent: "",
        referrer: "https://www.google.com/",
        website: "",
        formStartedAt: `${Date.now() - 5000}`,
      },
      ipAddress: "127.0.0.1",
      requestReferer:
        "https://www.remembereverything.com/products/smart-warehouse-scanner?utm_source=google",
      userAgent: "jest",
    });

    expect(result.status).toBe("success");
    expect(db.inquiry.create).toHaveBeenCalled();
    expect(sendInquiryNotification).toHaveBeenCalled();
  });
});
