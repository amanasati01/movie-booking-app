import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { latitudeAtom, locationInput, longitudeAtom, movieName } from "../atoms/Atoms";
import MovieLoading from "../components/MovieLoading";

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  popularity: string;
  adult: boolean;
  language: string;
  release_date: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search); 
}

export default function Movie() {
  const query = useQuery();
  const [title, setTitle] = useRecoilState(movieName);
  const queryTitle = query.get("title");
  // useEffect(()=>{
  //   if(!title){
  //     return;
  //   }
  // },[title])
  useEffect(()=>{
  },[queryTitle,setTitle])
  useEffect(()=>{
    console.log("title " + title);
    
  },[title])
  const cityName = useRecoilValue(locationInput);
  const [data, setData] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useRecoilValue(locationInput)
  const [longitude , setLogitude] = useRecoilState(longitudeAtom)
  const [latitude , setLatitude] = useRecoilState(latitudeAtom)
  const navigate = useNavigate();
  useEffect(() => {
    if (!title) {
      setError("No movie title provided.");
      setLoading(false);
      return;
    }

    const fetchMovieByTitle = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              query: title, 
              api_key: "7a1b5e8ec1880d90f2f5f29f67657e6a", 
            },
            timeout: 30000,
          }
        );

        const results = response.data.results;
        console.log(results);

        if (results.length === 0) {
          setError("No movie found with that title.");
        } else {
          setData(results[0]);
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.code === "ECONNABORTED") {
          setError("Request timed out. Please try again.");
        } else if (axios.isAxiosError(err)) {
          setError("Error fetching movie details. Please check your network or API key.");
        } else {
          setError("An unexpected error occurred.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieByTitle();
  }, [title]);

  if (loading) {
    return <p><MovieLoading/></p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  function handleClick(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,err);
    }
    else{
      console.log("Geolocation not supported");
    }
   
    function success(position : any){
      
      setLatitude(position.coords.latitude);
      setLogitude(position.coords.longitude)
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
    function err(){
      console.log("Unable to retrieve your location");
    }
    if(cityName != 'Location')
    navigate(`book-ticket/${title}/${location}`)
    else{
      alert('Plase enter your city name')
    }

  }
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${data?.backdrop_path})` }}
      />
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative top-3 w-full flex flex-col  text-white text-center ml-1">
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="col-span-1 flex justify-center">
            <img
              className="shadow-2xl rounded-3xl mb-8 w-full max-w-sm"
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt="Movie Poster"
            />
          </div>
          <div className="col-span-2 text-left flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">{data?.title}</h1>
            <p className="mb-4 text-lg font-extralight">{data?.overview}</p>
            <p className="mb-4">{`${data?.language} | Popularity: ${data?.popularity} | Release Date: ${data?.release_date}`}</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md" onClick={handleClick}>
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
