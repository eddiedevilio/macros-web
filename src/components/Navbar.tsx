import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCall = () => {
    window.location.href = "tel:+9607752330"; 
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ocean-dark backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Text */}
          <a href="/" className="flex items-center space-x-2">
            <img className="w-16" src="images/logo.png" alt="Macros Speed Logo" />
            <span className="text-white font-bold text-xl">Macros Speed</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-ocean-light transition-colors">Home</a>
            <a href="#services" className="text-white hover:text-ocean-light transition-colors">Services</a>
            <a href="#destinations" className="text-white hover:text-ocean-light transition-colors">Destinations</a>
            <a href="#contact" className="text-white hover:text-ocean-light transition-colors">Contact</a>
            <Button 
              variant="outline" 
              className="bg-green-600 hover:bg-green-300 transition-colors duration-300 rounded-xl"
              onClick={handleCall}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 text-white hover:bg-white/20 border-white/20 rounded-xl"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <a href="#" className="text-white hover:text-ocean-light transition-colors">Home</a>
              <a href="#services" className="text-white hover:text-ocean-light transition-colors">Services</a>
              <a href="#destinations" className="text-white hover:text-ocean-light transition-colors">Destinations</a>
              <a href="#contact" className="text-white hover:text-ocean-light transition-colors">Contact</a>
              <Button 
                variant="outline" 
                className="bg-white/10 text-white hover:bg-white/20 border-white/20"
                onClick={handleCall}
              >
                Call
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/10 text-white hover:bg-white/20 border-white/20"
                onClick={() => {
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}