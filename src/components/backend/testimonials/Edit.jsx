import React, { useState, useRef, useMemo } from 'react';
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { apiUrl, fileUrl, token } from '../../common/http'
import { toast } from 'react-toastify'

const Edit = () => {

    const [isDisable, setIsDisable] = useState(false);
    const [testimonial, setTestimonial] = useState('');
    const params = useParams();
    const [imageId, setImageId] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl + 'testimonials/' + params.id, {
                'method': 'GET',
                'headers': {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();
            //setContent(result.data.content);
            setTestimonial(result.data);
            return {
                //Récupération de données du formulaire
                testimonial: result.data.testimonial,
                citation: result.data.citation,
                designation: result.data.designation,
                status: result.data.status,


            }
        }
    });


    const navigate = useNavigate();


    const onSubmit = async (data) => {
        const newData = { ...data, "imageId": imageId }
        const res = await fetch(apiUrl + 'testimonials/' + params.id, {
            'method': 'PUT',
            'headers': {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
            body: JSON.stringify(newData)
        });
        const result = await res.json();

        if (result.status == true) {
            toast.success(result.message);
            navigate('/admin/testimonials');
        } else {
            toast.error(result.message);
        }
    }


    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        setIsDisable(true);

        //http://locahost:8000/api/temp-images
        await fetch(apiUrl + 'temp-images', {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                setIsDisable(false);

                if (result.status == false) {
                    toast.error(result.errors.image[0]);
                } else {
                    setImageId(result.data.id)
                }
            });

    }
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
                                        <h4 className='h5'>Modifier le témoignage</h4>
                                        <Link to="/admin/testimonials" className='btn btn-primary'>Retour</Link>
                                    </div>
                                    <hr />


                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className='mb-3'>
                                            <label className='form-label'>Témoignage</label>
                                            <textarea
                                                placeholder='Témoignage'
                                                {
                                                ...register('testimonial', {
                                                    required: "Le champ du titre est réquis "
                                                })
                                                }
                                                className={`form-control ${errors.testimonial && 'is-invalid'}`}
                                                rows={4}
                                            />
                                            {
                                                errors.testimonial && <p className='invalid-feedback'>{errors.testimonial?.message}</p>
                                            }
                                        </div>


                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Citation</label>
                                            <input
                                                placeholder='Citation'
                                                {
                                                ...register('citation', {
                                                    required: "Le champ du titre est réquis "
                                                })
                                                }
                                                type="text"
                                                className={`form-control ${errors.citation && 'is-invalid'}`}
                                            />
                                            {
                                                errors.citation && <p className='invalid-feedback'>{errors.citation?.message}</p>
                                            }
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Désignation</label>
                                            <input
                                                placeholder='Désignation'
                                                {
                                                ...register('designation')
                                                }
                                                type="text"
                                                className={`form-control`}
                                            />
                                        </div>


                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Image</label>
                                            <br />
                                            <input onChange={handleFile} type="file" /> <br />
                                        </div>


                                        {/* Affichage de l'image */}
                                        <div className='pb-3'>
                                            {
                                                testimonial.image && <img src={fileUrl + 'uploads/testimonials/' + testimonial.image} alt="" />
                                            }
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Etat</label>
                                            <select className='form-control'
                                                {
                                                ...register('status')
                                                }
                                            >
                                                <option value="1">Activé</option>
                                                <option value="0">Désactivé</option>
                                            </select>
                                        </div>

                                        <button disabled={isDisable} className='btn btn-primary'>Mettre à jour</button>
                                    </form>

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

export default Edit
