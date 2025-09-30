import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import { apiUrl, token } from '../common/http';

import { Link } from 'react-router-dom';


const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        services: 0,
        articles: 0,
        testimonials: 0,
        members: 0,
    });

    const fetchStats = async () => {
        try {
            const endpoints = [
                { key: 'projects', url: 'projects' },
                { key: 'services', url: 'services' },
                { key: 'articles', url: 'articles' },
                { key: 'testimonials', url: 'testimonials' },
                { key: 'members', url: 'members' },
            ];



            const results = {};
            for (let endpoint of endpoints) {
                const res = await fetch(apiUrl + endpoint.url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token()}`,
                    },
                });
                const data = await res.json();
                results[endpoint.key] = data?.data?.length || 0;
            }
            setStats(results);
        } catch (error) {
            console.error('Erreur fetch stats:', error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const cards = [
        { title: 'Projets', value: stats.projects, color: '#6a11cb', icon: '📁', route: 'projects' },
        { title: 'Services', value: stats.services, color: '#28a745', icon: '🛠️', route: 'services' },
        { title: 'Articles', value: stats.articles, color: '#ffc107', icon: '📝', route: 'articles' },
        { title: 'Témoignages', value: stats.testimonials, color: '#17a2b8', icon: '💬', route: 'testimonials' },
        { title: 'Membres', value: stats.members, color: '#6c757d', icon: '👥', route: 'members' },
    ];


    return (
        <>
            <Header />
            <main>
                <div className='container-fluid py-5'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <Sidebar />
                        </div>
                        <div className='col-md-9'>
                            <h2 className='mb-4'>Tableau de bord</h2>

                            {/* Cards */}
                            <div className='row g-4 mb-4'>
                                {cards.map((card, i) => (
                                    <div key={i} className='col-md-4 col-sm-6'>
                                        <Link to={`/admin/${card.route.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                            <div
                                                className='card shadow-sm text-white p-3'
                                                style={{
                                                    borderRadius: '12px',
                                                    backgroundColor: card.color,
                                                    transition: 'transform 0.2s',
                                                }}
                                            >
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div>
                                                        <h5>{card.title}</h5>
                                                        <p className='fs-2 fw-bold'>{card.value}</p>
                                                    </div>
                                                    <div style={{ fontSize: '2rem' }}>{card.icon}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>


                            {/* Statistiques rapides avec barres */}
                            <div className='p-4 bg-light rounded shadow-sm mb-4'>
                                <h5>Statistiques rapides</h5>
                                {(() => {
                                    const total = Object.values(stats).reduce((a, b) => a + b, 0) || 1; // éviter division par 0
                                    return cards.map((card, i) => {
                                        const percentage = ((card.value / total) * 100).toFixed(0);
                                        return (
                                            <div key={i} className='mb-3'>
                                                <div className='d-flex justify-content-between'>
                                                    <span>{card.icon} {card.title}</span>
                                                    <span>{percentage}%</span>
                                                </div>
                                                <div style={{
                                                    height: '10px',
                                                    backgroundColor: '#e0e0e0',
                                                    borderRadius: '5px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        width: `${percentage}%`,
                                                        backgroundColor: card.color,
                                                        height: '100%',
                                                        borderRadius: '5px',
                                                        transition: 'width 0.5s'
                                                    }} />
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>


                            <div className='mt-5 p-4 bg-light rounded shadow-sm'>
                                <h5>Bienvenue dans votre espace admin !</h5>
                                <p>
                                    Gérez vos projets, services, articles, témoignages et membres.
                                    Suivez les statistiques en temps réel et contrôlez votre communauté facilement.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <style>{`
        .card:hover {
          transform: translateY(-5px);
        }
      `}</style>
        </>
    );
};

export default Dashboard;
