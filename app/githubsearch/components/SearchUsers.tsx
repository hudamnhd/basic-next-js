"use client";

import { useState } from "react";

export default function SearchUsers() {
  const [users, setUsers] = useState<UserGithub[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();
    if (query) {
      try {
        setUsers(undefined);
        setIsLoading(true);
        const res = await fetch("/githubsearch/api/search?query=" + query);
        const data = await res.json();
        setUsers(data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-2 p-2 flex flex-col items-center bg-gradient-to-r from-sky-700 to-slate-700 border-2 border-gray-500 p-2 rounded-md w-4/5 mx-auto"
      >
        <label className="text-xl font-semibold" htmlFor="Search">
          Search User Github
        </label>
        <div className="space-x-1">
          <input
            className="bg-slate-300 px-2 py-1 rounded-md focus:outline-none text-black"
            type="text"
            name="query"
            autoComplete="off"
            placeholder="E.g Hudamnhd"
          />
          <button
            className="font-semibold bg-sky-500 hover:bg-sky-600 px-2 py-1 rounded-md"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      {isLoading ? (
        <h1 className="text-2xl p-4 text-center font-semibold">Loading...</h1>
      ) : users?.length === 0 ? (
        <h1 className="text-2xl p-4 text-center font-semibold">
          User Not Found
        </h1>
      ) : (
        <div className="w-4/5 mx-auto space-y-2 border-2 border-gray-500 rounded-md m-2 py-2 overflow-y-auto h-[500px]">
          {users?.map((user) => (
            <div
              className="flex max-w-[95%] mx-auto items-center space-x-3 bg-slate-800 rounded-md py-2 px-6  border-b-2 border-gray-500"
              key={user.id}
            >
              <img
                className="w-12 rounded-2xl ring-2 ring-gray-500"
                src={user.avatar_url}
                alt={user.login}
              />
              <div>
                <p className="text-lg font-semibold">{user.login}</p>
                <a
                  href={user.html_url}
                  className="font-medium hover:text-blue-500"
                >
                  {user.html_url}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
