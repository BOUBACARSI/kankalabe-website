import React, { useEffect, useState } from 'react'
import BlogImg from '../../assets/images/blog.jpeg';
import { apiUrl, fileUrl } from './http';
import { Link } from 'react-router-dom';


const LatestArticles = () => {

    const [articles, setArticles] = useState([]);

    const fetchLatestArticles = async () => {
        const res = await fetch(apiUrl + 'get-latest-articles?limit=4', {
            'method': 'GET',
        });
        const result = await res.json();
        if (result.status == true) {
            setArticles(result.data)
        }
    }

    useEffect(() => {
        fetchLatestArticles()
    }, []);

    return (
        <section className='section-6 bg-light py-5'>
            <div className='container'>
                <div className='section-header text-center'>
                    <span>Blog & Actuaités</span>
                    <h2>Article, Poste, Publications</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
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
    )
}

export default LatestArticles
