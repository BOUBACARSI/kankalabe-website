import React, { useEffect, useState } from 'react'

import Header from '../common/Header';
import Footer from '../common/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination"
import { Pagination } from 'swiper/modules';





import Icon1 from '../../assets/images/district.png';
import Icon2 from '../../assets/images/secteur.png';
import Icon3 from '../../assets/images/village.png';

import About from '../common/About';
import { apiUrl, token } from '../common/http';
import LatestServices from '../common/LatestServices';
import LatestProjects from '../common/LatestProjects';
import LatestArticles from '../common/LatestArticles';
import ShowTestimonial from '../common/ShowTestimonial';


const Home = () => {



    return (
        <>
            <Header />

            <main>
                {/*Première Section "Accuiel"*/}
                <section className='section-1'>
                    <div className="hero d-flex align-items-center">
                        <div className="container-fluid">
                            <div className="text-center">
                                <span><strong>Bienvenue sur le site officiel de Kankalabé</strong></span>
                                <h1>Rêvons, Croyons et Réalisons ensemble</h1>
                                <p>Kankalabé, c’est la force d’une communauté soudée autour de ses valeurs et de ses ambitions. <br /> Ensemble, nous transformons nos rêves en projets concrets pour un avenir meilleur</p>
                                <div className='mt-4'>
                                    <a type='button' className='btn btn-primary large'>Actualités</a>
                                    <a type='button' className='btn btn-secondary ms-2 large'>Voir les projets</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Deuxième Section "Apropos"*/}
                <About />

                {/*Troisième Section "Nos services"*/}
                <LatestServices />

                {/*Quatrième Section "Focus"*/}
                <section className='section-4 py-5'>
                    <div className="container py-5">
                        <div className='section-header text-center'>
                            <span>Focus sur Kankalabé</span>
                            <h2>Découvrons ensemble</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        </div>

                        <div className='row pt-4'>
                            <div className='col-md-4'>
                                <div className='card shadow border-0 p-4'>
                                    <div className='card-icon'>
                                        <img src={Icon1} alt="" width={50} />
                                    </div>
                                    <div className='card-title mt-3'>
                                        <h3>Les <strong>8</strong> districts</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                        Pariatur, eos veritatis remon aperiam.
                                    </p>
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className='card shadow border-0 p-4'>
                                    <div className='card-icon'>
                                        <img src={Icon2} alt="" width={50} />
                                    </div>
                                    <div className='card-title mt-3'>
                                        <h3>Les <strong>24</strong> secteurs</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                        Pariatur, eos veritatis remon aperiam.
                                    </p>
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className='card shadow border-0 p-4'>
                                    <div className='card-icon'>
                                        <img src={Icon3} alt="" width={50} />
                                    </div>
                                    <div className='card-title mt-3'>
                                        <h3>Les <strong>80</strong> Villages</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                        Pariatur, eos veritatis remon aperiam.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Troisième Section "Nos projet"*/}
                <LatestProjects />


                {/*Cinquième Section "Les Témoinages"*/}
                <ShowTestimonial />

                {/*Sixième Section "Blogs"*/}
                <LatestArticles />
            </main>

            <Footer />
        </>

    )
}

export default Home
