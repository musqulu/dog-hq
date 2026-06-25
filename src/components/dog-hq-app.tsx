"use client"

import { FormEvent, useMemo, useState } from "react"
import { CalendarDays, ClipboardCopy, HeartPulse, PawPrint, Pill, Plus, Share2, Sparkles } from "lucide-react"

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

  const todayLogs = useMemo(() => logs.filter((log) => log.time.startsWith(today)), [logs])
  const walkCount = todayLogs.filter((log) => log.type === "Spacer").length
  const medsDone = todayLogs.filter((log) => log.type === "Lek").length
  const nextReminder = [...reminders].filter((r) => !r.done).sort((a, b) => a.due.localeCompare(b.due))[0]

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
    const next = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, done: !reminder.done } : reminder
    )
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
    <main className="mx-auto w-[min(1180px,calc(100%-32px))] pb-20">
      <nav className="sticky top-4 z-20 mt-4 mb-12 flex items-center justify-between gap-4 rounded-full border bg-white/85 px-4 py-3 shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px] backdrop-blur md:top-5">
        <a className="inline-flex items-center gap-2 text-lg font-black tracking-tight" href="#top" aria-label="Dog HQ">
          <span className="grid size-9 place-items-center rounded-full bg-[#ff385c] text-white">
            <PawPrint className="size-5" />
          </span>
          Dog HQ
        </a>
        <div className="flex flex-wrap justify-end gap-1 text-sm font-bold text-muted-foreground">
          <Button variant="ghost" size="sm" asChild><a href="#app">MVP</a></Button>
          <Button variant="ghost" size="sm" asChild><a href="#passport">Paszport</a></Button>
          <Button variant="ghost" size="sm" asChild><a href="#research">Research</a></Button>
        </div>
      </nav>

      <section id="top" className="grid place-items-center py-14 text-center md:py-20">
        <Badge variant="coral" className="mb-5 gap-2 px-3 py-1">
          <Sparkles className="size-3.5" /> Next.js + shadcn/ui MVP
        </Badge>
        <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[#222] md:text-8xl">
          Jedno miejsce na opiekę, zdrowie i przekazywanie psa pod opiekę.
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
          Dog HQ pomaga rodzinie i opiekunom wiedzieć, czy pies był nakarmiony, wyspacerowany,
          dostał leki i co warto powiedzieć weterynarzowi albo behawioryście.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild><a href="#app">Otwórz demo MVP</a></Button>
          <Button size="lg" variant="outline" onClick={copyPassport}>
            <ClipboardCopy className="size-4" /> {copied ? "Skopiowano" : "Skopiuj paszport psa"}
          </Button>
        </div>
        <div className="mt-10 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
          <Metric label="Dzisiejsze logi" value={todayLogs.length.toString()} icon={<CalendarDays className="size-5" />} />
          <Metric label="Spacery" value={walkCount.toString()} icon={<PawPrint className="size-5" />} />
          <Metric label="Leki" value={medsDone.toString()} icon={<Pill className="size-5" />} />
          <Metric label="Następne" value={nextReminder ? nextReminder.due.slice(5) : "OK"} icon={<HeartPulse className="size-5" />} />
        </div>
      </section>

      <section id="research" className="grid gap-8 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start md:py-16">
        <div className="lg:sticky lg:top-28">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff385c]">Dlaczego to ma sens</p>
          <h2 className="max-w-2xl text-4xl font-black leading-none tracking-[-0.05em] md:text-5xl xl:text-6xl">
            Rynek jest pełen aplikacji do jednej rzeczy. Luka: koordynacja codziennej opieki.
          </h2>
        </div>
        <div className="grid gap-3">
          {[
            ["Codzienne logi", "Karma, woda, kupa, spacer, leki, nastrój — rzeczy, o które weterynarz realnie pyta."],
            ["Shared care", "Rodzina, partner, petsitter i dog walker potrzebują prostego statusu, nie kolejnego czatu."],
            ["Dog Passport", "Jedna kopiowalna karta psa: rutyna, kontakty, triggery, ostatnie objawy i instrukcje."],
          ].map(([title, description]) => (
            <Card key={title} className="shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px]">
              <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription className="text-base leading-7">{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="app" className="grid gap-4 py-8 lg:grid-cols-[1.05fr_1.35fr]">
        <Card className="shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px]">
          <CardHeader>
            <CardDescription className="font-black uppercase tracking-[0.18em] text-[#ff385c]">Profil</CardDescription>
            <CardTitle className="text-4xl">{profile.name}</CardTitle>
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
            <label className="grid gap-2 text-sm font-bold text-muted-foreground">
              Triggery, rutyna, uwagi
              <Textarea value={profile.quirks} onChange={(event) => updateProfile("quirks", event.target.value)} />
            </label>
          </CardContent>
        </Card>

        <Card className="shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px]">
          <CardHeader>
            <CardDescription className="font-black uppercase tracking-[0.18em] text-[#ff385c]">Dziennik</CardDescription>
            <CardTitle className="text-4xl">Dodaj szybki log</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 md:grid-cols-[160px_1fr_auto]" onSubmit={addLog}>
              <Select value={logType} onValueChange={(value) => setLogType(value as LogType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {logTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input value={logNote} onChange={(event) => setLogNote(event.target.value)} placeholder="np. 25 min, kupa OK, lek podany" />
              <Button type="submit" variant="coral"><Plus className="size-4" /> Dodaj</Button>
            </form>
            <div className="mt-6 grid gap-2">
              {logs.slice(0, 9).map((log) => (
                <article key={log.id} className="flex items-start gap-3 rounded-2xl bg-[#fff8f5] p-3">
                  <Badge variant="coral">{log.type}</Badge>
                  <div className="min-w-0">
                    <strong className="block text-sm md:text-base">{log.note}</strong>
                    <small className="text-muted-foreground">{new Date(log.time).toLocaleString("pl-PL")}</small>
                  </div>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px]">
          <CardHeader>
            <CardDescription className="font-black uppercase tracking-[0.18em] text-[#ff385c]">Zdrowie</CardDescription>
            <CardTitle className="text-4xl">Przypomnienia</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 md:grid-cols-[1fr_150px_170px_auto]" onSubmit={addReminder}>
              <Input name="title" placeholder="np. odrobaczanie" required />
              <Input name="due" type="date" defaultValue={today} required />
              <select name="category" defaultValue="Lek" className="h-10 rounded-2xl border bg-background px-3 text-sm shadow-xs">
                {reminderCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
              <Button type="submit" variant="coral" size="icon" aria-label="Dodaj przypomnienie"><Plus className="size-4" /></Button>
            </form>
            <div className="mt-6 grid gap-2">
              {[...reminders].sort((a, b) => a.due.localeCompare(b.due)).map((reminder) => (
                <button
                  key={reminder.id}
                  className={`grid w-full gap-2 rounded-2xl bg-[#fff8f5] p-3 text-left transition hover:bg-[#fff1ec] md:grid-cols-[120px_1fr_auto] md:items-center ${reminder.done ? "opacity-50 line-through" : ""}`}
                  onClick={() => toggleReminder(reminder.id)}
                >
                  <Badge variant="coral">{reminder.category}</Badge>
                  <strong>{reminder.title}</strong>
                  <small className="text-muted-foreground">{reminder.due}</small>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card id="passport" className="shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px] lg:col-span-2">
          <CardHeader>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <CardDescription className="font-black uppercase tracking-[0.18em] text-[#ff385c]">Opiekun / petsitter</CardDescription>
                <CardTitle className="text-4xl">Dog Passport</CardTitle>
              </div>
              <Button variant="outline" onClick={copyPassport}><Share2 className="size-4" /> {copied ? "Skopiowano" : "Kopiuj"}</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Separator className="mb-5" />
            <pre className="overflow-auto rounded-3xl bg-[#fff8f5] p-5 font-mono text-sm leading-6 text-[#2f2723] whitespace-pre-wrap">
              {passport}
            </pre>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function Metric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="gap-2 py-5 text-left shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px]">
      <CardContent className="flex items-start justify-between gap-3">
        <div>
          <strong className="block text-4xl font-black tracking-[-0.06em]">{value}</strong>
          <span className="text-sm font-bold text-muted-foreground">{label}</span>
        </div>
        <span className="grid size-10 place-items-center rounded-full bg-[#ff385c]/10 text-[#ff385c]">{icon}</span>
      </CardContent>
    </Card>
  )
}

function ProfileField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-muted-foreground">
      {label}
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}
