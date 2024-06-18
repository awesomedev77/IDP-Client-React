import { ReactNode, useState } from "react"
import up from '../assets/icons/up.svg'

type props = {
    children: ReactNode;
    header: string;
}

export const Accordion : React.FC<props> = ({children, header}) => {
    const [show, setShow ]= useState(false);
    return <div className="flex flex-col rounded-lg bg-[#222325]">
        <div className="px-3 py-4 flex flex-row justify-between cursor-pointer" onClick={() => setShow(!show)}>
            <p className="text-white">{header}</p>
            <img src={up} alt="" className={`rotate-0 w-[18px] ${show ? 'rotate-0' : 'rotate-180'} transition`} />
        </div>
        <hr className={`border-[#2F3031] opacity-0 ${show ? 'opacity-100' : ''} transition`}/>
        <div className={`opacity-0  ${show? 'opacity-100 ' : ''} transition`}>
            {show ? children : ''}
        </div>
    </div>
}