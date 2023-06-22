import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Static Fetching - Unsplash Galery",
};

export default async function Page() {
  const res = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY
  );
  const image: UnsplashImage = await res.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="space-y-8">
      <div className="p-3 rounded-md bg-blue-100 text-blue-600 w-[500px]">
        <p>
          This page <strong>fetches and caches data at build time </strong>
          Even though the Unsplash API always returns a new image, we see the
          same image after resfreshing teh page until we compile the project
          again.
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
