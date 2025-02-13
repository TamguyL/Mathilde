import React, { useState, FormEvent } from 'react';
import { useFetchData } from "../../data/useFetchData";
import './contactForm.css'

interface titre {
    titre1: string,
    titre2: string,
    titre3: string,
    titre4: string,
}

const ContactForm: React.FC = () => {

    const { data, loading, error } = useFetchData<{
        grosTitre: titre,
    }>();
    if (loading) { console.log('Loading data...'); }
    if (error) { console.log(`Error: ${error}`); }

    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);

        // Ajouter ici la logique d'envoi des données
    };


    return (
        <section id="c">
            <div className="container3">
                <form id="form" className="form card card2" method="post" action="/" onSubmit={handleSubmit}>

                    <h1 className="title text-center">{data?.grosTitre.titre4}</h1>

                    <div>
                        <input type="text" name="nom" id="formName" className="form-control thick" placeholder="Nom" value={formData.nom} onChange={handleChange} />
                    </div>

                    <div>
                        <input type="email" name="email" id="formEmail" className="form-control thick" placeholder="Mail" value={formData.email} onChange={handleChange} />
                    </div>

                    <div>
                        <textarea name="message" id="formMessage" className="form-control thick message" rows={7} placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="cta">
                            <span>Envoyer !</span>
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );

}; export default ContactForm;
