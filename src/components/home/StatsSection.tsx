"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../common/Container";
import { Users, ShieldCheck, Clock, Map } from "lucide-react";

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const stats = [
    { icon: Users, label: "Happy Customers", value: 99, suffix: "%" },
    { icon: ShieldCheck, label: "Experienced Drivers", value: 100, suffix: "%" },
    { icon: Clock, label: "Years of Experience", value: 10, suffix: "+" },
    { icon: Map, label: "Driving Completed", value: 700000, suffix: "+" },
  ];

  return (
    <section ref={sectionRef} className="py-16 neo-bg relative overflow-hidden">
      <Container className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#2d3748]">The Best Taxi Service In Delhi India</h2>
          <div className="w-24 h-1 bg-[#3f51b5] opacity-50 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 rounded-3xl neo-pressed flex flex-col items-center justify-center">
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#3f51b5]" />
              <div className="text-4xl md:text-5xl font-extrabold mb-2 flex justify-center items-baseline text-[#2d3748]">
                {isVisible ? <AnimatedCounter end={stat.value} duration={2000} /> : "0"}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <p className="text-[#718096] font-bold text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AnimatedCounter({ end, duration }: { end: number, duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration]);

  // Format large numbers with commas
  return <span>{count.toLocaleString('en-IN')}</span>;
}
