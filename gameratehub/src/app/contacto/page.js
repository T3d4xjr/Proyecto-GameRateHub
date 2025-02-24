"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailData = {
      from_name: nombre,
      from_email: email,
      subject: asunto,
      message: mensaje,
    };

    emailjs
      .send(
        "service_9ytfmde", 
        "template_0ys57h5", 
        emailData,
        "CT0lvwRcRGjqqw8Le" 
      )
      .then((response) => {
        alert("Correo enviado con éxito.");
        console.log('Correo enviado con éxito:', response);
        setNombre("");
        setEmail("");
        setAsunto("");
        setMensaje("");
      })
      .catch((error) => {
        console.error("Detalles del error al enviar el correo:", error.text || error);
        alert("Error al enviar el correo.");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#0D0D0D",
        color: "#FFFFFF",
        minHeight: "90vh",
        padding: "0 20px",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#1C1C1C",
          border: "2px solid #444",
        }}
      >
        <div className="card-body">
          <h1 className="text-center text-white mb-4">Contáctanos</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label text-white">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">
                Correo Electrónico:
              </label>
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
              <label htmlFor="asunto" className="form-label text-white">
                Asunto:
              </label>
              <input
                type="text"
                id="asunto"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label text-white">
                Mensaje:
              </label>
              <textarea
                id="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="form-control"
                required
              ></textarea>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary w-100">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
