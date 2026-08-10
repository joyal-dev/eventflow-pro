import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductImage } from "@/lib/productImages";
import { CheckCircle, XCircle, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext.jsx";

export default function ProductDetailModal({ product, open, onClose }) {
  const { addToCart } = useCart();
  if (!product) return null;

  const galleryImages = Array.isArray(product.galleryImages) ? product.galleryImages : [];
  const mainImage = product.image || galleryImages[0] || "";
  const [selectedImage, setSelectedImage] = useState(mainImage);

  useEffect(() => {
    setSelectedImage(mainImage);
  }, [mainImage]);

  const thumbnails = Array.from(new Set([...(mainImage ? [mainImage] : []), ...galleryImages.filter(Boolean)]));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-2xl p-0 overflow-hidden rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        <div className="bg-secondary">
          <div className="aspect-[4/3] sm:aspect-video overflow-hidden">
            <img src={getProductImage(product.id, selectedImage)} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {thumbnails.length > 1 && (
            <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-secondary/50">
              {thumbnails.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(src)}
                  className={`rounded-lg overflow-hidden border-2 ${selectedImage === src ? "border-foreground" : "border-transparent"}`}>
                  <img src={getProductImage(product.id, src)} alt={`${product.name} thumb ${i + 1}`} className="h-16 w-16 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">{product.name}</DialogTitle>
            <DialogDescription className="sr-only">{`Details for ${product.name}. Category: ${product.category}. Price: ${product.price} ${product.priceUnit}.`}</DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] sm:text-xs">{product.category}</Badge>
            {product.available ? (
              <span className="flex items-center gap-1 text-[10px] sm:text-xs text-success font-medium">
                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Available
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] sm:text-xs text-destructive font-medium">
                <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Unavailable
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          {galleryImages.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-foreground">More images</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {galleryImages.map((src, index) => (
                  <div key={index} className="overflow-hidden rounded-2xl bg-secondary aspect-square">
                    <img src={getProductImage(product.id, src)} alt={`${product.name} image ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-foreground">${product.price}</span>
            <span className="text-xs sm:text-sm text-muted-foreground">/ {product.priceUnit}</span>
          </div>

          <Button size="lg" disabled={!product.available} onClick={() => addToCart(product.id)} className="w-full rounded-xl sm:rounded-2xl gap-2 bg-foreground text-background hover:bg-foreground/90 text-sm sm:text-base disabled:pointer-events-none disabled:opacity-60">
            <ShoppingCart className="w-4 h-4" /> Add to cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
