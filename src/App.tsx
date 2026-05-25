import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronUp, Home, Zap, Shield, Thermometer, Phone, Star } from 'lucide-react';
import { Testimonial, Service } from './types';
import Logo from './components/Logo';

const WHATSAPP_URL = 'https://wa.me/message/JEQTCLRQLN5SF1';

// Encode les espaces dans les chemins de photos
const photoUrl = (path: string) => path.split('/').map((s, i) => i === 0 ? s : encodeURIComponent(s)).join('/');

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
      title: "Domotique Résidentielle",
      description: "Solutions intelligentes pour votre maison"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Gestion Énergétique",
      description: "Optimisez votre consommation d'énergie"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité Connectée",
      description: "Protection intelligente 24/7"
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Contrôle Climatique",
      description: "Température idéale en tout temps"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Contrôle à Distance",
      description: "Pilotez votre maison où que vous soyez"
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
            <h1 className="text-5xl font-bold mb-6">DEERA - Votre Maison Intelligente</h1>
            <p className="text-xl mb-8">L'intelligence au service de votre confort</p>
            <button className="bg-white text-deera-purple px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
              Découvrir nos Solutions
            </button>
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
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Contactez-nous</h2>
          <p className="text-center text-gray-500 mb-12">Discutons de votre projet directement sur WhatsApp</p>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
              {/* Icône WhatsApp */}
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
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deera-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DEERA</h3>
              <p className="text-gray-300">L'intelligence au service de votre confort</p>
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