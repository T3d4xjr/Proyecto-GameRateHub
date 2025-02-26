"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase/supabase";
import { FaCog } from "react-icons/fa"; // Ícono de configuración
import "../globals.css";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function PerfilPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProfileData, setNewProfileData] = useState({
    pais: "",
    localidad: "",
    telefono: "",
    informacion: "",
    foto_perfil: null,
  });
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState("/defecto.png");
  const [isEditing, setIsEditing] = useState(false);
  const [mejoresJuegos, setMejoresJuegos] = useState([]);
  const router = useRouter();

  const juegos = [
    { id: 1, titulo: "Final Fantasy VII", imagen: "/rpg1.jpg" },
    { id: 5, titulo: "One Piece Odyssey", imagen: "/fantasy2.jpg" },
    { id: 8, titulo: "Black Ops 3", imagen: "/shooter2.jpg" },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("Debes iniciar sesión para acceder al perfil.");
        router.push("/");
        return;
      }

      try {
        const response = await fetch("/api/perfil", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          alert("No se pudo cargar el perfil. Redirigiendo al inicio.");
          router.push("/");
          return;
        }

        const { user } = await response.json();
        setUserProfile(user);
        setFotoPerfilUrl(user?.foto_perfil || "/defecto.png");
        setLoading(false);
      } catch (err) {
        alert("Error al cargar el perfil. Redirigiendo al inicio.");
        router.push("/");
      }
    };

    fetchUserProfile();
    setMejoresJuegos(juegos);
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setError("Por favor, selecciona una imagen válida.");
      return;
    }
    setNewProfileData((prevData) => ({ ...prevData, foto_perfil: file }));
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFotoPerfilUrl(imageUrl);
    }
  };

  const validateForm = () => {
    if (
      !newProfileData.pais ||
      !newProfileData.localidad ||
      !newProfileData.telefono ||
      !newProfileData.informacion
    ) {
      setError("Todos los campos son obligatorios.");
      return false;
    }

    if (!/^\d+$/.test(newProfileData.telefono)) {
      setError("El teléfono debe ser un número válido.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    let fotoUrl = userProfile.foto_perfil || "";

    if (newProfileData.foto_perfil) {
      const fileName = `${Date.now()}-${newProfileData.foto_perfil.name}`;

      try {
        const { data, error: uploadError } = await supabase.storage
          .from("profiles")
          .upload(fileName, newProfileData.foto_perfil);

        if (uploadError) {
          setError("Error al subir la foto.");
          return;
        }

        fotoUrl = `https://jhmitdlfkwyudwteerpt.supabase.co/storage/v1/object/public/profiles/${fileName}`;
      } catch (err) {
        setError("Error al subir la foto.");
        return;
      }
    }

    const updatedData = {
      pais: newProfileData.pais || userProfile.pais,
      localidad: newProfileData.localidad || userProfile.localidad,
      telefono: newProfileData.telefono || userProfile.telefono,
      informacion: newProfileData.informacion || userProfile.informacion,
      foto_perfil: fotoUrl,
    };

    try {
      const response = await fetch("/api/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        setError("No se pudo actualizar el perfil.");
        return;
      }

      const { user } = await response.json();
      setUserProfile(user);
      setIsEditing(false);
      alert("Perfil actualizado correctamente");
      window.location.href = "/perfil";
    } catch (err) {
      setError("Error al actualizar el perfil.");
    }
  };

  const handleEditClick = () => {
    if (userProfile) {
      setIsEditing(true);
      setNewProfileData({
        pais: userProfile.pais || "",
        localidad: userProfile.localidad || "",
        telefono: userProfile.telefono || "",
        informacion: userProfile.informacion || "",
        foto_perfil: null,
      });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container-fluid d-flex flex-column min-vh-100" style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", padding: "20px" }}>
  <div className="container" style={{ maxWidth: "1200px", margin: "auto" }}>
    <h1 className="text-center mb-4">
      Perfil de Usuario
      <FaCog className="config-icon ms-2" onClick={handleEditClick} />
    </h1>

    <div className="row align-items-center">
      <div className="col-md-6">
        {isEditing ? (
          <form className="perfil-form" onSubmit={handleSubmit}>
            <label>País:</label>
            <input type="text" name="pais" value={newProfileData.pais} onChange={handleInputChange} className="form-control bg-dark text-light" />

            <label>Localidad:</label>
            <input type="text" name="localidad" value={newProfileData.localidad} onChange={handleInputChange} className="form-control bg-dark text-light" />

            <label>Teléfono:</label>
            <input type="text" name="telefono" value={newProfileData.telefono} onChange={handleInputChange} className="form-control bg-dark text-light" />

            <label>Información:</label>
            <input type="text" name="informacion" value={newProfileData.informacion} onChange={handleInputChange} className="form-control bg-dark text-light" />

            <label>Foto de perfil:</label>
            <input type="file" name="foto_perfil" accept="image/*" onChange={handleFileChange} className="form-control bg-dark text-light" />

            <button type="submit" className="btn btn-primary mt-3 w-100">Actualizar perfil</button>
          </form>
        ) : (
          <div className="perfil-info">
            <p><strong>Nombre:</strong> {userProfile?.nombre}</p>
            <p><strong>Email:</strong> {userProfile?.email}</p>
            <p><strong>País:</strong> {userProfile?.pais}</p>
            <p><strong>Localidad:</strong> {userProfile?.localidad}</p>
            <p><strong>Teléfono:</strong> {userProfile?.telefono}</p>
            <p><strong>Información:</strong> {userProfile?.informacion}</p>
          </div>
        )}
      </div>

      <div className="col-md-6 text-center">
        <img src={fotoPerfilUrl} alt="Foto de perfil" className="perfil-imagen rounded-circle img-fluid shadow-lg" 
          style={{ maxWidth: "250px", border: "3px solid #FFFFFF", marginBottom: "30px" }} />
      </div>
    </div>
    
    <section className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Mejores juegos</h2>
      <div className="row">
        {mejoresJuegos.map((juego) => (
          <div key={juego.id} className="col-md-4 mb-4">
            <Link href={`/videojuegos/${juego.id}`} className="text-decoration-none">
              <div className="card shadow-sm border-0 h-100" style={{ backgroundColor: "#1A1A1A", color: "#FFFFFF" }}>
                <img  
                  src={juego.imagen}
                  alt={juego.titulo}
                  className="card-img-top rounded"
                  style={{ height: "200px", objectFit: "cover", padding: "10p" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{juego.titulo}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  </div>
</div>

  );
}
