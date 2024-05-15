import { CountryDetails } from "deco-sites/camp-start/loaders/PracticesDecoCamp/CountryDetails.ts";

export interface Props {
  title: string;
  countryDetail: CountryDetails | null;
}

export default function NiceExample2({ title, countryDetail }: Props) {
  if (!countryDetail) {
    return (
      <div class="flex flex-col items-center w-[500px] mx-auto gap-4 p-16">
        <h1 class="p-10 text-lg">{title}</h1>
        <h2 class="py-10 text-lg">Country not found</h2>
      </div>
    );
  }

  return (
    <div class="flex flex-col items-center w-[500px] mx-auto gap-4 p-16">
      <h1 class="p-10 text-lg">{title}</h1>
      <img
        class="h-18"
        src={countryDetail.media.flag}
        alt={`${countryDetail.name}'s Flag`}
      />
      <h1 class="py-10 text-3xl">{countryDetail.name}</h1>
      <div class="flex gap-4 items-center">
        <span>Capital: {countryDetail.capital}</span>
        <span>Population: {countryDetail.population}</span>
      </div>
    </div>
  );
}
