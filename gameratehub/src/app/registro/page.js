'use client';
import React, { useState,useEffect } from 'react';
import { supabase } from '../supabase/supabase'; 


export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [email, setEmail] = useState('');
  const [terminos, setTerminos] = useState(false);
  const [politica, setPolitica] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [randomStart, setRandomStart] = useState(0);

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleContrasenaChange = (e) => setContrasena(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleTerminosChange = (e) => setTerminos(e.target.checked);
  const handlePoliticaChange = (e) => setPolitica(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Por favor, ingresa un correo electrónico válido');
      alert('Por favor, ingresa un correo electrónico válido'); 
      return;
    }

    if (contrasena.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres');
      alert('La contraseña debe tener al menos 6 caracteres'); 
      return;
    }

    try {
      const response = await fetch('/api/registro/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password: contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userName', nombre);
        alert('Registro exitoso. Vaya a su correo para confirmar.');
        window.location.href = '/iniciarSesion';  
      } else {
        setErrorMessage(data.error || 'Hubo un error al registrar el usuario');
        alert(data.error || 'Hubo un error al registrar el usuario'); 
      }
    } catch (error) {
      setErrorMessage('Hubo un error al registrar el usuario');
      alert('Hubo un error al registrar el usuario'); 
    }
  };
  useEffect(() => {
      const randomTime = Math.floor(Math.random() * 400); 
      setRandomStart(randomTime);
    }, []);

  return (
    <div className="registro-container">
      <div className="video-background">
      <iframe
          src={`https://www.youtube.com/embed/-kkT-z0igtU?autoplay=1&mute=1&loop=1&controls=0&playlist=-kkT-z0igtU&start=${randomStart}`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      {/* Contenido del formulario */}
      <div className="login-content">
        <h1><b>GameRate Hub</b></h1>
        <p>La brújula para gamers en busca de su próxima aventura.</p>
        <h2>Formulario de Registro</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} className="form-control" required />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} className="form-control" required />
              </div>

              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label">Contraseña:</label>
                <input type="password" id="contrasena" value={contrasena} onChange={handleContrasenaChange} className="form-control" required />
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" id="terminos" checked={terminos} onChange={handleTerminosChange} className="form-check-input" required />
                <label htmlFor="terminos" className="form-check-label">
                  Acepto los <a href="/terminos">Términos y Condiciones</a>
                </label>
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" id="politica" checked={politica} onChange={handlePoliticaChange} className="form-check-input" required />
                <label htmlFor="politica" className="form-check-label">
                  Acepto la <a href="/politica">Política de Privacidad</a>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>

            <p className="text-center mt-3">¿Ya tienes cuenta? <a href="/iniciarSesion">Inicia sesión</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
