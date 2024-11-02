import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { showTiming, theaterId } from "../atoms/Atoms";
import NumberOfSeat from "./No.OfSeats";

interface SeatData {
  id: number;
  number: string;
  seatType: string;
  status: string;
  theaterId: number;
  showtimeId: number;
  createdAt: string;
  updatedAt: string;
}

export default function SeatLayout() {
  const { hallName, movieName, cityName } = useParams();
  const [seatData, setSeatData] = useState<SeatData[]>([]);
  const showTime = useRecoilValue(showTiming);
  const theaterid = useRecoilValue(theaterId);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      if (!theaterid || !showTime || !movieName) {
        return;
      }
      console.log("theaterid ", theaterid);
      try {
        const response = await axios.post('http://localhost:3000/api/v1/tickets/seatsData', {
          id: theaterid,
          movieName,
          showTime,
        });
        setSeatData(response.data);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    }
    getData();
  }, [theaterid,showTime,movieName]);

  useEffect(() => {
    console.log(seatData);
  }, [seatData]);

  const takeUserBack = () => {
    navigate(-1);
  }

  return (
    <>
      <div className="overflow-hidden">
        <div className="flex justify-start h-16 cursor-pointer bg-gray-300 w-full items-center" onClick={takeUserBack}>
          <div>
            <svg fill="#000000" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 404.258 404.258" xmlSpace="preserve" stroke="#000000" strokeWidth="20.2129">
              <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 "></polygon>
            </svg>
          </div>
          <div className="ml-4">
            <div className="text-sm font-normal">{movieName}</div>
            <div className="flex justify-center items-center">
              <div className="text-sm font-semibold">{hallName}</div>
              <div className="ml-1 text-sm font-semibold">{`: ${cityName} `}</div>
              <div className="ml-1 text-sm font-semibold"> Today, 09 Oct, 03:00 PM</div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center mt-5 w-screen ">
            <div className="w-[80%] bg-white">
              <div className="">
                <div className="">
                  <div className="mb-2">Rs. 150 Box A</div>
                  <div className="border-gray-400 border-[1.5px] border-x-0 ">
                    <div className="flex justify-center items-center">
                      <div className="flex flex-wrap w-60 mt-2 justify-center items-center">{seatData.length > 0 && <BoxA seatData={seatData} />}</div>
                    </div>
                    <div className="mt-2">Rs. 150 Box F</div>
                  </div>
                  <div className="border-gray-400  border-x-0">
                    <div className="flex justify-center items-center">
                      <div className="flex flex-wrap w-60 mt-2">{seatData.length > 0 && <BoxF seatData={seatData} />}</div>
                    </div>
                    <div className="mt-2">Rs. 100 Balcony Gold</div>
                  </div>
                  <div className="border-gray-400 border-[1.5px] border-x-0">
                    <div className="flex justify-center items-center">
                      <div className="flex flex-wrap mt-2">{seatData.length > 0 && <BalconyGold seatData={seatData} />}</div>
                    </div>
                    <div className="mt-2">Rs. 80 Deluxe</div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div>
                      <div className="text-center rounded-md bg-gray-400 text-base font-semibold shadow-2xl">Screen</div>
                      <div className="border-[2px] border-black w-72 mb-3 "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(selected) &&
        <div >
          <div onClick={() => setSelected(false)} className="fixed inset-0 bg-black opacity-60 z-10"></div>
          <div className="absolute z-20 bg-white flex justify-center items-center top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-3xl">
            <NumberOfSeat setSelected={setSeatData}/>
          </div>
        </div>
      }
    </>
  );

  function BalconyGold({ seatData }: { seatData: SeatData[] }): JSX.Element {
    const seats: SeatData[] = seatData.slice(12, 165);

    return (
      <div>
        <div className="flex flex-wrap w-80">
          {seats.map((seat) => (
            <div key={seat.id}>
              <div className={`border-[1.5px] flex justify-center items-center m-2 green-purple-500 w-6 h-6 text-sm text-gray-700 cursor-pointer ${seat.seatType === 'sold' ? 'bg-gray-300' : 'border-green-500 hover:bg-green-500'}`}>
                {seat.status !== 'sold' && seat.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BoxA({ seatData }: { seatData: SeatData[] }): JSX.Element {
    const seats: SeatData[] = seatData.slice(0, 12);
    return (
      <div className="flex flex-wrap w-60">
        {seats.map((seat) => (
          <div key={seat.id}>
            <div className={`border-[1.5px] flex justify-center items-center m-2 green-purple-500 w-6 h-6 text-sm text-gray-700 cursor-pointer ${seat.seatType === 'sold' ? 'bg-gray-300' : 'border-green-500 hover:bg-green-500'}`}>
              {seat.status !== 'sold' && seat.number}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function BoxF({ seatData }: { seatData: SeatData[] }): JSX.Element {
    const seats: SeatData[] = seatData.slice(12, 24); // Adjust this if you want different seats for Box F
    return (
      <div className="flex flex-wrap w-60">
        {seats.map((seat, index) => (
          <div key={index}>
            <div className={`border-[1.5px] flex justify-center items-center m-2 green-purple-500 w-6 h-6 text-sm text-gray-700 cursor-pointer ${seat.status === 'sold' ? 'bg-gray-300' : 'border-green-500 hover:bg-green-500'}`}>
              {seat.status !== 'sold' && seat.number}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
