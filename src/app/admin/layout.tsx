import { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ClerkProvider>
      <main className="mx-auto w-full max-w-5xl px-3">
        <div className="flex min-h-[28px] justify-between items-center gap-3 py-3">
          <Link href="/admin" className="underline font-semibold">
            Admin Dashboard
          </Link>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        {children}
      </main>
    </ClerkProvider>
  );
};

export default AdminLayout;
