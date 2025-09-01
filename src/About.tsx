import React from "react";
import { Linkedin, Mail, CalendarDays, ExternalLink } from "lucide-react";
import arunPhoto from "./assets/arundesikan.jpg";

const CAL_LINK = "https://calendly.com/i-can-consultingservice/30min";
const EMAIL = "i.can.consultingservice@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/arundesikan/";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {/* Simple header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <a href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">I</div>
              <span className="font-semibold">I-CAN Consulting / Winnow Consulting</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/" className="hover:text-slate-900 text-slate-600">Home</a>
              <a href="/about" className="text-slate-900 font-medium">About</a>
              <a href={CAL_LINK} target="_blank" rel="noreferrer" className="hover:text-slate-900 text-slate-600">Book</a>
              <a href={`mailto:${EMAIL}`} className="hover:text-slate-900 text-slate-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Bio */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About Arun Desikan</h1>

  {/* Portrait */}
  <div className="mt-6 flex items-center gap-6">
    <img
      src={arunPhoto}
      alt="Arun Desikan"
      className="h-48 w-48 rounded-2xl object-cover border shadow-md"
    />
    <p className="text-lg text-slate-700 leading-relaxed">
      I bring over two decades of experience in <span className="font-medium">data and analytics</span>, 
      having worked across industries to design strategies that transform how organizations use data. 
      Alongside this professional journey, I’ve always carried a strong passion for mentoring — helping 
      early-career individuals navigate their growth and supporting experienced professionals as they 
      embrace the latest technologies.
    </p>
  </div>

  <div className="mt-8 space-y-6 text-slate-700 text-lg leading-relaxed">
    <p>
      I believe it is important to <span className="font-medium">pay it forward</span>. Many people 
      invested their time and knowledge into my journey, and today I strive to do the same — guiding 
      individuals and organizations to align with the fast-changing technology landscape.
    </p>

    <p>
      As a <span className="font-medium">Strategic Board Advisor</span>, I partner with startups to 
      craft scalable <span className="font-medium">data strategies</span> that support innovation and 
      measurable impact. I also work with experienced <span className="font-medium">SAP professionals</span>, 
      helping them identify opportunities to modernize their skillsets and advance their careers using 
      the latest data and analytics platforms.
    </p>

    <p>
      Whether it’s guiding someone through career decisions, discussing MBA options, preparing for 
      interviews, or helping organizations embrace next-gen analytics, my goal is the same: 
      to empower people to succeed while ensuring technology is leveraged for lasting growth.
    </p>
  </div>
</main>


      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-sm text-slate-600">
          © {new Date().getFullYear()} I-CAN Consulting / Winnow Consulting
        </div>
      </footer>
    </div>
  );
}
