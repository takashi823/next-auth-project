"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { LogoutButton } from "@/components/Login/LogoutButton";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/session");

      const sessionData = await res.json();
      console.log("sessionData", sessionData);
      setSession(sessionData);
    }

    fetchSession();
  }, []);

  return (
    <main className="flex flex-col justify-center min-h-screen items-center">
      <h1 className="text-xl">アカウント</h1>
      {session ? (
        <div className="flex flex-col justify-between ">
          <div>user:</div>
          <div className="text-xl">{session.user?.name || "Guest"}</div>
          <div>email:</div>
          <div className="text-xl">{session.user?.email || "Guest"}</div>
          <div>image:</div>
          {session.user?.image ? (
            <img
              className="rounded-full"
              src={`${session.user?.image}`}
              alt="アカウント画像"
              width={100}
              height={100}
            />
          ) : (
            <div>なし</div>
          )}
        </div>
      ) : (
        <div>user: not signed in</div>
      )}

      <LogoutButton />
    </main>
  );
}
