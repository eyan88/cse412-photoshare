import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Root from './routes/Root';
import Login from './routes/Login';
import Upload from './routes/Upload';
import Friends from './routes/Friends';
import Gallery from './components/Gallery';
import LargePost from './components/LargePost';
import './index.css'
import Albums from './routes/Albums';

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
        element: <LargePost />
      },
      {
        path: '/albums',
        element: <Albums />
      },
      {
        path: '/friends',
        element: <Friends />
      },
      {
        path: '/upload',
        element: <Upload />
      },
      {
        path: '/loginpage',
        element: <Login />,
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
