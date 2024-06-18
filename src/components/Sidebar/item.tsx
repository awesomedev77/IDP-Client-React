import { Link } from "react-router-dom"

type props = {
    name: string;
    link: string;
    icon?: any;
}

export const SidebarItem:React.FC<props> = ({name, link, icon}) => {
    return <div>
        <Link to={link} className="flex items-center px-4 py-3 text-base font-normal text-gray-100 rounded-lg hover:bg-blue-500">
            {icon ? <img src={icon} alt={name}/> : ""}
            <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
        </Link>
    </div>
}