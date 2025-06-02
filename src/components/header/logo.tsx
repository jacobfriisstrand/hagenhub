import Link from "next/link";

export default function Logo() {
  return (
    <Link className="text-xl font-bold border-2 border-black p-2" href="/">
      <h1>Logo Hagenhub</h1>
    </Link>
  );
}
