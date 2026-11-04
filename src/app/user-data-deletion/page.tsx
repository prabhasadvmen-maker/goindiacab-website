"use client";

import { useState } from "react";
import { Container } from "@/src/components/common/Container";
import { Breadcrumb } from "@/src/components/common/Breadcrumb";
import { siteConfig } from "@/src/config/site";

export default function UserDataDeletionPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 py-12 md:py-16 border-b border-gray-200">
        <Container>
          <Breadcrumb items={[{ label: "User Data Deletion" }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            User Data <span className="text-[#00A5D9]">Deletion Request</span>
          </h1>
          <p className="text-gray-500 mt-3 text-base max-w-2xl">
            You have the right to request deletion of your personal data from our systems. Fill the form below and we will process your request within 7 business days.
          </p>
        </Container>
      </div>

      <Container className="py-16 max-w-3xl">
        {submitted ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted</h2>
            <p className="text-gray-500">We have received your data deletion request. Our team will process it within <strong>7 business days</strong> and notify you at <strong>{form.email}</strong>.</p>
          </div>
        ) : (
          <div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-sm text-yellow-800">
              ⚠️ <strong>Please note:</strong> Deleting your data will permanently remove your account, booking history, and all associated information. This action cannot be undone.
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#00A5D9] focus:ring-1 focus:ring-[#00A5D9]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  placeholder="Enter your registered email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#00A5D9] focus:ring-1 focus:ring-[#00A5D9]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your registered phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#00A5D9] focus:ring-1 focus:ring-[#00A5D9]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reason for Deletion <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea
                  rows={4}
                  placeholder="Tell us why you want to delete your data..."
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#00A5D9] focus:ring-1 focus:ring-[#00A5D9] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Deletion Request"}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-200 text-sm text-gray-500 space-y-2">
              <p>For any queries, contact us at <a href={`mailto:${siteConfig.email}`} className="text-[#00A5D9] font-semibold">{siteConfig.email}</a></p>
              <p>Or call us at <a href={`tel:${siteConfig.phone.support}`} className="text-[#00A5D9] font-semibold">{siteConfig.phone.support}</a></p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
