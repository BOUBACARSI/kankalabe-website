import React, { useMemo, useRef, useState } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { apiUrl, fileUrl, token } from '../../common/http'
import { toast } from 'react-toastify'

import JoditEditor from 'jodit-react';



const Edit = ({ placeholder }) => {

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [project, setProject] = useState([]);
    const [isDisable, setIsDisable] = useState(false);
    const [imageId, setImageId] = useState(null);

    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || ''
    }),
        [placeholder]
    );


    const params = useParams();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(apiUrl + 'projects/' + params.id, {
                'method': 'GET',
                'headers': {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();
            setContent(result.data.content);
            setProject(result.data);
            return {
                //Récupération de données du formulaire
                title: result.data.title,
                slug: result.data.slug,
                short_desc: result.data.short_desc,
                status: result.data.status,
                project_category: result.data.project_category,
                budget: result.data.budget,
                sector: result.data.sector,


            }
        }
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const newData = { ...data, "content": content, "imageId": imageId }
        const res = await fetch(apiUrl + 'projects/' + params.id, {
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
            navigate('/admin/projects');
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
                                        <h4 className='h5'>Modifier le projet</h4>
                                        <Link to="/admin/projects" className='btn btn-primary'>Retour</Link>
                                    </div>
                                    <hr />


                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Nom</label>
                                            <input
                                                placeholder='Nom du projet'
                                                {
                                                ...register('title', {
                                                    required: "Le champ du titre est réquis "
                                                })
                                                }
                                                type="text"
                                                className={`form-control ${errors.title && 'is-invalid'}`}
                                            />
                                            {
                                                errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                                            }
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Slug</label>
                                            <input
                                                placeholder='Slug'
                                                {
                                                ...register('slug', {
                                                    required: "Le champ du slug est réquis "
                                                })
                                                }
                                                type="text"
                                                className={`form-control ${errors.slug && 'is-invalid'}`}
                                            />
                                            {
                                                errors.slug && <p className='invalid-feedback'>{errors.slug?.message}</p>
                                            }
                                        </div>

                                        {/* Budget et Catégorie */}
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label htmlFor="" className='form-label'>Budget</label>
                                                    <input
                                                        placeholder='Budget du projet'
                                                        {
                                                        ...register('budget', {
                                                            required: "Le champ du slug est réquis "
                                                        })
                                                        }
                                                        type="text"
                                                        className={`form-control`}
                                                    />
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label htmlFor="" className='form-label'>Catégorie du projet</label>
                                                    <select name="project_category" className='form-control'
                                                        {
                                                        ...register('project_category')
                                                        }>
                                                        <option value=""> Sélectionnez une catégorie </option>
                                                        <option value="infrastructures">Infrastructures</option>
                                                        <option value="education">Éducation & Formation</option>
                                                        <option value="sante">Santé & Social</option>
                                                        <option value="agriculture">Agriculture & Développement rural</option>
                                                        <option value="environnement">Environnement & Assainissement</option>
                                                        <option value="eau_energie">Eau & Énergie</option>
                                                        <option value="jeunesse_sport_culture">Jeunesse, Sport & Culture</option>
                                                        <option value="commerce_artisanat">Commerce & Artisanat</option>
                                                        <option value="numerique_innovation">Numérique & Innovation</option>
                                                        <option value="gouvernance">Gouvernance & Développement communautaire</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Secteur et Status */}
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label htmlFor="" className='form-label'>Secteur</label>
                                                    <select name="sector" className='form-control'
                                                        {
                                                        ...register('sector')
                                                        }>
                                                        <option value=""> Sélectionnez un secteur </option>
                                                        <option value="ecoles">Ecole & Alphabétisation</option>
                                                        <option value="sante">Postes & Centres de santé</option>
                                                        <option value="routes">Routes & Pistes rurales</option>
                                                        <option value="marches">Marchés & Commerce local</option>
                                                        <option value="agriculture">Agriculture & Elevage</option>
                                                        <option value="forages">Forages & Accès à l'eau potable</option>
                                                        <option value="energie">Energie & Electrification rurale</option>
                                                        <option value="jeunesse">Sport, Culture & Loisirs</option>
                                                        <option value="numerique">Numérique & Formation digitale</option>
                                                        <option value="environnement">Goestion des déchets & Reboissement</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
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
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <label className='form-label'>Courte Description</label>
                                            <textarea
                                                placeholder='Petite description'
                                                {...register('short_desc')}
                                                className='form-control'
                                                rows={4}
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <label className='form-label'>Contenu</label>
                                            <JoditEditor
                                                ref={editor}
                                                value={content}
                                                config={config}
                                                tabIndex={1} // tabIndex of textarea
                                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                onChange={newContent => { }}
                                            />
                                        </div>


                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Image</label>
                                            <br />
                                            <input onChange={handleFile} type="file" />
                                        </div>

                                        {/* Affichage de l'image */}
                                        <div className='pb-3'>
                                            {
                                                project.image && <img src={fileUrl + 'uploads/projects/small/' + project.image} alt="" />
                                            }
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
