import React from "react";
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/generos">Géneros</Link>
        </li>
        <li>
          <Link href="/perfil">Perfil</Link>
        </li>
      </ul>
    </nav>
  );
}
