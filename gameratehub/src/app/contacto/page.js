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
    <div>
      <h2>Contáctanos</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="asunto">Asunto o Motivo:</label>
        <input
          type="text"
          id="asunto"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          required
        />

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
