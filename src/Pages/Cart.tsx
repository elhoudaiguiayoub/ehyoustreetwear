import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const SHIPPING_ESTIMATE = 9;

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  const shipping = cart.length > 0 ? SHIPPING_ESTIMATE : 0;
  const grandTotal = total + shipping;

  if (cart.length === 0) {
    return (
      <div className="container">
        <h1>Panier</h1>
        <p className="muted">Ton panier est vide.</p>
        <Link to="/shop" className="btn" style={{ display: "inline-block", marginTop: 12 }}>
          Continuer les achats
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Panier</h1>

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 18,
          alignItems: "start",
        }}
      >
        {/* Items */}
        <div style={{ display: "grid", gap: 12 }}>
          {cart.map((p) => (
            <div key={p.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{p.name}</strong>
                  <div className="muted" style={{ marginTop: 4 }}>
                    ${p.price} / item
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="number"
                    min={1}
                    value={p.qty}
                    onChange={(e) => updateQty(p.id, Number(e.target.value))}
                    style={{
                      width: 70,
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid #222",
                      background: "#0b0b0b",
                      color: "#f5f5f5",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={() => removeFromCart(p.id)}
                    style={{
                      border: "1px solid #222",
                      background: "transparent",
                      color: "#f5f5f5",
                      padding: "10px 12px",
                      borderRadius: 12,
                      cursor: "pointer",
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="card">
          <h3>Résumé</h3>

          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="muted">Sous-total</span>
              <span>${total}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="muted">Shipping (est.)</span>
              <span>${shipping}</span>
            </div>

            <hr style={{ borderColor: "#222", margin: "10px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900 }}>
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="btn"
            style={{ display: "block", marginTop: 14, textAlign: "center" }}
          >
            Checkout →
          </Link>

          <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
            Taxes calculated at checkout (demo)
          </div>
        </div>
      </div>

      {/* Responsive */}
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
