import React from "react";
import Link from "next/link"; 

export default function Footer() {
  return (
    <footer className="bg-dark-custom text-white py-2">
      <div className="container">
        <ul className="list-unstyled d-flex justify-content-center mb-0">
          <li className="mx-3">
            <Link href="/contacto" className="footer-link">
              Contactos
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/faq" className="footer-link">
              FAQ
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/terminos" className="footer-link">
              Términos y Condiciones
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/politica" className="footer-link">
              Política y Privacidad
            </Link>
          </li>
        </ul>
        <p className="text-center small mt-2">
          © 2024 GameRate HUB
        </p>
      </div>
    </footer>
  );
}
