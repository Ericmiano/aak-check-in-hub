import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Mail,
  Phone,
  QrCode,
  ScanLine,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import aakLogo from "@/assets/aak-logo.png.asset.json";
import conventionMark from "@/assets/convention-mark.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AAK Convention Check-In" },
      {
        name: "description",
        content: "AAK Convention staff registration, badge lookup, and attendee check-in prototype.",
      },
      { property: "og:title", content: "AAK Convention Check-In" },
      {
        property: "og:description",
        content: "A clear, fast check-in experience for AAK Convention staff.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type View = "register" | "scan" | "overview";
type ScanState = "ready" | "scanning" | "success" | "error";

const attendees = [
  { name: "Amina Njoroge", organization: "Studio Twenty Seven", badge: "AAK-2048", time: "10:24" },
  { name: "David Ochieng", organization: "Urban Form Africa", badge: "AAK-2047", time: "10:22" },
  { name: "Wanjiku Maina", organization: "County Works Office", badge: "AAK-2046", time: "10:19" },
];

function Index() {
  const [view, setView] = useState<View>("register");
  const [scanState, setScanState] = useState<ScanState>("ready");
  const [lookup, setLookup] = useState("");
  const [showLookup, setShowLookup] = useState(false);
  const [registered, setRegistered] = useState(1248);
  const [checkedIn, setCheckedIn] = useState(1048);
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "" });
  const [formError, setFormError] = useState("");
  const [badgeName, setBadgeName] = useState("");

  const attendanceRate = useMemo(() => Math.round((checkedIn / registered) * 100), [checkedIn, registered]);

  function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.organization.trim()) {
      setFormError("Please complete the name, email, and organization fields.");
      return;
    }
    setFormError("");
    setBadgeName(form.name.trim());
    setRegistered((value) => value + 1);
  }

  function startScan() {
    setScanState("scanning");
    window.setTimeout(() => {
      setScanState("success");
      setCheckedIn((value) => value + 1);
    }, 900);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-3 py-3 sm:px-6 sm:py-6 lg:justify-center">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
          <header className="flex min-h-24 items-center justify-between gap-4 bg-brand-dark px-4 py-4 sm:px-7">
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
              <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md bg-brand-light p-1.5 sm:h-16 sm:w-24">
                <img src={aakLogo.url} alt="Architectural Association of Kenya" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 border-l border-brand-light/25 pl-3 sm:pl-5">
                <h1 className="font-display text-lg font-semibold text-brand-light sm:text-2xl">Convention Check-In</h1>
                <p className="mt-0.5 truncate text-xs text-brand-muted sm:text-sm">Staff operations · 16–19 September 2026</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden text-right md:block">
                <p className="text-xs font-semibold uppercase text-brand-muted">Annual Convention</p>
                <p className="text-sm text-brand-light">Diani, Kenya</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-brand-light p-2 sm:h-16 sm:w-16">
                <img src={conventionMark.url} alt="AAK Annual Convention mark" className="h-full w-full object-contain" />
              </div>
            </div>
          </header>

          <nav aria-label="Check-in sections" className="grid grid-cols-3 border-b border-border bg-secondary px-1 sm:px-5">
            <Tab active={view === "register"} onClick={() => setView("register")} icon={<UserPlus />} label="Register" />
            <Tab active={view === "scan"} onClick={() => setView("scan")} icon={<ScanLine />} label="Check-in" />
            <Tab active={view === "overview"} onClick={() => setView("overview")} icon={<BarChart3 />} label="Overview" />
          </nav>

          {view === "register" && (
            <div className="grid lg:grid-cols-[1fr_340px]">
              <section className="p-5 sm:p-8 lg:border-r lg:border-border">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-primary">Registration desk</p>
                    <h2 className="font-display text-2xl font-semibold">New delegate</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Enter attendee details to create their convention badge.</p>
                  </div>
                  <span className="hidden items-center gap-1.5 text-xs font-medium text-success sm:flex"><span className="h-2 w-2 rounded-full bg-success" />System ready</span>
                </div>

                {badgeName ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2 py-4">
                    <div className="border-l-4 border-success bg-success-soft p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-success" />
                        <div>
                          <h3 className="font-display text-xl font-semibold">Badge created</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{badgeName} is registered and ready to check in.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex min-h-52 items-center justify-between gap-6 border border-border bg-brand-light p-5 sm:p-7">
                      <div>
                        <p className="text-xs font-bold uppercase text-primary">AAK Convention 2026</p>
                        <p className="mt-4 font-display text-2xl font-semibold">{badgeName}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{form.organization}</p>
                        <p className="mt-5 font-mono text-xs text-muted-foreground">AAK-{registered}</p>
                      </div>
                      <QrCode className="size-24 shrink-0 text-brand-dark sm:size-32" strokeWidth={1.25} />
                    </div>
                    <Button className="mt-5 h-12" onClick={() => { setBadgeName(""); setForm({ name: "", email: "", phone: "", organization: "" }); }}>
                      Register another delegate
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={submitRegistration} noValidate className="space-y-5">
                    <Field label="Full name" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="e.g. Arch. Jane Kamau" />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Email address" required type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder="jane@firm.com" />
                      <Field label="Phone number" type="tel" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} placeholder="+254 7xx xxx xxx" />
                    </div>
                    <Field label="Organization / firm" required value={form.organization} onChange={(value) => setForm({ ...form, organization: value })} placeholder="Company or institution" />
                    {formError && <p role="alert" className="flex items-center gap-2 text-sm font-medium text-destructive"><CircleAlert className="size-4" />{formError}</p>}
                    <Button type="submit" className="h-12 w-full text-base">Create delegate badge <ArrowRight /></Button>
                  </form>
                )}
              </section>

              <aside className="bg-secondary/70 p-5 sm:p-8">
                <p className="section-label">Today at a glance</p>
                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
                  <Stat value={checkedIn.toLocaleString()} label="Delegates checked in" icon={<Users />} />
                  <Stat value={`${attendanceRate}%`} label="Attendance rate" icon={<BarChart3 />} accent />
                </div>
                <div className="mt-8 border-t border-border pt-7">
                  <p className="section-label">Quick badge lookup</p>
                  <label htmlFor="quick-search" className="sr-only">Badge ID or attendee name</label>
                  <div className="relative mt-4">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input id="quick-search" value={lookup} onChange={(event) => { setLookup(event.target.value); setShowLookup(false); }} placeholder="Badge ID or name" className="input-control pl-10" />
                  </div>
                  <Button variant="outline" className="mt-3 h-11 w-full" onClick={() => setShowLookup(Boolean(lookup.trim()))}>Search badge</Button>
                  {showLookup && (
                    <button onClick={() => setView("scan")} className="mt-3 flex w-full items-center justify-between border border-border bg-card p-3 text-left transition-colors hover:border-primary" type="button">
                      <span><span className="block text-sm font-semibold">Amina Njoroge</span><span className="text-xs text-muted-foreground">AAK-2048 · Not checked in</span></span>
                      <ChevronRight className="size-4 text-primary" />
                    </button>
                  )}
                </div>
              </aside>
            </div>
          )}

          {view === "scan" && (
            <div className="grid lg:grid-cols-[1fr_340px]">
              <section className="p-5 sm:p-8 lg:border-r lg:border-border">
                <p className="mb-1 text-xs font-bold uppercase text-primary">Arrival desk</p>
                <h2 className="font-display text-2xl font-semibold">Scan delegate badge</h2>
                <p className="mt-1 text-sm text-muted-foreground">Position the badge QR code inside the guide.</p>
                <div className="relative mt-6 flex aspect-[16/9] min-h-64 items-center justify-center overflow-hidden bg-brand-dark">
                  <div className={`scanner-frame ${scanState === "scanning" ? "is-scanning" : ""}`}>
                    <QrCode className="size-20 text-brand-muted/40" strokeWidth={1} />
                  </div>
                  {scanState === "scanning" && <div className="scan-line" />}
                  {scanState === "success" && <div className="absolute inset-0 flex flex-col items-center justify-center bg-success/95 text-brand-light"><CheckCircle2 className="size-14" /><p className="mt-3 font-display text-2xl font-semibold">Check-in confirmed</p><p className="text-sm">Amina Njoroge · AAK-2048</p></div>}
                  {scanState === "error" && <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/95 text-brand-light"><CircleAlert className="size-14" /><p className="mt-3 font-display text-2xl font-semibold">Badge not found</p><p className="text-sm">Try scanning again or search manually.</p></div>}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button className="h-11 flex-1" onClick={startScan} disabled={scanState === "scanning"}><ScanLine />{scanState === "scanning" ? "Scanning…" : "Start scanner"}</Button>
                  <Button variant="outline" className="h-11" onClick={() => setScanState("error")}>Test unreadable badge</Button>
                  {scanState !== "ready" && <Button variant="ghost" className="h-11" onClick={() => setScanState("ready")}>Reset</Button>}
                </div>
              </section>
              <aside className="bg-secondary/70 p-5 sm:p-8">
                <p className="section-label">Manual check-in</p>
                <p className="mt-2 text-sm text-muted-foreground">Use when a badge is damaged or unavailable.</p>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input aria-label="Search attendees" placeholder="Name, email, or badge ID" className="input-control pl-10" />
                </div>
                <Button variant="outline" className="mt-3 h-11 w-full">Find attendee</Button>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="section-label">Scanner status</p>
                  <p className="mt-3 flex items-center gap-2 text-sm font-medium"><span className="h-2 w-2 rounded-full bg-success" />Camera ready</p>
                  <p className="mt-2 text-xs text-muted-foreground">Station 01 · Main reception</p>
                </div>
              </aside>
            </div>
          )}

          {view === "overview" && (
            <section className="p-5 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div><p className="mb-1 text-xs font-bold uppercase text-primary">Live attendance</p><h2 className="font-display text-2xl font-semibold">Convention overview</h2><p className="mt-1 text-sm text-muted-foreground">Updated moments ago from the main reception desk.</p></div>
                <span className="flex items-center gap-2 text-xs font-medium text-success"><span className="h-2 w-2 rounded-full bg-success" />Live tracking</span>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <Stat value={registered.toLocaleString()} label="Registered" icon={<Users />} />
                <Stat value={checkedIn.toLocaleString()} label="Checked in" icon={<CheckCircle2 />} accent />
                <Stat value={(registered - checkedIn).toLocaleString()} label="Expected" icon={<Clock3 />} />
              </div>
              <div className="mt-8 overflow-hidden border border-border">
                <div className="flex items-center justify-between bg-secondary px-4 py-3 sm:px-5"><h3 className="font-display font-semibold">Recent arrivals</h3><span className="text-xs text-muted-foreground">Today</span></div>
                <div className="divide-y divide-border">
                  {attendees.map((attendee) => <div key={attendee.badge} className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 sm:grid-cols-[1.2fr_1fr_auto] sm:px-5"><div><p className="font-semibold">{attendee.name}</p><p className="text-xs text-muted-foreground sm:hidden">{attendee.organization}</p></div><p className="hidden text-sm text-muted-foreground sm:block">{attendee.organization}</p><div className="text-right"><p className="text-sm font-medium text-success">Checked in</p><p className="text-xs text-muted-foreground">{attendee.time}</p></div></div>)}
                </div>
              </div>
            </section>
          )}
        </div>
        <footer className="flex flex-col items-center justify-between gap-2 px-2 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <span>Architectural Association of Kenya · Convention Check-In</span><span>Visual prototype · Sample data</span>
        </footer>
      </div>
    </main>
  );
}

function Tab({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return <button type="button" onClick={onClick} aria-current={active ? "page" : undefined} className={`flex min-h-14 items-center justify-center gap-2 border-b-2 px-2 text-xs font-semibold transition-colors sm:px-6 sm:text-sm ${active ? "border-primary bg-card text-primary" : "border-transparent text-muted-foreground hover:bg-card/60 hover:text-foreground"}`}><span className="[&_svg]:size-4">{icon}</span><span>{label}</span></button>;
}

function Field({ label, required, type = "text", value, onChange, placeholder }: { label: string; required?: boolean; type?: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  const id = label.toLowerCase().replaceAll(" ", "-").replace("/", "-");
  return <div><label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase text-muted-foreground">{label}{required && <span className="ml-1 text-primary">*</span>}</label><input id={id} type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="input-control" /></div>;
}

function Stat({ value, label, icon, accent = false }: { value: string; label: string; icon: React.ReactNode; accent?: boolean }) {
  return <div className={`flex min-h-24 items-center justify-between border p-4 ${accent ? "border-primary bg-primary-soft" : "border-border bg-card"}`}><div><p className={`font-display text-3xl font-semibold ${accent ? "text-primary" : "text-foreground"}`}>{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div><span className={`[&_svg]:size-6 ${accent ? "text-primary" : "text-muted-foreground"}`}>{icon}</span></div>;
}