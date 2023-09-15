import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "@remix-run/react";

export default function CountryDetailsPage() {
  const id = useParams();

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { id: id.Id },
  });

  if (loading) return <p className="w-full h-full">Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <CountryDetail data={data} />;
}

export function CountryDetail({ data }: any) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full text-center text-[200px]  ">
        {data.country.emoji}
      </div>
      <ul className="text-xs [&>li>span]:w-[100px] [&>li]:flex [&>li]:justify-center [&>li>span]:inline-block flex justify-center flex-col">
        <li className="border-b hover:bg-slate-100">
          <span className="text-blue-800">Name:</span>{" "}
          <span>{data.country?.name}</span>
        </li>
        <li className="border-b hover:bg-slate-100">
          <span className="text-blue-800">Native:</span>{" "}
          <span>{data.country?.native}</span>
        </li>
        <li className="border-b hover:bg-slate-100">
          <span className="text-blue-800">Currency:</span>{" "}
          <span>{data.country?.currency}</span>{" "}
        </li>
        <li className="border-b hover:bg-slate-100">
          <span className="text-blue-800">Language:</span>{" "}
          <span>{data.country?.languages[0].name}</span>{" "}
        </li>
        <li className="mb-10 border-b hover:bg-slate-100">
          <span className="text-blue-800">Code:</span>{" "}
          <span>{data.country?.code}</span>{" "}
        </li>
        <li className="mb-5 border-b hover:bg-slate-100">
          <span className="text-blue-800">States:</span>{" "}
        </li>
        <li className="flex justify-center flex-wrap">
          {data.country.states.length !== 0 ? (
            data.country.states.map((state: any) => (
              <span className="!w-[200px] border p-3 mb-3 mr-3 text-center hover:bg-slate-100">
                {state.name}
              </span>
            ))
          ) : (
            <p>There is no States...</p>
          )}
        </li>
      </ul>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Note not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}

export const GET_COUNTRY = gql`
  query GetCountry($id: ID!) {
    country(code: $id) {
      name
      native
      emoji
      currency
      languages {
        name
      }
      code
      phone
      emojiU
      states {
        name
      }
    }
  }
`;
