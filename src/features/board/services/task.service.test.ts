/**
 * @jest-environment node
 */

import { taskService } from '@/features/board/services/task'
import prisma from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    task: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback({
      task: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    })),
  },
}))

describe('Task Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockTaskId = 'task-123'
  const mockColumnId = 'col-123'

  const mockTask = {
    id: mockTaskId,
    title: 'Test Task',
    description: null,
    order: 1000,
    columnId: mockColumnId,
    priority: 'MEDIUM',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  describe('getById', () => {
    it('should fetch task by ID', async () => {
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)

      const result = await taskService.getById(mockTaskId)

      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: mockTaskId },
      })
      expect(result).toEqual(mockTask)
    })

    it('should return null when task does not exist', async () => {
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await taskService.getById('non-existent')

      expect(result).toBeNull()
    })
  })

  describe('create', () => {
    it('should create task with calculated order', async () => {
      const mockLastTask = { ...mockTask, order: 2000 }
      const newTask = { ...mockTask, order: 3000 }

      const txMock = {
        task: {
          findFirst: jest.fn().mockResolvedValue(mockLastTask),
          create: jest.fn().mockResolvedValue(newTask),
        },
      }

      ;(prisma.$transaction as jest.Mock).mockImplementation((callback) =>
        callback(txMock)
      )

      const result = await taskService.create(mockColumnId, 'New Task')

      expect(result).toEqual(newTask)
      expect(txMock.task.create).toHaveBeenCalledWith({
        data: { title: 'New Task', columnId: mockColumnId, order: 3000 },
      })
    })

    it('should set initial order to 1000 when no tasks exist', async () => {
      const newTask = { ...mockTask, order: 1000 }

      const txMock = {
        task: {
          findFirst: jest.fn().mockResolvedValue(null),
          create: jest.fn().mockResolvedValue(newTask),
        },
      }

      ;(prisma.$transaction as jest.Mock).mockImplementation((callback) =>
        callback(txMock)
      )

      const result = await taskService.create(mockColumnId, 'First Task')

      expect(result.order).toBe(1000)
    })

    it('should increment order by 1000 from last task', async () => {
      const lastOrder = 4000
      const mockLastTask = { ...mockTask, order: lastOrder }

      const txMock = {
        task: {
          findFirst: jest.fn().mockResolvedValue(mockLastTask),
          create: jest.fn().mockResolvedValue({ ...mockTask, order: 5000 }),
        },
      }

      ;(prisma.$transaction as jest.Mock).mockImplementation((callback) =>
        callback(txMock)
      )

      await taskService.create(mockColumnId, 'Task')

      expect(txMock.task.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ order: lastOrder + 1000 }),
      })
    })
  })

  describe('update', () => {
    it('should update task title', async () => {
      const updatedTask = { ...mockTask, title: 'Updated Title' }
      ;(prisma.task.update as jest.Mock).mockResolvedValue(updatedTask)

      const result = await taskService.update(mockTaskId, {
        title: 'Updated Title',
      })

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: mockTaskId },
        data: { title: 'Updated Title' },
      })
      expect(result.title).toBe('Updated Title')
    })

    it('should update task priority', async () => {
      const updatedTask = { ...mockTask, priority: 'HIGH' }
      ;(prisma.task.update as jest.Mock).mockResolvedValue(updatedTask)

      const result = await taskService.update(mockTaskId, { priority: 'HIGH' })

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: mockTaskId },
        data: { priority: 'HIGH' },
      })
      expect(result.priority).toBe('HIGH')
    })

    it('should update task description', async () => {
      const updatedTask = { ...mockTask, description: 'Task description' }
      ;(prisma.task.update as jest.Mock).mockResolvedValue(updatedTask)

      await taskService.update(mockTaskId, {
        description: 'Task description',
      })

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: mockTaskId },
        data: { description: 'Task description' },
      })
    })

    it('should update multiple fields', async () => {
      const updatedTask = {
        ...mockTask,
        title: 'New Title',
        priority: 'URGENT',
        description: 'Updated',
      }
      ;(prisma.task.update as jest.Mock).mockResolvedValue(updatedTask)

      await taskService.update(mockTaskId, {
        title: 'New Title',
        priority: 'URGENT',
        description: 'Updated',
      })

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: mockTaskId },
        data: {
          title: 'New Title',
          priority: 'URGENT',
          description: 'Updated',
        },
      })
    })
  })

  describe('delete', () => {
    it('should delete task by ID', async () => {
      ;(prisma.task.delete as jest.Mock).mockResolvedValue(mockTask)

      const result = await taskService.delete(mockTaskId)

      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id: mockTaskId },
      })
      expect(result).toEqual(mockTask)
    })

    it('should handle deletion of non-existent task', async () => {
      ;(prisma.task.delete as jest.Mock).mockRejectedValue(
        new Error('Task not found')
      )

      await expect(taskService.delete('non-existent')).rejects.toThrow()
    })
  })

  describe('reorder', () => {
    it('should reorder task in same column', async () => {
      const reorderedTask = { ...mockTask, order: 2500 }
      ;(prisma.task.update as jest.Mock).mockResolvedValue(reorderedTask)

      const result = await taskService.reorder(mockTaskId, 2500, mockColumnId)

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: mockTaskId },
        data: { order: 2500, columnId: mockColumnId },
      })
      expect(result.order).toBe(2500)
    })

    it('should move task to different column', async () => {
      const newColumnId = 'col-456'
      const movedTask = {
        ...mockTask,
        columnId: newColumnId,
        order: 1000,
      }
      ;(prisma.task.update as jest.Mock).mockResolvedValue(movedTask)

      const result = await taskService.reorder(mockTaskId, 1000, newColumnId)

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: mockTaskId },
        data: { order: 1000, columnId: newColumnId },
      })
      expect(result.columnId).toBe(newColumnId)
    })

    it('should handle drag-and-drop with new order', async () => {
      const newOrder = 5000
      const newColumnId = 'col-789'
      const draggedTask = {
        ...mockTask,
        order: newOrder,
        columnId: newColumnId,
      }
      ;(prisma.task.update as jest.Mock).mockResolvedValue(draggedTask)

      const result = await taskService.reorder(mockTaskId, newOrder, newColumnId)

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: mockTaskId },
        data: { order: newOrder, columnId: newColumnId },
      })
      expect(result.order).toBe(newOrder)
      expect(result.columnId).toBe(newColumnId)
    })
  })

  describe('getAllInfo', () => {
    it('should fetch all tasks with relationships', async () => {
      const mockTasks = [
        {
          ...mockTask,
          column: {
            id: mockColumnId,
            title: 'Column',
            board: { id: 'board-123', title: 'Board' },
          },
        },
      ]

      ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)

      const result = await taskService.getAllInfo()

      expect(prisma.task.findMany).toHaveBeenCalledWith({
        include: {
          column: {
            include: {
              board: true,
            },
          },
        },
      })
      expect(result).toEqual(mockTasks)
      expect(result[0].column.board).toBeDefined()
    })

    it('should return empty array when no tasks exist', async () => {
      ;(prisma.task.findMany as jest.Mock).mockResolvedValue([])

      const result = await taskService.getAllInfo()

      expect(result).toEqual([])
    })

    it('should include nested board data', async () => {
      const mockTasks = [
        {
          ...mockTask,
          column: {
            id: mockColumnId,
            title: 'To Do',
            board: {
              id: 'board-456',
              title: 'My Board',
              userId: 'user-123',
            },
          },
        },
      ]

      ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)

      const result = await taskService.getAllInfo()

      expect(result[0].column.board.title).toBe('My Board')
    })
  })
})
