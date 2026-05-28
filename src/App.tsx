import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronUp, Home, Zap, Shield, Thermometer, Phone, Star, Sun, Moon, Plane } from 'lucide-react';
import { Testimonial, Service } from './types';
import Logo from './components/Logo';

const WHATSAPP_URL = 'https://wa.me/message/JEQTCLRQLN5SF1';
const WHATSAPP_CONTACT_URL = 'https://wa.me/33769537773?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services%20domotique';
const GFORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc5f_64YB4PiQ_efHM3Cb1krIwb7CT9q6cZKIZFG4jX441tHw/formResponse';

// Encode les espaces dans les chemins de photos
const photoUrl = (path: string) => path.split('/').map((s, i) => i === 0 ? s : encodeURIComponent(s)).join('/');

const partners = [
  { name: "eedomus",        logo: "/logos/eedomus.png" },
  { name: "Home Assistant", logo: "/logos/homeassistant.svg" },
  { name: "Doorbird",       logo: "/logos/doorbird.png" },
  { name: "Nuki",           logo: "/logos/nuki.svg" },
  { name: "Somfy",          logo: "/logos/somfy.svg" },
  { name: "Basalte",        logo: "/logos/basalte.svg" },
  { name: "Focal",          logo: "/logos/focal.svg" },
  { name: "Google Home",    logo: "/logos/google-home.svg" },
  { name: "Sonos",          logo: "/logos/sonos.svg" },
  { name: "Shelly",         logo: "/logos/shelly.svg" },
  { name: "Fibaro",         logo: "/logos/fibaro.png" },
  { name: "Philips Hue",    logo: "/logos/philipshue.svg" },
  { name: "Netatmo",        logo: "/logos/netatmo.svg" },
  { name: "Ubiquiti",       logo: "/logos/ubiquiti.svg" },
];

const portfolioProjects = [
  {
    title: "Appartement Val de Marne",
    description: "Tablettes Basalte, sonnette & zoning Google Nest",
    tags: ["Basalte", "Google Nest", "Domotique"],
    photos: [
      "/portfolio/Appartement Val de Marne/Ipad Paysage sur support Basalte.JPG",
      "/portfolio/Appartement Val de Marne/Ipad portait sur support Basalte.JPG",
      "/portfolio/Appartement Val de Marne/Sonnette Google Nest.JPG",
      "/portfolio/Appartement Val de Marne/Support Magnetique Ipad Basalte.JPG",
      "/portfolio/Appartement Val de Marne/Zonning Google Nest.JPG",
    ],
  },
  {
    title: "Caméras & WIFI – Paris 16e",
    description: "Installation caméras de surveillance et réseau WIFI professionnel",
    tags: ["Caméras", "WIFI", "Sécurité"],
    photos: [
      "/portfolio/Caméras et WIFI dans un appartement a Paris 16/16cc5bb3-35d5-474e-af00-47fa65da3512.jpg",
      "/portfolio/Caméras et WIFI dans un appartement a Paris 16/3417d16e-2956-4576-b526-b009152740ee.jpg",
      "/portfolio/Caméras et WIFI dans un appartement a Paris 16/98e0ac84-4d58-4a25-9b98-fe29a7f643bf.jpg",
    ],
  },
  {
    title: "Maison de vacances – Bord de mer",
    description: "Serrure Nuki, sonorisation Focal/Sonos et sonnette HomeKit",
    tags: ["Nuki", "Sonos", "HomeKit"],
    photos: [
      "/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Serrure connectée Nuki.JPG",
      "/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Serrure nuki Porte.JPG",
      "/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Kit Nuki.JPG",
      "/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Enceinte Focal sur terrasse avec Ampli Sonos Amp.JPG",
      "/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Sonette connectée Logitech HomeKit et Keypad nuki.JPG",
      "/portfolio/Maison de vacance au bord de la mer (Serrure connectée, Sonorisation terrasses)/Ecran homekit.PNG",
    ],
  },
  {
    title: "Maison de ville Val de Marne",
    description: "Portier vidéo Doorbird encastré et intégration domotique",
    tags: ["Doorbird", "Portier vidéo"],
    photos: [
      "/portfolio/Maison de ville Val de Marne/Portier Doorbird en saillie.JPG",
      "/portfolio/Maison de ville Val de Marne/Portier doorbird encastrable.JPG",
      "/portfolio/Maison de ville Val de Marne/App Doorbird.JPG",
    ],
  },
];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightbox, setLightbox] = useState<{ projectIndex: number; photoIndex: number } | null>(null);
  const [formData, setFormData] = useState({ nom: '', prenom: '', telephone: '', email: '', typeBien: '', projet: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showCallback, setShowCallback] = useState(false);
  const [callbackData, setCallbackData] = useState({ prenom: '', telephone: '' });
  const [callbackStatus, setCallbackStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackStatus('sending');
    const body = new URLSearchParams({
      'entry.35517058': callbackData.prenom,
      'entry.1935145690': callbackData.telephone,
      'entry.1919923735': 'Demande de rappel gratuit',
    });
    try {
      await fetch(GFORM_URL, { method: 'POST', mode: 'no-cors', body });
      setCallbackStatus('success');
      setCallbackData({ prenom: '', telephone: '' });
    } catch {
      setCallbackStatus('idle');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    const body = new URLSearchParams({
      'entry.1073040719': formData.nom,
      'entry.35517058': formData.prenom,
      'entry.1935145690': formData.telephone,
      'entry.2136467962': formData.email,
      'entry.1905246657': formData.typeBien,
      'entry.1919923735': formData.projet,
    });
    try {
      await fetch(GFORM_URL, { method: 'POST', mode: 'no-cors', body });
      setFormStatus('success');
      setFormData({ nom: '', prenom: '', telephone: '', email: '', typeBien: '', projet: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const closeLightbox = () => setLightbox(null);
  const lightboxPrev = () => setLightbox(lb => lb ? {
    ...lb,
    photoIndex: (lb.photoIndex - 1 + portfolioProjects[lb.projectIndex].photos.length) % portfolioProjects[lb.projectIndex].photos.length
  } : null);
  const lightboxNext = () => setLightbox(lb => lb ? {
    ...lb,
    photoIndex: (lb.photoIndex + 1) % portfolioProjects[lb.projectIndex].photos.length
  } : null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services: Service[] = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Votre maison s'adapte à vous",
      description: "Lumières, volets, chauffage... tout se pilote ensemble, simplement."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Jusqu'à 30% d'économies sur vos factures",
      description: "L'énergie ne chauffe plus quand personne n'est là. Les économies arrivent toutes seules."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Dormez tranquille, même en vacances",
      description: "Alertes en temps réel, simulation de présence, caméras connectées. Votre maison veille."
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "La bonne température, toujours",
      description: "Chaud quand vous rentrez, frais quand il le faut. Sans jamais y penser."
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Pilotez tout depuis votre téléphone",
      description: "Un seul écran pour tout contrôler, où que vous soyez dans le monde."
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Remi S",
      role: "Client",
      content: "Nous sommes passé par l'entreprise Deera pour l'intégration Domotique de notre maison et je dois dire que nous somme tres satisfait de leur prestation. Ils sont parfaitement à l'écoute de nos besoins et savent exactement quelles produits nous proposer pour nous satisfaire. Nous avons fait appel à leurs services entre Mars et Août 2023. C'est un vrai plaisir au jour le jour. En plus nous réalisons des économies d'énergies grâce aux scénarios quotidiens. Nous nous sentons en sécurité notamment grâce à la simulation de présence et à la sonnette connecté devant la porte. Bravo , un travail de pro avec une logique à long terme .",
      rating: 5
    },
    {
      name: "Dan S",
      role: "Client",
      content: "Franchement c'est la meilleure société de domotique que j'ai jamais rencontré ! Ils sont sérieux rapide professionnels et d'une grande générosité. Nous avons eu beaucoup de problèmes lors de la réalisation de l'installation à cause de notre installation et tout a été résolu par eux, ils ont prit le temps pour tout !! Je recommande à 100% !",
      rating: 5
    },
    {
      name: "Sebastien G",
      role: "Chef d'entreprise",
      content: "Super boulot. Personne très impliquée et sérieuse. Je recommande à 100% !",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-deera-purple">Accueil</a>
              <a href="#services" className="text-gray-700 hover:text-deera-purple">Services</a>
              <a href="#pourquoi-nous" className="text-gray-700 hover:text-deera-purple">Pourquoi Nous</a>
              <a href="#realisations" className="text-gray-700 hover:text-deera-purple">Réalisations</a>
              <a href="#temoignages" className="text-gray-700 hover:text-deera-purple">Témoignages</a>
              <a href="#contact" className="text-gray-700 hover:text-deera-purple">Contact</a>
            </nav>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#25D366] text-white px-6 py-2 rounded-full hover:bg-[#1ebe5d] transition-colors font-medium"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Nous contacter
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#accueil" className="block text-gray-700 hover:text-deera-purple">Accueil</a>
              <a href="#services" className="block text-gray-700 hover:text-deera-purple">Services</a>
              <a href="#pourquoi-nous" className="block text-gray-700 hover:text-deera-purple">Pourquoi Nous</a>
              <a href="#realisations" className="block text-gray-700 hover:text-deera-purple">Réalisations</a>
              <a href="#temoignages" className="block text-gray-700 hover:text-deera-purple">Témoignages</a>
              <a href="#contact" className="block text-gray-700 hover:text-deera-purple">Contact</a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-2 rounded-full hover:bg-[#1ebe5d] transition-colors font-medium"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Nous contacter
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="accueil" className="pt-20 bg-gradient-to-br from-deera-purple to-deera-blue text-white">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Votre maison qui vous simplifie la vie</h1>
            <p className="text-xl mb-10">Lumières, chauffage, sécurité, volets... On automatise tout pour que vous n'y pensiez plus jamais.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#services"
                className="inline-block bg-white text-deera-purple px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Découvrir nos Solutions
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Discutons de votre projet
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-deera-purple mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <h2 className="text-3xl font-bold text-center mb-2">Nos Marques Partenaires</h2>
          <p className="text-center text-gray-500">Les meilleures technologies pour votre maison intelligente</p>
        </div>
        {/* Infinite marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
          {/* Track — duplicate logos for seamless loop */}
          <div className="animate-marquee flex items-center gap-10 w-max">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-36"
              >
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

      {/* Une journée avec DEERA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Une journée avec DEERA</h2>
          <p className="text-center text-gray-500 mb-14">Voici ce que votre maison fait pour vous, sans que vous n'ayez à lever le petit doigt.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Matin */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <div className="bg-amber-400 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-amber-800">Matin</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                Les lumières s'allument progressivement. Le chauffage était déjà chaud avant votre réveil. Vous commencez la journée bien.
              </p>
            </div>
            {/* Soir */}
            <div className="bg-gradient-to-br from-deera-purple/5 to-deera-blue/5 rounded-2xl p-6 border border-deera-purple/10">
              <div className="bg-deera-purple text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-deera-purple">Soir</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                En approchant de chez vous, les lumières s'allument automatiquement. L'ambiance du salon est déjà réglée à votre goût.
              </p>
            </div>
            {/* Nuit */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-100">
              <div className="bg-slate-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-slate-700">Nuit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                La simulation de présence active, l'alarme se déclenche. Votre maison veille pendant que vous dormez.
              </p>
            </div>
            {/* Vacances */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
              <div className="bg-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-emerald-800">Vacances</h3>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Depuis l'autre bout du monde, vous voyez ce qui se passe chez vous. Alertes en temps réel, contrôle total à distance.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Discutons de votre projet
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="pourquoi-nous" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Nous Choisir</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-deera-purple text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expertise Reconnue</h3>
              <p className="text-gray-600">Plus de 10 ans d'expérience en domotique</p>
            </div>
            <div className="text-center">
              <div className="bg-deera-purple text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Solutions Sur Mesure</h3>
              <p className="text-gray-600">Adaptées à vos besoins spécifiques</p>
            </div>
            <div className="text-center">
              <div className="bg-deera-purple text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support 24/7</h3>
              <p className="text-gray-600">Une équipe à votre écoute</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Témoignages Clients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
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
                {/* Cover photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={photoUrl(project.photos[0])}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Photo count badge */}
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.photos.length} photo{project.photos.length > 1 ? 's' : ''}
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-deera-purple/0 group-hover:bg-deera-purple/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-deera-purple font-semibold px-5 py-2 rounded-full text-sm shadow">
                      Voir la galerie
                    </span>
                  </div>
                </div>
                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-deera-purple/10 text-deera-purple text-xs font-medium px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Discutons de votre projet</h2>
          <p className="text-center text-gray-500 mb-12">Réponse rapide garantie — on vous rappelle dans la journée.</p>
          <div className="max-w-2xl mx-auto">
            {formStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message envoyé !</h3>
                <p className="text-green-700 mb-6">On vous recontacte très vite. En attendant, vous pouvez aussi nous écrire directement sur WhatsApp.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="px-6 py-3 rounded-full border border-green-400 text-green-700 font-medium hover:bg-green-100 transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                  <a
                    href={WHATSAPP_CONTACT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleFormChange}
                        required
                        placeholder="Dupont"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deera-purple/40 focus:border-deera-purple transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleFormChange}
                        required
                        placeholder="Jean"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deera-purple/40 focus:border-deera-purple transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleFormChange}
                        required
                        placeholder="06 12 34 56 78"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deera-purple/40 focus:border-deera-purple transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        placeholder="jean@exemple.fr"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deera-purple/40 focus:border-deera-purple transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de bien *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Appartement', 'Maison', 'Bureau', 'Autre'].map(type => (
                        <label
                          key={type}
                          className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                            formData.typeBien === type
                              ? 'border-deera-purple bg-deera-purple/10 text-deera-purple'
                              : 'border-gray-200 text-gray-600 hover:border-deera-purple/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="typeBien"
                            value={type}
                            checked={formData.typeBien === type}
                            onChange={handleFormChange}
                            className="sr-only"
                            required
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Décrivez votre projet *</label>
                    <textarea
                      name="projet"
                      value={formData.projet}
                      onChange={handleFormChange}
                      required
                      rows={4}
                      placeholder="Ex : Je voudrais automatiser les lumières et les volets de mon appartement de 80m²..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deera-purple/40 focus:border-deera-purple transition-colors resize-none"
                    />
                  </div>
                  {formStatus === 'error' && (
                    <p className="text-red-600 text-sm text-center">Une erreur s'est produite. Essayez via WhatsApp directement.</p>
                  )}
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full bg-deera-purple hover:bg-deera-blue disabled:opacity-60 text-white text-lg font-semibold py-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
                  >
                    {formStatus === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  </button>
                </form>
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-400 text-sm mb-3">Vous préférez une réponse immédiate ?</p>
                  <a
                    href={WHATSAPP_CONTACT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3 rounded-full font-medium transition-colors text-sm"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    Écrire sur WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deera-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DEERA</h3>
              <p className="text-gray-300">Votre maison qui vous simplifie la vie</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#accueil" className="text-gray-300 hover:text-white">Accueil</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white">Services</a></li>
                <li><a href="#pourquoi-nous" className="text-gray-300 hover:text-white">Pourquoi Nous</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>deera.domotique@gmail.com</li>
                <li>+33 7 69 53 77 73</li>
                <li>Paris, France</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Mentions légales</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Politique de confidentialité</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">CGV</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} DEERA. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && (() => {
        const project = portfolioProjects[lightbox.projectIndex];
        const photo = project.photos[lightbox.photoIndex];
        return (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>
            {/* Title + counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white font-semibold">{project.title}</p>
              <p className="text-white/60 text-sm">{lightbox.photoIndex + 1} / {project.photos.length}</p>
            </div>
            {/* Prev */}
            {project.photos.length > 1 && (
              <button
                className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                onClick={e => { e.stopPropagation(); lightboxPrev(); }}
              >
                <ChevronUp className="w-6 h-6 -rotate-90" />
              </button>
            )}
            {/* Photo */}
            <img
              src={photoUrl(photo)}
              alt={project.title}
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            {/* Next */}
            {project.photos.length > 1 && (
              <button
                className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                onClick={e => { e.stopPropagation(); lightboxNext(); }}
              >
                <ChevronUp className="w-6 h-6 rotate-90" />
              </button>
            )}
            {/* Dots */}
            <div className="absolute bottom-6 flex gap-2">
              {project.photos.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i === lightbox.photoIndex ? 'bg-white' : 'bg-white/30'}`}
                  onClick={e => { e.stopPropagation(); setLightbox({ ...lightbox, photoIndex: i }); }}
                />
              ))}
            </div>
          </div>
        );
      })()}

      {/* Floating Callback Tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
        {/* Mini form panel */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showCallback ? 'w-72 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <div className="bg-white rounded-l-2xl shadow-2xl border border-gray-100 p-5 w-72">
            {callbackStatus === 'success' ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">📞</div>
                <p className="font-semibold text-gray-800 mb-1">On vous rappelle !</p>
                <p className="text-gray-500 text-sm mb-4">Sous 24h en jours ouvrés.</p>
                <button
                  onClick={() => { setCallbackStatus('idle'); setShowCallback(false); }}
                  className="text-deera-purple text-sm font-medium hover:underline"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">Rappel gratuit</h3>
                  <button onClick={() => setShowCallback(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-500 text-xs mb-4">Laissez votre numéro, on vous rappelle sous 24h.</p>
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={callbackData.prenom}
                    onChange={e => setCallbackData(p => ({ ...p, prenom: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deera-purple/30 focus:border-deera-purple transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={callbackData.telephone}
                    onChange={e => setCallbackData(p => ({ ...p, telephone: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-deera-purple/30 focus:border-deera-purple transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={callbackStatus === 'sending'}
                    className="w-full bg-deera-purple hover:bg-deera-blue disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                  >
                    {callbackStatus === 'sending' ? 'Envoi...' : 'Je veux être rappelé'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
        {/* Tab button */}
        <button
          onClick={() => { setShowCallback(!showCallback); setCallbackStatus('idle'); }}
          className="bg-deera-purple hover:bg-deera-blue text-white px-3 py-5 rounded-l-xl shadow-lg transition-colors flex flex-col items-center gap-2 flex-shrink-0"
          aria-label="Demander un rappel gratuit"
        >
          <Phone className="w-4 h-4" />
          <span
            className="text-xs font-bold tracking-wider"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Rappel gratuit
          </span>
        </button>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
        aria-label="Contactez-nous sur WhatsApp"
      >
        {/* Tooltip */}
        <span className="hidden group-hover:flex items-center bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-lg whitespace-nowrap border border-gray-100 transition-all">
          Contactez-nous sur WhatsApp
        </span>
        {/* Bouton */}
        <div className="relative">
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
          <div className="relative bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#17a852] transition-colors w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl">
            <WhatsAppIcon className="w-7 h-7 text-white" />
          </div>
        </div>
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 bg-deera-purple text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;
