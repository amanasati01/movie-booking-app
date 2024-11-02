// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// export default function Slides() {
//     const slides = Array.from({ length: 5 });
//     var settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 2,
//         slidesToScroll: 3,
//       };
//     return (
//         <>
//           <div className="w-full flex h-80 items-center justify-center mt-9 bg-gray-300">
//           <Slider {...settings}>
//             {slides.map((_, i) => (
//               <div key={i} className="w-[80%] h-72 bg-gray-500 rounded-lg mx-2"></div>
//             ))}
//           </Slider>
//           </div>
//         </>
//     );
// }
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Slides() {
    const slides = Array.from({ length: 5 });
    const array : JSX.Element[] = [
       
        <img className="w-full h-44 md:h-72 bg-contain rounded-lg" src="https://assets-in.bmscdn.com/promotions/cms/creatives/1727710500223_lollapaloozaindia2025web.jpg" alt="" />,
        <img className="w-full h-44 md:h-72 bg-contain rounded-lg" src="https://assets-in.bmscdn.com/promotions/cms/creatives/1727767570507_totrweb.jpg" alt="" />,
        <img className="w-full  h-44 md:h-72 bg-contain rounded-lg" src="https://assets-in.bmscdn.com/promotions/cms/creatives/1726036566435_playcardnewweb.jpg" alt="" />,
        
    ]
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,               
        slidesToScroll: 5,             
        centerMode: true,             
        centerPadding: "20%",  
        autoplay : true,
        autoplaySpeed : 2000,
    };

    return (
        <div className="w-full border-[1px] border-gray-400 overflow-hidden mt-4 bg-gray-100">
            <Slider {...settings}>
                {array.map((element, i) => (
                    <div key={i} className="p-4 h-[10%] w-[70%]">
                      { element}
                    </div>
                ))}
            </Slider>
        </div>
    );
}
