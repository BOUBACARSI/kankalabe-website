import React from 'react'
import AboutImg from '../../assets/images/apropos.jpeg';

const About = () => {
    return (
        <section className='section-2 py-5' >
            <div className="container py-5">
                <div className="row">
                    <div className='col-md-6'>
                        <img src={AboutImg} className="w-100 h-100" alt="" />
                    </div>

                    <div className='col-md-6'>
                        <span className='span'>À propos de nous</span>
                        <h2>Sous-Préfecture de Kankalabé</h2>
                        <p>
                            Kankalabé est plus qu’une simple sous-préfecture : c’est une communauté soudée par ses valeurs,
                            son histoire et ses ambitions. Notre objectif est de mettre en lumière le dynamisme de notre population,
                            nos ressources et notre potentiel de développement.
                        </p>
                        <p>
                            À travers ce site, nous voulons partager notre identité, nos réussites et nos projets d’avenir
                            afin de bâtir ensemble une vision commune et durable.
                        </p>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default About
