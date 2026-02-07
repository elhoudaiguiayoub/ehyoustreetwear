import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="logo" onClick={close}>
          EHYoub
        </Link>

        {/* Desktop links */}
        <nav className="nav-links desktop">
          <NavLink to="/" end>
            Maison
          </NavLink>
          <NavLink to="/shop">
            Boutique
          </NavLink>
          <NavLink to="/about">
            About
          </NavLink>
          <NavLink to="/cart">
            Panier
          </NavLink>
        </nav>

        {/* Mobile button */}
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="mobile-menu">
          <NavLink to="/" end onClick={close}>
            Maison
          </NavLink>
          <NavLink to="/shop" onClick={close}>
            Boutique
          </NavLink>
          <NavLink to="/about" onClick={close}>
            About
          </NavLink>
          <NavLink to="/cart" onClick={close}>
            Panier
          </NavLink>
        </nav>
      )}
    </header>
  );
}
