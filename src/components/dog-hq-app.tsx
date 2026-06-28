"use client"

import type { FormEvent, ReactNode } from "react"
import { useState } from "react"
import {
  CalendarDays,
  ClipboardCopy,
  Globe2,
  Heart,
  Home,
  MapPin,
  Menu,
  PawPrint,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  Star,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"


type LogType = "Spacer" | "Jedzenie" | "Woda" | "Kupka" | "Lek" | "Nastrój" | "Trening"

type CareLog = {
  id: string
  type: LogType
  note: string
  time: string
}

type Reminder = {
  id: string
  title: string
  due: string
  category: "Szczepienie" | "Lek" | "Weterynarz" | "Pielęgnacja"
  done: boolean
}

type DogProfile = {
  name: string
  breed: string
  age: string
  weight: string
  vet: string
  emergency: string
  quirks: string
}

const today = new Date().toISOString().slice(0, 10)
const nowTime = () => new Date().toTimeString().slice(0, 5)

const defaultProfile: DogProfile = {
  name: "Luna",
  breed: "mieszaniec",
  age: "4 lata",
  weight: "18 kg",
  vet: "VetCare, tel. +48 000 000 000",
  emergency: "Konrad, +48 000 000 000",
  quirks: "Boi się burzy, nie lubi rowerów, kocha smaczki z kurczaka.",
}

const starterLogs: CareLog[] = [
  { id: "1", type: "Spacer", note: "Poranny spacer, 28 minut, spokojna kupa", time: `${today}T08:10` },
  { id: "2", type: "Jedzenie", note: "120 g karmy + suplement na stawy", time: `${today}T08:45` },
  { id: "3", type: "Lek", note: "Tabletka przeciwkleszczowa podana", time: `${today}T09:00` },
]

const starterReminders: Reminder[] = [
  { id: "r1", title: "Szczepienie przeciw wściekliźnie", due: "2026-07-12", category: "Szczepienie", done: false },
  { id: "r2", title: "Odkleszczanie / tabletka", due: "2026-06-30", category: "Lek", done: false },
  { id: "r3", title: "Kontrola wagi", due: "2026-07-02", category: "Weterynarz", done: false },
]

const logTypes: LogType[] = ["Spacer", "Jedzenie", "Woda", "Kupka", "Lek", "Nastrój", "Trening"]
const reminderCategories: Reminder["category"][] = ["Lek", "Szczepienie", "Weterynarz", "Pielęgnacja"]

const logTone: Record<LogType, string> = {
  Spacer: "border-[#0f766e]/15 bg-[#0f766e]/8 text-[#0f766e]",
  Jedzenie: "border-[#a16207]/15 bg-[#a16207]/8 text-[#a16207]",
  Woda: "border-[#2563eb]/15 bg-[#2563eb]/8 text-[#2563eb]",
  Kupka: "border-[#92400e]/15 bg-[#92400e]/8 text-[#92400e]",
  Lek: "border-[#ff385c]/18 bg-[#ff385c]/8 text-[#d31545]",
  Nastrój: "border-[#7c3aed]/15 bg-[#7c3aed]/8 text-[#6d28d9]",
  Trening: "border-[#15803d]/15 bg-[#15803d]/8 text-[#15803d]",
}

const reminderTone: Record<Reminder["category"], string> = {
  Lek: "border-[#ff385c]/18 bg-[#ff385c]/8 text-[#d31545]",
  Szczepienie: "border-[#2563eb]/15 bg-[#2563eb]/8 text-[#2563eb]",
  Weterynarz: "border-[#7c3aed]/15 bg-[#7c3aed]/8 text-[#6d28d9]",
  Pielęgnacja: "border-[#0f766e]/15 bg-[#0f766e]/8 text-[#0f766e]",
}

const stays = [
  {
    title: "Calm sitter in Mokotów",
    meta: "Home visits · 12 min away",
    price: "89 zł / visit",
    rating: "4.98",
    photo: "from-[#f7d8ce] via-[#f4c2b6] to-[#d59b87]",
    note: "Reactive-dog experience",
  },
  {
    title: "Forest daycare pack",
    meta: "Daycare · 3 open slots today",
    price: "129 zł / day",
    rating: "4.96",
    photo: "from-[#d8eadf] via-[#b7d8c0] to-[#7fa98e]",
    note: "Small groups only",
  },
  {
    title: "Vet nurse overnight",
    meta: "Boarding · medication trained",
    price: "220 zł / night",
    rating: "5.0",
    photo: "from-[#e8e2d7] via-[#cdbfae] to-[#95816f]",
    note: "Insured care",
  },
]

const careCategories = ["Boarding", "Daycare", "Walks", "Vet help", "Grooming", "Training"]

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const saved = window.localStorage.getItem(key)
    return saved ? (JSON.parse(saved) as T) : fallback
  } catch {
    return fallback
  }
}

function save<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function DogHqApp() {
  const [profile, setProfile] = useState<DogProfile>(() => load("doghq.profile", defaultProfile))
  const [logs, setLogs] = useState<CareLog[]>(() => load("doghq.logs", starterLogs))
  const [reminders, setReminders] = useState<Reminder[]>(() => load("doghq.reminders", starterReminders))
  const [logType, setLogType] = useState<LogType>("Spacer")
  const [logNote, setLogNote] = useState("")
  const [copied, setCopied] = useState(false)

  const addLog = (event: FormEvent) => {
    event.preventDefault()
    const next: CareLog = {
      id: crypto.randomUUID(),
      type: logType,
      note: logNote.trim() || "Odnotowano bez dodatkowej notatki",
      time: `${today}T${nowTime()}`,
    }
    const nextLogs = [next, ...logs]
    setLogs(nextLogs)
    save("doghq.logs", nextLogs)
    setLogNote("")
  }

  const updateProfile = (field: keyof DogProfile, value: string) => {
    const next = { ...profile, [field]: value }
    setProfile(next)
    save("doghq.profile", next)
  }

  const toggleReminder = (id: string) => {
    const next = reminders.map((reminder) => (reminder.id === id ? { ...reminder, done: !reminder.done } : reminder))
    setReminders(next)
    save("doghq.reminders", next)
  }

  const addReminder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const next: Reminder = {
      id: crypto.randomUUID(),
      title: String(form.get("title") || "Nowe przypomnienie"),
      due: String(form.get("due") || today),
      category: String(form.get("category") || "Weterynarz") as Reminder["category"],
      done: false,
    }
    const nextReminders = [...reminders, next]
    setReminders(nextReminders)
    save("doghq.reminders", nextReminders)
    event.currentTarget.reset()
  }

  const passport = `DOG HQ — PASZPORT PSA\n\nImię: ${profile.name}\nRasa: ${profile.breed}\nWiek: ${profile.age}\nWaga: ${profile.weight}\nWeterynarz: ${profile.vet}\nKontakt awaryjny: ${profile.emergency}\nZachowanie / triggery: ${profile.quirks}\n\nOstatnie logi:\n${logs
    .slice(0, 8)
    .map((log) => `- ${new Date(log.time).toLocaleString("pl-PL")} • ${log.type}: ${log.note}`)
    .join("\n")}`

  const copyPassport = async () => {
    await navigator.clipboard.writeText(passport)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="min-h-screen bg-[#ffffff] text-[#222222]">
      <header className="sticky top-0 z-30 border-b border-[#dddddd]/80 bg-white/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 w-[min(1180px,calc(100%-40px))] items-center justify-between gap-5">
          <a className="flex items-center gap-2 text-[#ff385c]" href="#top" aria-label="Dog HQ">
            <span className="grid size-9 place-items-center rounded-full bg-[#ff385c] text-white">
              <PawPrint className="size-5" />
            </span>
            <span className="text-xl font-bold tracking-[-0.03em] text-[#222222]">dog hq</span>
          </a>
          <div className="hidden items-center gap-9 text-sm font-semibold md:flex">
            <a className="border-b-2 border-[#222222] py-7" href="#top">Find care</a>
            <a className="py-7 text-[#717171] hover:text-[#222222]" href="#stays">Stays</a>
            <a className="py-7 text-[#717171] hover:text-[#222222]" href="#app">Care log</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden h-10 px-4 text-[#222222] hover:bg-[#f7f7f7] md:inline-flex">Become a sitter</Button>
            <Button variant="ghost" size="icon" className="bg-[#f7f7f7] text-[#222222] hover:bg-[#eeeeee]" aria-label="Language"><Globe2 className="size-4" /></Button>
            <Button variant="ghost" size="icon" className="bg-[#f7f7f7] text-[#222222] hover:bg-[#eeeeee]" aria-label="Menu"><Menu className="size-4" /></Button>
          </div>
        </nav>
      </header>

      <section id="top" className="mx-auto w-[min(1180px,calc(100%-40px))] pb-14 pt-11 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold text-[#717171]">Dog care, handed over clearly</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-7xl">
            Find trusted care for {profile.name}, then keep everyone in sync.
          </h1>
        </div>

        <div className="mx-auto mt-9 flex max-w-[920px] flex-col overflow-hidden rounded-[34px] border border-[#dddddd] bg-white shadow-[0_10px_32px_rgba(0,0,0,0.12)] md:h-[72px] md:flex-row md:items-center">
          <SearchField icon={<Home className="size-4" />} label="Care type" value="Boarding, walks, vet help" />
          <SearchField icon={<CalendarDays className="size-4" />} label="When" value="Today or this weekend" />
          <SearchField icon={<PawPrint className="size-4" />} label="Dog" value={`${profile.name} · ${profile.weight}`} />
          <SearchField icon={<MapPin className="size-4" />} label="Near" value="Warsaw" />
          <div className="p-3 md:pl-0">
            <Button className="h-12 w-full rounded-full border-[#ff385c] bg-[#ff385c] text-white hover:bg-[#e31c5f] md:w-12 md:px-0" aria-label="Search care">
              <Search className="size-5" />
              <span className="md:hidden">Search care</span>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
          {careCategories.map((category, index) => (
            <button
              key={category}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${index === 0 ? "border-[#222222] text-[#222222]" : "border-transparent text-[#717171] hover:border-[#dddddd] hover:text-[#222222]"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section id="stays" className="border-y border-[#dddddd]/80 bg-[#f7f7f7] py-12 md:py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.025em] md:text-3xl">Available around you</h2>
              <p className="mt-2 text-sm text-[#717171]">Concrete trust signals, distance, and care fit stay next to each option.</p>
            </div>
            <Button variant="outline" className="border-[#dddddd] bg-white text-[#222222] hover:bg-[#f7f7f7]">Show all</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {stays.map((stay) => (
              <article key={stay.title} className="group">
                <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br ${stay.photo}`}>
                  <button className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-[#222222] shadow-sm" aria-label="Save">
                    <Heart className="size-5" />
                  </button>
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#222222] shadow-sm">
                    {stay.note}
                  </div>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold leading-5 tracking-[-0.01em]">{stay.title}</h3>
                    <p className="mt-1 text-sm text-[#717171]">{stay.meta}</p>
                    <p className="mt-1 text-sm"><span className="font-semibold">{stay.price}</span></p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-[#222222]" />
                    {stay.rating}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-6 py-14 md:grid-cols-3 md:py-20">
        <FeatureCard icon={<Search className="size-5" />} title="Search first" description="Care type, date, dog details, and location are the first visible decisions." />
        <FeatureCard icon={<ShieldCheck className="size-5" />} title="Trust is specific" description="Ratings, distance, insurance, and medication experience replace vague reassurance." />
        <FeatureCard icon={<ClipboardCopy className="size-5" />} title="Handoff stays ready" description="Dog Passport and recent logs remain available after the booking-style entry point." />
      </section>

      <section id="app" className="bg-[#f7f7f7] py-14 md:py-20">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#717171]">Care workspace</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Keep the handoff useful after care is booked.</h2>
            </div>
            <Button variant="outline" onClick={copyPassport} className="border-[#dddddd] bg-white text-[#222222] hover:bg-[#f7f7f7]">
              <Share2 className="size-4" /> {copied ? "Copied" : "Copy Dog Passport"}
            </Button>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <Card className="border-[#dddddd] bg-white text-[#222222]">
              <CardHeader>
                <CardDescription className="text-[#717171]">Dog profile</CardDescription>
                <CardTitle className="text-3xl">{profile.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <ProfileField label="Imię" value={profile.name} onChange={(value) => updateProfile("name", value)} />
                  <ProfileField label="Rasa" value={profile.breed} onChange={(value) => updateProfile("breed", value)} />
                  <ProfileField label="Wiek" value={profile.age} onChange={(value) => updateProfile("age", value)} />
                  <ProfileField label="Waga" value={profile.weight} onChange={(value) => updateProfile("weight", value)} />
                </div>
                <ProfileField label="Weterynarz" value={profile.vet} onChange={(value) => updateProfile("vet", value)} />
                <ProfileField label="Kontakt awaryjny" value={profile.emergency} onChange={(value) => updateProfile("emergency", value)} />
                <label className="grid gap-2 text-xs font-semibold text-[#717171]">
                  Triggery, rutyna, uwagi
                  <Textarea className="border-[#dddddd] bg-white text-[#222222]" value={profile.quirks} onChange={(event) => updateProfile("quirks", event.target.value)} />
                </label>
              </CardContent>
            </Card>

            <Card className="border-[#dddddd] bg-white text-[#222222]">
              <CardHeader>
                <CardDescription className="text-[#717171]">Today log</CardDescription>
                <CardTitle className="text-3xl">Add a care event</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-3 md:grid-cols-[160px_1fr_auto]" onSubmit={addLog}>
                  <Select value={logType} onValueChange={(value) => setLogType(value as LogType)}>
                    <SelectTrigger className="border-[#dddddd] bg-white text-[#222222]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {logTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input className="border-[#dddddd] bg-white text-[#222222]" value={logNote} onChange={(event) => setLogNote(event.target.value)} placeholder="np. 25 min, kupa OK, lek podany" />
                  <Button type="submit" className="border-[#ff385c] bg-[#ff385c] text-white hover:bg-[#e31c5f]"><Plus className="size-4" /> Add</Button>
                </form>
                <div className="mt-6 overflow-hidden rounded-2xl border border-[#dddddd] bg-white">
                  {logs.slice(0, 6).map((log) => (
                    <article key={log.id} className="grid gap-2 border-b border-[#eeeeee] p-4 last:border-b-0 md:grid-cols-[104px_1fr_132px] md:items-center">
                      <Badge className={logTone[log.type]}>{log.type}</Badge>
                      <strong className="truncate text-sm font-medium text-[#222222]">{log.note}</strong>
                      <small className="text-xs text-[#717171]">{new Date(log.time).toLocaleString("pl-PL")}</small>
                    </article>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#dddddd] bg-white text-[#222222]">
              <CardHeader>
                <CardDescription className="text-[#717171]">Health queue</CardDescription>
                <CardTitle className="text-3xl">Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-3" onSubmit={addReminder}>
                  <Input className="border-[#dddddd] bg-white text-[#222222]" name="title" placeholder="np. odrobaczanie" required />
                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                    <Input className="border-[#dddddd] bg-white text-[#222222]" name="due" type="date" defaultValue={today} required />
                    <select name="category" defaultValue="Lek" className="h-10 rounded-full border border-[#dddddd] bg-white px-4 text-sm text-[#222222] outline-none focus-visible:border-[#ff385c] focus-visible:ring-[3px] focus-visible:ring-[#ff385c]/20">
                      {reminderCategories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                    <Button type="submit" size="icon" className="border-[#ff385c] bg-[#ff385c] text-white hover:bg-[#e31c5f]" aria-label="Dodaj przypomnienie"><Plus className="size-4" /></Button>
                  </div>
                </form>
                <div className="mt-6 grid gap-3">
                  {[...reminders].sort((a, b) => a.due.localeCompare(b.due)).map((reminder) => (
                    <button
                      key={reminder.id}
                      className={`grid w-full gap-2 rounded-2xl border border-[#dddddd] bg-white p-4 text-left transition hover:border-[#bbbbbb] md:grid-cols-[120px_1fr_auto] md:items-center ${reminder.done ? "opacity-50 line-through" : ""}`}
                      onClick={() => toggleReminder(reminder.id)}
                    >
                      <Badge className={reminderTone[reminder.category]}>{reminder.category}</Badge>
                      <strong className="text-sm font-medium text-[#222222]">{reminder.title}</strong>
                      <small className="text-xs text-[#717171]">{reminder.due}</small>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card id="passport" className="border-[#dddddd] bg-white text-[#222222] lg:col-span-1">
              <CardHeader>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <CardDescription className="text-[#717171]">Sitter handoff</CardDescription>
                    <CardTitle className="text-3xl">Dog Passport</CardTitle>
                  </div>
                  <Button variant="outline" onClick={copyPassport} className="border-[#dddddd] bg-white text-[#222222] hover:bg-[#f7f7f7]"><ClipboardCopy className="size-4" /> {copied ? "Copied" : "Copy"}</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="mb-5 bg-[#eeeeee]" />
                <pre className="overflow-auto rounded-2xl border border-[#dddddd] bg-[#f7f7f7] p-5 font-mono text-xs leading-6 text-[#222222] whitespace-pre-wrap">
                  {passport}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-8 py-10 text-sm text-[#717171] md:grid-cols-3">
        <FooterColumn title="Support" items={["Help center", "Safety plan", "Emergency contacts"]} />
        <FooterColumn title="Hosting" items={["Become a sitter", "Care standards", "Insurance basics"]} />
        <FooterColumn title="Dog HQ" items={["Product notes", "Dog Passport", "Privacy"]} />
      </footer>
    </main>
  )
}

function SearchField({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <button className="group flex min-h-[72px] flex-1 items-center gap-3 border-b border-[#eeeeee] px-6 text-left transition hover:bg-[#f7f7f7] md:border-b-0 md:border-r md:last:border-r-0">
      <span className="text-[#717171] group-hover:text-[#ff385c]">{icon}</span>
      <span className="grid min-w-0 gap-1">
        <span className="text-xs font-bold text-[#222222]">{label}</span>
        <span className="truncate text-sm text-[#717171]">{value}</span>
      </span>
    </button>
  )
}

function FeatureCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <Card className="border-[#dddddd] bg-white text-[#222222]">
      <CardHeader>
        <span className="mb-4 grid size-10 place-items-center rounded-full bg-[#f7f7f7] text-[#ff385c]">{icon}</span>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="leading-6 text-[#717171]">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-[#222222]">{title}</h3>
      <ul className="grid gap-2">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}

function ProfileField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-xs font-semibold text-[#717171]">
      {label}
      <Input className="border-[#dddddd] bg-white text-[#222222]" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}
