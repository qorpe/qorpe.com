import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center">
      <Container>
        <p className="font-mono text-xs text-gray-2">404</p>
        <h1 className="mt-2 text-h2 font-medium">There is no page at this address.</h1>
        <p className="mt-3 text-base text-gray"><Link href="/" className="text-ink underline underline-offset-4">Back to qorpe.com</Link></p>
      </Container>
    </main>
  );
}
