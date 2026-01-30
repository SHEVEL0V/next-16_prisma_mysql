/** @format */

import { actionPost } from "@/actions/post";

export default async function Pers() {
  const posts = await actionPost.getAllPost();

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className=" p-4 border-2 border-dashedfont-mono bg-gray-300 dark:bg-gray-600  rounded-lg"
        >
          <h3 className="font-bold mb-2">POST ID #{post.id}</h3>
          <ul className="grid col-2">
            {Object.entries(post).map(([key, value]) => (
              <li key={key} className="mb-1 flex">
                <span className="font-bold text-gray-900">{key}: </span>
                <span>
                  {value instanceof Date ? value.toLocaleDateString() : String(value)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
