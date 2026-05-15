/**
 * @jest-environment node
 */

import { toggleThemeCookie, getThemeCookie } from "@/utils/theme-cookie";
import { cookies } from "next/headers";

type MockCookieStore = Awaited<ReturnType<typeof cookies>>;

// Mock next/headers
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

const mockCookies = cookies as jest.MockedFunction<typeof cookies>;

describe("Theme Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("toggleThemeCookie", () => {
    it("should toggle from light to dark", async () => {
      const mockSet = jest.fn();
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "light" }),
        set: mockSet,
      } as unknown as MockCookieStore);

      const result = await toggleThemeCookie();

      expect(result).toBe("dark");
      expect(mockSet).toHaveBeenCalledWith(
        "theme",
        "dark",
        expect.objectContaining({
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        }),
      );
    });

    it("should toggle from dark to light", async () => {
      const mockSet = jest.fn();
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "dark" }),
        set: mockSet,
      } as unknown as MockCookieStore);

      const result = await toggleThemeCookie();

      expect(result).toBe("light");
      expect(mockSet).toHaveBeenCalledWith("theme", "light", expect.any(Object));
    });

    it("should default to dark when no cookie exists", async () => {
      const mockSet = jest.fn();
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue(undefined),
        set: mockSet,
      } as unknown as MockCookieStore);

      const result = await toggleThemeCookie();

      // No cookie means default light, so toggle to dark
      expect(result).toBe("dark");
    });

    it("should set cookie with secure flag in production", async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const mockSet = jest.fn();
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "light" }),
        set: mockSet,
      } as unknown as MockCookieStore);

      await toggleThemeCookie();

      expect(mockSet).toHaveBeenCalledWith(
        "theme",
        "dark",
        expect.objectContaining({ secure: true }),
      );

      process.env.NODE_ENV = originalEnv;
    });

    it("should set cookie without secure flag in development", async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      const mockSet = jest.fn();
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "light" }),
        set: mockSet,
      } as unknown as MockCookieStore);

      await toggleThemeCookie();

      expect(mockSet).toHaveBeenCalledWith(
        "theme",
        "dark",
        expect.objectContaining({ secure: false }),
      );

      process.env.NODE_ENV = originalEnv;
    });

    it("should handle invalid cookie values gracefully", async () => {
      const mockSet = jest.fn();
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "invalid" }),
        set: mockSet,
      } as unknown as MockCookieStore);

      const result = await toggleThemeCookie();

      // Invalid value should be treated as light
      expect(result).toBe("dark");
    });
  });

  describe("getThemeCookie", () => {
    it("should return dark when cookie is set to dark", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "dark" }),
      } as unknown as MockCookieStore);

      const result = await getThemeCookie();

      expect(result).toBe("dark");
    });

    it("should return light when cookie is set to light", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "light" }),
      } as unknown as MockCookieStore);

      const result = await getThemeCookie();

      expect(result).toBe("light");
    });

    it("should return light when no cookie exists", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue(undefined),
      } as unknown as MockCookieStore);

      const result = await getThemeCookie();

      expect(result).toBe("light");
    });

    it("should return light for invalid cookie values", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "invalid" }),
      } as unknown as MockCookieStore);

      const result = await getThemeCookie();

      expect(result).toBe("light");
    });

    it("should return light for empty cookie value", async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "" }),
      } as unknown as MockCookieStore);

      const result = await getThemeCookie();

      expect(result).toBe("light");
    });

    it('should be case-sensitive (treat "Dark" as light)', async () => {
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "Dark" }),
      } as unknown as MockCookieStore);

      const result = await getThemeCookie();

      expect(result).toBe("light");
    });
  });

  describe("Integration", () => {
    it("should correctly toggle theme multiple times", async () => {
      let currentTheme = "light";

      mockCookies.mockImplementation(
        async () =>
          ({
            get: jest.fn().mockReturnValue(currentTheme ? { value: currentTheme } : undefined),
            set: jest.fn((_, value) => {
              currentTheme = value;
            }),
          }) as unknown as MockCookieStore,
      );

      let result = await toggleThemeCookie();
      expect(result).toBe("dark");

      // Update mock to return new theme
      mockCookies.mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: "dark" }),
        set: jest.fn(),
      } as unknown as MockCookieStore);

      result = await toggleThemeCookie();
      expect(result).toBe("light");
    });
  });
});
