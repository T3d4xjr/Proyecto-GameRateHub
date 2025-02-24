"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { FaCog } from "react-icons/fa"; // Ícono de configuración
import "../globals.css";

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

  const juegos = [
    { id: 1, titulo: "Final Fantasy VII", imagen: "/rpg1.jpg" },
    { id: 5, titulo: "One Piece Odyssey", imagen: "/fantasy2.jpg" },
    { id: 8, titulo: "Black Ops 3", imagen: "/shooter2.jpg" },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("No se ha encontrado la información del usuario.");
        setLoading(false);
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
          setError("No se pudo cargar el perfil.");
          setLoading(false);
          return;
        }

        const { user } = await response.json();
        setUserProfile(user);
        setFotoPerfilUrl(user?.foto_perfil || "/defecto.png");
        setLoading(false);
      } catch (err) {
        setError("Error al cargar el perfil.");
        setLoading(false);
      }
    };

    fetchUserProfile();
    setMejoresJuegos(juegos);
  }, []);

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
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="perfil-container">
      <h1>
        Perfil de Usuario
        <FaCog className="config-icon" onClick={handleEditClick} />
      </h1>

      <img src={fotoPerfilUrl} alt="Foto de perfil" className="perfil-imagen" />

      {isEditing ? (
        <form className="perfil-form" onSubmit={handleSubmit}>
          <label>País:</label>
          <input
            type="text"
            name="pais"
            value={newProfileData.pais}
            onChange={handleInputChange}
          />

          <label>Localidad:</label>
          <input
            type="text"
            name="localidad"
            value={newProfileData.localidad}
            onChange={handleInputChange}
          />

          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={newProfileData.telefono}
            onChange={handleInputChange}
          />

          <label>Información:</label>
          <input
            type="text"
            name="informacion"
            value={newProfileData.informacion}
            onChange={handleInputChange}
          />

          <label>Foto de perfil:</label>
          <input
            type="file"
            name="foto_perfil"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button type="submit">Actualizar perfil</button>
        </form>
      ) : (
        <div className="perfil-info">
          <p>
            <strong>Nombre:</strong> {userProfile?.nombre}
          </p>
          <p>
            <strong>Email:</strong> {userProfile?.email}
          </p>
          <p>
            <strong>País:</strong> {userProfile?.pais}
          </p>
          <p>
            <strong>Localidad:</strong> {userProfile?.localidad}
          </p>
          <p>
            <strong>Teléfono:</strong> {userProfile?.telefono}
          </p>
          <p>
            <strong>Información:</strong> {userProfile?.informacion}
          </p>
        </div>
      )}

      <section>
        <h2>Mejores juegos</h2>
        <div className="juegos-container">
          {mejoresJuegos.map((juego) => (
            <div key={juego.id} className="juego-card">
              <img
                src={juego.imagen}
                alt={juego.titulo}
                title={juego.titulo}
                width={150}
              />
              <h3>{juego.titulo}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
