"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter((segment) => segment !== ""); // remove empty segments

  const paths = segments.map((_, i) => {
    return "/" + segments.slice(0, i + 1).join("/");
  });

  return (
    <nav className="text-sm text-neutral-400 space-x-1 mb-4 flex items-center justify-start">
      <Link href="/" className="hover:underline">
        Dashboard
      </Link>
      {segments.map((segment, i) => (
        <span className="flex items-center justify-center gap-1" key={i}>
          <ArrowRight width={12} height={12} />
          <Link href={paths[i]} className="hover:underline capitalize">
            {decodeURIComponent(segment)}
          </Link>
        </span>
      ))}
    </nav>
  );
}
