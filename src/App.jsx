import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/frontend/Home';
import About from './components/frontend/About';
import Services from './components/frontend/Services';
import Projects from './components/frontend/Projects';
import ContactUs from './components/frontend/ContactUs';
import Blogs from './components/frontend/Blogs';
import Login from './components/backend/Login';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/backend/Dashboard';
import RequireAuth from './components/common/RequireAuth';

//Import pour SERVICE
import { default as ShowServices } from './components/backend/services/Show';
import { default as CreateService } from './components/backend/services/Create';
import { default as EditService } from './components/backend/services/Edit';

//Import pour PROJECTS
import { default as ShowProjects } from './components/backend/projects/Show';
import { default as CreateProject } from './components/backend/projects/Create';
import { default as EditProject } from './components/backend/projects/Edit';

//Import pour ARTICLES
import { default as ShowArticles } from './components/backend/articles/Show';
import { default as CreateArticle } from './components/backend/articles/Create';
import { default as EditArticle } from './components/backend/articles/Edit';

//Import pour TEMOIGNAGES
import { default as ShowTestimonials } from './components/backend/testimonials/Show';
import { default as CreateTestimonial } from './components/backend/testimonials/Create';
import { default as EditTestimonial } from './components/backend/testimonials/Edit';

//Import pour TEMOIGNAGES
import { default as ShowMembers } from './components/backend/members/Show';
import { default as CreateMember } from './components/backend/members/Create';
import { default as EditMember } from './components/backend/members/Edit';
import ServiceDetail from './components/frontend/ServiceDetail';
import ProjectDetail from './components/frontend/ProjectDetail';
import BlogDetail from './components/frontend/BlogDetail';






function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/contact' element={<ContactUs />} />

          <Route path='/service/:id' element={<ServiceDetail />} />
          <Route path='/project/:id' element={<ProjectDetail />} />
          <Route path='/blog/:id' element={<BlogDetail />} />

          <Route path='/admin/login' element={<Login />} />


          <Route path='/admin/dashboard' element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>

          } />

          {/* Les routes de la paga SERVICE */}
          <Route path='/admin/services' element={
            <RequireAuth>
              <ShowServices />
            </RequireAuth>

          } />

          <Route path='/admin/services/create' element={
            <RequireAuth>
              <CreateService />
            </RequireAuth>

          } />

          <Route path='/admin/services/edit/:id' element={
            <RequireAuth>
              <EditService />
            </RequireAuth>

          } />

          {/* Les routes de la paga PROJET */}
          <Route path='/admin/projects' element={
            <RequireAuth>
              <ShowProjects />
            </RequireAuth>

          } />

          <Route path='/admin/projects/create' element={
            <RequireAuth>
              <CreateProject />
            </RequireAuth>

          } />

          <Route path='/admin/projects/edit/:id' element={
            <RequireAuth>
              <EditProject />
            </RequireAuth>

          } />

          {/* Les routes de la paga ARTICLE/BLOG */}
          <Route path='/admin/articles' element={
            <RequireAuth>
              <ShowArticles />
            </RequireAuth>

          } />

          <Route path='/admin/articles/create' element={
            <RequireAuth>
              <CreateArticle />
            </RequireAuth>

          } />

          <Route path='/admin/articles/edit/:id' element={
            <RequireAuth>
              <EditArticle />
            </RequireAuth>

          } />

          {/* Les routes de la Section Témoignage */}
          <Route path='/admin/testimonials' element={
            <RequireAuth>
              <ShowTestimonials />
            </RequireAuth>

          } />

          <Route path='/admin/testimonials/create' element={
            <RequireAuth>
              <CreateTestimonial />
            </RequireAuth>

          } />

          <Route path='/admin/testimonials/edit/:id' element={
            <RequireAuth>
              <EditTestimonial />
            </RequireAuth>

          } />



          {/* Les routes de la section Membres */}
          <Route path='/admin/members' element={
            <RequireAuth>
              <ShowMembers />
            </RequireAuth>

          } />

          <Route path='/admin/members/create' element={
            <RequireAuth>
              <CreateMember />
            </RequireAuth>

          } />

          <Route path='/admin/members/edit/:id' element={
            <RequireAuth>
              <EditMember />
            </RequireAuth>

          } />

        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
      />
    </>
  )
}

export default App
