import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-event.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Elegant event setup" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1] mb-6">
            Make Every Event
            <br />
            <span className="text-brand">Unforgettable.</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            Premium rental equipment for weddings, galas, corporate events, and celebrations. Curated quality, delivered to your venue.
          </p>
          <Link to="/products">
            <Button size="lg" className="rounded-2xl gap-2 px-8 bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-semibold">
              Browse Collection
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
