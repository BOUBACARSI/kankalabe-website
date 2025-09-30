import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <header>
            <div className="container py-3">
                <Navbar expand="lg">
                    <Navbar.Brand href="/" className='logo'><span>Kankalabé </span>FiFow</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/" className='nav-link'>Accuiel</Nav.Link>
                            <Nav.Link href="/about" className='nav-link'>Apropos</Nav.Link>
                            <Nav.Link href="/services" className='nav-link'>Services</Nav.Link>
                            <Nav.Link href="/projects" className='nav-link'>Projets & Développement</Nav.Link>
                            <Nav.Link href="/blogs" className='nav-link'>Blog</Nav.Link>
                            <Nav.Link href="/contact" className='nav-link'>Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    )
}

export default Header
