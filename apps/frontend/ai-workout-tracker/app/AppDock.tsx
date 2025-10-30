"use client";

import Dock from "./(auth)/dashboard/dock";
import { useRouter } from "next/navigation";
import { Home, LayoutDashboard, LogIn, UserPlus, LogOut, Users, User } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";

export default function AppDock() {
  const router = useRouter();

  const common = [
    { icon: <Home className="h-5 w-5 text-white" />, label: "Home", onClick: () => router.push("/") },
    { icon: <LayoutDashboard className="h-5 w-5 text-white" />, label: "Dashboard", onClick: () => router.push("/dashboard") },
    { icon: <Users className="h-5 w-5 text-white" />, label: "Groups", onClick: () => router.push("/dashboard/groups") },
    { icon: <User className="h-5 w-5 text-white" />, label: "Individual", onClick: () => router.push("/dashboard/individual") },
  ];

  return (
    <div className="pointer-events-none">
      <SignedIn>
        <div className="pointer-events-auto">
          <Dock
            items={[
              ...common,
              { icon: <UserButton />, label: "Account", onClick: () => { } },
              {
                icon: (
                  <SignOutButton>
                    <LogOut className="h-5 w-5 text-white" />
                  </SignOutButton>
                ), label: "Sign out", onClick: () => { }
              },
            ]}
          />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="pointer-events-auto">
          <Dock
            items={[
              ...common,
              { icon: <LogIn className="h-5 w-5 text-white" />, label: "Sign in", onClick: () => router.push("/sign-in") },
              { icon: <UserPlus className="h-5 w-5 text-white" />, label: "Sign up", onClick: () => router.push("/sign-up") },
            ]}
          />
        </div>
      </SignedOut>
    </div>
  );
}


