import React, { useEffect, useState } from 'react'
import ServiceImg from '../../assets/images/k.jpeg';
import { apiUrl, fileUrl } from './http';
import { Link } from 'react-router-dom';


const LatestServices = () => {

    const [services, setServices] = useState([]);

    const fetchLatestServices = async () => {
        const res = await fetch(apiUrl + 'get-latest-services?limit=4', {
            'method': 'GET',
        });
        const result = await res.json();
        if (result.status == true) {
            setServices(result.data)
        }
    }

    useEffect(() => {
        fetchLatestServices()
    }, []);

    return (
        <>
            <section className='section-3 bg-light py-5'>
                <div className='container-fluid py-5'>
                    <div className='section-header text-center'>
                        <span>Nos Services</span>
                        <h2>Nos services administratives</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    </div>

                    <div className='row pt-4'>
                        {/*Service 1"*/}
                        {
                            services && services.map((service) => {
                                return (
                                    <div className='col-md-3 col-lg-3' key={service.id}>
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
                </div>
            </section >
        </>
    )
}

export default LatestServices
