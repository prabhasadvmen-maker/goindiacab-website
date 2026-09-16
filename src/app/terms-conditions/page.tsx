import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms & Conditions | GoIndiaCab",
  alternates: { canonical: `${siteConfig.url}/terms-conditions` }
};

export default function TermsConditionsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Terms & Conditions" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">Terms & <span className="text-primary">Conditions</span></h1>
        </Container>
      </div>

      <Container className="py-20 max-w-4xl">
        <div className="prose prose-lg max-w-none text-gray-text">
          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using the <strong>Go India Cab</strong> website (the &quot;Site&quot;) and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.</p>
          
          <h2>2. Booking and Payments</h2>
          <ul>
            <li>All bookings are subject to vehicle availability.</li>
            <li>The estimated fare provided at the time of booking is indicative. Actual fare may vary based on route changes, waiting time, or tolls/taxes.</li>
            <li>Advance payment may be required for outstation and tour package bookings to confirm the reservation.</li>
            <li>Toll taxes, parking fees, and state entry taxes (for outstation trips) are generally not included in the base fare unless explicitly stated.</li>
          </ul>

          <h2>3. Cancellation and Refund Policy</h2>
          <p>Cancellations made 24 hours prior to the scheduled pickup time will be eligible for a full refund (minus payment gateway charges). Cancellations made within 24 hours may incur a cancellation fee. Refunds will be processed within 5-7 business days.</p>

          <h2>4. Passenger Responsibilities</h2>
          <p>Passengers are expected to maintain the cleanliness of the vehicle. Any damage caused to the vehicle by the passenger will be charged to the passenger. Consumption of alcohol and smoking inside the vehicle is strictly prohibited by law.</p>

          <h2>5. Limitation of Liability</h2>
          <p>Go India Cab shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of the services or any delay in services due to traffic, weather, or mechanical breakdown.</p>
          
          <h2>6. Modifications to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will always post the most current version on our website. By continuing to use the services after changes become effective, you agree to be bound by the revised terms.</p>
        </div>
      </Container>
    </div>
  );
}
