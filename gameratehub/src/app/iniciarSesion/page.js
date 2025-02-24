'use client';
import React, { useState } from 'react';
import { supabase } from '../supabase/supabase'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: contrasena,
      });

      if (error) {
        alert('Error al iniciar sesión: ' + error.message); 
      } else {
        localStorage.setItem('accessToken', data.session.access_token);
        localStorage.setItem('userName', data.user.user_metadata?.nombre || data.user.email);

        window.location.href = '/';
      }
    } catch (error) {
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#0D0D0D', color: '#FFFFFF', minHeight: '100vh' }}>
      <div className="text-center">
        <h1 style={{ color: '#FFFFFF' }}><b>GameRate Hub</b></h1>
        <p style={{ color: '#FFFFFF' }}>La brújula para gamers en busca de su próxima aventura.</p>
        <h2 style={{ color: '#FFFFFF' }}>Iniciar Sesión</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert" style={{ color: '#FFFFFF' }}>
            {errorMessage}
          </div>
        )}

        <div className="card mx-auto" style={{ maxWidth: '500px', backgroundColor: '#1C1C1C', border: '2px solid #444' }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: '#FFFFFF' }}>Email:</label>
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
                <label htmlFor="contrasena" className="form-label" style={{ color: '#FFFFFF' }}>Contraseña:</label>
                <input
                  type="password"
                  id="contrasena"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
            </form>

            <p className="text-center mt-3" style={{ color: '#FFFFFF' }}>¿No tienes cuenta? <a href="/registro" style={{ color: '#FFFFFF' }}>Regístrate aquí</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
