import AccountDetail from '@/components/ui/AccountDetail'
import AdminSidebar from '@/components/ui/detailsSidebar/AdminSidebar'

export default function page() {
  return (
    <div className='grid grid-cols-[1fr_3fr] px-25 gap-5 pt-10'>
      <div className='relative z-10'>
        <AdminSidebar/>
      </div>
      <div className='relative z-10'>
        <AccountDetail/>
      </div>
      <img className='absolute w-150 top-70 left-0' src="/img/Car_bg6.png"/>
    </div>
  )
}