"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const VideojuegoPage = () => {
  const { id } = useParams();
  const [videojuego, setVideojuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionRef = useRef(null);

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

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "#0D0D0D" }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const getPlatformLogo = (platformName) => {
    switch (platformName.toLowerCase()) {
      case 'pc':
        return "/pc.png";
      case 'playstation':
        return "/playstation.png";
      case 'xbox':
        return "/xbox.png";
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0D0D0D",
        color: "#fff",
        padding: "20px",
      }}
    >
      <div style={{ flex: 1, maxWidth: "60%", paddingRight: "20px" }}>
        {error && <p>{error}</p>}

        {videojuego ? (
          <>
            <h1>{videojuego.titulo}</h1>
            <h3>Descripción:</h3>
            <p
              ref={descriptionRef}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: isExpanded ? "none" : 4,
              }}
            >
              {videojuego.descripcion}
            </p>
            {!isExpanded ? (
              <button
                onClick={toggleDescription}
                style={{ color: "#ddd", background: "none", border: "none", cursor: "pointer" }}
              >
                Ver más
              </button>
            ) : (
              <button
                onClick={toggleDescription}
                style={{ color: "#ddd", background: "none", border: "none", cursor: "pointer" }}
              >
                Ver menos
              </button>
            )}
            <h3>Año:</h3>
            <p>{videojuego.año}</p>
            <h3>Desarrollador:</h3>
            <p>{videojuego.desarrollador}</p>
            <h3>Plataformas:</h3>
            <ul>
              {videojuego.plataformas && videojuego.plataformas.length > 0 ? (
                videojuego.plataformas.map((plataforma, index) => (
                  <li key={index}>
                    {getPlatformLogo(plataforma.nombre) && (
                      <img
                        src={getPlatformLogo(plataforma.nombre)}
                        alt={plataforma.nombre}
                        style={{ width: "30px", marginRight: "10px" }}
                      />
                    )}
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

      <div
        style={{
          width: "400px",
          height: "auto",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        {videojuego && (
          <img
            src={videojuego.imagen}
            alt={videojuego.titulo}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default VideojuegoPage;
