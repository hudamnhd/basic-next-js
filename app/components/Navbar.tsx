"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  return (
    <nav className="flex space-x-4 pt-4">
      {[
        ["Home", "/"],
        ["Users", "/jsonplaceholder/users"],
        ["Static", "/unsplash/static"],
        ["Dynamic", "/unsplash/dynamic"],
        ["ISR", "/unsplash/isr"],
        ["Search", "/unsplash/search"],
      ].map(([title, path]) => {
        // const isActive = pathname.startsWith(path);
        const isActive = pathname === path;
        return (
          <Link
            key={title}
            href={path}
            className={`${isActive ? "opacity-100" : "opacity-70"}`}
          >
            {title}
          </Link>
        );
      })}
      <div onMouseLeave={() => setToggle(false)} className="relative">
        <p
          className="opacity-70 hover:opacity-100"
          onClick={() => setToggle(!toggle)}
        >
          Topics
        </p>
        {toggle && (
          <div className="absolute -left-2 flex flex-col space-y-2 bg-black rounded-md p-2">
            {[
              ["Apples", "/unsplash/topics/apples"],
              ["Health", "/unsplash/topics/health"],
              ["Coding", "/unsplash/topics/coding"],
            ].map(([title, path]) => {
              // const isActive = pathname.startsWith(path);
              const isActive = pathname === path;
              return (
                <Link
                  key={title}
                  href={path}
                  className={`${
                    isActive ? "opacity-100" : "opacity-70"
                  } hover:opacity-100`}
                >
                  {title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
