import React from "react";
import "./card.css";

interface VideoProps {
    id: number;
    titre: string;
    lienvideo: string;
    phrase: string;
}

const Card: React.FC<VideoProps> = React.memo(({ id, titre, lienvideo, phrase }) => {
  return (
    <div className="containerCard">
        <div className="card cardCard card2">
            <label htmlFor={`item-${id}`} id={`song-${id}`}>
                <h2>{titre}</h2>
                <div className="videoWrapper">
                    <iframe
                        src={`https://www.youtube.com/embed/${lienvideo}?controls=0`}
                        frameBorder="0"
                        allowFullScreen
                        title={titre}
                        loading="lazy"
                    ></iframe>
                </div>
                <div className="descriptionCard">
                    <p className="descriptionDesign">{phrase}</p>
                </div>
            </label>
        </div>
    </div>
  );
});

export default Card;
