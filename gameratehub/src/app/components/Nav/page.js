import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad, faUser } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';


export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="rounded-circle"
            style={{ width: "60px", height: "60px", marginRight: "10px" }}
          />
          GameRateHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-none d-lg-block">
              <Link className="nav-link d-flex align-items-center" href="/">
                <FontAwesomeIcon icon={faHome} className="fa-icon fa-home" />
                Inicio
              </Link>
            </li>
            <li className="nav-item d-none d-lg-block">
              <Link className="nav-link d-flex align-items-center" href="/generos">
                <FontAwesomeIcon icon={faGamepad} className="fa-icon" />
                Géneros
              </Link>
            </li>
            <li className="nav-item d-none d-lg-block">
              <Link className="nav-link d-flex align-items-center" href="/perfil">
                <FontAwesomeIcon icon={faUser} className="fa-icon" />
                Perfil
              </Link>
            </li>

            <li className="nav-item d-lg-none">
              <Link className="nav-link" href="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item d-lg-none">
              <Link className="nav-link" href="/generos">
                Géneros
              </Link>
            </li>
            <li className="nav-item d-lg-none">
              <Link className="nav-link" href="/perfil">
                Perfil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
