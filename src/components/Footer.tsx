import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logo from "@/assets/logo_33_11zon.webp";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Aqua2Promo" className="h-12 w-12" />
              <span className="text-xl font-bold text-white">Aqua2Promo</span>
            </div>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
              Lucknow's premier customized water bottle brand. Quality, customization, and sustainability in every bottle.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-primary transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/try3d" className="text-sm hover:text-primary transition-colors">Customize Bottle</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-sm">Custom Label Design</li>
              <li className="text-sm">Bulk Orders for Hotels</li>
              <li className="text-sm">Restaurant Branding</li>
              <li className="text-sm">Event Customization</li>
              <li className="text-sm">Premium Packaging</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm">9b, 169B, Vrindavan Colony, Lucknow, Uttar Pradesh 226029</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-sm">+91 8858146872</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-sm">aqua2promo@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} Aqua2Promo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
