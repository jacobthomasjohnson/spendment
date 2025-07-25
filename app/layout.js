"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Inter } from "next/font/google";
import "./globals.css";

import Breadcrumbs from "@/components/Breadcrumbs";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { resetData } from "@/lib/fakeSupabaseClient";

import {
  Home as HomeIcon,
  Repeat2,
  KeySquare,
  User,
  Settings,
  Plus,
} from "lucide-react";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const navItems = [
  { href: "/", icon: HomeIcon },
  { href: "/subscriptions", icon: Repeat2 },
  { href: "/licenses", icon: KeySquare },
];

const bottomNavItems = [
  { href: "/account", icon: User },
  { href: "/settings", icon: Settings },
];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${interSans.variable} bg-light-grey antialiased`}
        style={{ height: "100vh" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          className="flex h-full w-full"
        >
          <div className="flex flex-col h-full opacity-0">
            <div className="flex flex-col h-full p-12 gap-16">
              <Image src="/logo.svg" width={28} height={28} alt="Logo" />
            </div>
          </div>

          <div className="flex flex-col h-full fixed left-0">
            <div className="flex flex-col h-full p-12 gap-16">
              <Link href="/">
                <Image src="/logo.svg" width={28} height={28} alt="Logo" />
              </Link>
              <div className="flex flex-col gap-8">
                {navItems.map(({ href, icon: Icon }) => (
                  <Link href={href} key={href}>
                    <Icon
                      className={`w-5 h-5 transition-colors duration-150 ${
                        pathname === href
                          ? "text-black"
                          : "text-neutral-700 hover:text-black"
                      }`}
                    />
                  </Link>
                ))}
              </div>
              <div className="grow"></div>
              <div className="flex flex-col gap-8">
                {bottomNavItems.map(({ href, icon: Icon }) => (
                  <Link href={href} key={href}>
                    <Icon
                      className={`w-5 h-5 transition-colors duration-150 ${
                        pathname === href
                          ? "text-black"
                          : "text-neutral-700 hover:text-black"
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full grow">
            <div className="p-8 w-full flex items-end justify-end gap-1">
              <Link href="/new-subscription">
                <button className="flex gap-2 items-center bg-primary px-4 py-3 rounded-md text-white text-sm hover:bg-primary-light transition-all duration-200 hover:px-5">
                  <Plus width={14} height={14} />
                  Add Subscription
                </button>
              </Link>
              <Link href="/new-license">
                <button className="flex gap-2 items-center bg-purple-900 px-4 py-3 rounded-md text-white text-sm hover:bg-purple-950 transition-all duration-200 hover:px-5">
                  <Plus width={14} height={14} />
                  Add License Key
                </button>
              </Link>
              <button
                onClick={resetData}
                className="flex gap-2 items-center bg-transparent px-4 py-3 rounded-md text-foreground text-sm hover:bg-red-900 transition-all duration-200 hover:px-5 hover:text-white"
              >
                Reset Database
              </button>
            </div>

            <div className="grow bg-white rounded-tl-3xl p-14 overflow-auto scrollbar-hide">
              <Breadcrumbs />
              <AnimatePresence mode="wait">{children}</AnimatePresence>
            </div>
          </div>
        </motion.div>
      </body>
    </html>
  );
}
