import React, { useState, useEffect } from "react";
import {
  Check,
  CalendarDays,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  MessageCircle,
  X,
  Send,
} from "lucide-react";

import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";


// 🔗 Calendly link (live)
const CAL_LINK = "https://calendly.com/i-can-consultingservice/30min";
// ✉️ Formspree endpoint (live)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgvlypaq";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const SectionTitle = ({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) => (
  <div className="text-center mb-10">
    {kicker && (
      <p className="uppercase tracking-widest text-sm text-gray-500 mb-2">
        {kicker}
      </p>
    )}
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
      {title}
    </h2>
    {subtitle && <p className="mt-3 text-lg text-gray-600">{subtitle}</p>}
  </div>
);

// --- Lightweight in-site booking assistant (rule-based) ---
function ChatBot() {
  type Msg = { from: "bot" | "user"; text: string };
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I can help you book a free session or answer quick questions.",
    },
    { from: "bot", text: "Try: Book now · Availability · Topics · Contact" },
  ]);

  function sendBot(text: string) {
    setMessages((m) => [...m, { from: "bot", text }]);
  }
  function sendUser(text: string) {
    setMessages((m) => [...m, { from: "user", text }]);
  }

  function handleQuick(cmd: "book" | "availability" | "topics" | "contact") {
    switch (cmd) {
      case "book":
        sendUser("Book now");
        sendBot("Opening the booking page in a new tab… Select your topic in the form.");
        window.open(CAL_LINK, "_blank");
        break;
      case "availability":
        sendUser("Availability");
        sendBot(
          "I’m available Mon/Wed/Fri 6–8 PM and Weekends 2–4 PM (your local time). Use ‘Book now’ to pick a slot."
        );
        break;
      case "topics":
        sendUser("Topics");
        sendBot(
          "We can cover: Career Advice · MBA Options · Data Careers · Interview Prep · Other. You’ll choose in the booking form."
        );
        break;
      case "contact":
        sendUser("Contact");
        sendBot(
          "You can email i.can.consultingservice@gmail.com or use the contact form below."
        );
        break;
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    sendUser(text);
    setInput("");

    const lower = text.toLowerCase();
    if (/(book|schedule|slot)/.test(lower)) return handleQuick("book");
    if (/(avail|time|hours)/.test(lower)) return handleQuick("availability");
    if (/(topic|mba|career|data|interview)/.test(lower)) return handleQuick("topics");
    if (/(email|contact|reach)/.test(lower)) return handleQuick("contact");

    sendBot(
      "I can: ‘Book now’, show ‘Availability’, list ‘Topics’, or share ‘Contact’. Try a quick button below."
    );
  }

  return (
    <div>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-6 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg bg-slate-900 text-white hover:bg-slate-700"
          aria-label="Open booking assistant"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Chat for booking</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 left-6 w-[90vw] max-w-sm rounded-2xl border bg-white shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
            <div className="font-semibold">Booking Assistant</div>
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto p-4 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl ${
                    m.from === "user"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                onClick={() => handleQuick("book")}
                className="text-xs px-3 py-1 rounded-full border hover:bg-slate-50"
              >
                Book now
              </button>
              <button
                onClick={() => handleQuick("availability")}
                className="text-xs px-3 py-1 rounded-full border hover:bg-slate-50"
              >
                Availability
              </button>
              <button
                onClick={() => handleQuick("topics")}
                className="text-xs px-3 py-1 rounded-full border hover:bg-slate-50"
              >
                Topics
              </button>
              <button
                onClick={() => handleQuick("contact")}
                className="text-xs px-3 py-1 rounded-full border hover:bg-slate-50"
              >
                Contact
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about booking…"
              />
              <Button type="submit" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="mt-2 text-[11px] text-slate-500">
              Tip: I’m a simple helper—complex questions are best in a live session.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PayItForwardSite() {
  const [showScroll, setShowScroll] = useState(false);
  const [darkBackground, setDarkBackground] = useState(false);
  const [contactStatus, setContactStatus] =
    useState<"idle" | "sending" | "success" | "error">("idle");
  const [subscribeStatus, setSubscribeStatus] =
    useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setDarkBackground(footerTop < window.innerHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setContactStatus("sending");
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setContactStatus("success");
        form.reset();
      } else {
        setContactStatus("error");
      }
    } catch (err) {
      console.error(err);
      setContactStatus("error");
    }
  }

  async function handleSubscribeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setSubscribeStatus("sending");
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubscribeStatus("success");
        form.reset();
      } else {
        setSubscribeStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSubscribeStatus("error");
    }
  }

  return (
    <div className="relative min-h-screen text-slate-900">
  {/* Full-page inspirational background */}
  <div
    className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.92)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80')",
    }}
  />

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200/70">
        <Container>
          <div className="flex items-center justify-between py-3">
            <a href="#home" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">
                I
              </div>
              <span className="font-semibold">
                I-CAN Consulting 
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
	      <a href="/about" className="hover:text-slate-900 text-slate-600">
	        About
		</a>
              <a href="#topics" className="hover:text-slate-900 text-slate-600">
                Topics
              </a>
              <a href="#offer" className="hover:text-slate-900 text-slate-600">
                Offer
              </a>
              <a href="#book" className="hover:text-slate-900 text-slate-600">
                Book
              </a>
              <a href="#updates" className="hover:text-slate-900 text-slate-600">
                Updates
              </a>
              <a href="#faq" className="hover:text-slate-900 text-slate-600">
                FAQ
              </a>
              <a
                href="#contact"
                className="hover:text-slate-900 text-slate-600"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="#book" className="hidden sm:inline-block">
                <Button>
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Book a Free Session
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/arundesikan/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full hover:bg-slate-100"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:i.can.consultingservice@gmail.com"
                className="p-2 rounded-full hover:bg-slate-100"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </Container>
      </header>

      {/* BOOKING */}
      <section id="book" className="py-16 md:py-20 bg-slate-50">
        <Container>
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2">
              <SectionTitle
                kicker="Ready when you are"
                title="Book a free 1:1 session"
                subtitle="Slots open on weekends and select weekday evenings. No fees, ever."
              />
              <div className="flex flex-wrap gap-3">
                <a href={CAL_LINK} target="_blank" rel="noreferrer">
                  <Button className="rounded-2xl" >
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Open in Calendly
                  </Button>
                </a>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5" />
                  30–45 minute video call
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5" />
                  Action-oriented discussion with 2–3 next steps
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5" />
                  Follow-up resources if needed
                </li>
              </ul>

              {/* Availability note */}
              <div className="mt-6 p-4 rounded-2xl border bg-white text-sm text-slate-700">
                <p className="font-medium">Availability</p>
                <p>
                  Monday, Wednesday, Friday:{" "}
                  <span className="font-semibold">6–8 PM</span> · Weekends:{" "}
                  <span className="font-semibold">2–4 PM</span> (your local time).
                </p>
              </div>

              {/* Session focus note */}
              <div className="mt-4 p-4 rounded-2xl border bg-white text-sm text-slate-700">
                <p className="font-medium mb-2">What we can cover</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Career Advice</li>
                  <li>MBA Options</li>
                  <li>Data Careers</li>
                  <li>Interview Prep</li>
                  <li>Other (tell me on the form)</li>
                </ul>
                <p className="mt-2">
                  You’ll choose your topic in the booking questions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle>Schedule inline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl overflow-hidden border">
                    <iframe
                      title="Calendly Scheduling"
                      src={`${CAL_LINK}?hide_event_type_details=1&background_color=ffffff&text_color=0f172a&primary_color=0f172a`}
                      className="w-full h-[760px]"
                      frameBorder={0}
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    If the embed doesn’t load, use the button above to open Calendly in a new tab.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* CONTACT + SUBSCRIBE */}
      <section id="contact" className="py-16 md:py-20">
        <Container>
          <SectionTitle
            kicker="Stay connected"
            title="Contact & Subscribe"
            subtitle="Send a message or subscribe for updates. Both go to i.can.consultingservice@gmail.com via Formspree."
          />
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input name="name" placeholder="Your name" required />
                    <Input type="email" name="email" placeholder="Your email" required />
                  </div>
                  <Input name="subject" placeholder="Subject (optional)" />
                  <Textarea name="message" placeholder="Write your message..." rows={5} required />
                  <input type="hidden" name="_subject" value="New message from I-CAN" />
                  <div className="flex items-center gap-3">
                    <Button type="submit" className="rounded-2xl" disabled={contactStatus === "sending"}>
                      {contactStatus === "sending" ? "Sending..." : "Send"}
                    </Button>
                    {contactStatus === "success" && (
                      <span className="text-green-700 text-sm">Thanks! Your message was sent.</span>
                    )}
                    {contactStatus === "error" && (
                      <span className="text-red-700 text-sm">
                        Oops—couldn’t send. Try again or email i.can.consultingservice@gmail.com.
                      </span>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Subscribe for updates</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribeSubmit} className="space-y-3">
                  <Input name="name" placeholder="Your name (optional)" />
                  <Input type="email" name="email" placeholder="Your email" required />
                  <input type="hidden" name="_subject" value="New subscriber to I-CAN" />
                  <div className="flex items-center gap-3">
                    <Button type="submit" className="rounded-2xl" disabled={subscribeStatus === "sending"}>
                      {subscribeStatus === "sending" ? "Subscribing..." : "Subscribe"}
                    </Button>
                    {subscribeStatus === "success" && (
                      <span className="text-green-700 text-sm">You’re subscribed!</span>
                    )}
                    {subscribeStatus === "error" && (
                      <span className="text-red-700 text-sm">Couldn’t subscribe. Try again.</span>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-10 relative border-t">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>
              © {new Date().getFullYear()} I-CAN Consulting  • Pay it forward • Grow together.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:i.can.consultingservice@gmail.com"
                className="inline-flex items-center gap-2 hover:text-slate-900"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/arundesikan/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-slate-900"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-slate-900"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-slate-900"
              >
                <CalendarDays className="w-4 h-4" />
                Schedule <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </Container>

        {/* Back to Top */}
        {showScroll && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`${
              darkBackground
                ? "bg-white text-slate-900 hover:bg-slate-200"
                : "bg-slate-900 text-white hover:bg-slate-700"
            } fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg transition grid place-items-center font-bold text-lg`}
            aria-label="Back to top"
          >
            I
          </button>
        )}

        {/* Booking Assistant */}
        <ChatBot />
      </footer>
    </div>
  );
}
