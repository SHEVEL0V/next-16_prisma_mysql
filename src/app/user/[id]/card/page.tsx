/** @format */

import type { FieldProfile } from "@/types";

const fields: FieldProfile = [
  { name: "position", label: "Посада", type: "text" },
  { name: "bio", label: "Додаткова інформація", type: "text" },
];

export default async function Create() {
  const title = "Картка користувача";

  return (
    <div className="max-w-md mx-auto p-10">
      <h3 className="text-xl font-bold mb-6 text-center">{title}</h3>

      <form className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.name.toString()} className="flex flex-col text-left gap-1">
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Зберегти
        </button>
      </form>
    </div>
  );
}
