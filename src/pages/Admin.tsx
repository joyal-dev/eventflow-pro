import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, categories, type Product } from "@/lib/products";
import { getProductImage } from "@/lib/productImages";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Lock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ADMIN_PASSWORD = "admin123";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Furniture",
    description: "",
    price: 0,
    priceUnit: "per unit / day",
    image: "",
    available: true,
  });

  useEffect(() => {
    if (authenticated) setProducts(getProducts());
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      toast.success("Welcome, Admin!");
    } else {
      toast.error("Incorrect password");
    }
  };

  const resetForm = () => {
    setForm({ name: "", category: "Furniture", description: "", price: 0, priceUnit: "per unit / day", image: "", available: true });
    setEditProduct(null);
  };

  const openAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, category: p.category, description: p.description, price: p.price, priceUnit: p.priceUnit, image: p.image, available: p.available });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    if (editProduct) {
      updateProduct(editProduct.id, form);
      toast.success("Product updated");
    } else {
      addProduct(form);
      toast.success("Product added");
    }
    setProducts(getProducts());
    setShowForm(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts());
    toast.success("Product deleted");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-24 sm:pt-32 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm"
          >
            <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border" style={{ boxShadow: "var(--shadow-lg)" }}>
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-secondary flex items-center justify-center">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground text-center mb-1">Admin Access</h2>
              <p className="text-xs sm:text-sm text-muted-foreground text-center mb-4 sm:mb-6">Enter password to continue</p>
              <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl"
                />
                <Button type="submit" className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90">
                  Sign In
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-3 sm:mt-4">Demo password: admin123</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Product Management</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{products.length} products total</p>
          </div>
          <Button onClick={openAdd} className="rounded-xl gap-2 bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>

        {/* Mobile card view */}
        <div className="block sm:hidden space-y-3">
          {products.map((p) => (
            <div key={p.id} className="bg-card rounded-xl border border-border p-3" style={{ boxShadow: "var(--shadow-sm)" }}>
              <div className="flex items-center gap-3">
                <img
                  src={getProductImage(p.id, p.image)}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">${p.price}</p>
                  <span className={`text-[10px] font-medium ${p.available ? "text-success" : "text-destructive"}`}>
                    {p.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 mt-2 pt-2 border-t border-border">
                <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table view */}
        <div className="hidden sm:block bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-3 md:p-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left p-3 md:p-4 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                  <th className="text-left p-3 md:p-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-left p-3 md:p-4 font-medium text-muted-foreground hidden lg:table-cell">Status</th>
                  <th className="text-right p-3 md:p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-3 md:p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={getProductImage(p.id, p.image)}
                          alt={p.name}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-foreground text-xs md:text-sm">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-3 md:p-4 text-muted-foreground hidden md:table-cell">{p.category}</td>
                    <td className="p-3 md:p-4 font-medium text-foreground">${p.price}</td>
                    <td className="p-3 md:p-4 hidden lg:table-cell">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.available ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                        {p.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Dialog open={showForm} onOpenChange={(open) => { if (!open) { setShowForm(false); resetForm(); } }}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 sm:space-y-4 mt-2">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c !== "All").map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-xl" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Price ($)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="rounded-xl" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Price Unit</Label>
                <Input value={form.priceUnit} onChange={(e) => setForm({ ...form, priceUnit: e.target.value })} className="rounded-xl" />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Image URL (optional)</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="rounded-xl" placeholder="https://..." />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.available} onCheckedChange={(v) => setForm({ ...form, available: v })} />
              <Label className="text-sm">Available for rent</Label>
            </div>
            <Button onClick={handleSave} className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90">
              {editProduct ? "Save Changes" : "Add Product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
