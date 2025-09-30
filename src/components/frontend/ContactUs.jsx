import React, { useState } from 'react';
import axios from 'axios';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/contact-now", formData);

            if (res.data.status === true) {
                toast.success(res.data.message, { autoClose: 5000, closeButton: true });
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });
            } else {
                toast.error(res.data.message || "Erreur lors de l'envoi ❌", { autoClose: 5000, closeButton: true });
            }
        } catch (error) {
            toast.error("Erreur serveur, réessayez plus tard ❌", { autoClose: 5000, closeButton: true });
        }
    };

    return (
        <>
            <Header />
            <main>
                <Hero
                    preHeading="Échangeons ensemble"
                    heading="Contact"
                    text="Un espace dédié pour dialoguer, collaborer et bâtir des projets communs."
                />

                <section className='section-9 py-5'>
                    <div className='container'>
                        <div className='section-header text-center'>
                            <h2>Nous Contacter</h2>
                            <p>
                                Kankalabé, c’est une communauté ouverte au dialogue et à la collaboration.
                                À travers cette page, vous pouvez nous écrire directement, partager vos idées ou proposer des partenariats.
                                Chaque message est une contribution précieuse pour améliorer notre action collective.
                            </p>
                        </div>

                        <div className='row mt-5'>
                            {/* Formulaire Contact */}
                            <div className='col-md-9'>
                                <div className='card shadow border-0 mb-3'>
                                    <div className='card-body py-4'>
                                        <form onSubmit={handleSubmit}>
                                            <div className='row'>
                                                <div className='col-md-6 mb-4'>
                                                    <label>Nom</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className='form-control form-control-lg'
                                                        placeholder='Entrer votre nom'
                                                        required
                                                    />
                                                </div>

                                                <div className='col-md-6 mb-4'>
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className='form-control form-control-lg'
                                                        placeholder='Entrer votre adresse email'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-6 mb-4'>
                                                    <label>Téléphone</label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className='form-control form-control-lg'
                                                        placeholder='N° de téléphone'
                                                    />
                                                </div>

                                                <div className='col-md-6 mb-4'>
                                                    <label>Sujet</label>
                                                    <input
                                                        type="text"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        className='form-control form-control-lg'
                                                        placeholder='Sujet'
                                                    />
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-12 mb-4'>
                                                    <label>Message</label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        className='form-control form-control-lg'
                                                        rows={5}
                                                        placeholder='Votre message'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <button className='btn btn-primary mt-3'>Envoyer</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Informations */}
                            <div className='col-md-3'>
                                <div className='card shadow border-0'>
                                    <div className='card-body py-4'>
                                        <h3>Appelez-nous</h3>
                                        <div><a href="#">(+224-624-01-30-03)</a></div>
                                        <div><a href="#">(+224-623-48-62-14)</a></div>

                                        <h3 className='mt-4'>Écrivez-nous</h3>
                                        <div><a href="#">kankalabefifow@gmail.com</a></div>
                                        <div><a href="#">elabubakr1161@gmail.com</a></div>

                                        <h3 className='mt-4'>Adresses</h3>
                                        <div>Ckry-001, Sonfonia rails, Sonfonia,
                                            Conakry, Guinée, @Kankalabefifow
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default ContactUs;
