"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const GenerosPage = () => {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch("/api/generos");
        const data = await response.json();

        if (response.status === 200) {
          setGeneros(data.generos);
        } else {
          setError(data.message || "Algo salió mal");
        }
      } catch (error) {
        setError("Hubo un error al obtener los géneros.");
      } finally {
        setLoading(false);
      }
    };

    fetchGeneros();
  }, []);

  if (loading) return <p>Cargando géneros...</p>;

  return (
    <div>
      <h1>Géneros</h1>
      {error && <p>{error}</p>}
      {generos.length > 0 ? (
        generos.map((genero) => (
          <div key={genero.id}>
            <h2><b>{genero.nombre}</b></h2>

            {genero.videojuegos && genero.videojuegos.length > 0 ? (
              <div>
                <ul style={{ display: "flex", padding: 0, listStyleType: "none", gap: "20px" }}>
                  {genero.videojuegos.map((videojuego) => (
                    <li key={videojuego.id} style={{ display: "inline-block" }}>
                      <Link href={`/videojuegos/${videojuego.id}`}>
                        <img
                          src={videojuego.imagen}
                          alt={videojuego.titulo}
                          width={100}
                          height={100}
                        />
                      </Link>
                      <p>{videojuego.titulo}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No hay videojuegos para este género.</p>
            )}
          </div>
        ))
      ) : (
        <p>No hay géneros disponibles.</p>
      )}
    </div>
  );
};

export default GenerosPage;
