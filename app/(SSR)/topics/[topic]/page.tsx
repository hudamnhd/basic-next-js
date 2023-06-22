import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: {
    topic: string;
  };
};

export function generateMetadata({ params: { topic } }: Props): Metadata {
  return {
    title: `${topic} - Unsplash Galery`,
    description: `This is the page result topic ${topic}`,
  };
}

// export const dynamicParams = false // disable generateStaticParams

export function generateStaticParams() {
  return ["apples", "health", "coding"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: Props) {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=2&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await res.json();

  return (
    <div className="space-y-8">
      <div className="p-3 rounded-md bg-blue-100 text-blue-600 w-[500px]">
        <p>
          This page uses <strong>generateStaticParams</strong> to render and
          cache static pages at build time, even though the URL has a dynamic
          parameter. Pages that are not included in generateStaticParams will be
          fetched & renderd on first acces and the{" "}
          <strong>cached for subsequent </strong>
          requests (this can be disabled)
        </p>
      </div>
      <div className="p-3 rounded-md bg-green-100 text-blue-600 w-[500px]">
        <p>
          Result of <strong>{topic}</strong>
        </p>
      </div>
      {images.map((image) => (
        <Image
          src={image.urls.raw}
          width={250}
          height={250}
          alt={image.description}
          key={image.urls.raw}
          className="rounded-md object-contain"
        />
      ))}
    </div>
  );
}
