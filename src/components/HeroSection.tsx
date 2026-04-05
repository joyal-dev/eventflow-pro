import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-event.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Elegant event setup" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/20 sm:from-foreground/70 sm:via-foreground/40 sm:to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-md sm:max-w-lg md:max-w-xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-primary-foreground leading-[1.1] mb-4 sm:mb-6">
            Make Every Event
            <br />
            <span className="text-brand">Unforgettable.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-6 sm:mb-8 leading-relaxed max-w-sm sm:max-w-md md:max-w-lg">
            Premium rental equipment for weddings, galas, corporate events, and celebrations. Curated quality, delivered to your venue.
          </p>
          <Link to="/products">
            <Button size="lg" className="rounded-2xl gap-2 px-6 sm:px-8 text-sm sm:text-base bg-primary-foreground text-foreground hover:bg-primary-foreground/90 font-semibold">
              Browse Collection
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
