import { Container } from "@/src/components/common/Container";
import { Button } from "@/src/components/common/Button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center">
      <Container className="text-center py-20">
        <AlertCircle className="w-24 h-24 text-primary mx-auto mb-6" />
        <h1 className="text-6xl md:text-8xl font-bold text-dark mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-text mb-8">Page Not Found</h2>
        <p className="text-lg text-gray-500 max-w-md mx-auto mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <Button size="lg">Back to Homepage</Button>
        </Link>
      </Container>
    </div>
  );
}
