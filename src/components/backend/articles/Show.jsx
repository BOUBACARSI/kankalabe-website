import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { apiUrl, token } from '../../common/http'
import { Link } from 'react-router-dom'

const Show = () => {

    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        const res = await fetch(apiUrl + 'articles', {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            }
        });
        const result = await res.json();
        setArticles(result.data);
    }

    //La méthode de suppression
    const deleteArticle = async (id) => {

        if (confirm("Vous êtes sûr de vouloir le supprimer ?")) {
            const res = await fetch(apiUrl + 'articles/' + id, {
                'method': 'DELETE',
                'headers': {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();

            if (result.status == true) {
                const newArticles = articles.filter(article => article.id != id)
                setArticles(newArticles);
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        }
    }


    useEffect(() => {
        fetchArticles();
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
                                        <h4 className='h5'>Articles</h4>
                                        <Link to="/admin/articles/create" className='btn btn-primary'>Créer</Link>
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
                                                articles && articles.map(article => {
                                                    return (
                                                        <tr key={`article-${article.id}`}>
                                                            <td>{article.id}</td>
                                                            <td>{article.title}</td>
                                                            <td>{article.slug}</td>
                                                            <td>
                                                                {
                                                                    (article.status == 1) ? 'Activé' : 'Désactivé'
                                                                }
                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/articles/edit/${article.id}`} className='btn btn-primary btn-sm'>Modifier</Link>
                                                                <Link onClick={() => deleteArticle(article.id)} className='btn btn-secondary btn-sm ms-2'>Supprimer</Link>
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
