"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";

type ModalProps = {
  children: React.ReactNode;
  title: string; // Make title required
};

export default function Modal({ children, title }: ModalProps) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (

    <Dialog onOpenChange={handleOpenChange} open={true}>
      <DialogOverlay className="bg-black/5" />
      <DialogContent className="overflow-y-hidden px-12 py-12">
        <DialogTitle>{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
