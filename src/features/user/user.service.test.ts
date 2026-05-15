/**
 * @jest-environment node
 */

import { userService } from "@/features/user/services";
import prisma from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      update: jest.fn(),
    },
    profile: {
      upsert: jest.fn(),
    },
    $transaction: jest.fn((callback) =>
      callback({
        user: {
          update: jest.fn(),
        },
        profile: {
          upsert: jest.fn(),
        },
      }),
    ),
  },
}));

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUserId = "user-123";

  const mockProfile = {
    userId: mockUserId,
    position: "Software Engineer",
    bio: "A passionate developer",
    image: "https://example.com/avatar.jpg",
  };

  describe("updateProfile", () => {
    it("should update user profile with all fields", async () => {
      const txMock = {
        user: {
          update: jest.fn().mockResolvedValue({
            id: mockUserId,
            name: "John Doe",
          }),
        },
        profile: {
          upsert: jest.fn().mockResolvedValue(mockProfile),
        },
      };

      (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(txMock));

      const result = await userService.updateProfile(mockUserId, {
        name: "John Doe",
        position: "Software Engineer",
        bio: "A passionate developer",
        image: "https://example.com/avatar.jpg",
      });

      expect(result).toEqual(mockProfile);
      expect(txMock.user.update).toHaveBeenCalledWith({
        where: { id: mockUserId },
        data: { name: "John Doe" },
      });
    });

    it("should update profile without optional fields", async () => {
      const txMock = {
        user: {
          update: jest.fn().mockResolvedValue({
            id: mockUserId,
            name: "Jane Doe",
          }),
        },
        profile: {
          upsert: jest.fn().mockResolvedValue({
            userId: mockUserId,
            position: "Manager",
            bio: null,
            image: null,
          }),
        },
      };

      (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(txMock));

      await userService.updateProfile(mockUserId, {
        name: "Jane Doe",
        position: "Manager",
      });

      expect(txMock.profile.upsert).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        update: {
          position: "Manager",
          bio: null,
          image: null,
        },
        create: {
          userId: mockUserId,
          position: "Manager",
          bio: null,
          image: null,
        },
      });
    });

    it("should upsert profile when creating new", async () => {
      const txMock = {
        user: {
          update: jest.fn(),
        },
        profile: {
          upsert: jest.fn().mockResolvedValue({
            userId: mockUserId,
            position: "Developer",
            bio: "New bio",
            image: null,
          }),
        },
      };

      (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(txMock));

      await userService.updateProfile(mockUserId, {
        name: "User",
        position: "Developer",
        bio: "New bio",
      });

      expect(txMock.profile.upsert).toHaveBeenCalled();
      expect(txMock.profile.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: mockUserId },
          create: expect.any(Object),
        }),
      );
    });

    it("should upsert profile when updating existing", async () => {
      const txMock = {
        user: {
          update: jest.fn(),
        },
        profile: {
          upsert: jest.fn().mockResolvedValue({
            userId: mockUserId,
            position: "Senior Developer",
            bio: "Updated bio",
            image: "https://example.com/new.jpg",
          }),
        },
      };

      (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(txMock));

      await userService.updateProfile(mockUserId, {
        name: "User",
        position: "Senior Developer",
        bio: "Updated bio",
        image: "https://example.com/new.jpg",
      });

      expect(txMock.profile.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: mockUserId },
          update: {
            position: "Senior Developer",
            bio: "Updated bio",
            image: "https://example.com/new.jpg",
          },
        }),
      );
    });

    it("should set empty strings to null for bio and image", async () => {
      const txMock = {
        user: {
          update: jest.fn(),
        },
        profile: {
          upsert: jest.fn().mockResolvedValue({
            userId: mockUserId,
            position: "Developer",
            bio: null,
            image: null,
          }),
        },
      };

      (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(txMock));

      await userService.updateProfile(mockUserId, {
        name: "User",
        position: "Developer",
        bio: "",
        image: "",
      });

      expect(txMock.profile.upsert).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        update: {
          position: "Developer",
          bio: null,
          image: null,
        },
        create: {
          userId: mockUserId,
          position: "Developer",
          bio: null,
          image: null,
        },
      });
    });

    it("should use transaction for data consistency", async () => {
      const txMock = {
        user: {
          update: jest.fn(),
        },
        profile: {
          upsert: jest.fn(),
        },
      };

      const callback = jest.fn((cb) => cb(txMock));
      (prisma.$transaction as jest.Mock).mockImplementation(callback);

      await userService.updateProfile(mockUserId, {
        name: "User",
        position: "Developer",
      });

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });

    it("should handle transaction rollback on error", async () => {
      const error = new Error("Transaction failed");
      (prisma.$transaction as jest.Mock).mockRejectedValue(error);

      await expect(
        userService.updateProfile(mockUserId, {
          name: "User",
          position: "Developer",
        }),
      ).rejects.toThrow("Transaction failed");
    });

    it("should update user name first", async () => {
      const updateOrder: string[] = [];

      const txMock = {
        user: {
          update: jest.fn().mockImplementation(() => {
            updateOrder.push("user");
            return Promise.resolve({});
          }),
        },
        profile: {
          upsert: jest.fn().mockImplementation(() => {
            updateOrder.push("profile");
            return Promise.resolve(mockProfile);
          }),
        },
      };

      (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(txMock));

      await userService.updateProfile(mockUserId, {
        name: "New Name",
        position: "Position",
      });

      expect(updateOrder[0]).toBe("user");
      expect(updateOrder[1]).toBe("profile");
    });

    it("should handle long bio text", async () => {
      const longBio = "a".repeat(500);

      const txMock = {
        user: {
          update: jest.fn(),
        },
        profile: {
          upsert: jest.fn().mockResolvedValue({
            ...mockProfile,
            bio: longBio,
          }),
        },
      };

      (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(txMock));

      const result = await userService.updateProfile(mockUserId, {
        name: "User",
        position: "Developer",
        bio: longBio,
      });

      expect(result.bio).toBe(longBio);
    });

    it("should handle image URL correctly", async () => {
      const imageUrl = "https://cdn.example.com/avatars/user-123.webp";

      const txMock = {
        user: {
          update: jest.fn(),
        },
        profile: {
          upsert: jest.fn().mockResolvedValue({
            ...mockProfile,
            image: imageUrl,
          }),
        },
      };

      (prisma.$transaction as jest.Mock).mockImplementation((callback) => callback(txMock));

      const result = await userService.updateProfile(mockUserId, {
        name: "User",
        position: "Developer",
        image: imageUrl,
      });

      expect(result.image).toBe(imageUrl);
    });
  });
});
