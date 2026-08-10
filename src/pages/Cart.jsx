import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext.jsx";
import { getProductImage } from "@/lib/productImages";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cartProducts, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = useMemo(() => {
    return cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
  }, [cartProducts]);

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-[32px] border border-border/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8"
        >
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Your Cart
          </h1>
          <p className="text-base text-muted-foreground">Review the items you plan to rent.</p>
        </motion.div>

        {cartProducts.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-border bg-white/70 py-16 text-center shadow-sm">
            <p className="text-muted-foreground">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
            <div className="space-y-4">
              {cartProducts.map((product) => (
                <div key={product.id} className="overflow-hidden rounded-[28px] border border-border/70 bg-white/90 p-4 shadow-sm">
                  <div className="flex gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-3xl bg-secondary">
                      <img
                        src={getProductImage(product.id, product.image || product.galleryImages?.[0] || "")}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-foreground">{product.name}</h2>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <p className="text-base font-semibold text-foreground">
                          ${product.price} / {product.priceUnit}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Qty</span>
                          <Input
                            type="number"
                            min={1}
                            value={product.quantity}
                            onChange={(e) => updateQuantity(product.id, Math.max(1, Number(e.target.value)))}
                            className="w-20 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button variant="secondary" onClick={() => removeFromCart(product.id)} className="rounded-xl">
                      Remove
                    </Button>
                    <p className="text-sm text-muted-foreground">Subtotal: ${product.price * product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <aside className="rounded-[28px] border border-border/70 bg-white/90 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">Order summary</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Total items: {cartProducts.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">${total}</p>
              <Button onClick={clearCart} variant="secondary" className="mt-6 w-full rounded-xl">
                Clear cart
              </Button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
