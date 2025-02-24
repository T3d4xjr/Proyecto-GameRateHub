"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const GenerosPage = () => {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sliderRef = useRef(null);

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

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = direction === "left" ? -200 : 200;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
    <div style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF" }}>
      <h1 className="text-center py-4" style={{ marginBottom: "0" }}>Géneros</h1>
      {error && <p>{error}</p>}
      {generos.length > 0 ? (
        generos.map((genero) => (
          <div key={genero.id} className="mb-4" style={{ margin: 0 }}>
            <h2 className="text-center">{genero.nombre}</h2>
            <div className="d-flex justify-content-between align-items-center">
              <button
                onClick={() => scrollSlider("left")}
                className="btn btn-light"
                style={{
                  backgroundColor: "#222",
                  color: "#fff",
                  borderRadius: "50%",
                  border: "none",
                }}
              >
                &lt;
              </button>
              <div
                ref={sliderRef}
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: "10px",
                  paddingBottom: "20px",
                  width: "80%",
                }}
              >
                {genero.videojuegos &&
                  genero.videojuegos.length > 0 &&
                  genero.videojuegos.map((videojuego) => (
                    <div key={videojuego.id} style={{ minWidth: "150px" }}>
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
                      <p className="text-center">{videojuego.titulo}</p>
                    </div>
                  ))}
              </div>
              <button
                onClick={() => scrollSlider("right")}
                className="btn btn-light"
                style={{
                  backgroundColor: "#222",
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "10px",
                  border: "none",
                  margin: 0,
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay géneros disponibles.</p>
      )}
    </div>
  );
};

export default GenerosPage;
