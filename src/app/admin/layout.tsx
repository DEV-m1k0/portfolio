"use client";

import { useEffect, useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { Toaster } from "react-hot-toast";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [status, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        <p style={{ color: "var(--text-2)" }}>Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--bg-1)",
            color: "var(--text-0)",
            border: "1px solid var(--border)",
          },
        }}
      />
      <AdminGuard>{children}</AdminGuard>
    </SessionProvider>
  );
}
