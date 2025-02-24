'use client';
import React, { useState } from 'react';
import { supabase } from '../supabase/supabase'; 

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [email, setEmail] = useState('');
  const [terminos, setTerminos] = useState(false);
  const [politica, setPolitica] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

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

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error con el login de Google', error);
      alert('Error con el login de Google'); 
    } else {
      window.location.href = '/iniciarSesion'; 
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#0D0D0D', color: '#FFFFFF', minHeight: '100vh' }}>
      <div className="text-center">
        <h1 style={{ color: '#FFFFFF' }}><b>GameRate Hub</b></h1>
        <p style={{ color: '#FFFFFF' }}>La brújula para gamers en busca de su próxima aventura.</p>
        <h2 style={{ color: '#FFFFFF' }}>Formulario de Registro</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert" style={{ color: '#FFFFFF' }}>
            {errorMessage}
          </div>
        )}

        <div className="card mx-auto" style={{ maxWidth: '500px', backgroundColor: '#1C1C1C', border: '2px solid #444' }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label" style={{ color: '#FFFFFF' }}>Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={handleNombreChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: '#FFFFFF' }}>Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label" style={{ color: '#FFFFFF' }}>Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  value={contrasena}
                  onChange={handleContrasenaChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  id="terminos"
                  checked={terminos}
                  onChange={handleTerminosChange}
                  className="form-check-input"
                  required
                />
                <label htmlFor="terminos" className="form-check-label" style={{ color: '#FFFFFF' }}>
                  Acepto los <a href="/terminos" style={{ color: '#FFFFFF' }}>Términos y Condiciones</a>
                </label>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  id="politica"
                  checked={politica}
                  onChange={handlePoliticaChange}
                  className="form-check-input"
                  required
                />
                <label htmlFor="politica" className="form-check-label" style={{ color: '#FFFFFF' }}>
                  Acepto la <a href="/politica" style={{ color: '#FFFFFF' }}>Política de Privacidad</a>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>

            <p className="text-center mt-3" style={{ color: '#FFFFFF' }}>¿Ya tienes cuenta? <a href="/iniciarSesion" style={{ color: '#FFFFFF' }}>Inicia sesión</a></p>
          </div>
        </div>

      </div>
    </div>
  );
}
