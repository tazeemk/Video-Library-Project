import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { VideoLibrary } from './components/video-libraray';
import { AdminLogin } from './components/admin-login';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { Signout } from './components/admin-signout';
import { AdminError } from './components/admin-error';
import { AdminDashboard } from './components/admin-dashboard';
import { AddNew } from './components/add-new';
import { DeleteVideo } from './components/Delete-video';
import { EditVideo } from './components/Edit-Video';
import { UserLogin } from './components/user-login';
import { RegisterUser } from './components/register-user';
import { UserError } from './components/user-error';
import { UserDashboard } from './components/user-dashboard';
import { SearchVideo } from './components/search-video';


function App() {

  const [cookies, setCookie, removeCookie] = useCookies('admin-id');

  useEffect(()=>{

  },[]);


  return (
    <div className="app-container bg-dark text-danger" style={{height:'1000px'}}>
        
       <BrowserRouter>
          <header className='header-container'>
            <div className='logo-container'>
            <span className='h2'> <Link to="/" className='text-decoration-none text-danger'>Video Tube</Link> </span>
            </div>
           
            <div className='auth-buttons'>
            <Link className='bi btn btn-warning me-2 bi-person-fill' to="/user-login"> User Login</Link>
            {
              (cookies['admin-id']==undefined)?<Link to="/admin-login" className='btn btn-danger bi bi-person'> Admin Login</Link>:<Signout/>
            }
            </div>
          </header>
    
          <section className='main-section'>
          <Routes>
              <Route path='/' element={<VideoLibrary />} />
              <Route path='admin-login' element={<AdminLogin />} />
              <Route path="adminError" element={<AdminError></AdminError>}></Route>
              <Route path='adminDashboard' element={<AdminDashboard></AdminDashboard>}></Route>
               <Route path='add-video' element={<AddNew></AddNew>}></Route>
              <Route path='deleteVideo/:id' element={<DeleteVideo></DeleteVideo>}></Route>
              <Route path='editVideo/:id' element={<EditVideo></EditVideo>}></Route>
              <Route path='user-login' element={<UserLogin></UserLogin>}></Route>
              <Route path='register' element={<RegisterUser></RegisterUser>}></Route>
             <Route path='usererror' element={<UserError></UserError>}></Route>
              <Route path='userDashboard' element={<UserDashboard></UserDashboard>}></Route>
             <Route path="searchvideo" element={<SearchVideo></SearchVideo>} ></Route>
              </Routes>
            
          </section>
       </BrowserRouter>
      
    </div>
  );
}

export default App;
