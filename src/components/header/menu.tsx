import Link from "next/link";

import { Button } from "@/components/ui/button/button";

export default function Menu() {
  return (
    <div className="flex items-center gap-4">
      <Button asChild variant="outline">
        <Link href="/signup">Sign up</Link>
      </Button>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
