import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="block" href="/">
      <Image src="/logo/hagenhub.svg" alt="Logo" width={80} height={40} className="p-0" />
    </Link>
  );
}
