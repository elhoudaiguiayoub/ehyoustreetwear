import { Link } from "react-router-dom";
import { products } from "../data/products";

export default function Home() {
  document.title = "EHYoub — Premium Streetwear";

  const featured = products.slice(0, 3);

  return (
    <div className="container">
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <span className="badge">LIMITED DROPS</span>
          <h1 className="hero-title">EHYoub Streetwear</h1>
          <p className="hero-sub">
            Clean cuts. Premium feel. Built for the city.  
            Drop-based streetwear — simple, bold, modern.
          </p>

          <div className="hero-cta">
            <Link to="/shop" className="btn">
              Shop the drop →
            </Link>
            <Link to="/shop" className="btn btn-ghost">
              Explore categories
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">Premium</div>
              <div className="muted">Materials</div>
            </div>
            <div className="stat">
              <div className="stat-num">Limited</div>
              <div className="muted">Stock</div>
            </div>
            <div className="stat">
              <div className="stat-num">Vancouver</div>
              <div className="muted">Inspired</div>
            </div>
          </div>
        </div>

        <div className="hero-right card" style={{ overflow: "hidden" }}>
          <div className="hero-img-wrap">
            <img
              src={featured[0]?.image}
              alt="Featured"
              className="hero-img"
              loading="lazy"
            />
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 900 }}>{featured[0]?.name ?? "Featured Item"}</div>
              <div className="muted" style={{ marginTop: 4 }}>
                {featured[0]?.category ?? "Streetwear"}
              </div>
            </div>
            <div style={{ fontWeight: 900 }}>
              {featured[0] ? `$${featured[0].price}` : ""}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ marginTop: 24 }}>
        <div className="section-head">
          <h2 style={{ margin: 0 }}>Categories</h2>
          <Link to="/shop" className="muted">
            View all →
          </Link>
        </div>

        <div className="cat-grid">
          <Link to="/shop" className="card cat-card">
            <div className="cat-title">T-Shirts</div>
            <div className="muted">Minimal logo • clean fit</div>
          </Link>
          <Link to="/shop" className="card cat-card">
            <div className="cat-title">Hoodies</div>
            <div className="muted">Heavyweight • warm</div>
          </Link>
          <Link to="/shop" className="card cat-card">
            <div className="cat-title">Accessories</div>
            <div className="muted">Caps • essentials</div>
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ marginTop: 24 }}>
        <div className="section-head">
          <h2 style={{ margin: 0 }}>Best sellers</h2>
          <Link to="/shop" className="muted">
            Shop →
          </Link>
        </div>

        <div className="featured-grid">
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="card"
              style={{ overflow: "hidden" }}
            >
              <div className="thumb">
                <img src={p.image} alt={p.name} className="thumb-img" loading="lazy" />
              </div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 900 }}>{p.name}</div>
                <div style={{ fontWeight: 900 }}>${p.price}</div>
              </div>
              <div className="muted" style={{ marginTop: 6 }}>
                {p.category}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOT CTA */}
      <section className="cta">
        <div>
          <h2 style={{ margin: 0 }}>Ready for the drop?</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            Browse the latest pieces and build your fit.
          </p>
        </div>
        <Link to="/shop" className="btn">
          Go to shop →
        </Link>
      </section>
    </div>
  );
}
