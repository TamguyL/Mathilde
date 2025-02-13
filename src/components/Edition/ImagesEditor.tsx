/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './edition.css'

const ImagesEditor: React.FC = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [data, setData] = useState<any>(null);
    const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>({});
    const [uploadedImages, setUploadedImages] = useState<{ [key: string]: File | null }>({});
    const navigate = useNavigate();

  // Charger les données depuis le backend
  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        Object.keys(json).forEach((key) => setValue(key, json[key]));
      })
      .catch((error) => console.error("Erreur de chargement :", error));
  }, [setValue]);

  if (!data) return <p>Chargement...</p>;

  // Gérer le changement d'image pour un champ spécifique
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => ({ ...prev, [field]: previewUrl }));
      
      // Stocker le fichier temporairement pour l'upload
      setUploadedImages((prev) => ({ ...prev, [field]: file }));
    }
  };

  // Gérer l'upload d'une image spécifique
  const handleUpload = async (field: string) => {
    const image = uploadedImages[field];
    if (!image) return alert("Aucune image sélectionnée");

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.imageUrl) {
      setUploadedImages((prev) => ({ ...prev, [field]: null })); // Réinitialiser après upload
      setValue(field, data.imageUrl); // Mettre à jour le champ image
    }
  };

  const handleClick = () => {
    navigate("/edition");
  };

  return (
    <div className="fondEdit">
      <form onSubmit={handleSubmit((updatedData) => {
        fetch("http://localhost:5000/save-json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }).then((res) => {
          if (!res.ok) throw new Error("Erreur lors de la sauvegarde");
          alert("Données enregistrées avec succès !");
        }).catch((error) => console.error("Erreur :", error));
      })}>
        <hr/>
      
        {/* Boutton Volant */}
        <div className="cardSticky displayFlex">
          <button type="submit" className="ctaVert">
              <span>Enregistrer !</span>
          </button>
          <button onClick={handleClick} className="cta">
              <span>Retour Edition</span>
          </button>
        </div>


        {/* Présentation (Changement d’image) */}
        <div className="divEdit">
          <h1>Présentation</h1>
          <div className="cardEdit displayFlex">
            <img src={imagePreviews["presentationData.photo"] || `./image/${data.presentationData.photo}`} width="150px" alt="Aperçu" />
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "presentationData.photo")} />
            <button type="button" onClick={() => handleUpload("presentationData.photo")}>Upload</button>
            <input className="form-control thick" {...register("presentationData.photo")} defaultValue={data.presentationData.photo} />
          </div>
        </div>
        <hr/>

        {/* Design */}
        <div className="divEdit">
          <h1>Design</h1>
          <div className="displayGrid">
            {data.designData.map((design: any, index: number) => (
              <div key={index} className="cardEdit displayFlex">
                <img 
                    src={imagePreviews[`designData.${index}.image`] || `./image/${design.image}`} 
                    width="150px" 
                    alt="Aperçu"
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, `designData.${index}.image`)}
                  />
                <button type="button" onClick={() => handleUpload(`designData.${index}.image`)}>Upload</button>
                <input className="form-control thick" {...register(`designData.${index}.image`)} defaultValue={design.image} />
              </div>
            ))}
          </div>
        </div>
        <hr/>

        {/* Engagement (Plusieurs images modifiables) */}
        <div className="divEdit">
          <h1>Engagement</h1>
            <div className="displayGrid">
              {data.engagementData.image.map((img: any, index: number) => (
                <div key={index} className="cardEdit displayFlex">
                  <img 
                    src={imagePreviews[`engagementData.image.${index}.image`] || `./image/${img.image}`} 
                    width="150px" 
                    alt="Aperçu"
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, `engagementData.image.${index}.image`)}
                  />
                  <button type="button" onClick={() => handleUpload(`engagementData.image.${index}.image`)}>Upload</button>
                  <input 
                    className="form-control thick" 
                    {...register(`engagementData.image.${index}.image`)} 
                    defaultValue={img.image} 
                  />
                </div>
              ))}
            </div>
        </div>

      </form>
    </div>
  );
}; export default ImagesEditor;
