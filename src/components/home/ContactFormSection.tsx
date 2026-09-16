"use client";

import { useState } from "react";
import { Container } from "../common/Container";
import { SectionTitle } from "../common/SectionTitle";
import { Button } from "../common/Button";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { siteConfig } from "@/src/config/site";

export function ContactFormSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const name = (form.querySelector('#contact_name') as HTMLInputElement).value;
    const phone = (form.querySelector('#contact_phone') as HTMLInputElement).value;
    const email = (form.querySelector('#contact_email') as HTMLInputElement).value;
    const message = (form.querySelector('#contact_message') as HTMLTextAreaElement).value;

    const subject = encodeURIComponent(`New Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    setStatus('success');
    form.reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="py-20 neo-bg">
      <Container>
        <SectionTitle 
          title="Get in touch with Us!" 
          subtitle="Have a question or need to book a custom package? Fill out the form below and our team will get back to you promptly."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="neo-flat p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-[#2d3748] mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-12 h-12 neo-pressed rounded-full flex items-center justify-center shrink-0 mr-4">
                    <MapPin className="w-5 h-5 text-[#3f51b5]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#4a5568] block mb-1">Our Location</p>
                    <p className="text-[#718096] text-sm leading-relaxed font-medium">{siteConfig.address}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 neo-pressed rounded-full flex items-center justify-center shrink-0 mr-4">
                    <Phone className="w-5 h-5 text-[#3f51b5]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#4a5568] block mb-1">Phone Number</p>
                    <a href={`tel:${siteConfig.phone.booking1}`} className="text-[#718096] font-medium text-sm hover:text-[#3f51b5] transition block">{siteConfig.phone.booking1}</a>
                    <a href={`tel:${siteConfig.phone.booking2}`} className="text-[#718096] font-medium text-sm hover:text-[#3f51b5] transition block">{siteConfig.phone.booking2}</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 neo-pressed rounded-full flex items-center justify-center shrink-0 mr-4">
                    <Mail className="w-5 h-5 text-[#3f51b5]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#4a5568] block mb-1">Email Address</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-[#718096] font-medium text-sm hover:text-[#3f51b5] transition block">{siteConfig.email}</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="neo-flat p-8 md:p-10 rounded-3xl h-full border-[6px] border-[#e0e5ec]">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12 h-full">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-[#2d3748] mb-2">Message Sent!</h3>
                  <p className="text-[#718096] font-medium">Thank you for contacting us. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact_name" className="block text-sm font-bold text-[#4a5568] mb-2">Full Name *</label>
                      <input type="text" id="contact_name" required className="w-full px-5 py-3.5 rounded-xl border-none focus:outline-none neo-pressed text-[#4a5568] placeholder-gray-400 font-medium transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="contact_phone" className="block text-sm font-bold text-[#4a5568] mb-2">Phone Number *</label>
                      <input type="tel" id="contact_phone" required pattern="[0-9]{10}" className="w-full px-5 py-3.5 rounded-xl border-none focus:outline-none neo-pressed text-[#4a5568] placeholder-gray-400 font-medium transition-all" placeholder="9876543210" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="contact_email" className="block text-sm font-bold text-[#4a5568] mb-2">Email Address</label>
                    <input type="email" id="contact_email" className="w-full px-5 py-3.5 rounded-xl border-none focus:outline-none neo-pressed text-[#4a5568] placeholder-gray-400 font-medium transition-all" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label htmlFor="contact_message" className="block text-sm font-bold text-[#4a5568] mb-2">Your Message *</label>
                    <textarea id="contact_message" required rows={4} className="w-full px-5 py-3.5 rounded-xl border-none focus:outline-none neo-pressed text-[#4a5568] placeholder-gray-400 font-medium transition-all resize-none" placeholder="How can we help you?"></textarea>
                  </div>

                  <button type="submit" className="w-full md:w-auto px-10 py-4 rounded-xl font-bold text-[#3f51b5] neo-button mt-4" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
