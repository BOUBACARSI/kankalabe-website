import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Hero from '../common/Hero'

import BlogImg from '../../assets/images/blog.jpeg';
import { apiUrl, fileUrl } from '../common/http';
import { Link } from 'react-router-dom';


const Blogs = () => {

    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        const res = await fetch(apiUrl + 'get-articles', {
            'method': 'GET',
        });
        const result = await res.json();
        if (result.status == true) {
            setArticles(result.data)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, []);


    return (
        <>
            <Header />
            <main>
                <Hero
                    preHeading="Restez connectés"
                    heading="Blog & Actualités"
                    text="Toutes les nouvelles, articles et publications pour suivre la vie de notre communauté."
                />


                <section className='section-6 bg-light py-5'>
                    <div className='container'>
                        <div className='section-header text-center'>
                            <span>Blog & Actuaités</span>
                            <h2>Actualités et Publications</h2>
                            <p>
                                Restez connectés avec la vie de notre communauté !
                                Cette rubrique partage les dernières nouvelles, des articles de fond et des publications qui mettent en lumière
                                les réussites, les défis et les perspectives de Kankalabé.
                                Un espace de réflexion et d’information au service de tous.
                            </p>
                        </div>

                        <div className='row pt-3'>
                            <div className='col-md-4'>
                                {
                                    articles && articles.map((article) => {
                                        return (
                                            <div className='card shadow bord-0 mt-4'>
                                                <div className='img-top'>
                                                    <img src={`${fileUrl}uploads/articles/small/${article.image}`} alt="" className='w-100' />
                                                </div>
                                                <div className='card-body p-4'>
                                                    <div className='mb-3'>
                                                        <Link to={`/blog/${article.id}`} className='title'>{article.title}</Link>
                                                    </div>
                                                    <Link to={`/blog/${article.id}`} className='btn btn-primary small'>Lire plus</Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </section>
            </main>
            <Footer />

        </>
    )
}

export default Blogs
