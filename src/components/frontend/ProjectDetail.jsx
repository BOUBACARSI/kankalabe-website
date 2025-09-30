import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'
import { apiUrl, fileUrl } from '../common/http'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import ShowTestimonial from '../common/ShowTestimonial'

const ProjectDetail = () => {
    const params = useParams();
    const [project, setProject] = useState([]);
    const [projects, setProjects] = useState([]);


    const fetchProjects = async () => {
        const res = await fetch(`${apiUrl}get-projects/`, {
            method: 'GET'
        });
        const result = await res.json();
        if (result.status == true) {
            setProjects(result.data)
        }
    }


    const fetchProject = async () => {
        const res = await fetch(`${apiUrl}get-project/${params.id}`, {
            method: 'GET'
        });
        const result = await res.json();
        if (result.status == true) {
            console.log(result)
            setProject(result.data)
        }
    }


    useEffect(() => {
        fetchProjects();
        fetchProject();
    }, [params.id]);


    return (
        <>
            <Header />
            <main>
                <Hero
                    preHeading="Unité – Innovation – Progrès"
                    heading={`${project.title}`}
                    text=""
                />
                <section className='section-10'>
                    <div className='container py-5'>
                        <div className='row'>

                            <div className='col-md-8'>
                                <div>
                                    <img className='w-100' src={`${fileUrl}uploads/projects/large/${project.image}`} alt="" />
                                </div>
                                <h3 className='py-4'>{project.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: project.content }}></div>
                            </div>

                            <div className='col-md-4'>
                                <div className='card shadow border-0 sidebar'>
                                    <div className='card-body px-4 py-4'>
                                        <h3 className='mt-2 mb-3'>Détails</h3>
                                        <ul>
                                            {
                                                project.budget && <li className='mb-2'>
                                                    <span className='text-body-secondary'>Budget du projet</span>
                                                    <p>{project.budget}</p>
                                                </li>
                                            }

                                            {
                                                project.project_category && <li className='mb-2'>
                                                    <span className='text-body-secondary'>Catégorie du projet</span>
                                                    <p>{project.project_category}</p>
                                                </li>
                                            }

                                            {
                                                project.sector && <li className='mb-2'>
                                                    <span className='text-body-secondary'>Secteur de développement</span>
                                                    <p>{project.sector}</p>
                                                </li>
                                            }

                                        </ul>
                                    </div>
                                </div>

                                <hr className=' py-3' />

                                {/*EXXXXXXXXXX */}
                                <div className='card shadow border-0 sidebar'>
                                    <div className='card-body px-4 py-4'>
                                        <h3 className='mt-2 mb-3'>Nos Projets</h3>
                                        <ul>
                                            {
                                                projects && projects.map((project) => {
                                                    return (
                                                        <li key={`project-${project.id}`}>
                                                            <Link to={`/project/${project.id}`}>{project.title}</Link>
                                                        </li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className='section-11 bg-light'>
                    <ShowTestimonial />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ProjectDetail
