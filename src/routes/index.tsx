import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Phone, MessageCircle, MapPin, Star, Calendar as CalendarIcon,
  Sparkles, Quote, Clock, ShieldCheck, Award, Heart, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import logo from "@/assets/logo.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import svcScaling from "@/assets/service-scaling.jpg";
import svcBraces from "@/assets/service-braces.jpg";
import svcCrowns from "@/assets/service-crowns.jpg";
import svcDentures from "@/assets/service-dentures.jpg";
import svcSurgery from "@/assets/service-surgery.jpg";
import ba1b from "@/assets/ba-1-before.jpg";
import ba1a from "@/assets/ba-1-after.jpg";
import ba2b from "@/assets/ba-2-before.jpg";
import ba2a from "@/assets/ba-2-after.jpg";
import ba3b from "@/assets/ba-3-before.jpg";
import ba3a from "@/assets/ba-3-after.jpg";
import ba4b from "@/assets/ba-4-before.jpg";
import ba4a from "@/assets/ba-4-after.jpg";
import ba5b from "@/assets/ba-5-before.jpg";
import ba5a from "@/assets/ba-5-after.jpg";
import ba6b from "@/assets/ba-6-before.jpg";
import ba6a from "@/assets/ba-6-after.jpg";

export const Route = createFileRoute("/")({ component: Index });

const PHONE = "+60148280001";
const WA_URL = `https://wa.me/60148280001?text=${encodeURIComponent("Hi Dr. Pakaruddin, I'd like to book an appointment.")}`;
const MAPS_URL = "https://maps.google.com/?q=Klinik+Pergigian+Dr+Pakaruddin+Kuantan";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const services = [
  { title: "Clean, Fresh & Healthy Gums Again", sub: "Scaling & Polishing", img: svcScaling,
    desc: "Gentle removal of tartar and stains. Wake up to a fresher mouth and gums that finally feel calm." },
  { title: "Finally Smile Without Hiding", sub: "Braces / Orthodontics", img: svcBraces,
    desc: "Modern braces planned around your face and bite. A straight, confident smile — without the awkward years." },
  { title: "Eat Comfortably Again", sub: "Crowns & Bridges", img: svcCrowns,
    desc: "Custom porcelain crafted to feel like your own teeth. Bite, chew and laugh without holding back." },
  { title: "Restore Your Confidence", sub: "Partial & Full Dentures", img: svcDentures,
    desc: "Lifelike dentures designed for comfort and a natural look — so people see your smile, not the dentures." },
  { title: "Gentle Wisdom Tooth Care", sub: "Minor Oral Surgery", img: svcSurgery,
    desc: "Calm, precise wisdom tooth removal with proper after-care. Less swelling, less fear, faster healing." },
];

const beforeAfter = [
  { title: "Professional Teeth Whitening – Dramatic Results in Just One Session",
    desc: "Tired of yellow or stained teeth holding back your smile? This patient achieved noticeably brighter, whiter teeth after the very first whitening session. Safe, effective, and fast — professional teeth whitening can give you the confident, radiant smile you've always wanted. Ready for your transformation?",
    before: ba1b, after: ba1a, tag: "Whitening" },
  { title: "Brown Stain Removal & Deep Discoloration Treatment",
    desc: "Years of stubborn brown stains and discoloration can make you feel self-conscious about smiling. With advanced cleaning and polishing, we completely removed the stains and restored a natural, healthy white appearance. See how quickly your teeth can look fresh and vibrant again.",
    before: ba2b, after: ba2a, tag: "Stain Removal" },
  { title: "Gum Treatment & Healthier Smile Restoration",
    desc: "Inflamed gums and uneven teeth can affect both your oral health and confidence. After targeted gum treatment, this patient now enjoys healthy pink gums and a cleaner, more balanced smile. If you're hiding your smile due to gum issues, we can help you smile freely again.",
    before: ba3b, after: ba3a, tag: "Gum Care" },
  { title: "Brighter Smile Transformation with Professional Whitening",
    desc: "Dull, yellowish teeth making you hesitate before smiling? Professional whitening delivered a brighter, more youthful smile that looks completely natural. Thousands of patients regain their confidence every year with this simple treatment — your turn could be next.",
    before: ba4b, after: ba4a, tag: "Smile Makeover" },
  { title: "Damaged Tooth Restoration – Natural Looking Results",
    desc: "A single discolored or damaged tooth can ruin an otherwise beautiful smile. Using precise filling and restoration techniques, we repaired the tooth and blended it seamlessly with the rest of the smile. Small fixes like this can make a huge difference in how you look and feel every day.",
    before: ba5b, after: ba5a, tag: "Restoration" },
  { title: "Cavity Treatment & Full Tooth Restoration",
    desc: "Cavities and damaged teeth don't have to affect your smile or confidence. We successfully treated the cavity and restored the teeth with strong, natural-looking results. Now this patient can eat, speak, and smile without any worry. Don't let dental issues hold you back any longer.",
    before: ba6b, after: ba6a, tag: "Cavity Care" },
];

const reviews = [
  { name: "Ahmad Asyraf Adnan", text: "Been here since 2006. Excellent service. Mom did crowning, made to fit with perfection. Thank you!" },
  { name: "Naimah Abd Rahman", text: "The best dental treatment in Kuantan.. customer friendly, reasonable prices. 👍" },
  { name: "Anni Zai", text: "Very kind and experienced doctor. I suggest you must choose this klinik for the best teeth treatment." },
  { name: "Miss Lily", text: "Doc and staff are friendly and easy to deal with.. facilities are satisfactory.. will repeat again." },
  { name: "Deen Danish", text: "Experienced Doctor." },
  { name: "Trish Etrisyia", text: "So far, all good. The doctor has been very helpful." },
  { name: "Wan Askalani", text: "Customer-friendly clinic." },
  { name: "Rakiah Md Din", text: "Best service." },
];

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
      ))}
    </div>
  );
}

function Index() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [service, setService] = useState<string>("");
  const [phone, setPhone] = useState("");

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !date || !phone) {
      toast.error("Please fill in all fields to continue.");
      return;
    }
    const msg = `Hi Dr. Pakaruddin,%0A%0AI'd like to book an appointment.%0A• Service: ${service}%0A• Preferred date: ${format(date, "PPP")}%0A• My WhatsApp: ${phone}`;
    window.open(`https://wa.me/60148280001?text=${msg}`, "_blank");
    toast.success("Opening WhatsApp to confirm your appointment…");
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <Toaster />

      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo (left) */}
          <a href="#top" className="flex items-center gap-3 mr-4 md:mr-10 shrink-0">
            <img src={logo} alt="Dr Pakaruddin Dental Clinic" className="h-10 md:h-12 w-auto rounded" />
            <div className="hidden sm:block leading-tight">
              <div className="font-serif text-base md:text-lg">Dr Pakaruddin</div>
              <div className="text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase">Dental Clinic</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/80">
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#results" className="hover:text-gold transition-colors">Results</a>
            <a href="#reviews" className="hover:text-gold transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <a href="#book" className="hidden md:inline-flex">
              <Button className="bg-gold text-primary-foreground hover:opacity-90 rounded-full px-6">
                <CalendarIcon className="mr-2 h-4 w-4" /> Book Appointment
              </Button>
            </a>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-l border-border/40 w-[80%] sm:max-w-sm">
                <div className="flex items-center gap-3 mb-8 mt-2">
                  <img src={logo} alt="" className="h-10 w-auto rounded" />
                  <div className="leading-tight">
                    <div className="font-serif text-base">Dr Pakaruddin</div>
                    <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Dental Clinic</div>
                  </div>
                </div>
                <nav className="flex flex-col gap-1 text-base">
                  {[
                    { href: "#services", label: "Services" },
                    { href: "#results", label: "Before & After" },
                    { href: "#reviews", label: "Reviews" },
                    { href: "#contact", label: "Contact" },
                  ].map((item) => (
                    <SheetClose asChild key={item.href}>
                      <a href={item.href} className="py-3 px-2 border-b border-border/30 hover:text-gold transition-colors">
                        {item.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <SheetClose asChild>
                  <a href="#book" className="block mt-8">
                    <Button className="w-full bg-gold text-primary-foreground hover:opacity-90 rounded-full">
                      <CalendarIcon className="mr-2 h-4 w-4" /> Book Appointment
                    </Button>
                  </a>
                </SheetClose>
                <a href={WA_URL} target="_blank" rel="noreferrer" className="block mt-3">
                  <Button variant="outline" className="w-full rounded-full border-border/60">
                    <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
                  </Button>
                </a>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 gradient-radial" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pt-16 pb-20 md:pt-28 md:pb-32">
          <motion.div {...fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 backdrop-blur px-4 py-1.5 text-xs md:text-sm">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-foreground/90">Serving Kuantan since 2006</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight">
              Hiding your smile?<br />
              <span className="text-gold italic">Scared</span> of the pain?<br />
              We understand.
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <Stars />
              <span className="text-sm text-muted-foreground">5.0 · Google rated</span>
            </div>

            <p className="mt-5 text-base md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
              Experience dental care that feels safe, gentle, and premium —
              from a doctor who has quietly transformed thousands of smiles in Kuantan.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a href={WA_URL} target="_blank" rel="noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-gold text-primary-foreground hover:opacity-90 rounded-full px-8 h-14 text-base shadow-glow">
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat with Doctor
                </Button>
              </a>
              <a href="#book">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-base border-foreground/20 bg-card/40 hover:bg-card">
                  Book Appointment
                </Button>
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
              {[
                { n: "20+", l: "Years Practice" },
                { n: "5.0★", l: "Google Rating" },
                { n: "1000+", l: "Happy Smiles" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur p-4">
                  <div className="font-serif text-2xl md:text-3xl text-gold">{s.n}</div>
                  <div className="text-[11px] md:text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* DOCTOR AUTHORITY */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div {...fadeUp}>
            <div className="aspect-[4/5] rounded-3xl border border-border bg-card/60 shadow-premium overflow-hidden flex items-center justify-center text-center p-8">
              <div className="text-muted-foreground italic font-serif text-lg">
                [ Dr. Ahmad Pakaruddin B. Mohamad image ]
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp}>
            <span className="text-xs tracking-[0.3em] uppercase text-gold">Meet the Doctor</span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-tight">
              Dr. Ahmad Pakaruddin<br /> B. Mohamad
            </h2>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary/60 border border-border px-4 py-1.5 text-sm">
              <Award className="h-4 w-4 text-gold" /> 20+ Years Experience
            </div>

            <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif italic text-xl md:text-2xl text-foreground/90">
              <Quote className="h-6 w-6 text-gold mb-2" />
              "We treat patients, not just teeth."
            </blockquote>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { i: ShieldCheck, l: "Safe & Sterile" },
                { i: Heart, l: "Gentle Care" },
                { i: Clock, l: "By Appointment" },
              ].map(({ i: Icon, l }) => (
                <div key={l} className="rounded-xl border border-border bg-card/50 p-3">
                  <Icon className="h-5 w-5 text-gold mx-auto" />
                  <div className="text-xs text-muted-foreground mt-2">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 md:py-28 bg-card/30 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="text-xs tracking-[0.3em] uppercase text-gold">Our Services</span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">Care for every smile.</h2>
            <p className="mt-4 text-foreground/70">
              Honest treatment, calm rooms and modern technique — for the things that actually worry you.
            </p>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <motion.div key={s.sub} {...fadeUp} transition={{ ...fadeUp.transition, delay: idx * 0.06 }}>
                <Card className="group overflow-hidden bg-card border-border/60 shadow-premium h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={s.sub} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 text-[11px] tracking-[0.25em] uppercase text-gold/90">
                      {s.sub}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-serif text-xl leading-snug">{s.title}</h3>
                    <p className="mt-3 text-sm text-foreground/70 flex-1">{s.desc}</p>
                    <div className="mt-5 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-border bg-transparent hover:bg-secondary/60">
                        View more
                      </Button>
                      <a href="#book" className="flex-1">
                        <Button size="sm" className="w-full bg-gold text-primary-foreground hover:opacity-90">
                          Book
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="text-xs tracking-[0.3em] uppercase text-gold">Real Transformations</span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">Smiles, restored.</h2>
            <p className="mt-4 text-foreground/70">
              Real patients. Real results. Every transformation begins with one gentle conversation.
            </p>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-6 md:gap-8">
            {beforeAfter.map((b, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i % 2) * 0.08 }}>
                <Card className="overflow-hidden bg-card border-border/60 shadow-premium">
                  <div className="grid grid-cols-2 gap-px bg-border/60">
                    <div className="relative aspect-square bg-card">
                      <img src={b.before} alt={`${b.tag} before`} loading="lazy" className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-[10px] tracking-[0.25em] uppercase">Before</span>
                    </div>
                    <div className="relative aspect-square bg-card">
                      <img src={b.after} alt={`${b.tag} after`} loading="lazy" className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 rounded-full bg-gold text-primary-foreground px-3 py-1 text-[10px] tracking-[0.25em] uppercase">After</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-[11px] tracking-[0.25em] uppercase text-gold/90">{b.tag}</div>
                    <h3 className="mt-2 font-serif text-xl md:text-2xl leading-snug">{b.title}</h3>
                    <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{b.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 md:py-28 bg-card/30 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="text-xs tracking-[0.3em] uppercase text-gold">Patient Reviews</span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">Loved by Kuantan.</h2>
            <div className="mt-4 flex items-center gap-3">
              <Stars />
              <span className="text-foreground/80">5.0 average across Google reviews</span>
            </div>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleReviews.map((r, i) => (
              <motion.div key={r.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
                <Card className="bg-card border-border/60 p-6 h-full flex flex-col shadow-premium">
                  <Stars />
                  <p className="mt-4 text-sm text-foreground/80 leading-relaxed flex-1">"{r.text}"</p>
                  <div className="mt-5 pt-4 border-t border-border/60">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">Verified Google review</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" onClick={() => setShowAllReviews((v) => !v)}
              className="rounded-full border-gold/40 bg-transparent hover:bg-secondary/60 px-6">
              {showAllReviews ? "Show less" : "View more reviews"}
              <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform", showAllReviews && "rotate-180")} />
            </Button>
          </div>
        </div>
      </section>

      {/* APPOINTMENT FORM */}
      <section id="book" className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <span className="text-xs tracking-[0.3em] uppercase text-gold">Book a Visit</span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">Let's get you smiling again.</h2>
            <p className="mt-4 text-foreground/70">
              Doctor available daily by <span className="text-gold">APPOINTMENT ONLY</span> — so you get 100% focused care.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <Card className="mt-10 bg-card border-border shadow-premium p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-serif text-base">How can Dr. Pakaruddin help you today?</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="h-12 bg-background/60 border-border">
                      <SelectValue placeholder="Choose a service…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Braces / Orthodontics">Braces / Orthodontics</SelectItem>
                      <SelectItem value="Tooth Pain">Tooth Pain</SelectItem>
                      <SelectItem value="Scaling & Polishing">Scaling & Polishing</SelectItem>
                      <SelectItem value="General Checkup">General Checkup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-serif text-base">When would you like to visit?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn(
                        "w-full h-12 justify-start text-left font-normal bg-background/60 border-border",
                        !date && "text-muted-foreground"
                      )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate}
                        disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                        initialFocus className={cn("p-3 pointer-events-auto")} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="font-serif text-base">Your WhatsApp number for confirmation?</Label>
                  <Input type="tel" placeholder="e.g. 012-3456789" value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 bg-background/60 border-border" />
                </div>

                <Button type="submit" size="lg"
                  className="w-full h-14 bg-gold text-primary-foreground hover:opacity-90 text-base rounded-xl shadow-glow">
                  <MessageCircle className="mr-2 h-5 w-5" /> Send via WhatsApp
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  We'll confirm your slot personally — usually within the hour.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-12 w-auto rounded" />
              <div className="leading-tight">
                <div className="font-serif text-lg">Dr Pakaruddin</div>
                <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Dental Clinic</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-foreground/70 leading-relaxed">
              Premium, gentle dental care in the heart of Kuantan. Trusted by families since 2006.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg">Visit Us</h4>
            <div className="mt-4 flex items-start gap-3 text-sm text-foreground/80">
              <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <p>A5-1A Tingkat 1, Jalan Tun Sri Ismail 6,<br />
              Sri Dagangan Business Centre,<br /> 25000 Kuantan, Pahang.</p>
            </div>
            <div className="mt-4 flex items-start gap-3 text-sm text-foreground/80">
              <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <p>Mon – Sat · 11:00 AM – 4:00 PM<br />
              <span className="text-muted-foreground">By appointment only</span></p>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg">Get in Touch</h4>
            <div className="mt-4 space-y-3">
              <a href={`tel:${PHONE}`} className="flex items-center gap-3 text-sm hover:text-gold transition-colors">
                <Phone className="h-4 w-4 text-gold" /> {PHONE}
              </a>
              <a href={WA_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-gold transition-colors">
                <MessageCircle className="h-4 w-4 text-gold" /> WhatsApp Doctor
              </a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-gold transition-colors">
                <MapPin className="h-4 w-4 text-gold" /> Get Directions
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Klinik Pergigian Dr Pakaruddin · Kuantan, Pahang.
        </div>
      </footer>

      {/* STICKY MOBILE BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-xl">
        <div className="grid grid-cols-3">
          <a href={`tel:${PHONE}`} className="py-3 flex flex-col items-center gap-1 text-xs hover:bg-secondary/40 transition">
            <Phone className="h-5 w-5 text-gold" /> Call
          </a>
          <a href={WA_URL} target="_blank" rel="noreferrer"
            className="py-3 flex flex-col items-center gap-1 text-xs bg-gold text-primary-foreground font-medium">
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="py-3 flex flex-col items-center gap-1 text-xs hover:bg-secondary/40 transition">
            <MapPin className="h-5 w-5 text-gold" /> Directions
          </a>
        </div>
      </div>
    </div>
  );
}
