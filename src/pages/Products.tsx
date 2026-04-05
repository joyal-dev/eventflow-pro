import { useState, useMemo } from "react";
import { getProducts, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import ProductDetailModal from "@/components/ProductDetailModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const products = getProducts();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, category, search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 sm:mb-2">Our Collection</h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Everything you need for a spectacular event.</p>
          </motion.div>

          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CategoryFilter selected={category} onSelect={setCategory} />
              <div className="relative w-full sm:w-64 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow"
                />
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onClick={() => setSelected(product)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ProductDetailModal product={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
}
