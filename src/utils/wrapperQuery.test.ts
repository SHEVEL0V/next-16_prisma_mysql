/**
 * Tests for safeQuery wrapper
 * Verifies error handling and result standardization
 */
import { safeQuery } from "./wrapperQuery";

describe("safeQuery", () => {
  describe("successful queries", () => {
    it("should return data when query succeeds", async () => {
      const testData = { id: "1", name: "Test" };
      const result = await safeQuery(() => Promise.resolve(testData));

      expect(result.error).toBeNull();
      expect(result.data).toEqual(testData);
    });

    it("should return null data and error message on failure", async () => {
      const errorMessage = "Query failed";
      const result = await safeQuery(() => Promise.reject(new Error(errorMessage)));

      expect(result.data).toBeNull();
      expect(result.error).toBe(errorMessage);
    });

    it("should handle non-Error objects thrown", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await safeQuery(() => Promise.reject("string error"));

      expect(result.data).toBeNull();
      expect(result.error).toBe("Internal server error");

      consoleErrorSpy.mockRestore();
    });

    it("should handle empty arrays", async () => {
      const result = await safeQuery(() => Promise.resolve([]));

      expect(result.error).toBeNull();
      expect(result.data).toEqual([]);
    });

    it("should handle null results", async () => {
      const result = await safeQuery(() => Promise.resolve(null));

      expect(result.error).toBeNull();
      expect(result.data).toBeNull();
    });

    it("should handle undefined results", async () => {
      const result = await safeQuery(() => Promise.resolve(undefined));

      expect(result.error).toBeNull();
      expect(result.data).toBeUndefined();
    });

    it("should preserve complex object structure", async () => {
      const complexData = {
        user: { id: "123", name: "John" },
        boards: [
          { id: "board1", title: "Board 1" },
          { id: "board2", title: "Board 2" },
        ],
        metadata: { timestamp: 1234567890 },
      };
      const result = await safeQuery(() => Promise.resolve(complexData));

      expect(result.error).toBeNull();
      expect(result.data).toEqual(complexData);
    });

    it("should log errors to console", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
      const error = new Error("Test error");

      await safeQuery(() => Promise.reject(error));

      expect(consoleErrorSpy).toHaveBeenCalledWith("Query execution failed:", error);
      consoleErrorSpy.mockRestore();
    });
  });

  describe("result type invariants", () => {
    it("should never return both data and error", async () => {
      const result1 = await safeQuery(() => Promise.resolve("data"));
      expect(result1.data === null).toBe(result1.error !== null);

      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      const result2 = await safeQuery(() => Promise.reject(new Error()));
      expect(result2.data === null).toBe(result2.error !== null);

      consoleErrorSpy.mockRestore();
    });

    it("should handle special characters in error messages", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      const specialError = "Error: <script>alert('xss')</script>";
      const result = await safeQuery(() => Promise.reject(new Error(specialError)));

      expect(result.error).toBe(specialError);
      consoleErrorSpy.mockRestore();
    });
  });
});
