import React, { useState } from 'react';
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { apiUrl, token } from '../../common/http'
import { toast } from 'react-toastify'


const Create = () => {

    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const newData = { ...data, "imageId": imageId }
        const res = await fetch(apiUrl + 'members', {
            'method': 'POST',
            'headers': {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
            body: JSON.stringify(newData)
        });
        const result = await res.json();

        if (result.status === true) {
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

                if (result.status === false) {
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
                                        <h4 className='h5'>Ajouter un membre</h4>
                                        <Link to="/admin/members" className='btn btn-primary'>Retour</Link>
                                    </div>
                                    <hr />

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* Nom */}
                                        <div className='mb-3'>
                                            <label className='form-label'>Nom</label>
                                            <input
                                                placeholder='Nom complet'
                                                {...register('name', { required: "Le champ du nom est requis" })}
                                                type="text"
                                                className={`form-control ${errors.name && 'is-invalid'}`}
                                            />
                                            {errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>}
                                        </div>

                                        {/* Profession */}
                                        <div className='mb-3'>
                                            <label className='form-label'>Profession</label>
                                            <input
                                                placeholder='Profession'
                                                {...register('job_title', { required: "Le champ de la profession est requis" })}
                                                type="text"
                                                className={`form-control ${errors.job_title && 'is-invalid'}`}
                                            />
                                            {errors.job_title && <p className='invalid-feedback'>{errors.job_title?.message}</p>}
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

                                        {/* Image */}
                                        <div className='mb-3'>
                                            <label className='form-label'>Image</label><br />
                                            <input onChange={handleFile} type="file" />
                                        </div>

                                        {/* Statut */}
                                        <div className='mb-3'>
                                            <label className='form-label'>État</label>
                                            <select className='form-control' {...register('status')}>
                                                <option value="1">Activé</option>
                                                <option value="0">Désactivé</option>
                                            </select>
                                        </div>

                                        <button disabled={isDisable} className='btn btn-primary'>Enrégister</button>
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

export default Create
