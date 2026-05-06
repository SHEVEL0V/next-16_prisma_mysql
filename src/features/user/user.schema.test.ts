import { updateProfileSchema } from '@/features/user/schema'

describe('User Schemas', () => {
  describe('updateProfileSchema', () => {
    const validUserId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

    it('should validate valid profile data', () => {
      const validData = {
        id: validUserId,
        name: 'John Doe',
        position: 'Software Engineer',
        bio: 'A passionate developer',
        image: 'https://example.com/image.jpg',
      }
      const result = updateProfileSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate profile without optional fields', () => {
      const validData = {
        id: validUserId,
        name: 'John Doe',
        position: 'Engineer',
      }
      const result = updateProfileSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should fail when name is too short', () => {
      const invalidData = {
        id: validUserId,
        name: 'Jo',
        position: 'Engineer',
      }
      const result = updateProfileSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when position is too short', () => {
      const invalidData = {
        id: validUserId,
        name: 'John Doe',
        position: 'E',
      }
      const result = updateProfileSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when position exceeds max length', () => {
      const invalidData = {
        id: validUserId,
        name: 'John Doe',
        position: 'a'.repeat(51),
      }
      const result = updateProfileSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when bio exceeds max length', () => {
      const invalidData = {
        id: validUserId,
        name: 'John Doe',
        position: 'Engineer',
        bio: 'a'.repeat(501),
      }
      const result = updateProfileSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail with invalid URL for image', () => {
      const invalidData = {
        id: validUserId,
        name: 'John Doe',
        position: 'Engineer',
        image: 'not-a-url',
      }
      const result = updateProfileSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should accept valid URLs for image', () => {
      const validUrls = [
        'https://example.com/image.jpg',
        'http://example.com/image.png',
        'https://cdn.example.com/path/to/image.webp',
      ]

      validUrls.forEach((url) => {
        const data = {
          id: validUserId,
          name: 'John Doe',
          position: 'Engineer',
          image: url,
        }
        const result = updateProfileSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('should fail with invalid UUID', () => {
      const invalidData = {
        id: 'not-a-uuid',
        name: 'John Doe',
        position: 'Engineer',
      }
      const result = updateProfileSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should trim whitespace from name and position', () => {
      const data = {
        id: validUserId,
        name: '  John Doe  ',
        position: '  Engineer  ',
      }
      const result = updateProfileSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('John Doe')
        expect(result.data.position).toBe('Engineer')
      }
    })

    it('should allow empty string for bio', () => {
      const data = {
        id: validUserId,
        name: 'John Doe',
        position: 'Engineer',
        bio: '',
      }
      const result = updateProfileSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should allow empty string for image', () => {
      const data = {
        id: validUserId,
        name: 'John Doe',
        position: 'Engineer',
        image: '',
      }
      const result = updateProfileSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should allow maximum length values', () => {
      const data = {
        id: validUserId,
        name: 'John Doe',
        position: 'a'.repeat(50),
        bio: 'a'.repeat(500),
      }
      const result = updateProfileSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should fail when required fields are missing', () => {
      const incompleteData = {
        id: validUserId,
        name: 'John Doe',
      }
      const result = updateProfileSchema.safeParse(incompleteData)
      expect(result.success).toBe(false)
    })

    it('should handle all valid combinations of optional fields', () => {
      const combinations = [
        { bio: 'Bio only' },
        { image: 'https://example.com/img.jpg' },
        { bio: 'Bio', image: 'https://example.com/img.jpg' },
        {},
      ]

      combinations.forEach((optional) => {
        const data = {
          id: validUserId,
          name: 'John Doe',
          position: 'Engineer',
          ...optional,
        }
        const result = updateProfileSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })
  })
})
