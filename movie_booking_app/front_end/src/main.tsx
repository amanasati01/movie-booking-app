import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import '@fontsource/roboto';
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./layout.tsx";
import Home from "./pages/Home.tsx";
import Movie from './pages/Movie.tsx'
import Theater from './pages/Theater.tsx'
import SeatLayout from './components/SeatLayout.tsx'
import MovieLoading from './components/MovieLoading.tsx'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />  
      <Route path="title" element={<Movie />} /> 
      <Route path={`title/book-ticket/:movieName/:cityName/`} element={<Theater/>} />
      <Route path={`title/book-ticket/:movieName/:cityName/seat-layout`} element={<SeatLayout/>} />
      <Route path='/movieLoading' element={<MovieLoading/> }/>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <RouterProvider router={router}/>
    <App/>
  </RecoilRoot>
)
