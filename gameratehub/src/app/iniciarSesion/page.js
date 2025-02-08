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
        setErrorMessage('Error al iniciar sesión: ' + error.message); 
        alert('Error al iniciar sesión: ' + error.message); 
      } else {
        localStorage.setItem('accessToken', data.session.access_token);
        localStorage.setItem('userName', data.user.user_metadata?.nombre || data.user.email);

        window.location.href = '/';
      }
    } catch (error) {
      setErrorMessage('Error en la solicitud: ' + error.message); 
      alert('Error en la solicitud: ' + error.message); 
    }
  };

  return (
    <div>
      <h1><b>GameRate Hub</b></h1>
      <p>La brújula para gamers en busca de su próxima aventura.</p>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <button type="submit">Iniciar sesión</button>
      </form>

      <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
    </div>
  );
}
