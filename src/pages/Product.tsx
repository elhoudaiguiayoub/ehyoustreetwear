import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const SIZES = ["S", "M", "L", "XL"] as const;
type Size = (typeof SIZES)[number];

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [size, setSize] = useState<Size>("M");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container">
        <h1>Produit introuvable</h1>
        <p className="muted">Ce produit n’existe pas (ou a été retiré).</p>
        <Link to="/shop" className="btn" style={{ display: "inline-block", marginTop: 12 }}>
          Retour boutique
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: 14 }}>
        <Link to="/shop" className="muted">
          ← Retour boutique
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        {/* Image */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              borderRadius: 14,
              background: "#111",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="card">
          <span className="badge">{product.category}</span>

          <h1 style={{ marginTop: 12, marginBottom: 6, fontSize: 34 }}>
            {product.name}
          </h1>

          <div style={{ fontWeight: 900, fontSize: 18 }}>${product.price}</div>

          <p className="muted" style={{ marginTop: 10, lineHeight: 1.6 }}>
            Premium streetwear cut. Clean fit. Limited drops.  
            (Demo product page — we’ll replace this with real copy later.)
          </p>

          {/* Size selector */}
          <div style={{ marginTop: 14 }}>
            <div className="muted" style={{ marginBottom: 8 }}>
              Size
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SIZES.map((s) => {
                const active = s === size;
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid #222",
                      background: active ? "#00ff66" : "transparent",
                      color: active ? "#000" : "#f5f5f5",
                      fontWeight: 800,
                      cursor: "pointer",
                      minWidth: 54,
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
              Fit: true to size • Model: 180cm wearing M (demo)
            </div>
          </div>

          {/* CTA */}
          <button
            className="btn"
            onClick={handleAdd}
            style={{ marginTop: 16, width: "100%" }}
          >
            {added ? "Added ✓" : `Add to cart — ${size}`}
          </button>

          <div style={{ marginTop: 12 }}>
            <Link to="/cart" className="muted">
              Aller au panier →
            </Link>
          </div>

          <hr style={{ borderColor: "#222", margin: "16px 0" }} />

          {/* Extra info */}
          <div style={{ display: "grid", gap: 8 }}>
            <div className="muted">• Shipping: 2–5 business days (demo)</div>
            <div className="muted">• Returns: 14 days (demo)</div>
            <div className="muted">• Material: premium cotton (demo)</div>
          </div>
        </div>
      </div>

      {/* Responsive fallback */}
      <style>{`
        @media (max-width: 900px) {
          .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
