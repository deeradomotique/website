import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronUp, Home, Shield, Star, Wifi, Server, Tv, Lock, Video, Calendar, CheckCircle, Clock } from 'lucide-react';
import Logo from './components/Logo';

const WHATSAPP_URL = 'https://api.whatsapp.com/message/JEQTCLRQLN5SF1?autoload=1&app_absent=0';

// ⚠️ À remplacer avec tes vrais liens une fois créés
const STRIPE_30MIN = 'https://buy.stripe.com/9B64gzaY5cmQ1lCf519bO0e';
const STRIPE_1H    = 'https://buy.stripe.com/5kQ7sL4zHeuYd4k0a79bO0f';
const GCAL_BOOKING = 'https://calendar.app.google/WyGxVjJPRbD3KYxX6';
const FORMSPREE_ID = 'REMPLACER_FORMSPREE_ID'; // formspree.io → New Form → copie l'ID

const photoUrl = (path: string) =>
  path.split('/').map((s, i) => (i === 0 ? s : encodeURIComponent(s))).join('/');

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const poles = [
  {
    icon: <Server className="w-10 h-10" />,
    gradient: 'from-blue-600 to-blue-800',
    light: 'bg-blue-50 border-blue-100',
    tag: 'bg-blue-100 text-blue-700',
    title: 'Réseaux & Infogérance',
    description: 'Infrastructure réseau professionnelle, WiFi haute performance, gestion de parc informatique et supervision continue.',
    services: ['Installation réseau LAN / WiFi pro', 'Gestion de parc informatique', 'Infogérance & support IT', 'VPN & accès distant sécurisé'],
  },
  {
    icon: <Lock className="w-10 h-10" />,
    gradient: 'from-red-600 to-red-800',
    light: 'bg-red-50 border-red-100',
    tag: 'bg-red-100 text-red-700',
    title: 'Cybersécurité',
    description: 'Protection de votre réseau et de vos données. Pare-feu, audits sécurité et détection d\'intrusion.',
    services: ['Audit de sécurité réseau', 'Installation & configuration pare-feu', 'Protection des endpoints', 'Sensibilisation & formation'],
  },
  {
    icon: <Tv className="w-10 h-10" />,
    gradient: 'from-violet-600 to-violet-800',
    light: 'bg-violet-50 border-violet-100',
    tag: 'bg-violet-100 text-violet-700',
    title: 'Audiovisuel',
    description: 'Sonorisation multiroom, home cinéma, écrans professionnels et solutions de visioconférence sur mesure.',
    services: ['Sonorisation & multiroom', 'Home cinéma sur mesure', 'Écrans & vidéoprojecteurs', 'Visioconférence professionnelle'],
  },
  {
    icon: <Home className="w-10 h-10" />,
    gradient: 'from-emerald-600 to-emerald-800',
    light: 'bg-emerald-50 border-emerald-100',
    tag: 'bg-emerald-100 text-emerald-700',
    title: 'Domotique',
    description: 'Maison intelligente, automatisation complète et intégration de tous vos équipements connectés.',
    services: ['Home Assistant & eedomus', 'Éclairage & volets connectés', 'Serrures & portiers vidéo', 'Scénarios & automatisation'],
  },
];

const partners = [
  { name: 'eedomus',        logo: '/logos/eedomus.png' },
  { name: 'Home Assistant', logo: '/logos/homeassistant.svg' },
  { name: 'Doorbird',       logo: '/logos/doorbird.png' },
  { name: 'Nuki',           logo: '/logos/nuki.svg' },
  { name: 'Somfy',          logo: '/logos/somfy.svg' },
  { name: 'Basalte',        logo: '/logos/basalte.svg' },
  { name: 'Focal',          logo: '/logos/focal.svg' },
  { name: 'Google Home',    logo: '/logos/google-home.svg' },
  { name: 'Sonos',          logo: '/logos/sonos.svg' },
  { name: 'Shelly',         logo: '/logos/shelly.svg' },
  { name: 'Fibaro',         logo: '/logos/fibaro.png' },
  { name: 'Philips Hue',    logo: '/logos/philipshue.svg' },
  { name: 'Netatmo',        logo: '/logos/netatmo.svg' },
  { name: 'Ubiquiti',       logo: '/logos/ubiquiti.svg' },
];

const portfolioProjects = [
  {
    title: 'Appartement Val de Marne',
    description: 'Tablettes Basalte, sonnette & zoning Google Nest',
    pole: 'Domotique',
    photos: [
      '/portfolio/Appartement Val de Marne/Ipad Paysage sur support Basalte.JPG',
      '/portfolio/Appartement Val de Marne/Ipad portait sur support Basalte.JPG',
      '/portfolio/Appartement Val de Marne/Sonnette Google Nest.JPG',
      '/portfolio/Appartement Val de Marne/Support Magnetique Ipad Basalte.JPG',
      '/portfolio/Appartement Val de Marne/Zonning Google Nest.JPG',
    ],
  },
  {
    title: 'Caméras & WIFI – Paris 16e',
    description: 'Installation caméras de surveillance et réseau WIFI professionnel',
    pole: 'Réseaux & Sécurité',
    photos: [
      '/portfolio/Caméras et WIFI dans un appartement a Paris 16/16cc5bb3-35d5-474e-af00-47fa65da3512.jpg',
      '/portfolio/Caméras et WIFI dans un appartement a Paris 16/3417d16e-2956-4576-b526-b009152740ee.jpg',
      '/portfolio/Caméras et WIFI dans un appartement a Paris 16/98e0ac84-4d58-4a25-9b98-fe29a7f643bf.jpg',
    ],
  },
  {
    title: 'Maison de vacances – Bord de mer',
    description: 'Serrure Nuki, sonorisation Focal/Sonos et sonnette HomeKit',
    pole: 'Audiovisuel & Domotique',
    photos: [
      '/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Serrure connectée Nuki.JPG',
      '/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Serrure nuki Porte.JPG',
      '/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Kit Nuki.JPG',
      '/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Enceinte Focal sur terrasse avec Ampli Sonos Amp.JPG',
      '/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Sonette connectée Logitech HomeKit et Keypad nuki.JPG',
      '/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Ecran homekit.PNG',
    ],
  },
  {
    title: 'Maison de ville Val de Marne',
    description: 'Portier vidéo Doorbird encastré et intégration domotique',
    pole: 'Domotique',
    photos: [
      '/portfolio/Maison de ville Val de Marne/Portier Doorbird en saillie.JPG',
      '/portfolio/Maison de ville Val de Marne/Portier doorbird encastrable.JPG',
      '/portfolio/Maison de ville Val de Marne/App Doorbird.JPG',
    ],
  },
];

const testimonials = [
  {
    name: 'Remi S',
    role: 'Client',
    content: "Nous sommes passé par l'entreprise Deera pour l'intégration Domotique de notre maison et je dois dire que nous somme tres satisfait de leur prestation. Ils sont parfaitement à l'écoute de nos besoins et savent exactement quelles produits nous proposer pour nous satisfaire. En plus nous réalisons des économies d'énergies grâce aux scénarios quotidiens. Bravo, un travail de pro avec une logique à long terme.",
    rating: 5,
  },
  {
    name: 'Dan S',
    role: 'Client',
    content: "Franchement c'est la meilleure société de domotique que j'ai jamais rencontré ! Ils sont sérieux, rapides, professionnels et d'une grande générosité. Tout a été résolu, ils ont pris le temps pour tout. Je recommande à 100% !",
    rating: 5,
  },
  {
    name: 'Sebastien G',
    role: "Chef d'entreprise",
    content: 'Super boulot. Personne très impliquée et sérieuse. Je recommande à 100% !',
    rating: 5,
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightbox, setLightbox] = useState<{ projectIndex: number; photoIndex: number } | null>(null);
  const [eligForm, setEligForm] = useState({ nom: '', email: '', tel: '', besoin: '' });
  const [eligStatus, setEligStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleEligSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEligStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...eligForm, _subject: 'Demande appel découverte DEERA' }),
      });
      setEligStatus(res.ok ? 'sent' : 'error');
    } catch {
      setEligStatus('error');
    }
  };

  const closeLightbox = () => setLightbox(null);
  const lightboxPrev = () =>
    setLightbox(lb =>
      lb
        ? { ...lb, photoIndex: (lb.photoIndex - 1 + portfolioProjects[lb.projectIndex].photos.length) % portfolioProjects[lb.projectIndex].photos.length }
        : null
    );
  const lightboxNext = () =>
    setLightbox(lb =>
      lb
        ? { ...lb, photoIndex: (lb.photoIndex + 1) % portfolioProjects[lb.projectIndex].photos.length }
        : null
    );

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Logo />

            <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
              <a href="#accueil"     className="text-gray-700 hover:text-deera-purple transition-colors">Accueil</a>
              <a href="#poles"       className="text-gray-700 hover:text-deera-purple transition-colors">Expertises</a>
              <a href="#pourquoi-nous" className="text-gray-700 hover:text-deera-purple transition-colors">Pourquoi Nous</a>
              <a href="#realisations" className="text-gray-700 hover:text-deera-purple transition-colors">Réalisations</a>
              <a href="#conseil"     className="text-gray-700 hover:text-deera-purple transition-colors">Conseil en ligne</a>
              <a href="#contact"      className="text-gray-700 hover:text-deera-purple transition-colors">Contact</a>
            </nav>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#25D366] text-white px-5 py-2 rounded-full hover:bg-[#1ebe5d] transition-colors font-medium text-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Nous contacter
            </a>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {[['#accueil','Accueil'],['#poles','Expertises'],['#pourquoi-nous','Pourquoi Nous'],['#realisations','Réalisations'],['#conseil','Conseil en ligne'],['#contact','Contact']].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-deera-purple">{label}</a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-2 rounded-full hover:bg-[#1ebe5d] transition-colors font-medium"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Nous contacter
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section id="accueil" className="pt-20 bg-gradient-to-br from-deera-purple to-deera-blue text-white">
        <div className="container mx-auto px-4 py-36">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Expert IT · Réseau · Bâtiment Connecté
            </span>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Votre infrastructure IT,<br />entre de bonnes mains.
            </h1>
            <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto">
              De la sécurité réseau à la maison intelligente, DEERA conçoit et déploie des solutions sur mesure pour les particuliers et les professionnels à Paris.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#poles"
                className="inline-block bg-white text-deera-purple px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Découvrir nos expertises
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Discutons de votre projet
              </a>
            </div>
          </div>
        </div>

        {/* Stats band */}
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              {[['10+', "ans d'expérience"], ['4', 'pôles d\'expertise'], ['100%', 'satisfaction client'], ['Paris', 'et Île-de-France']].map(([val, label]) => (
                <div key={label}>
                  <p className="text-3xl font-bold">{val}</p>
                  <p className="text-white/70 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Pôles ── */}
      <section id="poles" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Nos Pôles d'Expertise</h2>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
            Quatre domaines complémentaires pour couvrir l'ensemble de vos besoins IT et bâtiment connecté.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {poles.map((pole, i) => (
              <div key={i} className={`rounded-2xl border p-8 ${pole.light} flex flex-col gap-5 hover:shadow-lg transition-shadow`}>
                <div className={`bg-gradient-to-br ${pole.gradient} text-white rounded-xl w-16 h-16 flex items-center justify-center shadow-md`}>
                  {pole.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{pole.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{pole.description}</p>
                </div>
                <ul className="space-y-2">
                  {pole.services.map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-br ${pole.gradient}`} />
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm font-semibold mt-auto self-start px-4 py-2 rounded-full bg-gradient-to-r ${pole.gradient} text-white hover:opacity-90 transition-opacity`}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partenaires ── */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <h2 className="text-3xl font-bold text-center mb-2">Nos Marques Partenaires</h2>
          <p className="text-center text-gray-500">Les meilleures technologies au service de vos projets</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="animate-marquee flex items-center gap-10 w-max">
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-36">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="text-xs font-medium text-gray-500 text-center">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pourquoi nous ── */}
      <section id="pourquoi-nous" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Choisir DEERA</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-8 h-8" />, title: 'Expertise Pluridisciplinaire', text: 'IT, réseau, cybersécurité, audiovisuel et domotique : une seule équipe pour tous vos projets.' },
              { icon: <Wifi className="w-8 h-8" />, title: 'Solutions Sur Mesure', text: 'Chaque projet est unique. Nous concevons des architectures adaptées à vos contraintes et objectifs.' },
              { icon: <Star className="w-8 h-8" />, title: 'Accompagnement 360°', text: 'De l\'audit à la maintenance, nous restons à vos côtés bien après la livraison.' },
            ].map(({ icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="bg-deera-purple text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Réalisations ── */}
      <section id="realisations" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Nos Réalisations</h2>
          <p className="text-center text-gray-500 mb-12">Cliquez sur un projet pour voir toutes les photos</p>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioProjects.map((project, pi) => (
              <div
                key={pi}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow"
                onClick={() => setLightbox({ projectIndex: pi, photoIndex: 0 })}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={photoUrl(project.photos[0])}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.photos.length} photo{project.photos.length > 1 ? 's' : ''}
                  </div>
                  <div className="absolute inset-0 bg-deera-purple/0 group-hover:bg-deera-purple/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-deera-purple font-semibold px-5 py-2 rounded-full text-sm shadow">
                      Voir la galerie
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <span className="bg-deera-purple/10 text-deera-purple text-xs font-medium px-3 py-1 rounded-full">{project.pole}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section id="temoignages" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Témoignages Clients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{t.content}</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conseil à distance ── */}
      <section id="conseil" className="py-24 bg-gradient-to-br from-deera-blue to-deera-purple text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              Conseil IT à distance
            </span>
            <h2 className="text-3xl font-bold mb-3">Vérifiez si vous êtes éligible à un appel découverte gratuit</h2>
            <p className="text-white/75 max-w-xl mx-auto">
              Chaque demande est étudiée personnellement. Si votre besoin correspond à nos expertises, nous vous proposons un premier échange de 15 min sans engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">

            {/* Card 1 — Éligibilité gratuite */}
            <div className="bg-white text-gray-900 rounded-2xl p-7 shadow-xl md:col-span-1 order-first">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-deera-purple/10 rounded-xl p-3">
                  <Video className="w-6 h-6 text-deera-purple" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-deera-purple uppercase tracking-wide">Sur sélection</p>
                  <h3 className="font-bold text-lg">Appel découverte – 15 min</h3>
                </div>
                <span className="ml-auto bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">Gratuit</span>
              </div>
              <p className="text-gray-500 text-sm mb-5">
                Remplissez ce formulaire. Nous analysons votre demande sous 24h et vous contactons si votre projet correspond à nos expertises.
              </p>

              {eligStatus === 'sent' ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800">Demande envoyée !</p>
                  <p className="text-gray-500 text-sm mt-1">Nous revenons vers vous sous 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleEligSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder="Prénom & Nom"
                      value={eligForm.nom}
                      onChange={e => setEligForm(f => ({ ...f, nom: e.target.value }))}
                      className="col-span-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-deera-purple/30"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={eligForm.email}
                      onChange={e => setEligForm(f => ({ ...f, email: e.target.value }))}
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-deera-purple/30"
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={eligForm.tel}
                      onChange={e => setEligForm(f => ({ ...f, tel: e.target.value }))}
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-deera-purple/30"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Décrivez votre besoin en 2 lignes…"
                    value={eligForm.besoin}
                    onChange={e => setEligForm(f => ({ ...f, besoin: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-deera-purple/30 resize-none"
                  />
                  {eligStatus === 'error' && (
                    <p className="text-red-500 text-xs">Une erreur est survenue, réessayez.</p>
                  )}
                  <button
                    type="submit"
                    disabled={eligStatus === 'sending'}
                    className="w-full bg-deera-purple hover:bg-deera-blue text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
                  >
                    {eligStatus === 'sending' ? 'Envoi…' : 'Vérifier mon éligibilité →'}
                  </button>
                </form>
              )}
            </div>

            {/* Cards payantes */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">

              {/* 30 min */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 rounded-xl p-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide font-semibold">Diagnostic Express</p>
                    <h3 className="font-bold text-xl text-white">30 min</h3>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">60 €<span className="text-lg font-normal text-white/60"> HT</span></p>
                <p className="text-white/50 text-xs mb-5">Paiement sécurisé · Réservation après paiement</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {['Une question précise résolue', 'Diagnostic réseau ou sécurité', 'Recommandations actionnables', 'Compte-rendu par email'].map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href={STRIPE_30MIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-white text-deera-purple font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Réserver & payer →
                </a>
                <p className="text-center text-white/40 text-xs mt-3 flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" /> Créneau à choisir après paiement
                </p>
              </div>

              {/* 1h */}
              <div className="bg-white text-gray-900 rounded-2xl p-7 flex flex-col shadow-xl relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-deera-purple text-white text-xs font-bold px-4 py-1 rounded-full">
                  Le plus complet
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-deera-purple/10 rounded-xl p-3">
                    <Video className="w-6 h-6 text-deera-purple" />
                  </div>
                  <div>
                    <p className="text-deera-purple text-xs uppercase tracking-wide font-semibold">Consultation</p>
                    <h3 className="font-bold text-xl">1 heure</h3>
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">120 €<span className="text-lg font-normal text-gray-400"> HT</span></p>
                <p className="text-gray-400 text-xs mb-5">Paiement sécurisé · Réservation après paiement</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {['Analyse complète de votre situation', 'Réseaux, cyber, domotique ou AV', 'Plan d\'action détaillé', 'Compte-rendu écrit inclus', 'Suivi par email 7 jours'].map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <a
                  href={STRIPE_1H}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-deera-purple hover:bg-deera-blue text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Réserver & payer →
                </a>
                <p className="text-center text-gray-400 text-xs mt-3 flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" /> Créneau à choisir après paiement
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Contactez-nous</h2>
          <p className="text-center text-gray-500 mb-12">Discutons de votre projet directement sur WhatsApp</p>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-[#25D366] rounded-full p-5 shadow-md">
                  <WhatsAppIcon className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Démarrez une conversation</h3>
              <p className="text-gray-500 mb-8">
                Réponse rapide garantie.<br />
                Posez vos questions, demandez un devis,<br />
                on s'occupe de tout.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#17a852] text-white text-lg font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              >
                <WhatsAppIcon className="w-6 h-6" />
                Écrire sur WhatsApp
              </a>
              <p className="text-gray-400 text-sm mt-6">
                📞 07 69 53 77 73 · Paris & Île-de-France
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-deera-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">DEERA</h3>
              <p className="text-gray-300 text-sm">Expert IT, Réseau & Bâtiment Connecté à Paris.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Expertises</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Réseaux & Infogérance</li>
                <li>Cybersécurité</li>
                <li>Audiovisuel</li>
                <li>Domotique</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                {[['#poles','Expertises'],['#pourquoi-nous','Pourquoi Nous'],['#realisations','Réalisations'],['#contact','Contact']].map(([href, label]) => (
                  <li key={href}><a href={href} className="text-gray-300 hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>deera.domotique@gmail.com</li>
                <li>+33 7 69 53 77 73</li>
                <li>Paris, Île-de-France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} DEERA. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      {lightbox && (() => {
        const project = portfolioProjects[lightbox.projectIndex];
        const photo = project.photos[lightbox.photoIndex];
        return (
          <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
            <button className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors" onClick={closeLightbox}>
              <X className="w-6 h-6" />
            </button>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white font-semibold">{project.title}</p>
              <p className="text-white/60 text-sm">{lightbox.photoIndex + 1} / {project.photos.length}</p>
            </div>
            {project.photos.length > 1 && (
              <button className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors" onClick={e => { e.stopPropagation(); lightboxPrev(); }}>
                <ChevronUp className="w-6 h-6 -rotate-90" />
              </button>
            )}
            <img src={photoUrl(photo)} alt={project.title} className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
            {project.photos.length > 1 && (
              <button className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors" onClick={e => { e.stopPropagation(); lightboxNext(); }}>
                <ChevronUp className="w-6 h-6 rotate-90" />
              </button>
            )}
            <div className="absolute bottom-6 flex gap-2">
              {project.photos.map((_, i) => (
                <button key={i} className={`w-2 h-2 rounded-full transition-colors ${i === lightbox.photoIndex ? 'bg-white' : 'bg-white/30'}`} onClick={e => { e.stopPropagation(); setLightbox({ ...lightbox, photoIndex: i }); }} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* ── WhatsApp flottant ── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <span className="hidden group-hover:flex items-center bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-lg whitespace-nowrap border border-gray-100">
          Contactez-nous sur WhatsApp
        </span>
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
          <div className="relative bg-[#25D366] hover:bg-[#1ebe5d] transition-colors w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl">
            <WhatsAppIcon className="w-7 h-7 text-white" />
          </div>
        </div>
      </a>

      {/* ── Scroll to top ── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 bg-deera-purple text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;
