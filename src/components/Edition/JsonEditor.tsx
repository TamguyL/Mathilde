/* eslint-disable @typescript-eslint/no-explicit-any */
// npm install react-hook-form

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './edition.css'


const JsonEditor: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  // Charger les données depuis le backend
  useEffect(() => {

    fetch("http://localhost:5000/data")
      .then((res) => res.json())
      .then((json) => {
        setData(json);

        // Pré-remplir les champs du formulaire
        Object.keys(json).forEach((key) => {
          setValue(key, json[key]);
        });
      })
      .catch((error) => console.error("Erreur de chargement :", error));
  }, [setValue]);

  // Fonction pour enregistrer les modifications
  const onSubmit = async (updatedData: any) => {
    try {
        const response = await fetch("http://localhost:5000/save-json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) throw new Error("Erreur lors de la sauvegarde");
        // Met à jour l'état pour refléter les modifications
        setData(updatedData);
        alert("Données enregistrées avec succès !");
    } catch (error) {
        console.error("Erreur :", error);
    }
};

  if (!data) return <p>Chargement...</p>;

  const handleClick = () => {
    navigate("/editionPhoto");
  };

  return (
    <div className="fondEdit">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <hr/>

        {/* Boutton Volant */}
        <div className="cardSticky">
          <button type="submit" className="ctaVert">
              <span>Enregistrer !</span>
          </button>
          <button onClick={handleClick} className="cta">
              <span>Edition Image</span>
          </button>
        </div>
        <hr/>

        {/* Gros Titres */}
        <div className="divEdit">
          <h1>Gros Titres</h1>
          <div className="cardEdit displayGrid">
            <input className="form-control thick" {...register(`grosTitre.titre1`)} defaultValue={data.grosTitre.titre1} />
            <input className="form-control thick" {...register(`grosTitre.titre2`)} defaultValue={data.grosTitre.titre2} />
            <input className="form-control thick" {...register(`grosTitre.titre3`)} defaultValue={data.grosTitre.titre3} />
            <input className="form-control thick" {...register(`grosTitre.titre4`)} defaultValue={data.grosTitre.titre4} />
          </div>
        </div>
        <hr/>

        {/* Menu */}
        <div className="divEdit">
          <h1>Menu</h1>
          <div className="cardEdit displayGrid">
            {data.menuValue.map((item: any, index: number) => (
              <div key={index}>
                <input className="form-control thick" {...register(`menuValue.${index}.menu`)} defaultValue={item.menu} />
              </div>
            ))}
          </div>
        </div>
        <hr/>

        {/* Présentation */}
        <div className="divEdit">
          <h1>Présentation</h1>
          <div className="cardEdit largeurFix">
            <img src={`./image/${data.presentationData.photo}`} width="150px" alt="Image" />
            {/* <input className="form-control thick" {...register("presentationData.photo")} defaultValue={data.presentationData.photo} /> */}
            <input className="form-control thick" {...register("presentationData.soustitre")} defaultValue={data.presentationData.soustitre} /> <br />
            <textarea className="form-control thick message textareaLarg" {...register(`presentationData.accroche`)} defaultValue={data.presentationData.accroche} /><br />
            <input className="form-control thick" {...register("presentationData.titre")} defaultValue={data.presentationData.titre} /><br />
            <textarea className="form-control thick message textareaHaut" {...register(`presentationData.texte`)} defaultValue={data.presentationData.texte} />
          </div>
        </div>
        <hr/>
        
        {/* Vidéos */}
        <div className="divEdit">
          <h1>Vidéos</h1>
          <div className="displayGrid">
            {data.videoData.map((video: any, index: number) => (
              <div key={index} className="cardEdit displayFlex">
                <input className="form-control thick" {...register(`videoData.${index}.titre`)} defaultValue={video.titre} />
                <input className="form-control thick" {...register(`videoData.${index}.lienvideo`)} defaultValue={video.lienvideo} />
                <textarea className="form-control thick message" {...register(`videoData.${index}.phrase`)} defaultValue={video.phrase} />
              </div>
            ))}
          </div>
        </div>
        <hr/>

        {/* Design */}
        <div className="divEdit">
          <h1>Design</h1>
          <div className="displayGrid">
            {data.designData.map((design: any, index: number) => (
              <div key={index} className="cardEdit displayFlex">
                <img src={`./image/${design.image}`} alt={design.titre} width={'150px'}/>
                <label className="checkbox-label form-control thick"> Affichage = 
                  <input className="checkboxInput" type="checkbox" {...register(`designData.${index}.affichage`)} defaultChecked={design.affichage} />
                </label>
                <input className="form-control thick" {...register(`designData.${index}.titre`)} defaultValue={design.titre} />
                <textarea className="form-control thick message" {...register(`designData.${index}.texte`)} defaultValue={design.texte} />
              </div>
            ))}
          </div>
        </div>
        <hr/>

        {/* Engagement */}
        <div className="divEdit">
          <h1>Engagement</h1>
          <div className="cardEdit largeurFix">
            <input className="form-control thick" {...register("engagementData.titre")} defaultValue={data.engagementData.titre} /> <br />
            <textarea className="form-control thick message textareaHaut" {...register(`engagementData.texte`)} defaultValue={data.engagementData.texte} />
            <h2>Images</h2>
            <div className="displayGrid">
              {data.engagementData.image.map((img: any, index: number) => (
                <div key={index} className="displayFlex">
                  <img src={`./image/${img.image}`} width={'150px'}/>
                  {/* <input className="form-control thick" key={index} {...register(`engagementData.image.${index}.image`)} defaultValue={img.image} /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr/>

      </form>
    </div>
  );
};

export default JsonEditor;

