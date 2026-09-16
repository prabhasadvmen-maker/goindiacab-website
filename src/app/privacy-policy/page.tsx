import { Metadata } from "next";
import { siteConfig } from "@/src/config/site";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy | GoIndiaCab",
  alternates: { canonical: `${siteConfig.url}/privacy-policy` }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-light py-12 md:py-16 border-b border-border">
        <Container>
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-4">Privacy <span className="text-primary">Policy</span></h1>
        </Container>
      </div>

      <Container className="py-20 max-w-4xl">
        <div className="prose prose-lg max-w-none text-gray-text">
          <h2>1. Introduction</h2>
          <p>Welcome to <strong>Go India Cab</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
          
          <h2>2. The Data We Collect About You</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Financial Data</strong> includes bank account and payment card details (processed securely via our payment gateways).</li>
            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., booking a cab).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>

          <h2>5. Contact Details</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us at <strong>{siteConfig.email}</strong> or call us at <strong>{siteConfig.phone.support}</strong>.</p>
        </div>
      </Container>
    </div>
  );
}
