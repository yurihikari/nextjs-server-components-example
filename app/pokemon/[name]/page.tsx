// File: pages/greet/[name].js
import ClientPokemon from "@/components/client_component";
import ServerComponent from "@/components/server_component";

export default function PokemonPage({ params }: { params: { name: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ServerComponent name={params.name} />
        <div suppressHydrationWarning={true}>
          <ClientPokemon name={params.name} />
        </div>
      </div>
    </main>
  );
}
