"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="space-x-3 flex">
      {[
        ["Home", "/"],
        ["Users", "/users"],
        ["Static", "/static"],
        ["Dynamic", "/dynamic"],
        ["ISR", "/isr"],
        ["Search", "/search"],
      ].map(([title, path]) => {
        // const isActive = pathname.startsWith(path);
        const isActive = pathname === path;
        return (
          <Link
            key={title}
            href={path}
            className={isActive ? "opacity-100" : "opacity-70"}
          >
            {title}
          </Link>
        );
      })}
      <p>[Topics]</p>
      {[
        ["Apples", "/topics/apples"],
        ["Health", "/topics/health"],
        ["Coding", "/topics/coding"],
      ].map(([title, path]) => {
        // const isActive = pathname.startsWith(path);
        const isActive = pathname === path;
        return (
          <Link
            key={title}
            href={path}
            className={isActive ? "opacity-100" : "opacity-70"}
          >
            {title}
          </Link>
        );
      })}
    </nav>
  );
}
