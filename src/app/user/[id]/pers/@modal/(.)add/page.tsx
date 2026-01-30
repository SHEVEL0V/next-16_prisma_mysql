/** @format */

import { actionPost } from "@/actions/post";
import Modal from "@/components/ui/modal";
import type { FieldPost } from "@/types";

const fields: FieldPost = [
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

export default function FormAddUser() {
  return (
    <Modal
      action={actionPost.createPost}
      fields={fields}
      title="Додати нового користувача"
    />
  );
}
