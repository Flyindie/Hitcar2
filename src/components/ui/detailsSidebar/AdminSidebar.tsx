'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar(){
  const accountImg:string = '/symbol/Member.svg'
  const thisPage:string = usePathname()

  const memberList:string = '/details/admin/memberList'
  const AdminList:string = '/details/admin/adminList'
  const carEdit:string = '/details/admin/editCar'
  const accountPage:string = '/details/admin/account'
  console.log(thisPage)

  return (
    <div className='text-[#2F2F2F] h-screen'>
        <div className='flex items-center bg-[#F8F3EB] rounded-2xl h-15 mb-5'>
          <img className='mx-5' src={accountImg}/>
          <h1>Admin</h1>
        </div>
        <div className='bg-[#F8F3EB] rounded-2xl flex flex-col font-semibold text-xl px-5 py-1'>
          <Link href={memberList}>
            <button className={`w-full flex my-2 cursor-pointer ${thisPage === memberList?'pl-2 text-[#A27100] border-l-4 border-solid border-[#A27100]':''}`}
              >Member List
            </button>
          </Link>
          <div className='border-b border-solid border-[#D9D9D9]'></div>
          <Link href={AdminList}>
            <button className={`w-full flex my-2 cursor-pointer ${thisPage === AdminList?'pl-2 text-[#A27100] border-l-4 border-solid border-[#A27100]':''}`}
              >Admin list
            </button>
          </Link>
          <div className='border-b border-solid border-[#D9D9D9]'></div>
          <Link href={carEdit}>
            <button className={`w-full flex my-2 cursor-pointer ${thisPage === carEdit?'pl-2 text-[#A27100] border-l-4 border-solid border-[#A27100]':''}`}
              >Car edit
            </button>
          </Link>
          <div className='border-b border-solid border-[#D9D9D9]'></div>
          <Link href={accountPage}>
            <button className={`w-full flex my-2 cursor-pointer ${thisPage === accountPage?'pl-2 text-[#A27100] border-l-4 border-solid border-[#A27100]':''}`}
              >Account
            </button>
          </Link>
        </div>
    </div>
  )
}