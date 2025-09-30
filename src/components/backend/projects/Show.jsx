import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import { Link } from 'react-router-dom'
import { apiUrl, token } from '../../common/http'
import { toast } from 'react-toastify'

const Show = () => {

    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const res = await fetch(apiUrl + 'projects', {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            }
        });
        const result = await res.json();
        setProjects(result.data);
    }


    const deleteProject = async (id) => {
        if (confirm("Vous êtes sûr de vouloir le supprimer ?")) {
            const res = await fetch(apiUrl + 'projects/' + id, {
                'method': 'DELETE',
                'headers': {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();

            if (result.status == true) {
                const newProjects = projects.filter(project => project.id != id)
                setProjects(newProjects);
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        }
    }


    useEffect(() => {
        fetchProjects();
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
                                        <h4 className='h5'>Projets</h4>
                                        <Link to="/admin/projects/create" className='btn btn-primary'>Créer</Link>
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
                                                projects && projects.map(project => {
                                                    return (
                                                        <tr key={`project-${project.id}`}>
                                                            <td>{project.id}</td>
                                                            <td>{project.title}</td>
                                                            <td>{project.slug}</td>
                                                            <td>
                                                                {
                                                                    (project.status == 1) ? 'Activé' : 'Désactivé'
                                                                }
                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/projects/edit/${project.id}`} className='btn btn-primary btn-sm'>Modifier</Link>
                                                                <Link onClick={() => deleteProject(project.id)} className='btn btn-secondary btn-sm ms-2'>Supprimer</Link>
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
