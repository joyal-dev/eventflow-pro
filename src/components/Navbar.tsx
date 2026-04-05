import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        <Link to="/" className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
          Event<span className="text-brand">Luxe</span>
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Products
          </Link>
          <Link to="/admin" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ShieldCheck className="w-4 h-4" />
            Admin
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="px-4 sm:px-6 py-4 flex flex-col gap-3">
              <Link to="/" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground py-2">Home</Link>
              <Link to="/products" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground py-2">Products</Link>
              <Link to="/admin" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground py-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
