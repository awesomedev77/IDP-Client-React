import messageIcon from '../assets/icons/message.svg';

export const Notification = () => {
    return <div className="p-3 bg-[#F4F4F6] border-[#E8E9EE] border-[1px] rounded-full flex flex-col justify-center my-auto relative">
        <img alt="" src={messageIcon}/>
        <div className='absolute right-0 top-0 p-1 bg-[#ED1727] rounded-full notification-shadow'>
            <p className='text-[11px] font-bold leading-[8px] text-white '>3</p>
        </div>
    </div>
}