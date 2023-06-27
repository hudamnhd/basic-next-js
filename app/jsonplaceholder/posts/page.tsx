import Post from "./component/Post";
import AddPost from "./component/AddPost";

export default async function Posts() {
  const res = await fetch("http://localhost:3000/jsonplaceholder/posts/api", {
    cache: "no-store",
  });

  if (!res.ok) return <h1>Error fetching data</h1>;

  const result: Post[] = await res.json();
  const data = await result.reverse();
  return (
    <div className="relative space-y-2">
      <div className="p-3 rounded-md bg-blue-100 text-blue-600 ">
        <p>
          This page post CRUD dynamic data , get data in server component.
          Request is sent to route handler that runs on server. This route
          handler then fetches to API lokal http://localhost:8080/todos
        </p>
      </div>
      <AddPost dataPosts={data} />
      {data?.map((post, index: number) => (
        <Post key={post.id} {...post} index={index} />
      ))}
    </div>
  );
}
