import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronUp, Home, Zap, Shield, Thermometer, Phone, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Testimonial, Service } from './types';
import Logo from './components/Logo';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    const encode = (data: Record<string, string>) =>
      Object.entries(data)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <a href="#temoignages" className="text-gray-700 hover:text-deera-purple">Témoignages</a>
              <a href="#contact" className="text-gray-700 hover:text-deera-purple">Contact</a>
            </nav>

            <button className="hidden md:block bg-deera-purple text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors">
              Demander un Devis
            </button>

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
              <a href="#temoignages" className="block text-gray-700 hover:text-deera-purple">Témoignages</a>
              <a href="#contact" className="block text-gray-700 hover:text-deera-purple">Contact</a>
              <button className="w-full bg-deera-purple text-white px-6 py-2 rounded-full hover:bg-opacity-90">
                Demander un Devis
              </button>
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
          <div className="max-w-2xl mx-auto">
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Message envoyé !</h3>
                <p className="text-gray-600 mb-6">Nous vous répondrons dans les plus brefs délais.</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="bg-deera-purple text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form name="contact" data-netlify="true" className="space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 rounded-md px-4 py-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.</span>
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-deera-purple focus:ring focus:ring-deera-purple focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-deera-purple focus:ring focus:ring-deera-purple focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-deera-purple focus:ring focus:ring-deera-purple focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-deera-purple focus:ring focus:ring-deera-purple focus:ring-opacity-50"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full bg-deera-purple text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formStatus === 'loading' ? 'Envoi en cours…' : 'Envoyer'}
                </button>
              </form>
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-deera-purple text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;