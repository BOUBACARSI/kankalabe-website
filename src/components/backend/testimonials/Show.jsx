import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { Link } from 'react-router-dom'
import { apiUrl, token } from '../../common/http'
import { toast } from 'react-toastify'

const Show = () => {


    const [testimonials, setTestimonials] = useState([]);

    const fetchTestimonials = async () => {
        const res = await fetch(apiUrl + 'testimonials', {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            }
        });
        const result = await res.json();
        setTestimonials(result.data);
    }

    //La méthode de suppression
    const deleteTestimonial = async (id) => {

        if (confirm("Vous êtes sûr de vouloir le supprimer ?")) {
            const res = await fetch(apiUrl + 'testimonials/' + id, {
                'method': 'DELETE',
                'headers': {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();

            if (result.status == true) {
                const newTestimonials = testimonials.filter(testimonial => testimonial.id != id)
                setTestimonials(newTestimonials);
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        }



        //setServices(result.data);

    }

    useEffect(() => {
        fetchTestimonials();
    }, []);


    return (
        <>
            <Header />
            <main>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md-3'>
                            {/*SideBar*/}
                            <Sidebar />
                        </div>
                        <div className='col-md-9'>
                            {/*Dashboard*/}
                            <div className='card shadow border-0'>
                                <div className='card-body p-4'>

                                    <div className='d-flex justify-content-between'>
                                        <h4 className='h5'>Témoignages</h4>
                                        <Link to="/admin/testimonials/create" className='btn btn-primary'>Créer</Link>
                                    </div>
                                    <hr />

                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nom</th>
                                                <th>Slug</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                testimonials && testimonials.map(testimonial => {
                                                    return (
                                                        <tr key={`testimonial-${testimonial.id}`}>
                                                            <td>{testimonial.id}</td>
                                                            <td>{testimonial.testimonial}</td>
                                                            <td>{testimonial.citation}</td>
                                                            <td>
                                                                {
                                                                    (testimonial.status == 1) ? 'Activé' : 'Désactivé'
                                                                }
                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/testimonials/edit/${testimonial.id}`} className='btn btn-primary btn-sm'>Modifier</Link>
                                                                <Link onClick={() => deleteTestimonial(testimonial.id)} className='btn btn-secondary btn-sm ms-2'>Supprimer</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Show
