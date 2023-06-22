import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
};

async function getUser(username: string): Promise<UnsplashUser> {
  const res = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  if (!res.ok) return notFound();

  return await res.json();
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user: UnsplashUser = await getUser(username);
  return {
    title:
      ([user.first_name, user.last_name].filter(Boolean).join(" ") ||
        user.username) + "- Unsplash Galery",
  };
}

export default async function Page({ params: { username } }: Props) {
  const user: UnsplashUser = await getUser(username);
  return (
    <div className="space-y-4">
      <div className="p-3 rounded-md bg-blue-100 text-blue-600 w-[500px] mb-4">
        <p>
          This profile pgae uses <strong>generateMetadata </strong>
          to set the <strong>page title </strong>dynamically from the API
          response.
        </p>
      </div>

      <a
        className="text-lg font-semibold text-blue-300"
        href={`https://unsplash.com/${user.username}`}
      >
        {user.username}{" "}
      </a>
      <p>Firts name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
    </div>
  );
}
