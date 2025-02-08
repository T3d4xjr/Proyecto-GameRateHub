"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 

const VideojuegoPage = () => {
  const { id } = useParams(); 
  const [videojuego, setVideojuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideojuego = async () => {
      try {
        const response = await fetch(`/api/videojuegos/${id}`);
        const data = await response.json();

        if (response.status === 200) {
          setVideojuego(data.videojuego);
        } else {
          setError(data.message || "Algo salió mal");
        }
      } catch (error) {
        setError("Hubo un error al obtener el videojuego.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideojuego();
    }
  }, [id]);

  if (loading) return <p>Cargando videojuego...</p>;

  return (
    <div>
      {error && <p>{error}</p>}

      {videojuego ? (
        <>
          <h1>{videojuego.titulo}</h1>
          <img src={videojuego.imagen} alt={videojuego.titulo} width="300" />
          <h3>Géneros:</h3>
          <ul>
            {videojuego.generos && videojuego.generos.length > 0 ? (
              videojuego.generos.map((genero, index) => (
                <li key={index}>{genero}</li>
              ))
            ) : (
              <p>No hay géneros disponibles</p>
            )}
          </ul>
          <h3>Desarrollador:</h3>
          <p>{videojuego.desarrollador}</p>
          <h3>Plataformas:</h3>
          <ul>
            {videojuego.plataformas && videojuego.plataformas.length > 0 ? (
              videojuego.plataformas.map((plataforma, index) => (
                <li key={index}>
                  <a href={plataforma.link} target="_blank" rel="noopener noreferrer">
                    {plataforma.nombre}
                  </a>
                </li>
              ))
            ) : (
              <p>No hay plataformas disponibles</p>
            )}
          </ul>
        </>
      ) : (
        <p>Videojuego no encontrado.</p>
      )}
    </div>
  );
};

export default VideojuegoPage;
