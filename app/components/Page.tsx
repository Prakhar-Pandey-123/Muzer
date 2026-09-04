"use client"

import type { SVGProps } from "react"
import { useMemo, useState } from "react"

/* ------------------------------------------------------------------ */
/* Inline icons (no external packages needed)                          */
/* ------------------------------------------------------------------ */

type IconProps = SVGProps<SVGSVGElement>

const iconBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
}

const ChevronUp = (p: IconProps) => (
  <svg {...iconBase} {...p}>
    <path d="m18 15-6-6-6 6" />
  </svg>
)
const Play = (p: IconProps) => (
  <svg {...iconBase} fill="currentColor" stroke="none" viewBox="0 0 24 24" {...p}>
    <path d="M6 4v16l14-8z" />
  </svg>
)
const Radio = (p: IconProps) => (
  <svg {...iconBase} {...p}>
    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
  </svg>
)
const Disc3 = (p: IconProps) => (
  <svg {...iconBase} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
  </svg>
)
const Vote = (p: IconProps) => (
  <svg {...iconBase} {...p}>
    <path d="m9 12 2 2 4-4" />
    <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5z" />
    <path d="M22 19H2" />
  </svg>
)
const Speaker = (p: IconProps) => (
  <svg {...iconBase} {...p}>
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <circle cx="12" cy="14" r="4" />
    <line x1="12" x2="12.01" y1="6" y2="6" />
  </svg>
)
const Link2 = (p: IconProps) => (
  <svg {...iconBase} {...p}>
    <path d="M9 17H7A5 5 0 0 1 7 7h2" />
    <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
    <line x1="8" x2="16" y1="12" y2="12" />
  </svg>
)
const Users = (p: IconProps) => (
  <svg {...iconBase} {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const ShieldCheck = (p: IconProps) => (
  <svg {...iconBase} {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1 1 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)
const Zap = (p: IconProps) => (
  <svg {...iconBase} {...p}>
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
)

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Track = {
  id: string
  title: string
  artist: string
  votes: number
  voted: boolean
}

const INITIAL_TRACKS: Track[] = [
  { id: "1", title: "Midnight Static", artist: "Neon Vow", votes: 128, voted: false },
  { id: "2", title: "Paper Planes", artist: "Cosmo Kids", votes: 96, voted: false },
  { id: "3", title: "Golden Hour", artist: "Lila Rue", votes: 74, voted: false },
  { id: "4", title: "Concrete Heart", artist: "The Wanders", votes: 51, voted: false },
  { id: "5", title: "Slow Traffic", artist: "Marlo", votes: 33, voted: false },
]

const STEPS = [
  {
    step: "01",
    title: "Open your one space",
    body: "Sign in and claim your single Muzer space. You get one shareable link and one connected speaker — that's the whole setup.",
  },
  {
    step: "02",
    title: "Your crowd requests tracks",
    body: "Anyone with the link joins instantly, searches for songs, and drops them into the shared queue. No app, no account needed.",
  },
  {
    step: "03",
    title: "Votes decide the order",
    body: "People vote and unvote in real time. The most-wanted track rises to the top and plays through your speaker automatically.",
  },
]

const FEATURES = [
  { icon: Vote, title: "Vote & unvote live", body: "Every tap re-sorts the queue instantly. Change your mind? Pull your vote back anytime." },
  { icon: Speaker, title: "Plays on your speaker", body: "The winning track streams straight to the space's connected output — the room hears the crowd's choice." },
  { icon: Link2, title: "Join with one link", body: "Share a URL or QR code. Guests hop in with no download and no sign-up." },
  { icon: Users, title: "Built for one room", body: "Each creator runs a single focused space, so the energy and the queue stay in one place." },
  { icon: ShieldCheck, title: "You stay in control", body: "Skip, lock, or clear the queue whenever you need. It's your space and your call." },
  { icon: Zap, title: "Real-time everything", body: "Requests and votes update for everyone at once — no refresh, no lag, no waiting." },
]

const FAQS = [
  { q: "Can I create more than one space?", a: "Each creator gets exactly one space. It keeps your crowd, your queue, and your link in a single place instead of scattering the energy across rooms." },
  { q: "Do my guests need an account?", a: "No. Anyone with your link or QR code can join, request a track, and vote right away — no download and no sign-up required." },
  { q: "How does the song actually play?", a: "Your space connects to the speaker or output you're using. When a track wins the vote, it plays automatically so the room always hears the crowd's top pick." },
  { q: "What stops one person spamming votes?", a: "Votes are one-per-person per track, and anyone can unvote to free up their pick. You also keep host controls to skip or lock the queue." },
]

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1a0f18]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2">
          <Disc3 className="size-6 text-[#f0369b]" aria-hidden="true" />
          <span className="text-lg font-bold tracking-tight">Muzer</span>
        </a>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/55 md:flex">
          <a href="#how" className="transition-colors hover:text-white">How it works</a>
          <a href="#features" className="transition-colors hover:text-white">Features</a>
          <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
        </nav>

        <a href="#start" className="rounded-full bg-[#f0369b] px-4 py-2 text-sm font-bold text-[#1a0f18] transition-transform hover:scale-105">
          Open your space
        </a>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Interactive live queue                                              */
/* ------------------------------------------------------------------ */

function LiveQueue() {
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS)

  const sorted = useMemo(() => [...tracks].sort((a, b) => b.votes - a.votes), [tracks])
  const nowPlaying = sorted[0]
  const queue = sorted.slice(1)

  function toggleVote(id: string) {
    setTracks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, voted: !t.voted, votes: t.votes + (t.voted ? -1 : 1) } : t,
      ),
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#241420] shadow-2xl shadow-[#f0369b]/10">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/55">
          <span className="size-2 rounded-full bg-[#f0369b] animate-pulse" aria-hidden="true" />
          Live space
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-white/55">muzer.fm/dj-remy</span>
      </div>

      <div className="relative overflow-hidden border-b border-white/10 bg-[#f0369b]/10 px-5 py-5">
        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#f0369b]">
          <Radio className="size-3.5" aria-hidden="true" />
          On the speaker now
        </div>
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#f0369b] text-[#1a0f18]">
            <Play className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold leading-tight text-white">{nowPlaying.title}</p>
            <p className="truncate text-sm text-white/55">{nowPlaying.artist}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xl font-bold text-white">{nowPlaying.votes}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/55">votes</p>
          </div>
        </div>
        <div className="mt-4 flex items-end gap-1" aria-hidden="true">
          {[6, 12, 8, 16, 10, 20, 14, 9, 18, 7, 13, 11].map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-[#f0369b]/70"
              style={{ height: h, animation: `muzer-eq 900ms ease-in-out ${i * 80}ms infinite alternate` }}
            />
          ))}
        </div>
      </div>

      <ul className="divide-y divide-white/10">
        {queue.map((track, i) => (
          <li key={track.id} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-white/5">
            <span className="w-5 font-mono text-sm text-white/55">{i + 2}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{track.title}</p>
              <p className="truncate text-xs text-white/55">{track.artist}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleVote(track.id)}
              aria-pressed={track.voted}
              aria-label={`${track.voted ? "Remove vote from" : "Vote for"} ${track.title}`}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-bold transition-all duration-200 ${
                track.voted
                  ? "border-[#f0369b] bg-[#f0369b] text-[#1a0f18]"
                  : "border-white/15 bg-transparent text-white hover:border-[#f0369b] hover:text-[#f0369b]"
              }`}
            >
              <ChevronUp className="size-3.5" aria-hidden="true" />
              {track.votes}
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/10 px-5 py-3 text-center font-mono text-[11px] uppercase tracking-widest text-white/55">
        Tap a track to vote — the top pick plays next
      </div>

      <style>{`@keyframes muzer-eq { from { transform: scaleY(0.4); } to { transform: scaleY(1.4); } }`}</style>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(240,54,155,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f18]/60 to-[#1a0f18]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#241420]/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/55 backdrop-blur">
            <span className="size-1.5 rounded-full bg-[#f0369b]" aria-hidden="true" />
            One creator · one space · one crowd
          </div>

          <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            The crowd picks
            <br />
            <span className="text-[#f0369b]">what plays next.</span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-white/55">
            Open a single live space, share the link, and let your audience request songs and vote in
            real time. The track with the most votes plays through your speaker — no DJ required.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row" id="start">
            <a href="#start" className="rounded-full bg-[#f0369b] px-6 py-3 text-center text-base font-bold text-[#1a0f18] transition-transform hover:scale-[1.03]">
              Create your space
            </a>
            <a href="#how" className="rounded-full border border-white/15 bg-[#241420]/60 px-6 py-3 text-center text-base font-semibold text-white backdrop-blur transition-colors hover:border-[#f0369b] hover:text-[#f0369b]">
              See how it works
            </a>
          </div>
        </div>

        <div className="lg:pl-6">
          <LiveQueue />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-14 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#f0369b]">How it works</p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          From silence to a crowd-run playlist in three moves.
        </h2>
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.step} className="flex flex-col bg-[#241420] p-8">
            <span className="font-mono text-sm font-bold text-[#f0369b]">{s.step}</span>
            <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
            <p className="mt-3 text-pretty leading-relaxed text-white/55">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

function Features() {
  return (
    <section id="features" className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[#f0369b]">Features</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Everything a room needs to run its own soundtrack.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-white/10 bg-[#241420] p-6 transition-colors hover:border-[#f0369b]/60">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#f0369b]/15 text-[#f0369b] transition-colors group-hover:bg-[#f0369b] group-hover:text-[#1a0f18]">
                <f.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-white/55">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
      <div className="mb-12 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[#f0369b]">FAQ</p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">Good to know</h2>
      </div>

      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#241420]">
        {FAQS.map((item) => (
          <details key={item.q} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
              {item.q}
              <span className="font-mono text-2xl text-[#f0369b] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-pretty leading-relaxed text-white/55">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CTA + Footer                                                        */
/* ------------------------------------------------------------------ */

function CtaFooter() {
  return (
    <>
      <section className="relative overflow-hidden border-y border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[#f0369b]/10" />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Hand the aux to the whole room.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg leading-relaxed text-white/55">
            Open your Muzer space in under a minute and let the crowd build the soundtrack — one vote at a time.
          </p>
          <a href="#start" className="mt-8 inline-block rounded-full bg-[#f0369b] px-8 py-4 text-lg font-bold text-[#1a0f18] transition-transform hover:scale-[1.03]">
            Create your space
          </a>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <Disc3 className="size-5 text-[#f0369b]" aria-hidden="true" />
          <span className="font-bold">Muzer</span>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-white/55">
          © {new Date().getFullYear()} Muzer — the room picks the song
        </p>
      </footer>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div className="min-h-screen bg-[#1a0f18] font-sans text-white">
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Faq />
        <CtaFooter />
      </main>
    </div>
  )
}
