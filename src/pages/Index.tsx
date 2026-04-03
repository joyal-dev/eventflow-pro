import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import { getProducts, type Product } from "@/lib/products";
import { ArrowRight, Sparkles, Truck, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Sparkles, title: "Premium Quality", desc: "Curated, well-maintained equipment for flawless events." },
  { icon: Truck, title: "Delivery & Setup", desc: "We deliver and set up everything at your venue." },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Dedicated event support whenever you need us." },
];

export default function Index() {
  const [selected, setSelected] = useState<Product | null>(null);
  const featured = getProducts().filter((p) => p.featured).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Rentals</h2>
              <p className="text-muted-foreground mt-1">Our most popular event essentials.</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-1 text-sm font-medium text-foreground hover:text-brand transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onClick={() => setSelected(product)} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="text-sm font-medium text-foreground">
              View all products →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ProductDetailModal product={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
}
