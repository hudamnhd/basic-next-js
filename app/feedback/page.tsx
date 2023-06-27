"use client";

import { useState } from "react";

const initState = {
  name: "",
  email: "",
  message: "",
};

export default function Feedback() {
  const [data, setData] = useState(initState);
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = data;
    console.log(JSON.stringify(data));
    const res = await fetch("http://localhost:3000/feedback/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
      // body: JSON.stringify(data),
    });
    const result = await res.json();
    setData(initState);
    setToggle(true);
    setTimeout(() => {
      setToggle(false);
    }, 1000);
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

  const canSubmit = [...Object.values(data)].every(Boolean);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-1  max-w-sm p-5"
      >
        <h1 className="text-4xl">Contact Us</h1>
        <label className="text-xl" htmlFor="name">
          Name:
        </label>
        <input
          className="py-1 px-2 rounded-lg focus:outline-none focus:ring-2 ring-blue-500 text-black"
          type="text"
          name="name"
          placeholder="Huda"
          pattern="([A-Z])[\w+.]{1,}"
          onChange={handleChange}
          value={data.name}
          autoFocus
        />
        <label className="text-xl" htmlFor="name">
          Email:
        </label>
        <input
          className="py-1 px-2 rounded-lg focus:outline-none focus:ring-2 ring-blue-500 text-black"
          type="text"
          name="email"
          placeholder="huda@localhost.com"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          onChange={handleChange}
          value={data.email}
        />
        <label className="text-xl" htmlFor="name">
          Message:
        </label>
        <textarea
          className="py-1 px-2 rounded-lg focus:outline-none focus:ring-2 ring-blue-500 text-black"
          rows={5}
          cols={33}
          name="message"
          placeholder="You are the best"
          onChange={handleChange}
          value={data.message}
        />
        <div className="flex space-x-3">
          {canSubmit && (
            <div className="pt-2">
              <button
                className="text-lg font-semibold py-1 px-5 rounded-lg bg-slate-500 hover:bg-slate-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          )}
          {canSubmit && (
            <div className="pt-2">
              <button
                className="text-lg font-semibold py-1 px-5 rounded-lg bg-red-500 hover:bg-red-600"
                onClick={() => setData(initState)}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </form>
      {toggle && (
        <div className="bg-green-600 w-fit rounded-lg px-4 py-2">
          <h3>Thank, your feedback has been successfully sent.</h3>
        </div>
      )}
    </div>
  );
}
