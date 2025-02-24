'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from './supabase/supabase';

const generos = ["RPG", "Fantasy", "Shooter"];
const videojuegos = [
  { id: 3, titulo: "Diablo III", imagen: "/rpg3.jpg" },
  { id: 4, titulo: "Elden Ring", imagen: "/fantasy1.jpg" },
  { id: 9, titulo: "Overwacth 2", imagen: "/shooter3.jpg" },
];

export default function PaginaPrincipal() {
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
    <div className="container-fluid" style={{ backgroundColor: '#0D0D0D', color: '#FFFFFF', minHeight: '100vh' }}>
      <h1 className="text-center py-4">Bienvenido a GameRateHub</h1>
      {usuarioAutenticado ? (
        <div className="text-center">
          <h3>Hola, {nombreUsuario}!</h3>
          <p>Ya estás registrado e iniciado sesión.</p>
          <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div className="text-center">
          <Link href="/iniciarSesion">
            <button className="btn btn-primary mx-2">Iniciar sesión</button>
          </Link>
          <Link href="/registro">
            <button className="btn btn-success mx-2">Registrar</button>
          </Link>
        </div>
      )}
      
      <section className="mt-5">
        <h2 className="text-center">Ranking de géneros</h2>
        <ul className="list-group list-group-flush text-center">
          {generos.map((genero) => (
            <li key={genero} className="list-group-item" style={{ backgroundColor: '#1C1C1C' }}>
              <Link href={`/generos`} className="text-primary">
                <b>{genero}</b>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5">
        <h2 className="text-center">Mejores juegos de la semana</h2>
        <div className="row">
          {mejoresValorados.map((juego) => (
            <div key={juego.id} className="col-12 col-md-4">
              <Link href={`/videojuegos/${juego.id}`} className="text-decoration-none text-light">
                <div className="card mb-3" style={{ backgroundColor: '#1C1C1C' }}>
                  <img
                    src={juego.imagen}
                    alt={juego.titulo}
                    className="card-img-top"
                    title={juego.titulo}
                  />
                  <div className="card-body text-center">
                    <h3 className="card-title text-white">{juego.titulo}</h3> 
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
