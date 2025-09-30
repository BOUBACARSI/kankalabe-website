import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import { apiUrl, token } from '../../common/http'
import { Link, Links } from 'react-router-dom'
import { toast } from 'react-toastify'

const Show = () => {

    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        const res = await fetch(apiUrl + 'members', {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            }
        });
        const result = await res.json();
        setMembers(result.data);
    }

    //La méthode de suppression
    const deleteMember = async (id) => {

        if (confirm("Vous êtes sûr de vouloir le supprimer ?")) {
            const res = await fetch(apiUrl + 'members/' + id, {
                'method': 'DELETE',
                'headers': {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                }
            });
            const result = await res.json();

            if (result.status == true) {
                const newMembers = members.filter(member => member.id != id)
                setMembers(newMembers);
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        }



        //setServices(result.data);

    }

    useEffect(() => {
        fetchMembers();
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
                                        <h4 className='h5'>Membres</h4>
                                        <Link to="/admin/members/create" className='btn btn-primary'>Créer</Link>
                                    </div>
                                    <hr />

                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nom</th>
                                                <th>Profession</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                members && members.map(member => {
                                                    return (
                                                        <tr key={`member-${member.id}`}>
                                                            <td>{member.id}</td>
                                                            <td>{member.name}</td>
                                                            <td>{member.job_title}</td>
                                                            <td>
                                                                {
                                                                    (member.status == 1) ? 'Activé' : 'Désactivé'
                                                                }
                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/members/edit/${member.id}`} className='btn btn-primary btn-sm'>Modifier</Link>
                                                                <Link onClick={() => deleteMember(member.id)} className='btn btn-secondary btn-sm ms-2'>Supprimer</Link>
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
