import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type LogType = 'Spacer' | 'Jedzenie' | 'Woda' | 'Kupka' | 'Lek' | 'Nastrój' | 'Trening'

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
  category: 'Szczepienie' | 'Lek' | 'Weterynarz' | 'Pielęgnacja'
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
  name: 'Luna',
  breed: 'mieszaniec',
  age: '4 lata',
  weight: '18 kg',
  vet: 'VetCare, tel. +48 000 000 000',
  emergency: 'Konrad, +48 000 000 000',
  quirks: 'Boi się burzy, nie lubi rowerów, kocha smaczki z kurczaka.',
}

const starterLogs: CareLog[] = [
  { id: '1', type: 'Spacer', note: 'Poranny spacer, 28 minut, spokojna kupa', time: `${today}T08:10` },
  { id: '2', type: 'Jedzenie', note: '120 g karmy + suplement na stawy', time: `${today}T08:45` },
  { id: '3', type: 'Lek', note: 'Tabletka przeciwkleszczowa podana', time: `${today}T09:00` },
]

const starterReminders: Reminder[] = [
  { id: 'r1', title: 'Szczepienie przeciw wściekliźnie', due: '2026-07-12', category: 'Szczepienie', done: false },
  { id: 'r2', title: 'Odkleszczanie / tabletka', due: '2026-06-30', category: 'Lek', done: false },
  { id: 'r3', title: 'Kontrola wagi', due: '2026-07-02', category: 'Weterynarz', done: false },
]

function load<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? (JSON.parse(saved) as T) : fallback
  } catch {
    return fallback
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

function App() {
  const [profile, setProfile] = useState<DogProfile>(() => load('doghq.profile', defaultProfile))
  const [logs, setLogs] = useState<CareLog[]>(() => load('doghq.logs', starterLogs))
  const [reminders, setReminders] = useState<Reminder[]>(() => load('doghq.reminders', starterReminders))
  const [logType, setLogType] = useState<LogType>('Spacer')
  const [logNote, setLogNote] = useState('')

  const todayLogs = useMemo(() => logs.filter((log) => log.time.startsWith(today)), [logs])
  const walkCount = todayLogs.filter((log) => log.type === 'Spacer').length
  const medsDone = todayLogs.filter((log) => log.type === 'Lek').length
  const nextReminder = [...reminders].filter((r) => !r.done).sort((a, b) => a.due.localeCompare(b.due))[0]

  const addLog = (event: FormEvent) => {
    event.preventDefault()
    const next: CareLog = {
      id: crypto.randomUUID(),
      type: logType,
      note: logNote.trim() || 'Odnotowano bez dodatkowej notatki',
      time: `${today}T${nowTime()}`,
    }
    const nextLogs = [next, ...logs]
    setLogs(nextLogs)
    save('doghq.logs', nextLogs)
    setLogNote('')
  }

  const updateProfile = (field: keyof DogProfile, value: string) => {
    const next = { ...profile, [field]: value }
    setProfile(next)
    save('doghq.profile', next)
  }

  const toggleReminder = (id: string) => {
    const next = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, done: !reminder.done } : reminder,
    )
    setReminders(next)
    save('doghq.reminders', next)
  }

  const addReminder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const next: Reminder = {
      id: crypto.randomUUID(),
      title: String(form.get('title') || 'Nowe przypomnienie'),
      due: String(form.get('due') || today),
      category: String(form.get('category') || 'Weterynarz') as Reminder['category'],
      done: false,
    }
    const nextReminders = [...reminders, next]
    setReminders(nextReminders)
    save('doghq.reminders', nextReminders)
    event.currentTarget.reset()
  }

  const passport = `DOG HQ — PASZPORT PSA\n\nImię: ${profile.name}\nRasa: ${profile.breed}\nWiek: ${profile.age}\nWaga: ${profile.weight}\nWeterynarz: ${profile.vet}\nKontakt awaryjny: ${profile.emergency}\nZachowanie / triggery: ${profile.quirks}\n\nOstatnie logi:\n${logs
    .slice(0, 8)
    .map((log) => `- ${new Date(log.time).toLocaleString('pl-PL')} • ${log.type}: ${log.note}`)
    .join('\n')}`

  const copyPassport = async () => {
    await navigator.clipboard.writeText(passport)
    alert('Paszport psa skopiowany — możesz wkleić go w SMS/WhatsApp dla opiekuna.')
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Dog HQ">
          <span>🐾</span> Dog HQ
        </a>
        <div className="navLinks">
          <a href="#app">MVP</a>
          <a href="#passport">Paszport</a>
          <a href="#research">Research</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow">Local-first MVP dla właścicieli psów</div>
        <h1>Jedno miejsce na opiekę, zdrowie i przekazywanie psa pod opiekę.</h1>
        <p className="heroText">
          Dog HQ pomaga rodzinie i opiekunom wiedzieć, czy pies był nakarmiony, wyspacerowany,
          dostał leki i co warto powiedzieć weterynarzowi albo behawioryście.
        </p>
        <div className="heroActions">
          <a className="primary" href="#app">Otwórz demo MVP</a>
          <button className="secondary" onClick={copyPassport}>Skopiuj paszport psa</button>
        </div>
        <div className="heroGrid" aria-label="Najważniejsze metryki dzisiaj">
          <Metric label="Dzisiejsze logi" value={todayLogs.length.toString()} />
          <Metric label="Spacery" value={walkCount.toString()} />
          <Metric label="Leki" value={medsDone.toString()} />
          <Metric label="Następne" value={nextReminder ? nextReminder.due.slice(5) : 'OK'} />
        </div>
      </section>

      <section className="opportunity" id="research">
        <div>
          <p className="eyebrow">Dlaczego to ma sens</p>
          <h2>Rynek jest pełen aplikacji do jednej rzeczy. Luka: koordynacja codziennej opieki.</h2>
        </div>
        <div className="cards">
          <article>
            <strong>Codzienne logi</strong>
            <p>Karma, woda, kupa, spacer, leki, nastrój — rzeczy, o które weterynarz realnie pyta.</p>
          </article>
          <article>
            <strong>Shared care</strong>
            <p>Rodzina, partner, petsitter i dog walker potrzebują prostego statusu, nie kolejnego czatu.</p>
          </article>
          <article>
            <strong>Dog Passport</strong>
            <p>Jedna kopiowalna karta psa: rutyna, kontakty, triggery, ostatnie objawy i instrukcje.</p>
          </article>
        </div>
      </section>

      <section className="appShell" id="app">
        <div className="panel profilePanel">
          <div className="sectionTitle">
            <p className="eyebrow">Profil</p>
            <h2>{profile.name}</h2>
          </div>
          <div className="fieldGrid">
            <label>Imię<input value={profile.name} onChange={(e) => updateProfile('name', e.target.value)} /></label>
            <label>Rasa<input value={profile.breed} onChange={(e) => updateProfile('breed', e.target.value)} /></label>
            <label>Wiek<input value={profile.age} onChange={(e) => updateProfile('age', e.target.value)} /></label>
            <label>Waga<input value={profile.weight} onChange={(e) => updateProfile('weight', e.target.value)} /></label>
          </div>
          <label>Weterynarz<input value={profile.vet} onChange={(e) => updateProfile('vet', e.target.value)} /></label>
          <label>Kontakt awaryjny<input value={profile.emergency} onChange={(e) => updateProfile('emergency', e.target.value)} /></label>
          <label>Triggery, rutyna, uwagi<textarea value={profile.quirks} onChange={(e) => updateProfile('quirks', e.target.value)} /></label>
        </div>

        <div className="panel logPanel">
          <div className="sectionTitle">
            <p className="eyebrow">Dziennik</p>
            <h2>Dodaj szybki log</h2>
          </div>
          <form className="quickLog" onSubmit={addLog}>
            <select value={logType} onChange={(e) => setLogType(e.target.value as LogType)}>
              {(['Spacer', 'Jedzenie', 'Woda', 'Kupka', 'Lek', 'Nastrój', 'Trening'] as LogType[]).map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <input value={logNote} onChange={(e) => setLogNote(e.target.value)} placeholder="np. 25 min, kupa OK, lek podany" />
            <button className="primary" type="submit">Dodaj</button>
          </form>
          <div className="timeline">
            {logs.slice(0, 9).map((log) => (
              <article key={log.id} className="logItem">
                <span>{log.type}</span>
                <div>
                  <strong>{log.note}</strong>
                  <small>{new Date(log.time).toLocaleString('pl-PL')}</small>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel remindersPanel">
          <div className="sectionTitle">
            <p className="eyebrow">Zdrowie</p>
            <h2>Przypomnienia</h2>
          </div>
          <form className="reminderForm" onSubmit={addReminder}>
            <input name="title" placeholder="np. odrobaczanie" required />
            <input name="due" type="date" defaultValue={today} required />
            <select name="category" defaultValue="Lek">
              <option>Lek</option>
              <option>Szczepienie</option>
              <option>Weterynarz</option>
              <option>Pielęgnacja</option>
            </select>
            <button type="submit">+</button>
          </form>
          <div className="reminders">
            {reminders.sort((a, b) => a.due.localeCompare(b.due)).map((reminder) => (
              <button key={reminder.id} className={reminder.done ? 'reminder done' : 'reminder'} onClick={() => toggleReminder(reminder.id)}>
                <span>{reminder.category}</span>
                <strong>{reminder.title}</strong>
                <small>{reminder.due}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="panel passportPanel" id="passport">
          <div className="sectionTitle">
            <p className="eyebrow">Opiekun / petsitter</p>
            <h2>Dog Passport</h2>
          </div>
          <pre>{passport}</pre>
          <button className="primary full" onClick={copyPassport}>Kopiuj dla opiekuna</button>
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <article className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}

export default App
