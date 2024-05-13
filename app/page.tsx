import ClientPokemon from "@/components/client_component";
import RandomQuote from "@/components/dynamic_server_component";
import ServerComponent from "@/components/server_component";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex" suppressHydrationWarning={true}>
        <ServerComponent />
        <div suppressHydrationWarning={true}>
          <ClientPokemon />
        </div>
      </div>
    </main>
  );
}
