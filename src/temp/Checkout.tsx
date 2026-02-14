import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();

  const shipping = cart.length > 0 ? 9 : 0;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postal: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const isValid = useMemo(() => {
    if (cart.length === 0) return false;
    return (
      form.fullName.trim().length >= 2 &&
      form.email.trim().includes("@") &&
      form.address.trim().length >= 4 &&
      form.city.trim().length >= 2 &&
      form.postal.trim().length >= 3
    );
  }, [form, cart.length]);

  if (cart.length === 0) {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <p className="muted">Ton panier est vide.</p>
        <Link to="/shop" className="btn" style={{ display: "inline-block", marginTop: 12 }}>
          Aller à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: 14 }}>
        <Link to="/cart" className="muted">
          ← Retour panier
        </Link>
      </div>

      <h1 style={{ margin: 0 }}>Checkout</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Demo checkout — no real payment.
      </p>

      <div
        className="checkout-grid"
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 18,
          alignItems: "start",
        }}
      >
        {/* Form */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Shipping</h3>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <Field
              label="Full name"
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              placeholder="Ayoub Elhoudegui"
            />
            <Field
              label="Email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="name@email.com"
            />
            <Field
              label="Address"
              name="address"
              value={form.address}
              onChange={onChange}
              placeholder="123 Main St"
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={onChange}
                placeholder="Vancouver"
              />
              <Field
                label="Postal"
                name="postal"
                value={form.postal}
                onChange={onChange}
                placeholder="V5K 0A1"
              />
            </div>
          </div>

          <button
            className="btn"
            disabled={!isValid}
            onClick={() => {
              clearCart();
              navigate("/confirmed");
            }}
            style={{
              marginTop: 14,
              width: "100%",
              opacity: isValid ? 1 : 0.45,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            Place order
          </button>

          <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
            By placing an order, you agree to demo terms.
          </div>
        </div>

        {/* Summary */}
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Summary</h3>

          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            {cart.map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  alignItems: "baseline",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.name}
                  </div>
                  <div className="muted" style={{ fontSize: 12 }}>
                    ${p.price} × {p.qty}
                  </div>
                </div>
                <div style={{ fontWeight: 800 }}>${p.price * p.qty}</div>
              </div>
            ))}
          </div>

          <hr style={{ borderColor: "#222", margin: "14px 0" }} />

          <div style={{ display: "grid", gap: 8 }}>
            <Row label="Subtotal" value={`$${total}`} />
            <Row label="Shipping (est.)" value={`$${shipping}`} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900 }}>
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Small UI helpers ---------- */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span className="muted">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Field(props: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { label, ...rest } = props;
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span className="muted" style={{ fontSize: 12 }}>
        {label}
      </span>
      <input
        {...rest}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #222",
          background: "#0b0b0b",
          color: "#f5f5f5",
          outline: "none",
        }}
      />
    </label>
  );
}
