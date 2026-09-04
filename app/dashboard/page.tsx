"use client"

import { useState } from "react"

/* ------------------------------------------------------------------ */
/*  Muzer — Room page                                                  */

// ---- Types ----------------------------------------------------------
type Song = {
  id: string
  title: string
  channel: string
  thumbnail: string // YouTube thumbnail url
  votes: number
  votedByMe: boolean
}

// ---- Demo data ------------------------------------------------------
const NOW_PLAYING: Song = {
  id: "dQw4w9WgXcQ",
  title: "Midnight City — Extended Mix",
  channel: "M83 Official",
  thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  votes: 42,
  votedByMe: false,
}

const INITIAL_QUEUE: Song[] = [
  {
    id: "3JZ_D3ELwOQ",
    title: "Paper Planes",
    channel: "M.I.A.",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    votes: 31,
    votedByMe: false,
  },
  {
    id: "kXYiU_JCYtU",
    title: "Numb",
    channel: "Linkin Park",
    thumbnail: "https://img.youtube.com/vi/kXYiU_JCYtU/hqdefault.jpg",
    votes: 27,
    votedByMe: true,
  },
  {
    id: "fLexgOxsZu0",
    title: "The Emptiness Machine",
    channel: "Linkin Park",
    thumbnail: "https://img.youtube.com/vi/fLexgOxsZu0/hqdefault.jpg",
    votes: 19,
    votedByMe: false,
  },
  {
    id: "9bZkp7q19f0",
    title: "Gangnam Style",
    channel: "PSY",
    thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
    votes: 12,
    votedByMe: false,
  },
  {
    id: "OPf0YbXqDm0",
    title: "Uptown Funk",
    channel: "Mark Ronson ft. Bruno Mars",
    thumbnail: "https://img.youtube.com/vi/OPf0YbXqDm0/hqdefault.jpg",
    votes: 8,
    votedByMe: false,
  },
]

// ---- Icons (inline SVG, no packages) --------------------------------
function IconArrowUp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconShare({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPlus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ---- Helpers --------------------------------------------------------
// Pull a YouTube video id out of most common URL shapes.
function parseYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

// ---- Page -----------------------------------------------------------
export default function RoomPage() {
  const [queue, setQueue] = useState<Song[]>(INITIAL_QUEUE)
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  // sort by votes, highest first
  const sortedQueue = [...queue].sort((a, b) => b.votes - a.votes)

  function handleVote(id: string) {
    setQueue((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, votedByMe: !s.votedByMe, votes: s.votedByMe ? s.votes - 1 : s.votes + 1 }
          : s,
      ),
    )
  }

  function handleAddSong(e: React.FormEvent) {
    e.preventDefault()
    const id = parseYouTubeId(url.trim())
    if (!id) return
    // avoid duplicates
    if (queue.some((s) => s.id === id) || id === NOW_PLAYING.id) {
      setUrl("")
      return
    }
    const newSong: Song = {
      id,
      title: "New request",
      channel: "Added from URL",
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      votes: 1,
      votedByMe: true,
    }
    setQueue((prev) => [...prev, newSong])
    setUrl("")
  }

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("https://muzer.fm/room/dj-remy")
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="min-h-screen bg-[#1a0f18] font-sans text-white">
        <Redirect
      {/* ---------- Top bar ---------- */}
      <header className="flex items-center gap-4 border-b border-white/10 px-4 py-3 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f0369b] text-sm font-black text-[#1a0f18]">
            M
          </span>
          <span className="hidden text-lg font-bold tracking-tight sm:block">Muzer</span>
        </div>

        {/* Search / URL input */}
        <form onSubmit={handleAddSong} className="mx-auto flex w-full max-w-2xl items-center">
          <div className="flex w-full items-center overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-[#f0369b]">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a YouTube link and hit enter…"
              className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 whitespace-nowrap px-4 py-2 text-sm font-semibold text-[#f0369b] transition-colors hover:bg-white/5"
            >
              <IconPlus className="h-4 w-4" />
              <span className="hidden sm:block">Add</span>
            </button>
          </div>
        </form>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 rounded-full bg-[#f0369b] px-4 py-2 text-sm font-semibold text-[#1a0f18] transition-opacity hover:opacity-90"
        >
          <IconShare className="h-4 w-4" />
          <span className="hidden md:block">{copied ? "Copied!" : "Share"}</span>
        </button>
      </header>

      {/* ---------- Body: player left, queue right ---------- */}
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[1fr_380px]">
        {/* ---- Now playing ---- */}
        <section>
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${NOW_PLAYING.id}?autoplay=0&rel=0`}
              title={NOW_PLAYING.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#f0369b]/15 px-3 py-1 text-xs font-medium text-[#f0369b]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#f0369b]" />
                Now playing
              </span>
              <h1 className="text-xl font-bold text-balance md:text-2xl">{NOW_PLAYING.title}</h1>
              <p className="mt-1 text-sm text-white/50">{NOW_PLAYING.channel}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-2xl font-black text-[#f0369b]">{NOW_PLAYING.votes}</p>
              <p className="text-xs text-white/40">votes</p>
            </div>
          </div>
        </section>

        {/* ---- Up next queue ---- */}
        <aside>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/60">Up next</h2>
            <span className="text-xs text-white/40">{sortedQueue.length} in queue</span>
          </div>

          <ul className="flex flex-col gap-3">
            {sortedQueue.map((song, index) => (
              <li
                key={song.id}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/[0.07]"
              >
                {/* rank */}
                <span className="w-5 shrink-0 text-center text-sm font-bold text-white/30">{index + 1}</span>

                {/* thumbnail */}
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={song.thumbnail || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                </div>

                {/* meta */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{song.title}</p>
                  <p className="truncate text-xs text-white/40">{song.channel}</p>
                </div>

                {/* vote button */}
                <button
                  onClick={() => handleVote(song.id)}
                  className={`flex shrink-0 flex-col items-center rounded-lg border px-2 py-1 transition-colors ${
                    song.votedByMe
                      ? "border-[#f0369b] bg-[#f0369b] text-[#1a0f18]"
                      : "border-white/15 text-white/70 hover:border-[#f0369b] hover:text-[#f0369b]"
                  }`}
                  aria-pressed={song.votedByMe}
                  aria-label={`Vote for ${song.title}`}
                >
                  <IconArrowUp className="h-4 w-4" />
                  <span className="text-xs font-bold">{song.votes}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  )
}