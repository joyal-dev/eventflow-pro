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
    return (_jsxs("div", { className: "min-h-screen bg-transparent", children: [_jsx(Navbar, {}), _jsx("main", { className: "px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-7xl", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "mb-8 rounded-[32px] border border-border/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8", children: [_jsx("h1", { className: "mb-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl", children: "Our Collection" }), _jsx("p", { className: "text-base text-muted-foreground", children: "Everything you need for a spectacular event." })] }), _jsx("div", { className: "mb-8 flex flex-col gap-4 rounded-[24px] border border-border/70 bg-white/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5", children: [_jsx(CategoryFilter, { selected: category, onSelect: setCategory }), _jsxs("div", { className: "relative w-full sm:w-72", children: [_jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search products...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full rounded-2xl border border-border bg-[#f9f6f0] py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" })] })] }), filtered.length === 0 ? (_jsx("div", { className: "rounded-[24px] border border-dashed border-border bg-white/70 py-16 text-center shadow-sm", children: _jsx("p", { className: "text-muted-foreground", children: "No products found." }) })) : (_jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: filtered.map((product, i) => (_jsx(ProductCard, { product: product, index: i, onClick: () => setSelected(product) }, product.id))) }))] }) }), _jsx(Footer, {}), _jsx(ProductDetailModal, { product: selected, open: !!selected, onClose: () => setSelected(null) })] }));
}
