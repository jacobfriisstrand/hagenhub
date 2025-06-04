"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  className?: string;
};

export default function SearchBar({ className = "" }: SearchBarProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      setIsError(true);
      return;
    }
    setIsError(false);
    router.push(`/search?search=${value}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e.currentTarget.value);
    }
  };

  return (
    <div className={`flex flex-row items-center justify-center gap-2 ${className}`}>
      <Input
        type="search"
        placeholder={isError ? "Please enter a search term" : "Search for a listing"}
        className={`w-full bg-white ${isError ? "placeholder:text-red-700" : "placeholder:text-muted-foreground"}`}
        defaultValue={search}
        onKeyDown={handleKeyDown}
      />
      <Button
        onClick={() => handleSearch(search)}
        variant="outline"
      >
        <SearchIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
