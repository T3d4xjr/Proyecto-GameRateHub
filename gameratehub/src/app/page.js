'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from './supabase/supabase';

const generos = ["RPG", "Fantasy", "Shooter"];
const videojuegos = [
  { id: 3, titulo: "Diablo III", imagen: "/rpg3.jpg" },
  { id: 4, titulo: "Elden Ring",  imagen: "/fantasy1.jpg" },
  { id: 9, titulo: "Overwacth 2", imagen: "/shooter3.jpg" },
];

export default function HomePage() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const verificarSesion = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setUsuarioAutenticado(true);
        setNombreUsuario(session.user.user_metadata?.nombre || session.user.email);
      }
    };

    verificarSesion();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUsuarioAutenticado(false);
    setNombreUsuario('');
    window.location.href = '/';  
  };

  const mejoresValorados = [...videojuegos]
    .sort((a, b) => b.calificacion - a.calificacion)
    .slice(0, 3);

  return (
    <div>
      <h1>Bienvenido a nuestra página de videojuegos</h1>
      {usuarioAutenticado ? (
        <div>
          <h3>Hola, {nombreUsuario}!</h3>
          <p>Ya estás registrado e iniciado sesión.</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <Link href="/iniciarSesion">
            <button>Iniciar sesión</button>
          </Link>
          <Link href="/registro">
            <button>Registrar</button>
          </Link>
        </div>
      )}
      
      <section>
        <h2>Ranking de géneros</h2>
        <ul>
          {generos.map((genero) => (
            <li key={genero}>
              <Link href={`/generos`}>
                <b>{genero}</b>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Mejores valorados</h2>
        <div>
          {mejoresValorados.map((juego) => (
            <Link key={juego.id} href={`/videojuegos/${juego.id}`}>
              <div>
                <img
                  src={juego.imagen}
                  alt={juego.titulo}
                  title={juego.titulo}
                />
                <h3>{juego.titulo}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
