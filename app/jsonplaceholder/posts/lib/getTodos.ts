export default async function getAllUsers() {
  const res = await fetch("http://localhost:8080/todos");

  if (!res.ok) undefined;

  return res.json();
}
