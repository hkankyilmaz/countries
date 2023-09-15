import { useOutletContext } from "@remix-run/react";
import { CountryDetail } from "./countries.$Id";
import { useQuery, gql } from "@apollo/client";

export default function CountryIndexPage() {
  const Idata: any = useOutletContext();

  let id: string;

  if (Idata.countries.length > 10) {
    id = Idata.countries[9].code;
  } else {
    id = Idata.countries.pop();
  }

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { id: id },
  });

  if (loading) return <p className="w-full h-full">Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <CountryDetail data={data} />;
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
