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
    const [member, setMemnber] = useState('');
    const params = useParams();
    const [imageId, setImageId] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl + 'members/' + params.id, {
                'method': 'GET',
                'headers': {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();
            //setContent(result.data.content);
            setMemnber(result.data);
            return {
                //Récupération de données du formulaire
                name: result.data.name,
                job_title: result.data.job_title,
                contact: result.data.contact,
                email: result.data.email,
                linkedin: result.data.linkedin,
                status: result.data.status,


            }
        }
    });


    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const newData = { ...data, "imageId": imageId }
        const res = await fetch(apiUrl + 'members/' + params.id, {
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
            navigate('/admin/members');
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
                                        <h4 className='h5'>Modifier les informations du membre</h4>
                                        <Link to="/admin/members" className='btn btn-primary'>Retour</Link>
                                    </div>
                                    <hr />


                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Membre</label>
                                            <input
                                                placeholder='nom'
                                                {
                                                ...register('name', {
                                                    required: "Le champ du nom est réquis "
                                                })
                                                }
                                                type="text"
                                                className={`form-control ${errors.name && 'is-invalid'}`}
                                            />
                                            {
                                                errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                            }
                                        </div>



                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Profession</label>
                                            <input
                                                placeholder='profession'
                                                {
                                                ...register('job_title', {
                                                    required: "Le champ de la profession est réquis "
                                                })
                                                }
                                                type="text"
                                                className={`form-control ${errors.job_title && 'is-invalid'}`}
                                            />
                                            {
                                                errors.job_title && <p className='invalid-feedback'>{errors.job_title?.message}</p>
                                            }
                                        </div>



                                        {/* Téléphone */}
                                        <div className='mb-3'>
                                            <label className='form-label'>Téléphone</label>
                                            <input
                                                placeholder='Numéro de téléphone'
                                                {...register('contact')}
                                                type="text"
                                                className='form-control'
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className='mb-3'>
                                            <label className='form-label'>Email</label>
                                            <input
                                                placeholder='Adresse email'
                                                {...register('email')}
                                                type="email"
                                                className='form-control'
                                            />
                                        </div>

                                        {/* LinkedIn */}
                                        <div className='mb-3'>
                                            <label className='form-label'>LinkedIn</label>
                                            <input
                                                placeholder='Lien LinkedIn'
                                                {...register('linkedin')}
                                                type="url"
                                                className='form-control'
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
                                                member.image && <img width={100} src={fileUrl + 'uploads/members/' + member.image} alt="" />
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
