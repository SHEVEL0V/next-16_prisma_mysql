/**
 * Tests for FormSection component
 * Verifies form field grouping and section organization
 */

import { render, screen } from "@testing-library/react";
import FormSection from "@/features/form/components/form-section";

describe("FormSection Component", () => {
  describe("rendering", () => {
    it("should render children without title", () => {
      render(
        <FormSection>
          <input data-testid="test-input" />
        </FormSection>,
      );

      expect(screen.getByTestId("test-input")).toBeInTheDocument();
    });

    it("should render with title", () => {
      render(
        <FormSection title="Personal Information">
          <input data-testid="test-input" />
        </FormSection>,
      );

      expect(screen.getByText("Personal Information")).toBeInTheDocument();
    });

    it("should render with title and description", () => {
      render(
        <FormSection title="Personal Information" description="Please fill in your details">
          <input data-testid="test-input" />
        </FormSection>,
      );

      expect(screen.getByText("Personal Information")).toBeInTheDocument();
      expect(screen.getByText("Please fill in your details")).toBeInTheDocument();
    });

    it("should render multiple children", () => {
      render(
        <FormSection title="Contact">
          <input data-testid="email-input" placeholder="Email" />
          <input data-testid="phone-input" placeholder="Phone" />
        </FormSection>,
      );

      expect(screen.getByTestId("email-input")).toBeInTheDocument();
      expect(screen.getByTestId("phone-input")).toBeInTheDocument();
    });
  });

  describe("structure", () => {
    it("should use section element", () => {
      const { container } = render(
        <FormSection title="Test">
          <input />
        </FormSection>,
      );

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("should apply proper spacing", () => {
      const { container } = render(
        <FormSection title="Test" description="Desc">
          <input />
        </FormSection>,
      );

      const section = container.querySelector("section");
      expect(section).toHaveStyle({ marginBottom: "32px" });
    });
  });

  describe("title variations", () => {
    it("should not render title section when title is not provided", () => {
      const { container } = render(
        <FormSection>
          <input />
        </FormSection>,
      );

      const titleBox = container.querySelector('[role="group"]');
      expect(titleBox).not.toBeInTheDocument();
    });

    it("should only show title when description is not provided", () => {
      render(
        <FormSection title="Section Title">
          <input />
        </FormSection>,
      );

      expect(screen.getByText("Section Title")).toBeInTheDocument();
      const descriptions = screen.queryAllByRole("textbox");
      expect(descriptions.length).toBe(1); // Only the input
    });
  });
});
