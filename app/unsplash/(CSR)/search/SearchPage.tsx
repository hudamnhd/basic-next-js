"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState<UnsplashImage[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();
    if (query) {
      try {
        setSearchResult(null);
        setIsError(false);
        setIsLoading(true);
        const res = await fetch("/unsplash/api/search?query=" + query);
        const images: UnsplashImage[] = await res.json();
        setSearchResult(images);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="space-y-5">
      <div className="p-3 rounded-md bg-blue-100 text-blue-600 ">
        <p>
          This page fetched data <strong>client-side. </strong>In order to not
          leak API credentials, the requests is sent to a NextJS{" "}
          <strong>route handler</strong>
          that runs on server. This route handler then fetches the data from the
          Unsplash API and returns it to the client.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center space-x-1 border-2 rounded-md p-2 bg-gradient-to-r from-blue-300 to-blue-200"
      >
        <input
          className="px-3 py-1 shadow-md focus:outline-none focus:ring ring-blue-500 rounded-md text-black"
          type="text"
          name="query"
          placeholder="E.g. cat, hotdogs, ..."
        />
        <button
          className="px-3 py-1 shadow-md bg-blue-600 text-white rounded-md"
          type="submit"
        >
          Search
        </button>
      </form>
      <div>
        {isLoading && <h1>Loading...</h1>}
        {isError && <h1>Spmething went wrong. Please try again.</h1>}
        {setSearchResult?.length === 0 && (
          <h1>Nothing found. Try a different query</h1>
        )}
      </div>
      {searchResult && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {searchResult.map((image) => (
            <Image
              src={image.urls.raw}
              width={250}
              height={250}
              alt={image.description}
              key={image.urls.raw}
              className="ring-2 ring-white rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
}
