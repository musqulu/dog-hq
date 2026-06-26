"use client"

import type { FormEvent } from "react"
import { useMemo, useState } from "react"
import { Activity, ClipboardCopy, HeartPulse, PawPrint, Plus, Share2, ShieldCheck, Stethoscope } from "lucide-react"

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
  Spacer: "border-[#83dcdc]/20 bg-[#83dcdc]/10 text-[#83dcdc]",
  Jedzenie: "border-[#ffdf9f]/20 bg-[#ffdf9f]/10 text-[#ffdf9f]",
  Woda: "border-[#8fa6ff]/20 bg-[#8fa6ff]/10 text-[#8fa6ff]",
  Kupka: "border-[#f7bf8b]/20 bg-[#f7bf8b]/10 text-[#f7bf8b]",
  Lek: "border-[#f79ce0]/20 bg-[#f79ce0]/10 text-[#f79ce0]",
  Nastrój: "border-[#ff7a5c]/20 bg-[#ff7a5c]/10 text-[#ff9b82]",
  Trening: "border-[#27a644]/20 bg-[#27a644]/10 text-[#55d477]",
}

const reminderTone: Record<Reminder["category"], string> = {
  Lek: "border-[#f79ce0]/20 bg-[#f79ce0]/10 text-[#f79ce0]",
  Szczepienie: "border-[#8fa6ff]/20 bg-[#8fa6ff]/10 text-[#8fa6ff]",
  Weterynarz: "border-[#ff7a5c]/20 bg-[#ff7a5c]/10 text-[#ff9b82]",
  Pielęgnacja: "border-[#83dcdc]/20 bg-[#83dcdc]/10 text-[#83dcdc]",
}

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
    <main className="mx-auto w-[min(1198px,calc(100%-32px))] pb-24 text-[#f7f8f8]">
      <nav className="sticky top-4 z-20 mt-4 mb-20 flex h-16 items-center justify-between gap-4 rounded-full border border-white/[0.08] bg-[#08090a]/80 px-3 backdrop-blur-xl md:px-5">
        <a className="inline-flex items-center gap-3 text-sm font-semibold tracking-tight" href="#top" aria-label="Dog HQ">
          <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-[#ff9b82]">
            <PawPrint className="size-4" />
          </span>
          Dog HQ
        </a>
        <div className="flex flex-wrap justify-end gap-1 text-sm font-medium text-muted-foreground">
          <Button variant="ghost" size="sm" asChild><a href="#app">System</a></Button>
          <Button variant="ghost" size="sm" asChild><a href="#passport">Paszport</a></Button>
          <Button variant="ghost" size="sm" asChild><a href="#research">Dlaczego</a></Button>
        </div>
      </nav>

      <section id="top" className="grid gap-12 py-10 md:py-20">
        <div className="max-w-5xl">
          <Badge variant="secondary" className="mb-6 gap-2 px-3 py-1 font-mono uppercase tracking-[0.12em]">
            Linear-inspired Dog HQ MVP
          </Badge>
          <h1 className="max-w-5xl text-balance text-6xl font-semibold leading-none tracking-[-0.06em] text-[#f7f8f8] md:text-8xl">
            The care system for your dog and everyone who helps.
          </h1>
          <p className="mt-7 max-w-[420px] text-pretty text-[15px] leading-6 tracking-[-0.011em] text-[#8a8f98] md:text-base">
            Daily care, medication, walks, health notes, and sitter handoffs in one operational surface — not another chat thread.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild><a href="#app">Open product surface</a></Button>
            <Button size="lg" variant="outline" onClick={copyPassport}>
              <ClipboardCopy className="size-4" /> {copied ? "Copied" : "Copy Dog Passport"}
            </Button>
          </div>
        </div>

        <ProductSurface
          profile={profile}
          logs={logs}
          reminders={reminders}
          todayLogs={todayLogs.length}
          walkCount={walkCount}
          medsDone={medsDone}
          nextReminder={nextReminder?.due.slice(5) || "OK"}
        />
      </section>

      <section id="research" className="grid gap-8 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#62666d]">Why it works</p>
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-6xl">
            Product proof first. Warmth only where it carries meaning.
          </h2>
        </div>
        <div className="grid gap-3">
          {[
            ["Daily command center", "Food, water, poop, walks, meds, and mood are logged as operational rows — the exact facts a vet or sitter asks for."],
            ["Shared care", "Family, partner, petsitter, and dog walker see next actions and last events without scrolling through messages."],
            ["Dog Passport", "One copyable care profile: routine, contacts, triggers, recent symptoms, and handoff instructions."],
          ].map(([title, description], index) => (
            <Card key={title} className="bg-white/[0.025]">
              <CardHeader className="grid gap-3 md:grid-cols-[96px_1fr] md:items-start">
                <Badge variant="secondary" className="w-fit font-mono">FIG 0.{index + 1}</Badge>
                <div>
                  <CardTitle className="text-2xl">{title}</CardTitle>
                  <CardDescription className="mt-2 max-w-xl text-[15px] leading-6">{description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="app" className="grid gap-4 py-8 lg:grid-cols-[0.9fr_1.4fr]">
        <Card className="bg-[#0f1011]">
          <CardHeader>
            <CardDescription className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#62666d]">Profile</CardDescription>
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
            <label className="grid gap-2 text-xs font-medium text-muted-foreground">
              Triggery, rutyna, uwagi
              <Textarea value={profile.quirks} onChange={(event) => updateProfile("quirks", event.target.value)} />
            </label>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1011]">
          <CardHeader>
            <CardDescription className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#62666d]">Today log</CardDescription>
            <CardTitle className="text-3xl">Add a care event</CardTitle>
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
              <Button type="submit" variant="coral"><Plus className="size-4" /> Add</Button>
            </form>
            <div className="mt-6 grid overflow-hidden rounded-xl border border-white/[0.08]">
              {logs.slice(0, 9).map((log) => (
                <article key={log.id} className="grid gap-2 border-b border-white/[0.06] bg-white/[0.02] p-3 last:border-b-0 md:grid-cols-[104px_1fr_132px] md:items-center">
                  <Badge className={logTone[log.type]}>{log.type}</Badge>
                  <strong className="truncate text-sm font-medium text-[#e2e4e7]">{log.note}</strong>
                  <small className="font-mono text-[11px] text-muted-foreground">{new Date(log.time).toLocaleString("pl-PL")}</small>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1011]">
          <CardHeader>
            <CardDescription className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#62666d]">Health queue</CardDescription>
            <CardTitle className="text-3xl">Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 md:grid-cols-[1fr_150px_170px_auto]" onSubmit={addReminder}>
              <Input name="title" placeholder="np. odrobaczanie" required />
              <Input name="due" type="date" defaultValue={today} required />
              <select name="category" defaultValue="Lek" className="h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50">
                {reminderCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
              <Button type="submit" variant="coral" size="icon" aria-label="Dodaj przypomnienie"><Plus className="size-4" /></Button>
            </form>
            <div className="mt-6 grid overflow-hidden rounded-xl border border-white/[0.08]">
              {[...reminders].sort((a, b) => a.due.localeCompare(b.due)).map((reminder) => (
                <button
                  key={reminder.id}
                  className={`grid w-full gap-2 border-b border-white/[0.06] bg-white/[0.02] p-3 text-left transition last:border-b-0 hover:bg-white/[0.04] md:grid-cols-[120px_1fr_auto] md:items-center ${reminder.done ? "opacity-50 line-through" : ""}`}
                  onClick={() => toggleReminder(reminder.id)}
                >
                  <Badge className={reminderTone[reminder.category]}>{reminder.category}</Badge>
                  <strong className="text-sm font-medium text-[#e2e4e7]">{reminder.title}</strong>
                  <small className="font-mono text-[11px] text-muted-foreground">{reminder.due}</small>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card id="passport" className="bg-[#0f1011] lg:col-span-2">
          <CardHeader>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <CardDescription className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#62666d]">Sitter handoff</CardDescription>
                <CardTitle className="text-3xl">Dog Passport</CardTitle>
              </div>
              <Button variant="outline" onClick={copyPassport}><Share2 className="size-4" /> {copied ? "Copied" : "Copy"}</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Separator className="mb-5 bg-white/[0.08]" />
            <pre className="overflow-auto rounded-xl border border-white/[0.08] bg-[#08090a] p-5 font-mono text-xs leading-6 text-[#d0d6e0] whitespace-pre-wrap">
              {passport}
            </pre>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function ProductSurface({
  profile,
  logs,
  reminders,
  todayLogs,
  walkCount,
  medsDone,
  nextReminder,
}: {
  profile: DogProfile
  logs: CareLog[]
  reminders: Reminder[]
  todayLogs: number
  walkCount: number
  medsDone: number
  nextReminder: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f1011] shadow-[rgba(8,9,10,0.4)_0_24px_80px_0]">
      <div className="grid min-h-[560px] lg:grid-cols-[230px_1fr_260px]">
        <aside className="border-b border-white/[0.08] bg-white/[0.02] p-4 lg:border-r lg:border-b-0">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-[#ff7a5c]/10 text-[#ff9b82]"><PawPrint className="size-4" /></span>
            <div>
              <strong className="block text-sm">Dog HQ</strong>
              <span className="text-xs text-muted-foreground">{profile.name} workspace</span>
            </div>
          </div>
          <div className="grid gap-1 text-sm">
            {[
              { label: "Today", Icon: Activity },
              { label: "Health", Icon: HeartPulse },
              { label: "Passport", Icon: ShieldCheck },
              { label: "Vet notes", Icon: Stethoscope },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex h-8 items-center gap-2 rounded-lg px-2 text-[#d0d6e0] first:bg-white/[0.05] first:text-[#f7f8f8]">
                <Icon className="size-4 text-muted-foreground" />
                {label}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#08090a] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#62666d]">Handoff status</p>
            <p className="mt-2 text-sm text-[#e2e4e7]">Ready for sitter · last sync 4 min ago</p>
          </div>
        </aside>

        <section className="p-4 md:p-5">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#62666d]">Today · {today}</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{profile.name} care timeline</h3>
            </div>
            <Badge className="border-[#27a644]/20 bg-[#27a644]/10 text-[#55d477]">All critical tasks visible</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            <MiniMetric label="Logs" value={String(todayLogs)} />
            <MiniMetric label="Walks" value={String(walkCount)} />
            <MiniMetric label="Meds" value={String(medsDone)} />
            <MiniMetric label="Next" value={nextReminder} />
          </div>
          <div className="mt-5 grid overflow-hidden rounded-xl border border-white/[0.08]">
            {logs.slice(0, 5).map((log) => (
              <div key={log.id} className="grid gap-2 border-b border-white/[0.06] bg-white/[0.02] p-3 last:border-b-0 md:grid-cols-[84px_1fr_78px] md:items-center">
                <Badge className={logTone[log.type]}>{log.type}</Badge>
                <span className="truncate text-sm text-[#e2e4e7]">{log.note}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{new Date(log.time).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="border-t border-white/[0.08] bg-white/[0.02] p-4 lg:border-t-0 lg:border-l">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#62666d]">Queue</p>
          <div className="mt-4 grid gap-3">
            {reminders.slice(0, 3).map((reminder) => (
              <div key={reminder.id} className="rounded-xl border border-white/[0.08] bg-[#08090a] p-3">
                <Badge className={reminderTone[reminder.category]}>{reminder.category}</Badge>
                <p className="mt-3 text-sm font-medium text-[#e2e4e7]">{reminder.title}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">Due {reminder.due}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-[#ff7a5c]/20 bg-[#ff7a5c]/10 p-3 text-[#ffb19e]">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em]">Sitter note</p>
            <p className="mt-2 text-sm leading-5">Boi się burzy. Nie podchodź do rowerów. Smaczki z kurczaka działają.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
      <strong className="block font-mono text-2xl font-semibold tracking-[-0.04em]">{value}</strong>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

function ProfileField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-xs font-medium text-muted-foreground">
      {label}
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}
