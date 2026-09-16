import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import PayNowForm from "./PayNowForm";

export const metadata: Metadata = {
  title: "Pay Now | GoIndiaCab",
  description: "Pay securely for your cab booking with Go India Cab.",
  alternates: { canonical: `${siteConfig.url}/paynow` },
};

export default function PayNowPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Pay Now" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">
            Secure <span className="text-primary">Payment</span>
          </h1>
          <p className="text-gray-text mt-4 max-w-2xl text-lg">
            Pay securely for your cab booking. 100% safe and encrypted transaction.
          </p>
        </Container>
      </div>
      <Container className="py-20">
        <div className="max-w-3xl mx-auto">
          <PayNowForm />
        </div>
      </Container>
    </div>
  );
}
