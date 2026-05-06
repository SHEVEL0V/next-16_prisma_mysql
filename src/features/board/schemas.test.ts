import {
  boardSchema,
  columnSchema,
  updateColumnTitleSchema,
  reorderSchema,
  createTaskSchema,
  updateTaskSchema,
  updateTaskPrioritySchema,
  updateTaskDetailsSchema,
  updateBoardSchema,
  deleteTaskSchema,
  deleteColumnSchema,
  deleteBoardSchema,
} from '@/features/board/schema'

describe('Board Schemas - Core', () => {
  describe('boardSchema', () => {
    it('should validate valid board data', () => {
      const validData = {
        title: 'My Board',
        description: 'A test board',
      }
      const result = boardSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should fail when title is empty', () => {
      const invalidData = { title: '' }
      const result = boardSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when title exceeds max length', () => {
      const invalidData = { title: 'a'.repeat(51) }
      const result = boardSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should allow optional description', () => {
      const data = { title: 'Board' }
      const result = boardSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should fail when description exceeds max length', () => {
      const invalidData = {
        title: 'Board',
        description: 'a'.repeat(256),
      }
      const result = boardSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('columnSchema', () => {
    const validBoardId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

    it('should validate valid column data', () => {
      const validData = {
        title: 'Column 1',
        boardId: validBoardId,
      }
      const result = columnSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should fail when title is empty', () => {
      const invalidData = {
        title: '',
        boardId: validBoardId,
      }
      const result = columnSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail with invalid UUID', () => {
      const invalidData = {
        title: 'Column',
        boardId: 'not-a-uuid',
      }
      const result = columnSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('reorderSchema', () => {
    const validId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    const validColumnId = 'a47ac10b-58cc-4372-a567-0e02b2c3d479'

    it('should validate column reorder', () => {
      const validData = {
        id: validId,
        type: 'column',
        order: '1000',
      }
      const result = reorderSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate task reorder with columnId', () => {
      const validData = {
        id: validId,
        type: 'task',
        order: '2000',
        columnId: validColumnId,
      }
      const result = reorderSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should fail with invalid type', () => {
      const invalidData = {
        id: validId,
        type: 'board',
        order: '1000',
      }
      const result = reorderSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail with invalid UUID', () => {
      const invalidData = {
        id: 'not-uuid',
        type: 'column',
        order: '1000',
      }
      const result = reorderSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('createTaskSchema', () => {
    const validColumnId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

    it('should validate valid task data', () => {
      const validData = {
        title: 'New Task',
        columnId: validColumnId,
      }
      const result = createTaskSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should fail when title is empty', () => {
      const invalidData = {
        title: '',
        columnId: validColumnId,
      }
      const result = createTaskSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should allow optional boardId', () => {
      const data = {
        title: 'Task',
        columnId: validColumnId,
        boardId: validColumnId,
      }
      const result = createTaskSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe('updateTaskPrioritySchema', () => {
    const validId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

    it.each(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])(
      'should validate priority %s',
      (priority) => {
        const data = { id: validId, priority }
        const result = updateTaskPrioritySchema.safeParse(data)
        expect(result.success).toBe(true)
      }
    )

    it('should fail with invalid priority', () => {
      const invalidData = {
        id: validId,
        priority: 'CRITICAL',
      }
      const result = updateTaskPrioritySchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('updateTaskDetailsSchema', () => {
    const validId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

    it('should validate valid task details', () => {
      const data = {
        id: validId,
        title: 'Updated Task',
        description: 'Task description',
      }
      const result = updateTaskDetailsSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should fail when title exceeds max length', () => {
      const data = {
        id: validId,
        title: 'a'.repeat(101),
      }
      const result = updateTaskDetailsSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('should fail when description exceeds max length', () => {
      const data = {
        id: validId,
        title: 'Task',
        description: 'a'.repeat(1001),
      }
      const result = updateTaskDetailsSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('Update Schemas', () => {
    const validId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

    it('should validate updateColumnTitleSchema', () => {
      const result = updateColumnTitleSchema.safeParse({
        id: validId,
        title: 'New Title',
      })
      expect(result.success).toBe(true)
    })

    it('should validate updateTaskSchema', () => {
      const result = updateTaskSchema.safeParse({
        id: validId,
        title: 'Updated Task',
      })
      expect(result.success).toBe(true)
    })

    it('should validate updateBoardSchema', () => {
      const result = updateBoardSchema.safeParse({
        id: validId,
        title: 'Updated Board',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('Delete Schemas', () => {
    const validId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

    it('should validate deleteTaskSchema', () => {
      const result = deleteTaskSchema.safeParse({ id: validId })
      expect(result.success).toBe(true)
    })

    it('should validate deleteColumnSchema', () => {
      const result = deleteColumnSchema.safeParse({ id: validId })
      expect(result.success).toBe(true)
    })

    it('should validate deleteBoardSchema', () => {
      const result = deleteBoardSchema.safeParse({ id: validId })
      expect(result.success).toBe(true)
    })

    it('should fail with invalid UUID for all delete schemas', () => {
      const invalidId = 'not-uuid'

      expect(deleteTaskSchema.safeParse({ id: invalidId }).success).toBe(false)
      expect(deleteColumnSchema.safeParse({ id: invalidId }).success).toBe(false)
      expect(deleteBoardSchema.safeParse({ id: invalidId }).success).toBe(false)
    })
  })
})
