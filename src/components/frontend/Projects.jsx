import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Hero from '../common/Hero'
import Footer from '../common/Footer'

import ProjectImg from '../../assets/images/projet.png';
import { apiUrl, fileUrl } from '../common/http';
import { Link } from 'react-router-dom';


const Projects = () => {


    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const res = await fetch(apiUrl + 'get-projects', {
            'method': 'GET',
        });
        const result = await res.json();
        if (result.status == true) {
            setProjects(result.data)
        }

        //setProjects(result.data)
    }

    useEffect(() => {
        fetchProjects()
    }, []);


    return (
        <>
            <Header></Header>
            <main>
                <Hero
                    preHeading="Nos projets phares"
                    heading="Projets"
                    text="Des initiatives concrètes pour bâtir un avenir meilleur et faire de Kankalabé une référence."
                />


                <section className='section-3 bg-light py-5'>
                    <div className='container py-5'>
                        <div className='section-header text-center'>
                            <span>Nos Projets</span>
                            <h2>Nos Projets de Développement</h2>
                            <p>
                                Chaque projet porté par Kankalabé reflète notre volonté d’avancer et d’investir pour l’avenir.
                                De l’éducation à la santé, en passant par l’infrastructure et l’économie locale,
                                nos initiatives sont conçues pour améliorer le quotidien des habitants et positionner Kankalabé comme une future préfecture modèle.
                            </p>
                        </div>

                        <div className='row pt-4'>
                            {/*Projet 1"*/}
                            {
                                projects && projects.map((project) => {
                                    return (
                                        <div className='col-md-4 col-lg-4' key={project.id}>
                                            <div className="item">
                                                <div className="service-image">
                                                    <img src={`${fileUrl}uploads/projects/small/${project.image}`} alt="" className='w-100' />
                                                </div>
                                                <div className="service-body">
                                                    <div className="service-title">
                                                        <h3>{project.title}</h3>
                                                    </div>
                                                    <div className='service-content'>
                                                        <p>{project.short_desc}</p>
                                                    </div>
                                                    <Link to={`/project/${project.id}`} className='btn btn-primary'>Lire plus</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            </main>


            <Footer />

        </>
    )
}

export default Projects
