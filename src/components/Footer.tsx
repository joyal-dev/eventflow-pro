import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Event<span className="text-brand">Luxe</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium event rental equipment for unforgettable occasions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Contact</h4>
            <p className="text-sm text-muted-foreground">info@eventluxe.com</p>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">© 2026 EventLuxe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
