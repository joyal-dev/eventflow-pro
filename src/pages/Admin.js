import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, categories } from "@/lib/products";
import { getProductImage } from "@/lib/productImages";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Lock, Image, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ADMIN_PASSWORD = "admin123";

const compressImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new window.Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
                resolve(dataUrl);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        name: "",
        category: "Furniture",
        description: "",
        price: 0,
        priceUnit: "per unit / day",
        image: "",
        galleryImages: [],
        video: "",
        available: true,
    });

    useEffect(() => {
        if (authenticated)
            setProducts(getProducts());
    }, [authenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            toast.success("Welcome, Admin!");
        }
        else {
            toast.error("Incorrect password");
        }
    };

    const resetForm = () => {
        setForm({ name: "", category: "Furniture", description: "", price: 0, priceUnit: "per unit / day", image: "", galleryImages: [], video: "", available: true });
        setEditProduct(null);
    };

    const openAdd = () => {
        resetForm();
        setShowForm(true);
    };

    const openEdit = (p) => {
        setEditProduct(p);
        setForm({ name: p.name, category: p.category, description: p.description, price: p.price, priceUnit: p.priceUnit, image: p.image, galleryImages: Array.isArray(p.galleryImages) ? p.galleryImages : [], video: p.video || "", available: p.available });
        setShowForm(true);
    };

    const handleSave = () => {
        if (!form.name.trim()) {
            toast.error("Name is required");
            return;
        }
        if (editProduct) {
            updateProduct(editProduct.id, form);
            toast.success("Product updated");
        }
        else {
            addProduct(form);
            toast.success("Product added");
        }
        setProducts(getProducts());
        setShowForm(false);
        resetForm();
    };

    const handleDelete = (id) => {
        deleteProduct(id);
        setProducts(getProducts());
        toast.success("Product deleted");
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        try {
            const compressed = await compressImage(file);
            setForm((prev) => ({ ...prev, image: compressed }));
            toast.success("Photo added");
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to process photo");
        }
    };

    const handleGalleryImagesUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length)
            return;
        try {
            const compressedImages = await Promise.all(files.map((file) => compressImage(file)));
            setForm((prev) => ({ ...prev, galleryImages: [...(prev.galleryImages || []), ...compressedImages] }));
            toast.success("Gallery images added");
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to process gallery images");
        }
    };

    if (!authenticated) {
        return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx("div", { className: "flex items-center justify-center pt-24 sm:pt-32 px-4 sm:px-6", children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, className: "w-full max-w-sm", children: _jsxs("div", { className: "bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border", style: { boxShadow: "var(--shadow-lg)" }, children: [_jsx("div", { className: "flex justify-center mb-4 sm:mb-6", children: _jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-secondary flex items-center justify-center", children: _jsx(Lock, { className: "w-5 h-5 sm:w-6 sm:h-6 text-foreground" }) }) }), _jsx("h2", { className: "text-lg sm:text-xl font-bold text-foreground text-center mb-1", children: "Admin Access" }), _jsx("p", { className: "text-xs sm:text-sm text-muted-foreground text-center mb-4 sm:mb-6", children: "Enter password to continue" }), _jsxs("form", { onSubmit: handleLogin, className: "space-y-3 sm:space-y-4", children: [_jsx(Input, { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "rounded-xl" }), _jsx(Button, { type: "submit", className: "w-full rounded-xl bg-foreground text-background hover:bg-foreground/90", children: "Sign In" })] }), _jsx("p", { className: "text-xs text-muted-foreground text-center mt-3 sm:mt-4", children: "Demo password: admin123" })] }) }) })] }));
    }

    const currentImageSrc = form.image || (editProduct ? getProductImage(editProduct.id, "") : null);

    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsxs("main", { className: "pt-20 sm:pt-24 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-foreground", children: "Product Management" }), _jsxs("p", { className: "text-xs sm:text-sm text-muted-foreground mt-1", children: [products.length, " products total"] })] }), _jsxs(Button, { onClick: openAdd, className: "rounded-xl gap-2 bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto", children: [_jsx(Plus, { className: "w-4 h-4" }), " Add Product"] })] }), _jsx("div", { className: "block sm:hidden space-y-3", children: products.map((p) => (_jsxs("div", { className: "bg-card rounded-xl border border-border p-3", style: { boxShadow: "var(--shadow-sm)" }, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: getProductImage(p.id, p.image), alt: p.name, className: "w-12 h-12 rounded-lg object-cover shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-foreground truncate", children: p.name }), _jsx("p", { className: "text-xs text-muted-foreground", children: p.category })] }), _jsxs("div", { className: "text-right shrink-0", children: [_jsxs("p", { className: "text-sm font-bold text-foreground", children: ["$", p.price] }), _jsx("span", { className: `text-[10px] font-medium ${p.available ? "text-success" : "text-destructive"}`, children: p.available ? "Available" : "Unavailable" })] })] }), _jsxs("div", { className: "flex items-center justify-end gap-1 mt-2 pt-2 border-t border-border", children: [_jsx("button", { onClick: () => openEdit(p), className: "p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground", children: _jsx(Pencil, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => handleDelete(p.id), className: "p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] }, p.id))) }), _jsx("div", { className: "hidden sm:block bg-card rounded-2xl border border-border overflow-hidden", style: { boxShadow: "var(--shadow-sm)" }, children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-border bg-secondary/50", children: [_jsx("th", { className: "text-left p-3 md:p-4 font-medium text-muted-foreground", children: "Product" }), _jsx("th", { className: "text-left p-3 md:p-4 font-medium text-muted-foreground hidden md:table-cell", children: "Category" }), _jsx("th", { className: "text-left p-3 md:p-4 font-medium text-muted-foreground", children: "Price" }), _jsx("th", { className: "text-left p-3 md:p-4 font-medium text-muted-foreground hidden lg:table-cell", children: "Status" }), _jsx("th", { className: "text-right p-3 md:p-4 font-medium text-muted-foreground", children: "Actions" })] }) }), _jsx("tbody", { children: products.map((p) => (_jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-secondary/30 transition-colors", children: [_jsx("td", { className: "p-3 md:p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: getProductImage(p.id, p.image), alt: p.name, className: "w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover" }), _jsx("span", { className: "font-medium text-foreground text-xs md:text-sm", children: p.name })] }) }), _jsx("td", { className: "p-3 md:p-4 text-muted-foreground hidden md:table-cell", children: p.category }), _jsxs("td", { className: "p-3 md:p-4 font-medium text-foreground", children: ["$", p.price] }), _jsx("td", { className: "p-3 md:p-4 hidden lg:table-cell", children: _jsx("span", { className: `text-xs font-medium px-2 py-1 rounded-full ${p.available ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`, children: p.available ? "Available" : "Unavailable" }) }), _jsx("td", { className: "p-3 md:p-4 text-right", children: _jsxs("div", { className: "flex items-center justify-end gap-1", children: [_jsx("button", { onClick: () => openEdit(p), className: "p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground", children: _jsx(Pencil, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => handleDelete(p.id), className: "p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }) })] }, p.id))) })] }) }) })] }), _jsx(Dialog, { open: showForm, onOpenChange: (open) => { if (!open) {
                    setShowForm(false);
                    resetForm();
                } }, children: _jsxs(DialogContent, { className: "max-w-[95vw] sm:max-w-lg rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsxs(React.Fragment, { children: [_jsx(DialogTitle, { children: editProduct ? "Edit Product" : "Add Product" }), _jsx(DialogDescription, { className: "sr-only", children: editProduct ? "Edit the selected product details and gallery images." : "Create a new product entry with images and availability details." })] }) }), _jsxs("div", { className: "space-y-3 sm:space-y-4 mt-2", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Name" }), _jsx(Input, { value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), className: "rounded-xl" })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Category" }), _jsxs(Select, { value: form.category, onValueChange: (v) => setForm({ ...form, category: v }), children: [_jsx(SelectTrigger, { className: "rounded-xl", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: categories.filter((c) => c !== "All").map((c) => (_jsx(SelectItem, { value: c, children: c }, c))) })] })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Description" }), _jsx(Textarea, { value: form.description, onChange: (e) => setForm({ ...form, description: e.target.value }), className: "rounded-xl", rows: 3 })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Price ($)" }), _jsx(Input, { type: "number", value: form.price, onChange: (e) => setForm({ ...form, price: Number(e.target.value) }), className: "rounded-xl" })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-xs text-muted-foreground mb-1.5 block", children: "Price Unit" }), _jsx(Input, { value: form.priceUnit, onChange: (e) => setForm({ ...form, priceUnit: e.target.value }), className: "rounded-xl" })] })] }), 
            _jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4", children: [
                _jsxs("div", { className: "space-y-1.5", children: [
                    _jsx(Label, { className: "text-xs text-muted-foreground block", children: "Product Image" }),
                    currentImageSrc ? (
                        _jsxs("div", { className: "relative aspect-video rounded-xl overflow-hidden border border-border bg-secondary flex items-center justify-center", children: [
                            _jsx("img", { src: currentImageSrc, alt: "Preview", className: "w-full h-full object-cover" }),
                            _jsxs("div", { className: "absolute bottom-1 right-1 flex gap-1", children: [
                                _jsxs("label", { className: "p-1 rounded bg-background/80 hover:bg-background text-[10px] text-muted-foreground hover:text-foreground cursor-pointer border border-border transition-colors flex items-center justify-center", children: [
                                    _jsx(Upload, { className: "w-3 h-3" }),
                                    _jsx("input", { type: "file", accept: "image/*", onChange: handleImageUpload, className: "hidden" })
                                ] }),
                                form.image && _jsx("button", { type: "button", onClick: () => setForm((prev) => ({ ...prev, image: "" })), className: "p-1 rounded bg-background/80 hover:bg-background text-muted-foreground hover:text-destructive border border-border transition-colors", children: _jsx(X, { className: "w-3 h-3" }) })
                            ] })
                        ] })
                    ) : (
                        _jsxs("label", { className: "flex flex-col items-center justify-center aspect-video rounded-xl border border-dashed border-muted-foreground/30 hover:border-foreground/50 bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-all p-3 text-center", children: [
                            _jsx(Image, { className: "w-5 h-5 text-muted-foreground mb-1" }),
                            _jsx("span", { className: "text-[10px] font-medium text-muted-foreground", children: "Upload Photo" }),
                            _jsx("span", { className: "text-[8px] text-muted-foreground/75 mt-0.5", children: "Gallery or Camera" }),
                            _jsx("input", { type: "file", accept: "image/*", onChange: handleImageUpload, className: "hidden" })
                        ] })
                    )
                ] }),
                _jsxs("div", { className: "space-y-1.5", children: [
                    _jsx(Label, { className: "text-xs text-muted-foreground block", children: "Gallery Images" }),
                    form.galleryImages && form.galleryImages.length > 0 ? (
                        _jsxs("div", { className: "space-y-2", children: [
                            _jsx("div", { className: "grid grid-cols-2 gap-2", children: form.galleryImages.map((src, index) => (_jsxs("div", { className: "relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary", children: [_jsx("img", { src: src, alt: `Gallery ${index + 1}`, className: "h-full w-full object-cover" }), _jsx("button", { type: "button", onClick: () => setForm((prev) => ({ ...prev, galleryImages: prev.galleryImages.filter((_, itemIndex) => itemIndex !== index) })), className: "absolute right-1 top-1 rounded-full bg-background/80 p-1 text-muted-foreground transition hover:text-destructive", children: _jsx(X, { className: "h-3 w-3" }) })] }, index))) }),
                            _jsxs("label", { className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-muted-foreground/30 bg-secondary/30 p-3 text-center transition hover:border-foreground/50 hover:bg-secondary/50", children: [_jsx(Upload, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-[10px] font-medium text-muted-foreground", children: "Add more images from gallery" }), _jsx("input", { type: "file", accept: "image/*", multiple: true, onChange: handleGalleryImagesUpload, className: "hidden" })] })
                        ] })
                    ) : (
                        _jsxs("label", { className: "flex flex-col items-center justify-center aspect-video rounded-xl border border-dashed border-muted-foreground/30 bg-secondary/30 p-3 text-center transition hover:border-foreground/50 hover:bg-secondary/50 cursor-pointer", children: [_jsx(Image, { className: "mb-1 h-5 w-5 text-muted-foreground" }), _jsx("span", { className: "text-[10px] font-medium text-muted-foreground", children: "Upload images from mobile gallery" }), _jsx("span", { className: "mt-0.5 text-[8px] text-muted-foreground/75", children: "Select one or more photos" }), _jsx("input", { type: "file", accept: "image/*", multiple: true, onChange: handleGalleryImagesUpload, className: "hidden" })] })
                    )
                ] })
            ] }),
            _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Switch, { checked: form.available, onCheckedChange: (v) => setForm({ ...form, available: v }) }), _jsx(Label, { className: "text-sm", children: "Available for rent" })] }), 
            _jsx(Button, { onClick: handleSave, className: "w-full rounded-xl bg-foreground text-background hover:bg-foreground/90", children: editProduct ? "Save Changes" : "Add Product" })
        ] })] }) })] }));
}
