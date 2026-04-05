import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { getProductImage } from "@/lib/productImages";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  index: number;
  onClick?: () => void;
}

export default function ProductCard({ product, index, onClick }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="product-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={getProductImage(product.id, product.image)}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
          <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug">{product.name}</h3>
          {!product.available && (
            <Badge variant="secondary" className="text-[10px] sm:text-xs shrink-0">Unavailable</Badge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">{product.description}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-lg font-bold text-foreground">${product.price}</span>
          <span className="text-[10px] sm:text-xs text-muted-foreground">/ {product.priceUnit}</span>
        </div>
      </div>
    </motion.div>
  );
}
