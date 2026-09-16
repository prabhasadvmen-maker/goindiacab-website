"use client";

import { useEffect } from "react";
import { Container } from "@/src/components/common/Container";
import { Button } from "@/src/components/common/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center">
      <Container className="text-center py-20">
        <AlertTriangle className="w-24 h-24 text-accent mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto mb-10">
          An unexpected error occurred. Please try again or go back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={reset}>
            Try Again
          </Button>
        </div>
      </Container>
    </div>
  );
}
