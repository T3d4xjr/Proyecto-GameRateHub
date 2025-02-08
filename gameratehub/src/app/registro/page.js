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
        alert('Registro exitoso.Vaya a su correo para confirmar.');
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
    <div>
      <h1><b>GameRate Hub</b></h1>
      <p>La brújula para gamers en busca de su próxima aventura.</p>
      <h2>Formulario de Registro</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={handleNombreChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label htmlFor="contrasena">Contraseña:</label>
        <input
          type="password"
          id="contrasena"
          value={contrasena}
          onChange={handleContrasenaChange}
          required
        />

        <label>
          <input
            type="checkbox"
            id="terminos"
            checked={terminos}
            onChange={handleTerminosChange}
            required
          />
          Acepto los <a href="/terminos">Términos y Condiciones</a>
        </label>

        <label>
          <input
            type="checkbox"
            id="politica"
            checked={politica}
            onChange={handlePoliticaChange}
            required
          />
          Acepto la <a href="/politica">Política de Privacidad</a>
        </label>

        <button type="submit">Registrar</button>
      </form>

      <p>¿Ya tienes cuenta? <a href="/iniciarSesion">Inicia sesión</a></p>

      <div>
        <button onClick={handleGoogleLogin}>Registrarse/Iniciar sesión con Google</button>
      </div>
    </div>
  );
}
