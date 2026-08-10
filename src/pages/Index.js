import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal.jsx";
import { getProducts } from "@/lib/products";
import { ArrowRight, Sparkles, Truck, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";
const features = [
    { icon: Sparkles, title: "Premium Quality", desc: "Curated, well-maintained equipment for flawless events." },
    { icon: Truck, title: "Delivery & Setup", desc: "We deliver and set up everything at your venue." },
    { icon: HeadphonesIcon, title: "24/7 Support", desc: "Dedicated event support whenever you need us." },
];
export default function Index() {
    const [selected, setSelected] = useState(null);
    const featured = getProducts().filter((p) => p.featured).slice(0, 6);
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx(HeroSection, {}), _jsx("section", { className: "py-12 sm:py-16 md:py-20 bg-secondary/30", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8", children: features.map((f, i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.1 }, className: "text-center", children: [_jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-foreground/5 flex items-center justify-center mx-auto mb-3 sm:mb-4", children: _jsx(f.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-foreground" }) }), _jsx("h3", { className: "text-sm sm:text-base font-semibold text-foreground mb-1", children: f.title }), _jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: f.desc })] }, f.title))) }) }) }), _jsx("section", { className: "py-12 sm:py-16 md:py-20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex items-end justify-between mb-6 sm:mb-8 md:mb-10", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-foreground", children: "Featured Rentals" }), _jsx("p", { className: "text-sm sm:text-base text-muted-foreground mt-1", children: "Our most popular event essentials." })] }), _jsxs(Link, { to: "/products", className: "hidden md:flex items-center gap-1 text-sm font-medium text-foreground hover:text-brand transition-colors", children: ["View all ", _jsx(ArrowRight, { className: "w-4 h-4" })] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: featured.map((product, i) => (_jsx(ProductCard, { product: product, index: i, onClick: () => setSelected(product) }, product.id))) }), _jsx("div", { className: "mt-6 sm:mt-8 text-center md:hidden", children: _jsx(Link, { to: "/products", className: "text-sm font-medium text-foreground", children: "View all products \u2192" }) })] }) }), _jsx(Footer, {}), _jsx(ProductDetailModal, { product: selected, open: !!selected, onClose: () => setSelected(null) })] }));
}
