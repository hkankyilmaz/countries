import React from "react";
import type { LoaderArgs } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { Country } from "~/graphql/__generated__/graphql";
import { useUser } from "~/utils";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

export default function NotesPage() {
  const user = useUser();

  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Countries</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="random" className="block p-4 text-xl text-blue-500">
            Select Random Country
          </Link>

          <hr />

          <div className="h-full overflow-y-auto">
            {data.countries.map((country: Country) => (
              <div
                className="px-4 py-1 hover:bg-slate-400 cursor-pointer"
                key={country.code}
              >
                <h2>
                  {country.emoji} {country.name}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      name
      emoji
    }
  }
`;
