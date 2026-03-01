/** @format */

import Modal from "@/components/ui/modal";
import { postCreateAction } from "@/features/post/actions";
import type { PostInputType } from "@/features/post/types";

type FieldConfig = {
  label: string;
  name: keyof PostInputType;
  type: "text" | "date" | "number" | "email";
};

const fields: FieldConfig[] = [
  { name: "surname", label: "Прізвище", type: "text" },
  { name: "name", label: "Імʼя", type: "text" },
  { name: "rank", label: "Звання", type: "text" },
  { name: "unit", label: "Позивний", type: "text" },
  { name: "mos", label: "ВОС", type: "text" },
  { name: "dateOfBirth", label: "День народження", type: "date" },
  { name: "bloodType", label: "Група крові", type: "text" },
  { name: "status", label: "Статус", type: "text" },
  { name: "equipment", label: "Обладнання", type: "text" },
];

export default function FormAddPost() {
  return (
    <Modal action={postCreateAction} fields={fields} title="Додати нового користувача" />
  );
}
