import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { getProducts } from "@/lib/products";
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
    const [selected, setSelected] = useState(null);
    const products = getProducts();
    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchCat = category === "All" || p.category === category;
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase());
            return matchCat && matchSearch;
        });
    }, [products, category, search]);
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx("main", { className: "pt-20 sm:pt-24 pb-12 sm:pb-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 sm:mb-2", children: "Our Collection" }), _jsx("p", { className: "text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8", children: "Everything you need for a spectacular event." })] }), _jsx("div", { className: "flex flex-col gap-4 mb-6 sm:mb-8", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsx(CategoryFilter, { selected: category, onSelect: setCategory }), _jsxs("div", { className: "relative w-full sm:w-64 md:w-72", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search products...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-foreground/10 transition-shadow" })] })] }) }), filtered.length === 0 ? (_jsx("div", { className: "text-center py-16 sm:py-20", children: _jsx("p", { className: "text-muted-foreground", children: "No products found." }) })) : (_jsx("div", { className: "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6", children: filtered.map((product, i) => (_jsx(ProductCard, { product: product, index: i, onClick: () => setSelected(product) }, product.id))) }))] }) }), _jsx(Footer, {}), _jsx(ProductDetailModal, { product: selected, open: !!selected, onClose: () => setSelected(null) })] }));
}
