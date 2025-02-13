import React from 'react';
import { useFetchData } from "../../data/useFetchData";
import './presentation.css'

interface presentation {
    photo: string,
    soustitre: string,
    accroche: string,
    titre: string,
    texte: string,
}

const Presentation: React.FC = () => {
    const { data, loading, error } = useFetchData<{ presentationData: presentation }>();
    if (loading) {
        console.log('Loading data...');
    }
    
    if (error) {
        console.log(`Error: ${error}`);
    }

    return (
        <section id="p" className="presentation fondBleu">
            <div className="presDiv presGrid1">
                <img
                    className="profil"
                    src={`image/${data?.presentationData.photo}`}
                    alt="Imgparcours"
                />
                <h2>{data?.presentationData.soustitre}</h2>
            </div>

            <div className="presDiv presGrid2">
                <p>{data?.presentationData.accroche}</p>
            </div>

            <div className="presDiv presGrid3 card presCard card1">
                <h2>{data?.presentationData.titre}</h2>
                <div dangerouslySetInnerHTML={{ __html: data?.presentationData?.texte || '' }} ></div>
            </div>

            <div className="diviser1 presGrid4">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M1200 0L0 0 892.25 114.72 1200 0z"
                        className="shape-fill"
                    ></path>
                </svg>
            </div>
        </section>
    );
};

export default Presentation;
