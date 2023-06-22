import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="p-3 rounded-md bg-blue-100 text-blue-600 space-y-2">
        <p>
          This is a sample project to showcase and learn the new
          <strong> NextJS 13 app directory </strong>
          and its features, including:
        </p>
        <ul className="list-disc px-8">
          <li>Static and dynamic server-side rendering</li>
          <li>Incremental static regeneration</li>
          <li>Client-side rendering</li>
          <li>Route handlers (API endpoints)</li>
          <li>Metadata API</li>
        </ul>
      </div>
    </main>
  );
}
