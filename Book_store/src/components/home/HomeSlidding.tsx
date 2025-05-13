import { useState } from 'react';
import book1Img from '../../assets/book1.jpg';
import book2Img from '../..//assets/book2.jpg';
import book3Img from '../../assets/book3.jpg';
import book4Img from '../../assets/book4.jpg';

const images = [book2Img, book1Img, book3Img, book4Img];

const HomeSlidding = () => {
    const [current, setCurrent] = useState<number>(0);

    const prevSlide = () => {
        const index = (current - 1 + images.length) % images.length;
        setCurrent(index);
    };

    const nextSlide = () => {
        const index = (current + 1) % images.length;
        setCurrent(index);
    };

    setTimeout(()=>{
        const index = (current + 1) % images.length;
        setCurrent(index)
    },5000)

    return (
        <div>
            <div className="relative w-[100%] mt-2 overflow-hidden">
                <div className="overflow-hidden rounded-[10px] w-full max-w-9xl mx-auto">

                    <img
                        key={current}
                        src={images[current]}
                        alt={`Book ${current + 1}`}
                        className="w-[100%] h-[600px] object-cover opacity-0 animate-fadeIn rounded-[10px]"
                    />

                </div>

                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-full shadow hover:bg-opacity-100"
                >
                    ⬅
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-full shadow hover:bg-opacity-100"
                >
                    ➡
                </button>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full ${current === index ? 'bg-blue-600' : 'bg-gray-400'
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HomeSlidding;