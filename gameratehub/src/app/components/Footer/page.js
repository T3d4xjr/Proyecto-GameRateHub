import React from "react";
import Link from "next/link"; 

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <Link href="/contacto">Contactos</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
        <li>
          <Link href="/terminos">Términos y Condiciones</Link>
        </li>
        <li>
          <Link href="/politica">Política y Privacidad</Link>
        </li>
      </ul>
      <p>© 2024 GameRate HUB</p>
    </footer>
  );
}
