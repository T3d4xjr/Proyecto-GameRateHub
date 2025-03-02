"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [randomStart, setRandomStart] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: contrasena,
      });

      if (error) {
        alert("Error al iniciar sesión: " + error.message);
      } else {
        localStorage.setItem("accessToken", data.session.access_token);
        localStorage.setItem(
          "userName",
          data.user.user_metadata?.nombre || data.user.email
        );
        window.location.href = "/";
      }
    } catch (error) {}
  };
  useEffect(() => {
    const randomTime = Math.floor(Math.random() * 400);
    setRandomStart(randomTime);
  }, []);

  return (
    <div className="login-container">
      <div className="video-background">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/-kkT-z0igtU?autoplay=1&mute=1&loop=1&controls=0&playlist=-kkT-z0igtU&start=${randomStart}`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      <div className="login-content">
        <h1>
          <b>GameRate Hub</b>
        </h1>
        <p>La brújula para gamers en busca de su próxima aventura.</p>
        <h2>Iniciar Sesión</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contrasena">Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Iniciar sesión
              </button>
            </form>

            <p className="text-center mt-3">
              ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
