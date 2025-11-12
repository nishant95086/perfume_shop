import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: "Facebook" },
    { name: "Instagram" },
    { name: "Twitter" },
    { name: "Pinterest" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-8 h-8 text-pink-400" />
              <span className="text-2xl font-bold font-serif">
                Perfume Shop
              </span>
            </div>
            <p className="text-gray-400">
              Your destination for luxury fragrances and signature scents.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["About Us", "Contact", "Shipping Info", "Returns"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-gray-400 hover:text-pink-400 block"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="text-gray-400 hover:text-pink-400 block"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Perfume Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
