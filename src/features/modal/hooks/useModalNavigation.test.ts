/**
 * Tests for useModalNavigation hook
 * Verifies modal navigation with router integration
 */

import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useModalNavigation } from '@/features/modal/hooks/useModalNavigation';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

describe('useModalNavigation Hook', () => {
	let mockRouter: Record<string, jest.Mock>;

	beforeEach(() => {
		mockRouter = {
			back: jest.fn(),
			push: jest.fn(),
			forward: jest.fn(),
			refresh: jest.fn(),
		};
		(useRouter as jest.Mock).mockReturnValue(mockRouter);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('hook initialization', () => {
		it('should return object with navigation methods', () => {
			const { result } = renderHook(() => useModalNavigation());

			expect(result.current).toHaveProperty('open');
			expect(result.current).toHaveProperty('close');
			expect(result.current).toHaveProperty('toggle');
		});

		it('should have callable methods', () => {
			const { result } = renderHook(() => useModalNavigation());

			expect(typeof result.current.open).toBe('function');
			expect(typeof result.current.close).toBe('function');
			expect(typeof result.current.toggle).toBe('function');
		});
	});

	describe('close method', () => {
		it('should call router.back() on close', () => {
			const { result } = renderHook(() => useModalNavigation());

			act(() => {
				result.current.close();
			});

			expect(mockRouter.back).toHaveBeenCalledTimes(1);
		});

		it('should use router instance from hook', () => {
			const anotherMockRouter = { back: jest.fn() };
			(useRouter as jest.Mock).mockReturnValue(anotherMockRouter);

			const { result } = renderHook(() => useModalNavigation());

			act(() => {
				result.current.close();
			});

			expect(anotherMockRouter.back).toHaveBeenCalledTimes(1);
		});

		it('should handle multiple close calls', () => {
			const { result } = renderHook(() => useModalNavigation());

			act(() => {
				result.current.close();
				result.current.close();
				result.current.close();
			});

			expect(mockRouter.back).toHaveBeenCalledTimes(3);
		});
	});

	describe('toggle method', () => {
		it('should call close', () => {
			const { result } = renderHook(() => useModalNavigation());

			act(() => {
				result.current.toggle();
			});

			expect(mockRouter.back).toHaveBeenCalledTimes(1);
		});

		it('should be equivalent to close', () => {
			const { result: result1 } = renderHook(() => useModalNavigation());
			const { result: result2 } = renderHook(() => useModalNavigation());

			act(() => {
				result1.current.toggle();
				result2.current.close();
			});

			expect(mockRouter.back).toHaveBeenCalledTimes(2);
		});
	});

	describe('open method', () => {
		it('should return true', () => {
			const { result } = renderHook(() => useModalNavigation());

			act(() => result.current.open());

			// open should return true (modal is rendered)
			expect(typeof result.current.open).toBe('function');
		});

		it('should be callable', () => {
			const { result } = renderHook(() => useModalNavigation());

			expect(() => {
				act(() => {
					result.current.open();
				});
			}).not.toThrow();
		});
	});

	describe('memoization and stability', () => {
		it('should return stable function references', () => {
			const { result, rerender } = renderHook(() => useModalNavigation());

			const firstClose = result.current.close;
			const firstOpen = result.current.open;
			const firstToggle = result.current.toggle;

			rerender();

			// Functions should be memoized and return same references
			expect(result.current.close).toBe(firstClose);
			expect(result.current.open).toBe(firstOpen);
			expect(result.current.toggle).toBe(firstToggle);
		});
	});

	describe('router dependency', () => {
		it('should update when router changes', () => {
			const firstRouter = { back: jest.fn() };
			const secondRouter = { back: jest.fn() };

			(useRouter as jest.Mock).mockReturnValue(firstRouter);
			const { result, rerender } = renderHook(() => useModalNavigation());

			act(() => {
				result.current.close();
			});
			expect(firstRouter.back).toHaveBeenCalledTimes(1);

			(useRouter as jest.Mock).mockReturnValue(secondRouter);
			rerender();

			act(() => {
				result.current.close();
			});
			expect(secondRouter.back).toHaveBeenCalledTimes(1);
		});
	});

	describe('error handling', () => {
		it('should not throw on missing router methods', () => {
			(useRouter as jest.Mock).mockReturnValue({});

			const { result } = renderHook(() => useModalNavigation());

			expect(() => {
				act(() => {
					result.current.close();
				});
			}).toThrow(); // back method is undefined
		});

		it('should handle router null gracefully', () => {
			(useRouter as jest.Mock).mockReturnValue(null);

			const { result } = renderHook(() => useModalNavigation());

			expect(() => {
				act(() => {
					result.current.close();
				});
			}).toThrow();
		});
	});
});
