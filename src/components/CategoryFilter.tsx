import { categories } from "@/lib/products";
import { motion } from "framer-motion";

interface Props {
  selected: string;
  onSelect: (cat: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`relative px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
            selected === cat
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          {selected === cat && (
            <motion.div
              layoutId="category-pill"
              className="absolute inset-0 rounded-full bg-foreground"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  );
}
