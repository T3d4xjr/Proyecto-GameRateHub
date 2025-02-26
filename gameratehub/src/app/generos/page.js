"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const GenerosPage = () => {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const slidersRef = useRef({}); 

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


  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#0D0D0D",
        }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", padding: "20px" }}>
      <h1 className="text-center py-4">Géneros</h1>
      {error && <p className="text-center text-danger">{error}</p>}
      {generos.length > 0 ? (
        generos.map((genero) => (
          <div key={genero.id} className="mb-5">
            <h2 className="text-center">{genero.nombre}</h2>
            <div className="d-flex justify-content-center align-items-center" style={{ gap: "10px" }}>
              <div
                ref={(el) => (slidersRef.current[genero.id] = el)}
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: "15px",
                  paddingBottom: "10px",
                  scrollBehavior: "smooth",
                  maxWidth: "80%",
                  whiteSpace: "nowrap",
                  padding: "10px 0",
                  alignItems: "center",
                }}
              >
                {genero.videojuegos &&
                  genero.videojuegos.length > 0 &&
                  genero.videojuegos.map((videojuego) => (
                    <div key={videojuego.id} style={{ minWidth: "150px", textAlign: "center" }}>
                      <Link href={`/videojuegos/${videojuego.id}`}>
                        <img
                          src={videojuego.imagen}
                          alt={videojuego.titulo}
                          width={150}
                          height={150}
                          style={{
                            borderRadius: "8px",
                            objectFit: "cover",
                            width: "100%",
                            height: "auto",
                          }}
                        />
                      </Link>
                      <p style={{ marginTop: "5px", fontSize: "14px" }}>{videojuego.titulo}</p>
                    </div>
                  ))}
              </div>

            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No hay géneros disponibles.</p>
      )}
    </div>
  );
};

export default GenerosPage;
