import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";

export default async function UsersPage() {
  const userData: Promise<User[]> = getAllUsers();
  const users = await userData;

  const content = (
    <section>
      {users.map((user, index) => {
        return (
          <>
            <p key={user.id}>
              <Link
                className="opacity-80 hover:opacity-100"
                href={`/users/${user.id}`}
              >
                {index + 1}. {user.name}
              </Link>
            </p>
            <br />
          </>
        );
      })}
    </section>
  );

  return content;
}
