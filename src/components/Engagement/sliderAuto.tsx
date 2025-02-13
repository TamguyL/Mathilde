import React, { useEffect, useState } from "react";

const ImageList: React.FC = () => {

  // Déclaration des variables pour la largeur, la hauteur et les durées
  const imageWidth = "360px";
  const imageHeight = "640px";
  const changeInterval = 7000; // Temps entre les changements (en ms)
  const animationDuration = 1.5; // Durée de l'animation (en secondes)

  // Liste des chemins des images dans le dossier public/images
  const imageUrls = [
    "/image/surf1.png",
    "/image/surf2.png",
    "/image/surf3.png",
    "/image/surf4.png",
  ];

  // Style commun aux images
  const commonStyles = {
    display: "block", /* Pour que les marges automatiques fonctionnent */
    margin: "0 auto",
    maxWidth: "88%",
    maxHeight: "100%",
    // clipPath: 'inset(0 37px 0 37px)',
    objectFit: "cover" as React.CSSProperties['objectFit'],
  };

  // State pour gérer l'image actuellement affichée
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1); // Index de l'image suivante
  const [isSwiping, setIsSwiping] = useState(false); // Indicateur pour déclencher l'animation
  const [isVisible, setIsVisible] = useState(false)

  // Fonction pour passer à l'image suivante
  const nextImage = () => {
    setIsSwiping(true); // Déclenche l'animation
    setIsVisible(true);
    setTimeout(() => {
      setCurrentImageIndex(nextImageIndex); // L'image suivante devient l'image actuelle
      setNextImageIndex((nextImageIndex + 1) % imageUrls.length); // Mise à jour de l'image suivante
      setIsSwiping(false); // Réinitialise l'animation
      setIsVisible(false);
    }, animationDuration * 1000); // Durée de l'animation en millisecondes
    
  };

  // Effet pour changer d'image toutes les X secondes
  useEffect(() => {
    const interval = setInterval(nextImage, changeInterval);
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextImageIndex]);

  return (
    <div>
      {/* Premier élément avec superposition */}
        <div
            style={{
                position: "relative", // Positionnement relatif pour le conteneur
                width: imageWidth,
                height: imageHeight,
                overflow: "hidden", // Pour cacher l'image qui sort
                marginBottom: "10px",
                textAlign: "center",
                borderRadius: "68px 68px 65px 65px / 140px 140px 130px 130px",
                clipPath: "inset(4px 24px 4px 24px)",
            }}
        >
            {/* Image actuelle */}
            <div
                style={{
                    position: "absolute",
                    top: isSwiping ? "-100%" : "0", // L'image actuelle se déplace vers le haut
                    left: "0",
                    width: "100%",
                    height: "100%",
                    transition: `top ${animationDuration}s ease-in-out`,  // Animation fluide
                }}
            >
                <img
                    src={imageUrls[currentImageIndex]}
                    alt={`Fond d'écran`}
                    style={commonStyles}
                />
            </div>

            {/* Image suivante qui pousse l'image actuelle */}
            <div
                style={{
                    position: "absolute",
                    top: isSwiping ? "0" : "100%", // Commence en bas, puis remonte pour prendre la place
                    left: "0",
                    width: "100%",
                    height: "100%",
                    transition: `top ${animationDuration}s ease-in-out`, // Animation fluide pour l'apparition
                }}
            >
                <img
                    src={imageUrls[nextImageIndex]} // L'image suivante
                    alt={`Fond d'écran suivant`}
                    style={commonStyles}
                />
            </div>


            <img
                src={imageUrls[currentImageIndex]}
                alt={`Fond d'écran`}
                style={{
                    ...commonStyles,
                    position: "relative",
                    visibility: isVisible ? "hidden" : "visible",
                }}
            />

            {/* Image du smartphone */}
                <img
                    src="/image/iphone.png"
                    alt="Smartphone"
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        pointerEvents: "none",
                    }}
                />
        </div>
    </div>
  );
};

export default ImageList;
