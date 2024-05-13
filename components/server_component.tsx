import action from "@/app/action";
import { redirect } from "next/navigation";
async function fetchPokemon(
  name = "pikachu",
  validateTime?: number,
  forceValidate?: boolean
) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name, {
    next: {
      revalidate: validateTime ? validateTime : undefined,
      tags: ["pokemon"],
    },
  });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

async function fetchRandomNumber(
  validateTime?: number,
  forceValidate?: boolean
) {
  const response = await fetch("http://localhost:3000/api/random_number", {
    next: { tags: ["randomNumber"], revalidate: validateTime ? validateTime : undefined },
  });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function ServerComponent({
  name,
  validateTime,
  forceValidate,
}: {
  name?: string;
  validateTime?: number;
  forceValidate?: boolean;
}) {
  // Fetch pokemon from https://pokeapi.co/api/v2/ability/{id or name}/
  const data = await fetchPokemon(name, validateTime, forceValidate);
  const number = await fetchRandomNumber(validateTime, forceValidate);
  const time = new Date().toLocaleTimeString();
  console.log(time);

  return (
    <div className="mt-5 bg-gray-700 p-5 shadow-sm">
      <h1>Server Component</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="pokemon-sprite"
        src={data?.sprites?.front_default}
        width={150}
        height={150}
      ></img>
      <p>{data.name}</p>
      <p>This component is rendered on the server</p>
      <p>and sent as static HTML to the client.</p>
      <p>The time is {time}</p>
      <p>This is a random number :</p>
      <p className="text-red font-bold">{number.randomNumber}</p>
      <form action={action}>
        <button type="submit">
          Revalidate randomNumber
        </button>
      </form>
    </div>
  );
}
