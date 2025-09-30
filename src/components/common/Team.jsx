import React, { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from './http';

const Team = () => {
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        try {
            const res = await fetch(apiUrl + 'get-members', {
                method: 'GET',
            });
            const result = await res.json();
            if (result.status === true) {
                setMembers(result.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des membres :", error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <section className='section-8 bg-light py-5'>
            <div className='container'>
                <div className='section-header text-center'>
                    <span>Notre Équipe</span>
                    <h2>Prenez contact pour plus d'informations</h2>
                    <p>Vous pouvez appeler, envoyer un email ou visiter le profil LinkedIn.</p>
                </div>

                <div className='row pt-3'>
                    {members && members.map((member) => (
                        <div key={member.id} className='col-md-6 col-lg-3 md-3'>
                            <div className='card shadow bord-0 mt-4'>
                                <div className='img-top'>
                                    <img
                                        src={`${fileUrl}uploads/members/${member.image}`}
                                        alt={member.name}
                                        className='w-100'
                                    />
                                </div>
                                <div className='card-body p-4 text-center'>
                                    <div className='card-title fw-bold'>
                                        {member.name}
                                    </div>
                                    <div className='card-sub-title mb-3 text-muted'>
                                        {member.job_title}
                                    </div>

                                    {/* Liens de contact dynamiques */}
                                    <div className='d-flex justify-content-center gap-2'>
                                        {/**  {member.contact && (
                                            <a href={`tel:${member.contact}`} className='btn btn-success btn-sm'>
                                                <i className="fas fa-phone"></i>
                                            </a>
                                        )}  */}

                                        {member.contact && (
                                            <a href={`https://wa.me/${member.contact}`} target="_blank" rel="noopener noreferrer" className='btn btn-success btn-sm'>
                                                <i className="fab fa-whatsapp"></i>
                                            </a>
                                        )}
                                        {member.email && (
                                            <a href={`mailto:${member.email}`} className='btn btn-danger btn-sm'>
                                                <i className="fas fa-envelope"></i>
                                            </a>
                                        )}
                                        {member.linkedin && (
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className='btn btn-primary btn-sm'>
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
