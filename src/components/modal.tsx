"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogOverlay />
      <DialogContent className="overflow-y-hidden">
        <DialogTitle>
          Login
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
