"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import action from "@/app/action";

async function fetchPokemon(name = "pikachu") {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
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
    next: {
      tags: ["randomNumber"],
      revalidate: validateTime ? validateTime : undefined,
    },
  });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default function ClientPokemon({ name = "pikachu" }: { name?: string }) {
  const [data, setData] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [number, setNumber] = useState<number>();
  const [pokemonName, setPokemonName] = useState(name);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    fetchPokemon(name).then((data) => {
      setData(data);
      console.log(data);
    });

    fetchRandomNumber().then((data) => {
      setNumber(data.randomNumber);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <h1>Client Component</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="pokemon-sprite"
        src={data?.sprites?.front_default}
        width={150}
        height={150}
      ></img>
      <p>{data?.name}</p>
      <p>This component is rendered on the client</p>
      <p>It fetches data from an API</p>
      <input
        placeholder="Type pokemon name"
        ref={inputRef}
        defaultValue={name}
        onChange={(e) => setPokemonName(e.target.value)}
      ></input>
      <br />
      <button
        onClick={() => {
          fetchPokemon(inputRef.current?.value).then((data) => setData(data));
          fetchRandomNumber().then((data) => setNumber(data.randomNumber));
        }}
      >
        Fetch
      </button>
      <p>Simple fetch button, fetching data from the client</p>
      <br />
      <button
        onClick={() => router.push("/pokemon/" + inputRef.current?.value)}
      >
        Go to /pokemon/{pokemonName}
      </button>
      <p>This will navigate to /pokemon/{pokemonName}</p>
      <p>The random Number will NOT change, because it is cached.</p>
      <br />
      <form action={action}>
        <button type="submit">
          Revalidate randomNumber
        </button>
      </form>
      <p>The random Number will change, because the cache will be purged.</p>
      <br></br>
      <p suppressHydrationWarning>The time is {time}</p>
      <p suppressHydrationWarning>The number is {number}</p>
    </div>
  );
}
