'use client'

import { useMemo, useState } from 'react'
import {
  Check,
  ChevronRight,
  CircleUserRound,
  Compass,
  Home,
  Info,
  Library,
  Menu,
  Play,
  Plus,
  Search,
  Tv,
  X,
} from 'lucide-react'

const movies = [
  { id: 1, title: 'The Last Frontier', meta: '2024  •  2h 08m', type: 'Drama', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85', description: 'A rescue pilot crosses an unforgiving landscape to bring a missing crew home.', video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
  { id: 2, title: 'After the Rain', meta: '2023  •  1h 46m', type: 'Documentary', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=85', description: 'A quiet portrait of the people rebuilding their lives after the storm.', video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
  { id: 3, title: 'Neon Nights', meta: '2024  •  8 episodes', type: 'Series', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=85', description: 'Three strangers, one city, and a soundtrack that refuses to sleep.', video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  { id: 4, title: 'Blue Horizon', meta: '2022  •  1h 52m', type: 'Adventure', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=85', description: 'A sailor searches for a legendary island beyond the known maps.', video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
]

const channels = [
  { title: 'World News', label: 'LIVE', viewers: '24K watching', image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=700&q=85', color: 'red' },
  { title: 'Nature Now', label: 'LIVE', viewers: '8.2K watching', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=85', color: 'green' },
  { title: 'Matchday', label: 'LIVE', viewers: '41K watching', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=85', color: 'blue' },
]

function PosterCard({ item, onPlay, saved, onSave }: { item: typeof movies[number]; onPlay: () => void; saved: boolean; onSave: () => void }) {
  return (
    <article className="poster-card">
      <button className="poster-button" onClick={onPlay} aria-label={`Play ${item.title}`}>
        <img src={item.image} alt={`${item.title} poster`} />
        <span className="poster-shade" />
        <span className="poster-play"><Play fill="currentColor" size={17} /></span>
      </button>
      <div className="poster-copy">
        <div className="poster-heading"><h3>{item.title}</h3><button className={saved ? 'save-button saved' : 'save-button'} onClick={onSave} aria-label={saved ? `Remove ${item.title} from My List` : `Add ${item.title} to My List`}>{saved ? <Check size={15} /> : <Plus size={15} />}</button></div>
        <p>{item.meta}</p>
      </div>
    </article>
  )
}

export default function StreamingApp() {
  const [active, setActive] = useState('Home')
  const [selected, setSelected] = useState<typeof movies[number] | null>(null)
  const [saved, setSaved] = useState<number[]>([2])
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleMovies = useMemo(() => movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())), [query])

  const openMovie = (movie: typeof movies[number]) => setSelected(movie)
  const toggleSave = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  return (
    <main className="streaming-shell">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"><Menu size={22} /></button>
        <div className="brand"><span className="brand-mark"><Tv size={18} /></span><span>playfy</span><em>TV</em></div>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          {['Home', 'Live TV', 'Movies', 'Series'].map((item) => <button key={item} className={active === item ? 'nav-link active' : 'nav-link'} onClick={() => { setActive(item); setMenuOpen(false) }}>{item}</button>)}
        </nav>
        <div className="top-actions"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search titles" /></label><button className="avatar" aria-label="Open profile"><CircleUserRound size={23} /></button></div>
      </header>

      <section className="hero">
        <img src={movies[0].image} alt="A cinematic mountain landscape from The Last Frontier" />
        <div className="hero-overlay" />
        <div className="hero-content"><span className="eyebrow"><span className="eyebrow-dot" /> Playfy original</span><h1>The Last<br /><strong>Frontier</strong></h1><p className="hero-meta">2024 <span /> 16+ <span /> 2h 08m <span className="quality">4K</span></p><p className="hero-description">When a rescue mission disappears beyond the edge of the map, one pilot faces the wild to bring them home.</p><div className="hero-actions"><button className="primary-button" onClick={() => openMovie(movies[0])}><Play size={17} fill="currentColor" /> Play now</button><button className="ghost-button" onClick={() => toggleSave(1)}>{saved.includes(1) ? <Check size={18} /> : <Plus size={18} />} My list</button></div></div><div className="hero-progress"><span /><i /></div>
      </section>

      <div className="content-wrap">
        <section className="section-block"><div className="section-title"><div><span className="section-kicker">Happening now</span><h2>Live on Playfy</h2></div><button className="see-all" onClick={() => setActive('Live TV')}>See all <ChevronRight size={17} /></button></div><div className="channel-grid">{channels.map((channel) => <button className="channel-card" key={channel.title} onClick={() => openMovie({ ...movies[0], title: channel.title, meta: 'Live now  •  Playfy TV', image: channel.image })}><img src={channel.image} alt={`${channel.title} live channel`} /><span className="channel-overlay" /><span className={`live-pill ${channel.color}`}><span /> {channel.label}</span><span className="channel-info"><strong>{channel.title}</strong><small>{channel.viewers}</small></span><span className="channel-arrow"><Play size={14} fill="currentColor" /></span></button>)}</div></section>
        <section className="section-block"><div className="section-title"><div><span className="section-kicker">Handpicked for you</span><h2>Trending this week</h2></div><button className="see-all">See all <ChevronRight size={17} /></button></div><div className="poster-grid">{visibleMovies.map((movie) => <PosterCard key={movie.id} item={movie} onPlay={() => openMovie(movie)} saved={saved.includes(movie.id)} onSave={() => toggleSave(movie.id)} />)}</div>{visibleMovies.length === 0 && <p className="empty-state">No titles found. Try another search.</p>}</section>
      </div>

      <nav className="bottom-nav" aria-label="Mobile navigation">{[[Home, 'Home'], [Compass, 'Explore'], [Library, 'My List']].map(([Icon, label]) => <button key={label as string} className={active === label ? 'bottom-link active' : 'bottom-link'} onClick={() => setActive(label as string)}><Icon size={20} /><span>{label as string}</span></button>)}</nav>

      {selected && <div className="player-backdrop" role="dialog" aria-modal="true" aria-label={`${selected.title} player`}><div className="player-modal"><button className="close-player" onClick={() => setSelected(null)} aria-label="Close player"><X size={20} /></button><video controls autoPlay poster={selected.image} src={selected.video} /><div className="player-info"><div><span className="section-kicker">Now playing</span><h2>{selected.title}</h2><p>{selected.description}</p></div><button className="info-button" aria-label="More information"><Info size={18} /></button></div></div></div>}
    </main>
  )
}
