
// import  { useState} from 'react';
// import javaImg from '../assets/java.jpg';
// import pythonImg from '../assets/python.jpg';
// import reactImg from '../assets/react.jpg';


// const About = () => {
//     const images = [javaImg, pythonImg, reactImg];
//       const [current, setCurrent] = useState(0);
//       const length = images.length;
    
//       const nextSlide = () => {
//         setCurrent((prev) => (prev + 1) % length);
//       };
    
      
//       const leftArrowClick = () => {
//         setCurrent((prev) => (prev + 1) % length);
//       };
    
//       return (
//         <div className="relative w-full h-[500px] overflow-hidden">
//           <img
//             src={images[current]}
//             alt={`Slide ${current + 1}`}
//             className="w-full h-full object-cover transition duration-500"
//           />
    
          
//           <button
//             onClick={leftArrowClick}
//             className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-black p-2 rounded-full"
//           >
//             &#8592;
//           </button>
    
        
//           <button
//             onClick={nextSlide}
//             className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-black p-2 rounded-full"
//           >
//             &#8594;
//           </button>
    
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrent(index)}
//                 className={`w-3 h-3 rounded-full ${
//                   index === current ? 'bg-white' : 'bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//         );     
// }

// export default About
import  { useState } from "react";

import javaImg from "../assets/java.jpg";
import pythonImg from "../assets/python.jpg";


const books = [
  {
    title: "Java",
    author: "Timbur Hood",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet.",
    image: javaImg, 
  },
  {
    title: "Python",
    author: "Lora Mint",
    description:
      "A journey above the clouds with tales of dreams, hope, and feathers.",
    image: pythonImg,
  },
 
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? books.length - 1 : prev - 1
    );
  };

  const { title, author, description, image } = books[currentIndex];

  return (
    <div className="flex items-center justify-between h-screen px-10 bg-[#fdfcf7]">
   
      <button onClick={prevSlide} className="text-3xl px-4">
        ←
      </button>

 
      <div className="flex w-full max-w-6xl mx-auto">
        
        <div className="w-1/2 flex justify-center items-center">
        <img
        src={image}
        alt="Book"
       className="w-[400px] rounded-lg border border-gray-300 shadow-md object-contain"
/>

        </div>

       
        <div className="w-1/2 flex flex-col justify-center px-6">
          <h1 className="text-5xl font-serif mb-4 leading-snug">
            {title.split(" ").map((word, idx) => (
              <div key={idx}>{word}</div>
            ))}
          </h1>
          <p className="text-xl italic mb-2">By {author}</p>
          <p className="text-gray-600 text-lg">{description}</p>
          <button className="mt-6 px-6 py-3 border border-[#dec9b6] text-[#c1a992] font-semibold tracking-wide flex items-center gap-2 hover:bg-[#dec9b6]/10 transition duration-300">
             READ MORE
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>

      <button onClick={nextSlide} className="text-3xl px-4">
        →
      </button>
    </div>
  );
}
