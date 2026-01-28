/** @format */
"use client";
import { useActionState } from "react";
import type { ActionType } from "@/types";
import ButtonClose from "./button/close";

interface ModalProps {
  fields: { name: string; label: string; type: string }[];
  title?: string;
  action: ActionType;
}

export default function Modal({ fields, title, action }: ModalProps) {
  const [state, actionForm, pending] = useActionState(action, null);

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
   p-6 bg-white rounded-lg shadow-xl text-black w-full max-w-lg mx-auto z-50"
    >
      <div className="fixed top-4 right-4">
        <ButtonClose />
      </div>
      {title && <h2 className="text-xl text-center font-bold mb-4">{title}</h2>}

      <form action={actionForm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              // required
            />
          </div>
        ))}

        <div className="md:col-span-2 mt-4 space-y-4">
          {state?.message && (
            <div
              className={`p-3 rounded text-sm text-center font-medium ${
                state.success
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex justify-center items-center gap-2"
          >
            {pending && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {pending ? "Обробка..." : "Зберегти"}
          </button>
        </div>
      </form>
    </div>
  );
}
