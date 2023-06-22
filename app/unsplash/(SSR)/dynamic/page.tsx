import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Dynamic Fetching - Unsplash Galery",
};

// export const revalidate = 0;

export default async function Page() {
  const res = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      // cache: "no-cache",
      // next: { revalidate: 0 },
    }
  );
  const image: UnsplashImage = await res.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="space-y-8">
      <div className="p-3 rounded-md bg-blue-100 text-blue-600 w-[500px]">
        <p>
          This page <strong>fetches data dynamically </strong>
          Every time you refresh the page, you get a new image from the Unsplash
          API.
        </p>
      </div>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded-md ring-2 ring-white shadow-md shadow-white"
      />
      <br />
      <Link className="text-xl" href={"/unsplash/users/" + image.user.username}>
        by {image.user.username}
      </Link>
    </div>
  );
}
