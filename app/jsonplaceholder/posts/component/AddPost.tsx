"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

const initState = {
  userId: 0,
  id: 0,
  title: "",
  body: "",
};

type Props = {
  dataPosts: Post[];
};

export default function AddPost({ dataPosts }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(initState);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = ""; // Menghapus properti overflow yang diatur sebelumnya
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = dataPosts.length > 0 ? dataPosts[dataPosts.length - 1].id : 0;
    const newUserId =
      newId % 10 === 0
        ? dataPosts[dataPosts.length - 1].userId + 1
        : dataPosts[dataPosts.length - 1].userId;

    const newPost = {
      userId: newUserId,
      id: newId + 1,
      title: data.title,
      body: data.body,
    };

    const res = await fetch("http://localhost:3000/jsonplaceholder/posts/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (res.ok) {
      setData(initState);
      closeModal();
      router.refresh();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center font-semibold border-2 py-1 px-2 rounded-md border-blue-400 mb-2 text-blue-400 font-semibold"
      >
        <FaPlus className="text-2xl mr-1" />
        Add
      </button>
      {isOpen && (
        <div className="overflow-x-hidden fixed inset-0 flex items-center justify-center z-10">
          <div
            onClick={openModal}
            className="absolute inset-0 bg-black opacity-40"
          />
          <form
            onSubmit={handleSubmit}
            className="relative bg-black flex flex-col space-y-2 w-1/2 p-5 border-2 border-gray-500 rounded-md z-10"
          >
            <FaPlus
              className="absolute right-3 top-3 rotate-45 text-xl opacity-70 cursor-pointer"
              onClick={closeModal}
            />

            <h1 className="text-xl font-semibold">Add Post</h1>
            <label className="text-lg font-semibold" htmlFor="title">
              Title:
            </label>
            <input
              className="border-2 text-black rounded-md px-3 py-1 focus:outline-none"
              type="text"
              placeholder="Input your title"
              name="title"
              onChange={handleChange}
              value={data.title}
            />
            <label className="text-lg font-semibold" htmlFor="title">
              Post:
            </label>
            <textarea
              className="border-2 text-black rounded-md px-3 focus:outline-none"
              placeholder="Input your content"
              name="body"
              rows={4}
              cols={30}
              onChange={handleChange}
              value={data.body}
            />
            <div className="flex space-x-2 pt-2">
              <button
                className="bg-blue-500 rounded-md font-semibold py-1 px-3"
                type="submit"
              >
                Submit
              </button>
              <button className="bg-red-500 rounded-md font-semibold py-1 px-3">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
