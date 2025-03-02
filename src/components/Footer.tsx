
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ocean-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Macros Speed</h3>
            <p className="text-ocean-light">
              Your trusted partner for speedboat transfers in the Maldives.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-ocean-light transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-ocean-light transition-colors">Services</a></li>
              <li><a href="#booking" className="hover:text-ocean-light transition-colors">Book Now</a></li>
              <li><a href="#contact" className="hover:text-ocean-light transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>Airport Transfers</li>
              <li>Resort Transfers</li>
              <li>Island Hopping</li>
              <li>Private Charters</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/macros.speed" className="hover:text-ocean-light transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/macros.speed" className="hover:text-ocean-light transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Macros Speed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
