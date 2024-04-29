// File: components/Greeting.server.js

export default function Greeting({ name } : { name?: string }) {
  return (
    <div>
      <h1>Hello, {name ? name : "Guest"}!</h1>
    </div>
  );
}
