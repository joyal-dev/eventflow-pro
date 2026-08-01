import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { categories } from "@/lib/products";
import { motion } from "framer-motion";
export default function CategoryFilter({ selected, onSelect }) {
    return (_jsx("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: categories.map((cat) => (_jsxs("button", { key: cat, onClick: () => onSelect(cat), className: `relative px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${selected === cat
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`, children: [selected === cat && (_jsx(motion.div, { layoutId: "category-pill", className: "absolute inset-0 rounded-full bg-foreground", transition: { type: "spring", bounce: 0.2, duration: 0.4 } })), _jsx("span", { className: "relative z-10", children: cat })] }, cat))) }));
}
