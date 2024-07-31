import downIcon from '../assets/icons/down.svg';
import { useAuthStore } from '../store/authStore';

export const Profile = () => {
    const {user} = useAuthStore();
    return <div className="flex flex-row gap-[14px] my-auto">
        <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-[10px] my-auto">
                <p className="text-black text-[18px] font-semibold leading-[13px]">{user?.fullName}</p>
                <p className="text-[#4182EB] text-[14px] font-semibold leading-[12px]">{user?.role}</p>
            </div>
            <img alt="itemimage" height={46} width={46} src={`https://ui-avatars.com/api/?length=2&rounded=true&bold=true&name=${user?.fullName}`}/>
        </div>
        <img alt="itemimage" src={downIcon} className='w-[16px] my-auto'/>
    </div>
}