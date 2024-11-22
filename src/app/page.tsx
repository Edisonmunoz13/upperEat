"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("login");
  }, []);

  return (
    <div>
      <h2>Developer says Hello</h2>
    </div>
  );
}
