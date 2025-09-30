import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className='container py-5'>
                <div className="row">
                    <div className='col-md-3'>
                        <h3 className='mb-3'>Kankalabé FiFow</h3>
                        <div className='pe-5'>
                            <p>
                                Une communauté dynamique et solidaire qui partage projets et initiatives pour le développement local.
                            </p>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <h3 className='mb-3'>Nos services</h3>
                        <ul>
                            <li>
                                <a href="">Sidibé</a>
                            </li>
                            <li>
                                <a href="">Sidibé</a>
                            </li>
                            <li>
                                <a href="">Sidibé</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-3'>
                        <h3 className='mb-3'>Lien rapide</h3>
                        <ul>
                            <li>
                                <Link to={`/about`}>A propos</Link>
                            </li>
                            <li>
                                <Link to={`/services`}>Services</Link>
                            </li>
                            <li>
                                <Link to={`/projects`}>Projets</Link>
                            </li>
                            <li>
                                <Link to={`/blogs`}>Blogs</Link>
                            </li>
                            <li>
                                <Link to={`/contact`}>Contacts</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-3'>
                        <h3 className='mb-3'>Contactez-nous</h3>
                        <ul>
                            <li>
                                <a href="">(+224-624-01-30-03)</a>
                            </li>
                            <li>
                                <a href="">elabubakr1161@gmail.com</a>
                            </li>
                            <p>
                                Ckry-001, Sonfonia rails, Sonfonia,
                                Conakry, Guinée, @Kankalabefifow
                            </p>
                        </ul>
                    </div>

                    <hr />

                    <div className='text-center py-4'>Copyright @ 2025 Kankalabé FiFow. Tous les droits sont réservés</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
