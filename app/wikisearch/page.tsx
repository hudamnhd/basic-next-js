"use client";

import { useState, FormEvent } from "react";
import getWikiResults from "./lib/getWikiResults";
import Link from "next/link";

export default function Page() {
  const [dataWiki, setDataWiki] = useState<WikiResult[] | null | undefined>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();
    if (query) {
      try {
        setDataWiki(null);
        setIsLoading(true);
        const res: Promise<WikiSearchResults> = getWikiResults(query);
        const data = await res;
        const results: WikiResult[] | null | undefined = data?.query?.pages;
        setDataWiki(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center space-x-1 border-2 rounded-md p-3"
      >
        <input
          className="px-3 py-1 w-3/4 shadow-md focus:outline-none focus:ring ring-blue-500 rounded-md text-black"
          type="text"
          name="query"
          placeholder="E.g. Indonesia, Jawa Timur, Bojonegoro ..."
        />
        <button
          className="px-3 py-1 shadow-md bg-blue-600 text-white rounded-md"
          type="submit"
        >
          Search
        </button>
      </form>
      <div>
        {isLoading && (
          <h1 className="text-2xl p-4 text-center font-semibold">Loading...</h1>
        )}
        {isError && <h1>Spmething went wrong. Please try again.</h1>}
        {dataWiki === undefined && (
          <h1>Nothing found. Try a different query</h1>
        )}
      </div>
      <main className="py-1 min-h-screen space-y-2">
        {dataWiki &&
          Object.values(dataWiki).map((result) => {
            const itemText = (
              <div className="flex flex-col justify-center max-w-sm">
                <h2>
                  <Link
                    href={`https://en.wikipedia.org/?curid=${result.pageid}`}
                    target="_blank"
                    className="text-lg font-bold hover:text-blue-500"
                  >
                    {result.title}
                  </Link>
                </h2>
                <p>{result.extract}</p>
              </div>
            );
            const content = result?.thumbnail?.source ? (
              <article
                key={result.pageid}
                className="p-2 max-w-2xl border-b-2 rounded-md hover:scale-[102%] duration-300"
              >
                <div className="flex flex-row-reverse justify-between">
                  <div className="flex flex-col justify-center w-[10%]">
                    <img
                      className="bg-white p-1"
                      src={result.thumbnail.source}
                      alt={result.title}
                      width={result.thumbnail.width}
                      height={result.thumbnail.height}
                      loading="lazy"
                    />
                  </div>
                  {itemText}
                </div>
              </article>
            ) : (
              <article
                key={result.pageid}
                className="p-2 max-w-2xl border-b-2 rounded-md hover:scale-[102%] duration-300"
              >
                {itemText}
              </article>
            );

            return content;
          })}
      </main>
    </div>
  );
}
