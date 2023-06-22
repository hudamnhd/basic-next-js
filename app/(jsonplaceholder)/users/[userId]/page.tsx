import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import UserPosts from "./components/UserPosts";
import getUser from "../lib/getUser";
import getUserPosts from "../lib/getUserPosts";
import getAllUsers from "../lib/getAllUsers";

type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;

  if (!user.name) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  };
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);
  const user = await userData;

  if (!user.name) return notFound();

  return (
    <>
      <Link href="/users">Back</Link>
      <h2 className="text-2xl">{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const userData: Promise<User[]> = getAllUsers();
  const users = await userData;
  return users.map((user) => {
    userId: user.id.toString();
  });
}
