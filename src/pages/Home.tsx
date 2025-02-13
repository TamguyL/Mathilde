import React from 'react';
import Header from '../components/Header/Header.tsx';
import Presentation from '../components/Presentation/Presentation.tsx';
import GroupCard from "../components/GroupCard/GroupCard.tsx";
import Design from "../components/Design/Design.tsx";
import Engagement from "../components/Engagement/Engagement.tsx";
import ContactForm from "../components/Contact/ContactForm.tsx";
import Footer from '../components/Footer/Footer.tsx';

import '../App.css'

const Home: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Presentation/>
                <GroupCard/>
                <Design/>
                <Engagement/>
                <ContactForm/>
            </main>
            <Footer />
        </>
    );
};

export default Home;