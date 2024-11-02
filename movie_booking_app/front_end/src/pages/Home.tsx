import React, { useEffect, useState } from "react";
import {Carousel} from "../components/ui/apple-cards-carousel";
import DropdownSearch from "../components/LocationSrchBar";
import Header from "../components/Header";
import Slides from "../components/Slides";
// import  { CardHoverEffectDemo } from "../components/Movies";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { BackgroundGradient } from "../components/ui/background-gradient";
import axios from "axios";
import MoviesCards from "../components/Movies";
import { useRecoilState, useRecoilValue } from "recoil";
import { ParallaxScroll } from "../components/ui/parallax-scroll";
import { path } from "framer-motion/client";
interface Movie{
  id:number,
  title : string,
  release_data : string,
  poster_path : string
}
const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]); 
  const[pathString,setPathString] = useState<{posterURL:string , title : string}[]>([])
  const fetchLatestMovies = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: '7a1b5e8ec1880d90f2f5f29f67657e6a', 
          language: 'hi',  
          region: 'IN',  
          sort_by: 'release_date.desc', 
          with_original_language: 'hi', 
          'primary_release_date.gte': '2024-05-06', 
          'primary_release_date.lte': new Date().toISOString().split('T')[0], 
        },
        // timeout: 10000 
      });
      setMovies((prevMovies ):any => [...prevMovies, ...response.data.results]); 
      console.log('Fetched Movies:', response.data.results);
    } catch (error) {
      console.error('Error fetching Hindi Movies:', error);
    } 
  };
  useEffect(() => {
    fetchLatestMovies(); 
  }, []);
  useEffect(() => {
    const moviePosterURLs = movies.map((movie) => ({
      posterURL: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,  // Poster URL
      title: movie.title,  
    }));
    
    setPathString(moviePosterURLs);
    
    setPathString(moviePosterURLs)
  }, [movies]);
  return (
    <>
      <Slides/>
      <div className="w-full flex justify-center">
      <div className="  rounded-lg w-full flex justify-center">
        <div className="w-full bg-gray-200">
          <h1 className="text-gray-700 text-3xl font-extrabold  w-full flex justify-center">Recomended Movies</h1>
          {/* <Carousel initialScroll={1} items={movieCard}/> */}
         < ParallaxScroll className="Movies" images={pathString}/>
      </div>
      </div>
      </div>
    </>
  );
};
export default Home;
