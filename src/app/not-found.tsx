import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center">
      <Container>
        <p className="font-mono text-ui text-faint">404</p>
        <h1 className="mt-2 text-h2 font-semibold">There is no page at this address.</h1>
        <p className="mt-3 text-body text-muted-foreground">
          <Link href="/" className="text-accent underline-offset-4 hover:underline">
            Back to qorpe.com
          </Link>
        </p>
      </Container>
    </main>
  );
}
