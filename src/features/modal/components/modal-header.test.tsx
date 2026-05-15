/**
 * Tests for ModalHeader component
 * Verifies modal header title and close button functionality
 */

import { render, screen, fireEvent } from "@testing-library/react";
import ModalHeader from "@/features/modal/components/modal-header";

describe("ModalHeader Component", () => {
  describe("rendering", () => {
    it("should render title", () => {
      render(<ModalHeader title="Create Item" onClose={jest.fn()} />);

      expect(screen.getByText("Create Item")).toBeInTheDocument();
    });

    it("should render close button", () => {
      render(<ModalHeader title="Create Item" onClose={jest.fn()} />);

      const closeButton = screen.getByRole("button");
      expect(closeButton).toBeInTheDocument();
    });

    it("should use DialogTitle element", () => {
      const { container } = render(<ModalHeader title="Create Item" onClose={jest.fn()} />);

      const dialogTitle = container.querySelector(".MuiDialogTitle-root");
      expect(dialogTitle).toBeInTheDocument();
    });
  });

  describe("close button functionality", () => {
    it("should call onClose when close button clicked", () => {
      const handleClose = jest.fn();
      render(<ModalHeader title="Create Item" onClose={handleClose} />);

      const closeButton = screen.getByRole("button");
      fireEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("should respect disabled prop", () => {
      const handleClose = jest.fn();
      render(<ModalHeader title="Create Item" onClose={handleClose} disabled={true} />);

      const closeButton = screen.getByRole("button");
      expect(closeButton).toBeDisabled();
    });

    it("should not call onClose when disabled", () => {
      const handleClose = jest.fn();
      render(<ModalHeader title="Create Item" onClose={handleClose} disabled={true} />);

      const closeButton = screen.getByRole("button");
      fireEvent.click(closeButton);

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("styling", () => {
    it("should render DialogTitle component", () => {
      const { container } = render(<ModalHeader title="Test" onClose={jest.fn()} />);

      const dialogTitle = container.querySelector(".MuiDialogTitle-root");
      expect(dialogTitle).toBeInTheDocument();
    });

    it("should render close button with proper styling", () => {
      const { container } = render(<ModalHeader title="Test" onClose={jest.fn()} />);

      const closeButton = container.querySelector("button");
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe("title variations", () => {
    it("should handle long titles", () => {
      const longTitle = "A".repeat(100);
      render(<ModalHeader title={longTitle} onClose={jest.fn()} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("should handle special characters in title", () => {
      const specialTitle = "Create & Update Item #1 (Draft)";
      render(<ModalHeader title={specialTitle} onClose={jest.fn()} />);

      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });

    it("should handle empty title", () => {
      render(<ModalHeader title="" onClose={jest.fn()} />);

      const dialogTitle = screen.getByRole("heading", { level: 2 });
      expect(dialogTitle).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("should have semantic heading element", () => {
      render(<ModalHeader title="Dialog Title" onClose={jest.fn()} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Dialog Title");
    });

    it("close button should be keyboard accessible", () => {
      const handleClose = jest.fn();
      render(<ModalHeader title="Test" onClose={handleClose} />);

      const closeButton = screen.getByRole("button");
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute("type", "button");
    });
  });
});
