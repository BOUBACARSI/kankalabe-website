import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

import { default as AboutNew } from '../common/About';
import Hero from '../common/Hero';
import ShowTestimonial from '../common/ShowTestimonial';

import '@fortawesome/fontawesome-free/css/all.min.css';
import Team from '../common/Team';


const About = () => {

    const sections = [
        {
            title: "Présentation de Kankalabé",
            icon: "🏘️",
            content: "Kankalabé est une sous-préfecture située dans la préfecture de Labé, en Guinée. Nichée entre montagnes et plaines, elle est connue pour sa richesse culturelle, sa solidarité communautaire et son dynamisme social. La population est majoritairement peule, mais ouverte à la diversité et aux échanges."
        },
        {
            title: "Histoire",
            icon: "📜",
            content: "Depuis plusieurs générations, Kankalabé s’est distinguée comme un carrefour d’échanges et de traditions. La communauté a toujours accordé une grande importance à l’éducation, à la solidarité entre familles et au respect des valeurs culturelles. Aujourd’hui encore, les jeunes et les aînés travaillent ensemble pour préserver cet héritage tout en l’adaptant aux défis modernes."
        },
        {
            title: "Culture et traditions",
            icon: "🎶",
            content: "Langue principale : le Poular (français utilisé dans l'administration et l'éducation).\nCélébrations : fêtes religieuses, mariages, danses folkloriques et manifestations culturelles.\nValeurs : hospitalité, solidarité, respect des aînés, importance de la famille.\nArtisanat : tissage, poterie, travail du cuir, gastronomie locale (lait, fonio, mil…)."
        },
        {
            title: "Mission & Vision",
            icon: "🎯",
            content: "Mission : soutenir et renforcer l’éducation, protéger l’environnement et promouvoir la culture locale.\nVision : faire de Kankalabé un modèle de développement communautaire durable et participatif."
        }
    ];



    return (

        <>
            <Header />
            <main>
                {/*7 Section "Accuiel"*/}
                <Hero
                    preHeading="Qui sommes-nous ?"
                    heading="À propos de nous"
                    text="Kankalabé, une sous-préfecture en développement rapide, fière de son histoire et de ses ambitions."
                />

                {/* Apropos de nous */}
                <AboutNew />

                {/* Sections détaillées avec cards */}
                <section className="about-section py-5">
                    <div className="container">
                        <div className="row g-4">
                            {sections.map((section, i) => (
                                <div key={i} className="col-md-6">
                                    <div className={`cardH cardH-${i} shadow-sm h-100 p-4`}>
                                        <div className="d-flex align-items-center mb-3">
                                            <div style={{ fontSize: '2rem', marginRight: '10px' }}>{section.icon}</div>
                                            <h4 className="mb-0">{section.title}</h4>
                                        </div>
                                        <p style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8 section 'Team' */}
                <Team />

                {/* Témoignages */}
                <ShowTestimonial />
            </main>
            <Footer />
        </>
    )
}

export default About
