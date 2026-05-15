/**
 * Tests for FormFieldError component
 * Verifies inline field error message display
 */

import { render, screen } from "@testing-library/react";

// Mock the FormHelperText component
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  FormHelperText: ({ children, error }: { children: React.ReactNode; error: boolean }) => (
    <div role="status" data-error={error}>
      {children}
    </div>
  ),
}));

import FormFieldError from "@/features/form/components/form-field-error";

describe("FormFieldError Component", () => {
  describe("rendering", () => {
    it("should not render when no errors", () => {
      const { container } = render(<FormFieldError fieldName="email" errors={{}} />);

      expect(container.firstChild).toBeNull();
    });

    it("should not render when errors is undefined", () => {
      const { container } = render(<FormFieldError fieldName="email" errors={undefined} />);

      expect(container.firstChild).toBeNull();
    });

    it("should render error message for field", () => {
      render(<FormFieldError fieldName="email" errors={{ email: "Invalid email address" }} />);

      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });

    it("should not render when field has no error", () => {
      const { container } = render(
        <FormFieldError fieldName="email" errors={{ username: "Username taken" }} />,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe("error message types", () => {
    it("should handle string error messages", () => {
      render(<FormFieldError fieldName="password" errors={{ password: "Password too short" }} />);

      expect(screen.getByText("Password too short")).toBeInTheDocument();
    });

    it("should convert non-string errors to string", () => {
      render(<FormFieldError fieldName="age" errors={{ age: 123 }} />);

      expect(screen.getByText("123")).toBeInTheDocument();
    });

    it("should handle boolean errors", () => {
      render(<FormFieldError fieldName="terms" errors={{ terms: true }} />);

      expect(screen.getByText("true")).toBeInTheDocument();
    });
  });

  describe("multiple errors", () => {
    it("should show error for specified field only", () => {
      const errors = {
        email: "Invalid email",
        password: "Password too short",
        username: "Username taken",
      };

      const { rerender } = render(<FormFieldError fieldName="email" errors={errors} />);

      expect(screen.getByText("Invalid email")).toBeInTheDocument();
      expect(screen.queryByText("Password too short")).not.toBeInTheDocument();

      rerender(<FormFieldError fieldName="password" errors={errors} />);

      expect(screen.getByText("Password too short")).toBeInTheDocument();
      expect(screen.queryByText("Invalid email")).not.toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("should handle empty field name", () => {
      const { container } = render(
        <FormFieldError fieldName="" errors={{ "": "Error message" }} />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should handle long error messages", () => {
      const longError = "E".repeat(500);
      render(<FormFieldError fieldName="bio" errors={{ bio: longError }} />);

      expect(screen.getByText(longError)).toBeInTheDocument();
    });

    it("should handle special characters in error message", () => {
      const specialError = "Email must contain @ & . characters!";
      render(<FormFieldError fieldName="email" errors={{ email: specialError }} />);

      expect(screen.getByText(specialError)).toBeInTheDocument();
    });

    it("should render error status element", () => {
      render(<FormFieldError fieldName="email" errors={{ email: "Invalid" }} />);

      const status = screen.getByRole("status");
      expect(status).toHaveAttribute("data-error", "true");
    });
  });
});
