// File: pages/greet/[name].js
import Greeting from "@/components/dynamic_server_component";

export default function GreetPage({ params }: { params: { name: string } }) {
  return <Greeting name={params.name} />;
}
