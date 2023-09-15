import React from "react";
import { Form, Link, Outlet } from "@remix-run/react";
import type { Country } from "~/graphql/__generated__/graphql";
import { useOptionalUser } from "~/utils";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "@remix-run/react";

import { useNavigate } from "@remix-run/react";

export default function CountryPage() {
  const [Idata, setIData] = React.useState<any>(null);

  const param = useParams();
  const navigate = useNavigate();
  const user = useOptionalUser();

  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);

  React.useEffect(() => {
    if (data) {
      setIData(data);
    }
  }, [data]);

  const handleClick = (code: string) => {
    if (code === param.Id) {
      navigate("/countries");
    } else {
      navigate(`/countries/${code}`);
    }
  };

  const handleChange = (value: string) => {
    let filteredData: any = data?.countries?.filter((country: any) => {
      return country.name.toLowerCase().includes(value.toLowerCase());
    });
    if (filteredData?.length > 10) {
      navigate(`/countries/${filteredData[9].code}`);
    } else if (filteredData?.length > 0) {
      navigate(`/countries/${filteredData[filteredData?.length - 1]?.code}`);
    }

    setIData({ countries: filteredData });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-xl font-bold">
          <Link to=".">Countries</Link>
        </h1>
        <p className="text-sm">{user?.email ? user.email : "Quest"}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="text-sm rounded bg-slate-600 px-4 py-2 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-[calc(100vh-68px)] bg-white">
        <div className="h-full overflow-y-auto w-60 border-r bg-gray-50 max-sm:w-[120px]">
          <span className="block p-4 text-xl text-blue-500">
            <input
              className="p-3 text-sm w-full"
              placeholder="Search..."
              onChange={(e) => handleChange(e.target.value)}
            />
          </span>

          <hr />

          <div className="overflow-y-auto mb-5 text-xs">
            {Idata?.countries?.map((country: Country) => (
              <div
                onClick={() => handleClick(country.code)}
                style={{
                  backgroundColor:
                    country.code == param.Id ? "rgb(149, 163, 183,0.9)" : "",
                }}
                className="px-4 py-1 hover:bg-slate-200 cursor-pointer"
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
          <Outlet context={data} />
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
