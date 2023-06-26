"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";

const initState = {
  userId: 0,
  id: 0,
  title: "",
  body: "",
};

export default function Item(props: Post & { index: number }) {
  const [edit, setEdit] = useState(initState);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      const res = await fetch(
        `http://localhost:3000/jsonplaceholder/posts/api?id=${id}`,
        {
          method: "DELETE",
        }
      );
      alert(`Post ${id} deleted`);
      router.refresh();
    }
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/jsonplaceholder/posts/api", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    });
    setEdit(initState);
    router.refresh();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setEdit({
      ...edit,
      [name]: e.target.value,
    });
  };

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div
        key={props.id}
        className="relative flex justify-between rounded-md mb-1 border-2 border-gray-400 py-3 px-8 space-y-1"
      >
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-400">
          {props.index + 1}
        </div>
        <div className=" w-full">
          {edit.id === props.id && (
            <form onSubmit={handleSave} className="flex flex-col space-y-2">
              <label className="text-lg font-semibold" htmlFor="title">
                Title:
              </label>
              <input
                className="border-2 text-black rounded-md px-3 py-1 focus:outline-none"
                type="text"
                name="title"
                onChange={handleChange}
                value={edit.title}
              />
              <label className="text-lg font-semibold" htmlFor="title">
                Post:
              </label>
              <textarea
                className="border-2 text-black rounded-md px-3 focus:outline-none"
                name="body"
                rows={4}
                cols={30}
                onChange={handleChange}
                value={edit.body}
              />
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 rounded-md font-semibold px-3"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="bg-red-500 rounded-md font-semibold px-3"
                  type="button"
                  onClick={() => setEdit(initState)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {edit.id !== props.id && (
            <>
              <p className="text-lg font-semibold">{props.title}</p>
              <p>{props.body}</p>
            </>
          )}
        </div>
        {edit.id !== props.id && (
          <div className="space-y-2 text-sm w-fit">
            <button
              onClick={() =>
                setEdit({
                  ...edit,
                  userId: props.userId,
                  id: props.id,
                  title: props.title,
                  body: props.body,
                })
              }
              className="w-full px-3 py-1 bg-blue-500 rounded-md text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(props.id)}
              className="w-full px-3 py-1 bg-red-500 rounded-md text-white font-semibold"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Suspense>
  );
}
