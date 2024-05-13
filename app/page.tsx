"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [pokemon, setPokemon] = useState<string>("pikachu");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex" suppressHydrationWarning={true}>
        <a href="/pokemon/pikachu">Go to pikachu</a>
      </div> */}
      <div className="w-full max-w-xs">
        <div className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="pokemon">
              Search a pokemon
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="pokemon"
              type="text"
              placeholder="Pokemon"
              onChange={(e) => setPokemon(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Link href={pokemon ? `/pokemon/${pokemon}` : `/pokemon/pikachu`}>
              <button className="btn font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
