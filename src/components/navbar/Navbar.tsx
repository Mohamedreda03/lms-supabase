import Link from "next/link";
import Image from "next/image";

import ThemeSwitcher from "../theme-switcher";
import MobileMenu from "./MobileMenu";
import AuthMenu from "../AuthMenu";
import OwnedMoney from "../OwnedMoney";
import { auth } from "@/auth";
import { Button } from "../ui/button";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-secondary z-[9999] bg-white shadow-sm w-full">
      <div className="relative flex">
        <div className="max-w-screen-2xl mx-auto px-7 h-[90px] flex items-center w-full">
          <nav className="flex items-center justify-between py-4 w-full relative">
            {!session && (
              <>
                <div className="md:flex items-center gap-3 md:gap-5 hidden text-sm w-full">
                  <Button
                    asChild
                    variant="destructive"
                    className="rounded-full px-5"
                  >
                    <Link href="/sign-up">انشاء حساب الان!</Link>
                  </Button>
                  <Button asChild className="rounded-full px-5">
                    <Link href="/sign-in">تسجيل الدخول</Link>
                  </Button>
                </div>
                <MobileMenu />
              </>
            )}

            <div className="flex items-center gap-5 justify-between w-full">
              <div>
                {session && (
                  <div className="flex items-center gap-4">
                    <AuthMenu session={session} />
                    <div className="hidden md:block">
                      <OwnedMoney />
                    </div>
                  </div>
                )}
              </div>
              {/* <ThemeSwitcher /> */}
            </div>

            <Link href="/" className="flex items-center justify-center">
              <Image src="/img/pp2.png" width={100} height={100} alt="logo" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
