import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'

import ServiceImg from '../../assets/images/k.jpeg';
import { apiUrl, fileUrl } from '../common/http';
import { Link } from 'react-router-dom';

const Services = () => {

    const [services, setServices] = useState([]);

    const fetchAllServices = async () => {
        const res = await fetch(apiUrl + 'get-services', {
            'method': 'GET',
        });
        const result = await res.json();
        console.log(result)
        setServices(result.data)
    }

    useEffect(() => {
        fetchAllServices()
    }, []);


    return (
        <>
            <Header></Header>
            <Hero
                preHeading="Un accompagnement pour tous"
                heading="Services"
                text="Des informations claires et pratiques pour faciliter vos démarches et votre quotidien."
            />


            {/*Troisième Section "Nos services"*/}
            <section className='section-3 bg-light py-5'>
                <div className='container py-5'>
                    <div className='section-header text-center'>
                        <span>Nos Services</span>
                        <h2>Nos Services Educatif, Administratif, etc...</h2>
                        <p>
                            Kankalabé met à disposition de ses citoyens et de ses partenaires une diversité de services accessibles et utiles.
                            Qu’il s’agisse d’informations administratives, de démarches pratiques ou d’accompagnement communautaire,
                            notre objectif est de faciliter la vie quotidienne et de renforcer le lien entre les habitants et leur sous-préfecture.
                        </p>

                    </div>

                    <div className='row pt-4'>
                        {/*Service 1"*/}

                        {
                            services && services.map(service => {
                                return (
                                    <div className='col-md-4 col-lg-4' key={service.id}>
                                        <div className="item">
                                            <div className="service-image">
                                                <img src={`${fileUrl}uploads/services/small/${service.image}`} alt="" className='w-100' />
                                            </div>
                                            <div className="service-body">
                                                <div className="service-title">
                                                    <h3>{service.title}</h3>
                                                </div>
                                                <div className='service-content'>
                                                    <p>{service.short_desc}</p>
                                                </div>
                                                <Link to={`/service/${service.id}`} className='btn btn-primary'>Lire plus</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/*Service 2"*/}
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default Services
