/** @format */

import { actionPost } from "@/actions/post";

export interface FieldDefinition {
  // name: keyof import("../../../prisma/client").Post;
  name: string;
  label: string;
  type: "text" | "date";
}

const fields: FieldDefinition[] = [
  { name: "surname", label: "Прізвище", type: "text" },
  { name: "name", label: "Імʼя", type: "text" },
  { name: "rank", label: "Звання", type: "text" },
  { name: "unit", label: "Ідентифікатор", type: "text" },
  { name: "mos", label: "ВОС", type: "text" },
  { name: "dateOfBirth", label: "День народження", type: "date" },
  { name: "bloodType", label: "Група крові", type: "text" },
  { name: "status", label: "Статус", type: "text" },
  { name: "equipment", label: "Обладнання", type: "text" },
];

export default function Create() {
  const title = "Створити новий запис";
  const isPending = false;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-xl text-black max-w-lg mx-auto">
      {title && <h2 className="text-xl text-center font-bold mb-4">{title}</h2>}
      <form action={actionPost.create} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>
        ))}

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isPending ? "Обробка..." : "Зберегти"}
          </button>
        </div>
      </form>
    </div>
  );
}
