import { useEffect, useState } from "react";
import Input from "./Input";
import { useRecoilState } from "recoil";
import { locationInput } from "../atoms/Atoms";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface City {
  City: string;
  State: string;
  District: string;
}

export default function Header() {
  const [userInput, setUserInput] = useState<string>();
  const [movieInput, setmovieInput] = useState<string>();
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [options, setOptions] = useState<City[]>([]);
  const [location, setLocation] = useRecoilState<string>(locationInput);
  const navigate = useNavigate();
  useEffect(() => {
    async function getCityName() {
      if (userInput) {
        try {
          const response = await axios.get(`http://localhost:8000/cities`);
          console.log('Full Response:', response.data); 

        
          const filteredOptions = response.data.filter((option : City) =>
            option.City.toLowerCase().includes(userInput.toLowerCase())
          );

          console.log('Filtered Options:', filteredOptions);
          setOptions(filteredOptions); 
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
       
        setOptions([]);
      }
    }
    getCityName();
  }, [userInput]);
  function movieSearch(){
    navigate(`/title?title=${movieInput}`);
  }
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value);
    console.log(userInput);
  }
  function HandleMovieInput(e : React.ChangeEvent<HTMLInputElement>){
    setmovieInput(e.target.value)
  }
  function handleLocation(city: City) { 
    setLocation(city.City); 
    setShowSuggestion(false); 
  }
  function handleKey(e:React.KeyboardEvent<HTMLInputElement>){
    if(e.key == "Enter"){
       setmovieInput('')
        movieSearch();
    }
  }

  return (
    <>
      <div className="hidden md:block">
        <div className="w-full flex justify-center">
          <div className="flex items-center justify-between w-[80%] h-16">
            <div className="flex items-center">
              <div className="cursor-pointer" onClick={()=>{
                navigate('/')
              }}>
                <img
                  src="https://imgs.search.brave.com/Du4Q62bmYX0fj90dQnd_txyQ_yHrmzl4TFshP44N4Rs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vbGgzLmdv/b2dsZXVzZXJjb250/ZW50LmNvbS8xdzZY/ZmZNeVFRVXYtWkpj/akxEYW15SjA0V0xk/RnUyRjd6N09RX3dU/bkVVSWkwbUEyYjdu/bjlLZDViR09pNVFE/MHF6bD13NTEy"
                  alt="Logo"
                  className="w-16 h-16"
                />
              </div>
              <div>
                <Input inputValue={movieInput} height="h-9" width="w-96" handleUserInput={HandleMovieInput} handleKeyboard={handleKey} placeHolder="Search For New Released Movies" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button onClick={() => setShowSuggestion(true)} className="font-medium text-sm">
                  {location}
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 absolute top-1 left-16"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <button className="ml-12 text-white bg-purple-500 rounded-lg text-sm w-20 h-7 font-thin">Sign in</button>
              <div className="ml-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuggestion && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-10" onClick={() => setShowSuggestion(false)}></div>
          <div className="absolute w-[400px] md:w-[500px] h-60 z-20 bg-white items-center md:left-[30%] left-[20%] top-3 md:top-[10%] border-[1.5px] border-gray-400 rounded-md backdrop-blur-3xl">
            <div className="w-full flex justify-center mt-3">
              <Input height="h-8" width="w-80" handleUserInput={handleInput} placeHolder="Enter you city"/>
            </div>
            {userInput !== "" && options.length > 0 && (
              <div className="bg-white absolute z-30 w-full h-full flex justify-center items-center">
                <div className="p-4 w-full h-full">
                  {options.slice(0, 4).map((city) => (
                    <div 
                      onClick={() => handleLocation(city)} // Pass the city object
                      className="text-black mt-1 w-full h-[20%] flex items-center justify-start bg-gray-100 hover:bg-gray-200 rounded-md border-[1.5px] border-gray-300" 
                      key={city.City}
                    >
                      <div className="ml-2">
                        {city.City}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="w-full h-full flex justify-center items-center">
              <img className="w-32 h-28" src="https://cdn.iconscout.com/icon/free/png-512/free-tajmahal-icon-download-in-svg-png-gif-file-formats--world-logo-agra-wonder-heritage-places-indian-cities-pack-monuments-icons-119684.png?f=webp&w=256" alt="" />
              <img className="w-32 h-28" src="https://cdn.iconscout.com/icon/free/png-512/free-charminar-icon-download-in-svg-png-gif-file-formats--hyderabad-islamic-landmark-architecture-heritage-places-indian-cities-pack-buildings-icons-119696.png?f=webp&w=256" alt="" />
              <img
                className="w-32 h-28 hidden sm:block"
                src="https://cdn.iconscout.com/icon/free/png-512/free-india-gate-icon-download-in-svg-png-gif-file-formats--delhi-war-memorial-landmark-place-heritage-places-indian-cities-pack-monuments-icons-161357.png?f=webp&w=256"
                alt="India Gate, a war memorial located in Delhi"
              />
              <img
                className="w-32 h-28 hidden sm:block"
                src="https://cdn.iconscout.com/icon/free/png-512/free-hawa-mahal-icon-download-in-svg-png-gif-file-formats--jaipur-architecture-heritage-monument-places-indian-cities-pack-monuments-icons-119686.png?f=webp&w=256"
                alt="Hawa Mahal, a palace in Jaipur known for its architecture"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
