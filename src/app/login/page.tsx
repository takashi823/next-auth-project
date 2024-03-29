import { Login } from "../../components/Login/Login";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center align-middle min-h-screen">
      <Login />
    </main>
  );
}
