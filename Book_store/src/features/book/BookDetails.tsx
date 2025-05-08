import { useEffect, useState } from 'react'
// import useFetch from '../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import type { BookDetails } from '../../types/bookType'
import "../../styles/BookDetails.css"
import NavBar from '../../components/common/NavBar'
// import { object } from 'framer-motion/client'

export default function BookDetails() {
    const [data,setData]=useState<BookDetails | null>(null)
    const [loading,setLoading]=useState<boolean>(false)
    const {isbn13}=useParams()
    const navigate = useNavigate();

   
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoading(true)
                const response=await axios.get(`https://api.itbook.store/1.0/books/${isbn13}`)
                setData(response.data)
                setLoading(false)
            }
            catch(err:unknown){
                setLoading(false)
                if(err instanceof Error){
                    console.error(err.message)
                }
            }
            
        }
        fetchData()
    },[isbn13])
   
    console.log("data",data)

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <NavBar/>
        {loading ? 
        <div>
            Loading
        </div> 
        : 
        <div className='w-full max-w-6xl flex  p-4'>

    {/* Left side - Image - 1/4 of the screen */}
    <div className='w-1/4 flex flex-col'>
      <ul className='flex items-center mb-4 space-x-1'>
        <li className='text-sm font-medium text-blue-400'>Bookstore</li>
        <span className='text-blue-600'>&gt;</span>
        <li className='text-sm font-medium text-blue-400'>Books</li>
        <span className='text-blue-600'>&gt;</span>
        <li className='text-md font-medium'>{data?.title}</li>
      </ul>
      <img src={data?.image} alt={data?.publisher} className='w-full bg-gray-200 rounded' />

      {data?.pdf ? 
        <div className='mt-4 flex flex-col justify-center gap-2'>
            <p className='font-semibold text-gray-700'>Demo Chapters:</p>
            {Object.entries(data.pdf).map(([chapter,url])=>(
                <a key={chapter} href={url} target='_blank'  rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">{chapter} </a>
            ))}
        </div> : null
      }
    </div>

    {/* Right side - Book details - 3/4 of the screen */}
    <div className='w-3/4 px-6 flex flex-col justify-start items-start gap-3 right-box'>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>Price:</p>
        <p className='pr-7 text-red-500'>{data?.price}</p>
      </div>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>Rating:</p>
        <div className='pr-7 flex'>
            {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < Number(data?.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.782.57-1.837-.197-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z" />
            </svg>
            ))}
        </div>
      </div>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>Authors:</p>
        <p className='pr-7'>{data?.authors}</p>
      </div>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>Publisher:</p>
        <p className='pr-7'>{data?.publisher}</p>
      </div>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>Published:</p>
        <p className='pr-7'>{data?.year}</p>
      </div>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>Pages:</p>
        <p className='pr-7'>{data?.pages}</p>
      </div>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>Language:</p>
        <p className='pr-7'>{data?.language}</p>
      </div>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>Format:</p>
        <p className='pr-7'>Paper book / ebook (PDF)</p>
      </div>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>ISBN-10:</p>
        <p className='pr-7'>{data?.isbn10}</p>
      </div>

      <div className='flex justify-between w-full border-b pb-1'>
        <p className='font-semibold'>ISBN-13:</p>
        <p className='pr-7'>{data?.isbn13}</p>
      </div>

      <div className='flex flex-col justify-between w-full border-b gap-2 pb-1' >
        <p className='font-semibold'>Description:</p>
        <p className='pr-7'>{data?.desc}</p>
      </div>

      <div className='flex justify-end w-full  pb-1'>
        <div className='flex items-center gap-4'>
        <button onClick={()=>navigate(-1)} className='border border-gray rounded-lg px-3 py-1 font-semibold text-md bg-green-500 hover:bg-green-800 shadow-lg'><i className="fa-solid fa-arrow-left text-center  rounded-lg bg-white text-black mr-2"></i>Back </button>
        </div>
      </div>

    </div>
  </div>

        }
    </div>

  )
}
