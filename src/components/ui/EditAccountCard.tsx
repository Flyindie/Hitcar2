import React from 'react'

type AccountCard = {
    placeHolder:string, 
    setFun:React.Dispatch<React.SetStateAction<string | undefined>>, 
    swtichFormVisible:(position: number) => void, 
    submitForm:(e: React.FormEvent<HTMLFormElement>) => void,
    mode: 'text' | 'email' | 'password' | 'tel',
    position:number
}

function EditAccountCard({placeHolder, setFun, swtichFormVisible, submitForm, mode, position}:AccountCard) {
  return (
    <form onSubmit={submitForm} className='flex items-center justify-between w-full'>
        <input className='outline-none text-white' type={mode} placeholder={placeHolder}
            onChange={(e) => setFun(e.target.value)}/>
        <button className='text-white cursor-pointer border border-solid border-white px-2 rounded-md' 
            type='button'
            onClick={() => swtichFormVisible(position)}>
            Cancel
        </button>
        <button className={`text-[#A27100] bg-[#F8F3EB] cursor-pointer px-2 rounded-md mx-2
            hover:text-[#F8F3EB] hover:bg-[#A27100] transition-all duration-300 ease-in-out`} 
            type='submit'>
            Submit
        </button>
    </form>
  )
}

export default EditAccountCard