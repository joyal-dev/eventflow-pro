import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { getProductImage } from "@/lib/productImages";
import { CheckCircle, XCircle, Mail } from "lucide-react";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, open, onClose }: Props) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl">
        <div className="aspect-video overflow-hidden bg-secondary">
          <img
            src={getProductImage(product.id, product.image)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">{product.category}</Badge>
            {product.available ? (
              <span className="flex items-center gap-1 text-xs text-success font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Available
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-destructive font-medium">
                <XCircle className="w-3.5 h-3.5" /> Unavailable
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-foreground">${product.price}</span>
            <span className="text-sm text-muted-foreground">/ {product.priceUnit}</span>
          </div>
          <Button size="lg" className="w-full rounded-2xl gap-2 bg-foreground text-background hover:bg-foreground/90">
            <Mail className="w-4 h-4" />
            Inquire to Rent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
