import { Button } from "@/components/ui/button";
import SignUpForm from "@/components/signup-form";
import ContactForm from "@/components/contact-form";

export default function Home() {
  return (
    <>
      <div>
        <h1>Hello World</h1>
        <Button className="bg-primary">Click me!!</Button>
      </div>
      <SignUpForm />
      <ContactForm />
    </>
  );
}
