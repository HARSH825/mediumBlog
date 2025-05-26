import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Publish } from './pages/Pulish'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/blog/:id' element={<Blog/>} />
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/publish' element={<Publish/>}/>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </>
  )
}

export default App