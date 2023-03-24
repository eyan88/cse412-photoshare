import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Root from './routes/Root';
import Login from './routes/Login';
import Gallery from './components/Gallery';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Error 404 page not found</div>,
    children: [
      {
        path: '/gallery',
        element: <Gallery />,
        children: [

        ]
      },
      {
        path: '/posts/:photo_id',
        element: <div>This is where a post should go</div>
      },
      {
        path: '/loginpage',
        element: <Login />,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
