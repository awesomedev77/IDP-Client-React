import USflag from '../assets/images/US.png'
import icon from '../assets/icons/down.svg';

export const Select = () => {
    return <div className="p-2 rounded-full border-[1px] flex flex-row justify-between w-[115px] bg-[#F4F4F6] border-[#E8E9EE]">
        <div className='flex flex-row gap-2'>
        <img alt="itemimage" src={USflag} className='w-[30px] h-[30px]'/>
        <p className='my-auto font-semibold text-[16px]'>EN</p>
        </div>
        <img alt="itemimage" src={icon} className='w-[14px] h-[14px] my-auto'/>
    </div>
}