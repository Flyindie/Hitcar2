import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

type getPage = {
  page:number
}
export default function StateNavbar({page}: getPage) {

  return (
    <div className='flex items-center h-17'>
      <Link href={'/'}>
        <div className='flex font-extrabold text-3xl ml-10'>
          <h1 className='text-white'>Hit</h1>
          <h1 className='text-yellow-300'>Car2</h1>
        </div>
      </Link>
      <div className='flex items-center text-white text-sm ml-25'>
        <div className={`flex items-center ${page < 1 && 'opacity-40'}`}>
          <div className='text-[#2F2F2F] bg-white w-4 h-4 rounded-full flex items-center justify-center'>1</div>
          <span className='ml-2'>Search Results</span>
          <IoIosArrowForward className='ml-1'/>
        </div>
        <div className={`flex items-center ml-1 ${page < 2 && 'opacity-40'}`}>
          <div className='text-[#2F2F2F] bg-white w-4 h-4 rounded-full flex items-center justify-center'>2</div>
          <span className='ml-2'>Driver Details</span>
          <IoIosArrowForward className='ml-1'/>
        </div>
        <div className={`flex items-center ml-1 ${page < 3 && 'opacity-40'}`}>
          <div className='text-[#2F2F2F] bg-white w-4 h-4 rounded-full flex items-center justify-center'>3</div>
          <span className='ml-2'>Payment</span>
          <IoIosArrowForward className='ml-1'/>
        </div>
        <div className={`flex items-center ml-1 ${page < 4 && 'opacity-40'}`}>
          <div className='text-[#2F2F2F] bg-white w-4 h-4 rounded-full flex items-center justify-center'>4</div>
          <span className='ml-2'>Confirmation</span>
        </div>
      </div>
    </div>
  )
}