import { redirect } from "next/navigation";
async function fetchPokemon(name = "pikachu") {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default async function ServerComponent({ name }: { name?: string }) {
  // Fetch pokemon from https://pokeapi.co/api/v2/ability/{id or name}/
  const data = await fetchPokemon(name);
  const time = new Date().toLocaleTimeString();
  console.log(time);

  return (
    <div>
      <h1>Server Component</h1>
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
    </div>
  );
}
