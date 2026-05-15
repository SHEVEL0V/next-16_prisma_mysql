/** @format */

"use client";

import { useRouter } from "next/navigation";
import { FormModal } from "./form-modal";
import type { ActionResponse } from "@/types";

interface CustomModalProps {
  fields: Array<{ name: string; label: string; type: string; required?: boolean }>;
  title?: string;
  action: (
    prevState: ActionResponse<Record<string, unknown>>,
    formData: FormData,
  ) => Promise<ActionResponse<Record<string, unknown>>>;
}

/**
 * CustomModal Component (Deprecated)
 * Use FormModal instead - this is kept for backwards compatibility
 * Wraps FormModal with router-based close behavior
 *
 * @deprecated Use FormModal from src/components/ui/modals instead
 */
export default function CustomModal({
  fields,
  title = "Fill out the form",
  action,
}: CustomModalProps) {
  const router = useRouter();

  const handleClose = () => router.back();
  const handleSuccess = () => handleClose();

  return (
    <FormModal
      open
      onClose={handleClose}
      title={title}
      fields={fields}
      action={action}
      onSuccess={handleSuccess}
    />
  );
}
