import React, { useState } from "react";
import { useFetchData } from "../../data/useFetchData";
import './design.css'

interface design {
    id: number,
    affichage: boolean,
    image: string,
    texte: string,
    titre: string,
}

interface titre {
    titre1: string,
    titre2: string,
    titre3: string,
    titre4: string,
}

const Design: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data, loading, error } = useFetchData<{
        designData: design[],
        grosTitre: titre,
    }>();
    if (loading) { console.log('Loading data...'); }
    if (error) { console.log(`Error: ${error}`); }

    const filteredData = data?.designData.filter(item => item.affichage) || [];
    if (filteredData.length === 0) {
        return (
            <section id="d" className="marginSection anchor">
                <div className="containerDesign">
                    <h1>{data?.grosTitre.titre2}</h1>
                    <p>Aucune image disponible.</p>
                </div>
            </section>
        );
    }

    const goToPrevious = () => { setCurrentIndex(prevIndex => (prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1)); };
    const goToNext = () => { setCurrentIndex(prevIndex => (prevIndex === filteredData.length - 1 ? 0 : prevIndex + 1)); };

    return (
        <section id="d" className="marginSection anchor">
            <div className="containerDesign">
                <h1>{data?.grosTitre.titre2}</h1>

                <div className="card card1 cardDesign">
                    <button onClick={goToPrevious} className="buttonDesign gridDesign1">👈</button>

                    <div className="displayFlex gridDesign2">
                        <img src={`./image/${filteredData[currentIndex].image}`} alt={filteredData[currentIndex].titre} className="imageDesign" />
                        <p className="descriptionDesign">{filteredData[currentIndex].texte}</p>
                    </div>

                    <button onClick={goToNext} className="buttonDesign gridDesign4">👉</button>
                </div>

            </div>
        </section>
    );

}; export default Design;