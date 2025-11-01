"use client";

import Dock from "../app/(auth)/dashboard/dock";
import { useRouter } from "next/navigation";
import { Home, LayoutDashboard, LogIn, UserPlus, LogOut, Users, User } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function AppDock() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Mobile icons (smaller)
  const commonMobile = [
    { icon: <Home className="h-4 w-4 text-white" />, label: "Home", onClick: () => router.push("/") },
    { icon: <LayoutDashboard className="h-4 w-4 text-white" />, label: "Dashboard", onClick: () => router.push("/dashboard") },
    { icon: <Users className="h-4 w-4 text-white" />, label: "Squad", onClick: () => router.push("/dashboard/squad") },
    { icon: <User className="h-4 w-4 text-white" />, label: "Private", onClick: () => router.push("/dashboard/private") },
  ];

  // Desktop icons (larger)
  const commonDesktop = [
    { icon: <Home className="h-5 w-5 text-white" />, label: "Home", onClick: () => router.push("/") },
    { icon: <LayoutDashboard className="h-5 w-5 text-white" />, label: "Dashboard", onClick: () => router.push("/dashboard") },
    { icon: <Users className="h-5 w-5 text-white" />, label: "Squad", onClick: () => router.push("/dashboard/squad") },
    { icon: <User className="h-5 w-5 text-white" />, label: "Private", onClick: () => router.push("/dashboard/private") },
  ];

  return (
    <>
      <SignedIn>
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex justify-center">
          <div className="pointer-events-auto">
            {/* Mobile - Smaller dock */}
            <div className="block md:hidden">
              <Dock
                items={[
                  ...commonMobile,
                  { icon: <UserButton />, label: "Account", onClick: () => { } },
                  {
                    icon: (
                      <SignOutButton>
                        <LogOut className="h-4 w-4 text-white" />
                      </SignOutButton>
                    ), label: "Sign out", onClick: () => { }
                  },
                ]}
                baseItemSize={36}
                magnification={52}
                panelHeight={48}
                dockHeight={200}
                distance={150}
              />
            </div>
            {/* Desktop - Larger dock */}
            <div className="hidden md:block">
              <Dock
                items={[
                  ...commonDesktop,
                  { icon: <UserButton />, label: "Account", onClick: () => { } },
                  {
                    icon: (
                      <SignOutButton>
                        <LogOut className="h-5 w-5 text-white" />
                      </SignOutButton>
                    ), label: "Sign out", onClick: () => { }
                  },
                ]}
                baseItemSize={42}
                magnification={60}
                panelHeight={56}
                dockHeight={220}
                distance={180}
              />
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex justify-center">
          <div className="pointer-events-auto">
            {/* Mobile - Smaller dock */}
            <div className="block md:hidden">
              <Dock
                items={[
                  ...commonMobile,
                  { icon: <LogIn className="h-4 w-4 text-white" />, label: "Sign in", onClick: () => router.push("/sign-in") },
                  { icon: <UserPlus className="h-4 w-4 text-white" />, label: "Sign up", onClick: () => router.push("/sign-up") },
                ]}
                baseItemSize={36}
                magnification={52}
                panelHeight={48}
                dockHeight={200}
                distance={150}
              />
            </div>
            {/* Desktop - Larger dock */}
            <div className="hidden md:block">
              <Dock
                items={[
                  ...commonDesktop,
                  { icon: <LogIn className="h-5 w-5 text-white" />, label: "Sign in", onClick: () => router.push("/sign-in") },
                  { icon: <UserPlus className="h-5 w-5 text-white" />, label: "Sign up", onClick: () => router.push("/sign-up") },
                ]}
                baseItemSize={42}
                magnification={60}
                panelHeight={56}
                dockHeight={220}
                distance={180}
              />
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}


