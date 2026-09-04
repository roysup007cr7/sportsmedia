'use client'

import { useMemo, useRef, useState } from 'react'
import {
  Bell, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp,
  Expand, Heart, Home, Megaphone, Menu, Pause, Play, Radio, RefreshCw, Search,
  Settings2, Shield, Volume2, VolumeX, X, Zap,
} from 'lucide-react'

type Match = {
  id: number
  competition: string
  icon: string
  home: string
  away: string
  homeLogo: string
  awayLogo: string
  status: string
  time: string
  live: boolean
  hot?: boolean
  stream: string
}

const demoStream = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
const matches: Match[] = [
  { id: 1, competition: 'LaLiga', icon: '⚡', home: 'Real Betis', away: 'Real Madrid', homeLogo: 'https://media.api-sports.io/football/teams/543.png', awayLogo: 'https://media.api-sports.io/football/teams/541.png', status: 'Match Started', time: '1:20:32', live: true, hot: true, stream: demoStream },
  { id: 2, competition: 'Premier League', icon: '♟', home: 'Ipswich Town', away: 'Liverpool FC', homeLogo: 'https://media.api-sports.io/football/teams/57.png', awayLogo: 'https://media.api-sports.io/football/teams/40.png', status: 'Match Started', time: '1:20:32', live: true, hot: true, stream: demoStream },
  { id: 3, competition: 'UEFA Champions League', icon: '✦', home: 'Paris Saint-Germain', away: 'AS Monaco', homeLogo: 'https://media.api-sports.io/football/teams/85.png', awayLogo: 'https://media.api-sports.io/football/teams/91.png', status: 'Match Started', time: '1:15:32', live: true, stream: demoStream },
  { id: 4, competition: 'Indian Super League', icon: '◉', home: 'Mohun Bagan', away: 'Kerala Blasters', homeLogo: 'https://media.api-sports.io/football/teams/1353.png', awayLogo: 'https://media.api-sports.io/football/teams/1355.png', status: '07:00 pm', time: '05/09/2026', live: false, stream: demoStream },
  { id: 5, competition: 'Calcutta Football League', icon: '◆', home: 'East Bengal', away: 'Mohammedan SC', homeLogo: 'https://media.api-sports.io/football/teams/1351.png', awayLogo: 'https://media.api-sports.io/football/teams/1352.png', status: '05:30 pm', time: '06/09/2026', live: false, stream: demoStream },
  { id: 6, competition: 'Bundesliga', icon: '▣', home: 'Bayer 04 Leverkusen', away: 'Union Berlin', homeLogo: 'https://media.api-sports.io/football/teams/168.png', awayLogo: 'https://media.api-sports.io/football/teams/89.png', status: '07:00 pm', time: '05/09/2026', live: false, stream: demoStream },
]

const categories = ['All', 'Football', 'Live', 'Recent', 'LaLiga', 'ISL', 'Champions League', 'Calcutta League']
const sports = ['All Sports', 'Football', 'Cricket', 'Tennis', 'Basketball']

function TeamLogo({ src, alt }: { src: string; alt: string }) {
  return <div className="team-logo"><img src={src} alt={`${alt} logo`} onError={(event) => { event.currentTarget.style.display = 'none' }} /><Shield size={24} /></div>
}

function MatchCard({ match, onOpen }: { match: Match; onOpen: () => void }) {
  return <button className="match-card" onClick={onOpen} aria-label={`Watch ${match.home} versus ${match.away}`}>
    {match.hot && <span className="hot-ribbon">HOT</span>}
    <div className="match-card-top"><span className="competition"><span className="competition-icon">{match.icon}</span>{match.competition}</span><span className={match.live ? 'match-status live' : 'match-status'}>{match.live && <Radio size={13} />}{match.status} <b>{match.time}</b></span></div>
    <div className="teams"><div className="team"><TeamLogo src={match.homeLogo} alt={match.home} /><span>{match.home}</span></div><div className="versus">{match.live ? <><Radio size={18} /><small>Live</small></> : 'VS'}</div><div className="team"><span>{match.away}</span><TeamLogo src={match.awayLogo} alt={match.away} /></div></div>
  </button>
}

export default function FootballStreamingApp() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSport, setActiveSport] = useState('All Sports')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Match | null>(null)
  const [admin, setAdmin] = useState(false)
  const [announcement, setAnnouncement] = useState('Welcome to Sports Media • Live football, highlights and match coverage')
  const [adVisible, setAdVisible] = useState(true)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const filtered = useMemo(() => matches.filter((match) => {
    const text = `${match.home} ${match.away} ${match.competition}`.toLowerCase()
    const queryMatch = text.includes(query.toLowerCase())
    const categoryMatch = activeCategory === 'All' || activeCategory === 'Football' || activeCategory === 'All Sports' || (activeCategory === 'Live' && match.live) || (activeCategory === 'Recent' && !match.live) || match.competition.includes(activeCategory.replace(' League', ''))
    return queryMatch && categoryMatch
  }), [activeCategory, query])

  const togglePlay = () => { if (!videoRef.current) return; if (videoRef.current.paused) { void videoRef.current.play(); setPlaying(true) } else { videoRef.current.pause(); setPlaying(false) } }
  const toggleMute = () => { if (!videoRef.current) return; videoRef.current.muted = !videoRef.current.muted; setMuted(videoRef.current.muted) }
  const openPlayer = (match: Match) => { setSelected(match); setPlaying(true) }

  return <main className="sports-shell">
    <header className="sports-header"><button className="icon-button mobile-only" aria-label="Open menu"><Menu size={23} /></button><div className="sports-brand"><span className="brand-ball">⚽</span><span>SPORTS <b>MEDIA</b></span></div><div className="header-actions"><button className="icon-button" aria-label="Favorites"><Heart size={22} /></button><button className="icon-button" aria-label="Refresh"><RefreshCw size={21} /></button><label className="sports-search"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search matches" aria-label="Search matches" /></label><button className="admin-button" onClick={() => setAdmin(!admin)}><Settings2 size={17} /> Admin</button></div></header>
    <div className="ticker"><Megaphone size={18} /><span>{announcement}</span><ChevronRight size={17} /></div>
    <section className="sports-categories" aria-label="Sport categories">{sports.map((sport) => <button key={sport} className={activeSport === sport ? 'sport-pill active' : 'sport-pill'} onClick={() => setActiveSport(sport)}>{sport === 'Football' ? '⚽' : sport === 'Cricket' ? '🏏' : sport === 'Tennis' ? '◒' : sport === 'Basketball' ? '◉' : '◉'} <span>{sport}</span></button>)}</section>
    <section className="filter-row" aria-label="Match filters">{categories.map((category) => <button key={category} className={activeCategory === category ? 'filter-pill active' : 'filter-pill'} onClick={() => setActiveCategory(category)}>{category === 'All' && <Check size={17} />}{category === 'Live' && <Radio size={16} />}{category === 'Recent' && <CalendarDays size={16} />}{category}</button>)}</section>
    {adVisible && <div className="ad-slot"><span>ADVERTISEMENT</span><strong>Sports Media keeps you close to the game</strong><button onClick={() => setAdVisible(false)} aria-label="Close advertisement"><X size={16} /></button></div>}
    <div className="page-heading"><div><span className="eyebrow">LIVE MATCH CENTER</span><h1>Today&apos;s fixtures</h1></div><span className="match-count">{filtered.length} matches</span></div>
    <section className="match-list" aria-label="Live matches">{filtered.map((match) => <MatchCard key={match.id} match={match} onOpen={() => openPlayer(match)} />)}{filtered.length === 0 && <div className="empty-match"><CircleHelp size={28} /><p>No matches found</p></div>}</section>
    <nav className="sports-bottom-nav"><button className="active"><Home size={20} /><span>Matches</span></button><button><Radio size={20} /><span>Live</span></button><button><Heart size={20} /><span>Favorites</span></button><button onClick={() => setAdmin(!admin)}><Settings2 size={20} /><span>Manage</span></button></nav>

    {admin && <aside className="admin-panel" aria-label="Sports Media admin panel"><div className="admin-panel-head"><div><span className="eyebrow">OWNER ACCESS</span><h2>Sports Media CMS</h2><p>SUPRIYO ROY · Administrator</p></div><button className="icon-button" onClick={() => setAdmin(false)} aria-label="Close admin"><X size={20} /></button></div><div className="admin-stats"><span><b>{matches.length}</b> Matches</span><span><b>4</b> Ads</span><span><b>8</b> EPG rows</span></div><label className="admin-label">Announcement<input value={announcement} onChange={(event) => setAnnouncement(event.target.value)} /></label><div className="admin-actions"><button><Zap size={16} /> Feature match</button><button><PlusIcon /> Add stream</button><button><Bell size={16} /> Manage ads</button></div><p className="admin-note">API-Football adapter ready. Stream URLs should only be added when you have broadcast rights.</p></aside>}

    {selected && <div className="player-overlay" role="dialog" aria-modal="true" aria-label={`${selected.home} versus ${selected.away} player`}><div className="player-stage"><video ref={videoRef} src={selected.stream} autoPlay playsInline onClick={togglePlay} /><div className="player-top"><button className="player-close" onClick={() => setSelected(null)} aria-label="Close player"><X size={22} /></button><span className="player-live"><span /> LIVE · {selected.competition}</span></div><div className="player-controls"><button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}</button><button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>{muted ? <VolumeX size={22} /> : <Volume2 size={22} />}</button><div className="player-score"><b>{selected.home}</b><strong>VS</strong><b>{selected.away}</b></div><button onClick={() => videoRef.current?.requestFullscreen()} aria-label="Fullscreen"><Expand size={21} /></button></div><div className="epg"><div><span className="eyebrow">NOW PLAYING</span><strong>{selected.home} <i>vs</i> {selected.away}</strong></div><ChevronDown size={19} /></div></div></div>}
  </main>
}

function PlusIcon() { return <span className="plus-icon">+</span> }
