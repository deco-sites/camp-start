import { Country } from "deco-sites/camp-start/loaders/PracticesDecoCamp/Countries.ts";

export interface Props {
  title: string;
  countries: Country[];
}

export default function Bandeiras({ title, countries }: Props) {
  return (
    <div class="flex flex-col items-center w-[500px] mx-auto gap-4 p-16">
      <h1 class="p-10 text-2xl font-bold">{title}</h1>
      {countries.map((country) => (
        <div class="rounded-lg w-full border flex gap-4 items-center bg-base-300 p-4">
          <img
            class="h-12"
            src={country.media.flag}
            alt={`${country.name}'s Flag`}
          />
          <span class="text-sm">{country.name}</span>
        </div>
      ))}
    </div>
  );
}
