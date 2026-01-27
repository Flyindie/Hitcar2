import AccountDetail from '@/components/ui/AccountDetail'
import MemberSidebar from '@/components/ui/detailsSidebar/MemberSidebar'

export default function page() {
  return (
  <div className='relative grid grid-cols-1 md:grid-cols-[1fr_3fr] px-25 gap-5 pt-10'>
    <div className='relative z-20'>
      <MemberSidebar />
    </div>

    <div className='relative z-20'>
      <AccountDetail />
    </div>

    <img
      className='absolute w-150 top-70 left-0 z-0 pointer-events-none'
      src="/img/Car_bg6.png"
    />
  </div>
)
}