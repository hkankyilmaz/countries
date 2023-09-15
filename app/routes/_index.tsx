import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="w-[100vw] relative min-h-screen bg-white flex items-center max-sm:p-1 justify-center">
      <div className="relative w-full sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://i.pinimg.com/736x/32/84/f6/3284f67617f37d1f40e11c1ade3c5bbf.jpg"
                alt="Sonic Youth On Stage"
              />
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-yellow-500 drop-shadow-md">
                  Countries
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                This project was prepated by @hakankarayilmaz
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <Link
                  to="/countries"
                  className="flex sm:w-[150px] items-center justify-center rounded-md mr-4 max-sm:mb-4 max-sm:w-full border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50"
                >
                  Quest
                </Link>

                <div className="space-y-4  sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <Link
                    to="/join"
                    className="flex items-center sm:w-[150px] justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center sm:w-[150px] justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
