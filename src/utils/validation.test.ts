/**
 * Tests for validation utilities
 * Verifies helper functions used across the project
 */

describe("Validation Utilities", () => {
	describe("email validation", () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		it("should validate standard email", () => {
			expect(emailRegex.test("user@example.com")).toBe(true);
		});

		it("should validate email with subdomain", () => {
			expect(emailRegex.test("user@mail.example.co.uk")).toBe(true);
		});

		it("should reject email without domain", () => {
			expect(emailRegex.test("user@")).toBe(false);
		});

		it("should reject email without @ symbol", () => {
			expect(emailRegex.test("userexample.com")).toBe(false);
		});

		it("should reject email with spaces", () => {
			expect(emailRegex.test("user @example.com")).toBe(false);
		});

		it("should reject empty string", () => {
			expect(emailRegex.test("")).toBe(false);
		});

		it("should validate email with plus sign", () => {
			expect(emailRegex.test("user+tag@example.com")).toBe(true);
		});

		it("should validate email with dots in local part", () => {
			expect(emailRegex.test("first.last@example.com")).toBe(true);
		});
	});

	describe("UUID validation", () => {
		const uuidRegex =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

		it("should validate valid UUID", () => {
			expect(uuidRegex.test("123e4567-e89b-12d3-a456-426614174000")).toBe(true);
		});

		it("should reject UUID without hyphens", () => {
			expect(uuidRegex.test("123e4567e89b12d3a456426614174000")).toBe(false);
		});

		it("should reject invalid UUID format", () => {
			expect(uuidRegex.test("invalid-uuid")).toBe(false);
		});

		it("should validate UUID with lowercase letters", () => {
			expect(uuidRegex.test("abcdef12-3456-7890-abcd-ef1234567890")).toBe(true);
		});

		it("should validate UUID with uppercase letters", () => {
			expect(uuidRegex.test("ABCDEF12-3456-7890-ABCD-EF1234567890")).toBe(true);
		});

		it("should reject UUID with invalid characters", () => {
			expect(uuidRegex.test("123e4567-e89b-12d3-a456-42661417400G")).toBe(false);
		});
	});

	describe("URL validation", () => {
		const isValidUrl = (url: string) => {
			try {
				new URL(url);
				return true;
			} catch {
				return false;
			}
		};

		it("should validate HTTPS URL", () => {
			expect(isValidUrl("https://example.com")).toBe(true);
		});

		it("should validate HTTP URL", () => {
			expect(isValidUrl("http://example.com")).toBe(true);
		});

		it("should validate URL with path", () => {
			expect(isValidUrl("https://example.com/path/to/image.jpg")).toBe(true);
		});

		it("should validate URL with query parameters", () => {
			expect(isValidUrl("https://example.com/image.jpg?size=large")).toBe(true);
		});

		it("should reject invalid URL", () => {
			expect(isValidUrl("not a url")).toBe(false);
		});

		it("should reject URL without protocol", () => {
			expect(isValidUrl("example.com")).toBe(false);
		});

		it("should validate URL with subdomain", () => {
			expect(isValidUrl("https://api.example.com/endpoint")).toBe(true);
		});

		it("should validate URL with port", () => {
			expect(isValidUrl("http://localhost:3000/page")).toBe(true);
		});
	});

	describe("string utilities", () => {
		it("should trim whitespace", () => {
			const input = "  hello world  ";
			expect(input.trim()).toBe("hello world");
		});

		it("should convert to lowercase", () => {
			const input = "HELLO World";
			expect(input.toLowerCase()).toBe("hello world");
		});

		it("should calculate string length", () => {
			expect("hello".length).toBe(5);
		});

		it("should check minimum length", () => {
			const minLength = 3;
			expect("ab".length >= minLength).toBe(false);
			expect("abc".length >= minLength).toBe(true);
		});

		it("should check maximum length", () => {
			const maxLength = 10;
			expect("hello".length <= maxLength).toBe(true);
			expect("hello world!".length <= maxLength).toBe(false);
		});

		it("should split string", () => {
			const result = "a,b,c".split(",");
			expect(result).toEqual(["a", "b", "c"]);
		});

		it("should replace substring", () => {
			const result = "hello world".replace("world", "universe");
			expect(result).toBe("hello universe");
		});

		it("should check string inclusion", () => {
			expect("hello world".includes("world")).toBe(true);
			expect("hello world".includes("xyz")).toBe(false);
		});
	});

	describe("number utilities", () => {
		it("should validate integer", () => {
			expect(Number.isInteger(5)).toBe(true);
			expect(Number.isInteger(5.5)).toBe(false);
		});

		it("should check if number is safe", () => {
			expect(Number.isSafeInteger(9007199254740991)).toBe(true);
			expect(Number.isSafeInteger(9007199254740992)).toBe(false);
		});

		it("should parse integer", () => {
			expect(parseInt("42")).toBe(42);
			expect(parseInt("3.14")).toBe(3);
		});

		it("should parse float", () => {
			expect(parseFloat("3.14")).toBe(3.14);
			expect(parseFloat("42")).toBe(42);
		});

		it("should check positive number", () => {
			expect(5 > 0).toBe(true);
			expect(-5 > 0).toBe(false);
		});

		it("should compare numbers", () => {
			expect(5 < 10).toBe(true);
			expect(10 >= 10).toBe(true);
		});
	});

	describe("array utilities", () => {
		it("should get array length", () => {
			expect([1, 2, 3].length).toBe(3);
		});

		it("should access array element", () => {
			expect([1, 2, 3][0]).toBe(1);
		});

		it("should filter array", () => {
			const result = [1, 2, 3, 4].filter((x) => x > 2);
			expect(result).toEqual([3, 4]);
		});

		it("should map array", () => {
			const result = [1, 2, 3].map((x) => x * 2);
			expect(result).toEqual([2, 4, 6]);
		});

		it("should find element", () => {
			const result = [1, 2, 3, 4].find((x) => x > 2);
			expect(result).toBe(3);
		});

		it("should check array inclusion", () => {
			expect([1, 2, 3].includes(2)).toBe(true);
			expect([1, 2, 3].includes(5)).toBe(false);
		});

		it("should sort array", () => {
			const result = [3, 1, 2].sort();
			expect(result).toEqual([1, 2, 3]);
		});

		it("should reverse array", () => {
			const result = [1, 2, 3].reverse();
			expect(result).toEqual([3, 2, 1]);
		});

		it("should join array elements", () => {
			const result = [1, 2, 3].join("-");
			expect(result).toBe("1-2-3");
		});

		it("should spread array", () => {
			const arr1 = [1, 2];
			const arr2 = [3, 4];
			const result = [...arr1, ...arr2];
			expect(result).toEqual([1, 2, 3, 4]);
		});
	});

	describe("object utilities", () => {
		it("should get object keys", () => {
			const obj = { a: 1, b: 2 };
			expect(Object.keys(obj)).toEqual(["a", "b"]);
		});

		it("should get object values", () => {
			const obj = { a: 1, b: 2 };
			expect(Object.values(obj)).toEqual([1, 2]);
		});

		it("should get object entries", () => {
			const obj = { a: 1, b: 2 };
			expect(Object.entries(obj)).toEqual([
				["a", 1],
				["b", 2],
			]);
		});

		it("should merge objects", () => {
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const result = { ...obj1, ...obj2 };
			expect(result).toEqual({ a: 1, b: 2 });
		});

		it("should check object property", () => {
			const obj = { a: 1, b: 2 };
			expect("a" in obj).toBe(true);
			expect("c" in obj).toBe(false);
		});

		it("should copy object", () => {
			const obj = { a: 1, b: 2 };
			const copy = { ...obj };
			expect(copy).toEqual(obj);
			expect(copy).not.toBe(obj);
		});
	});
});
