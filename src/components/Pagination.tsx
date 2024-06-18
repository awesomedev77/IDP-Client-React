import doubleLeft from '../assets/icons/doubleleft.svg';
import left from '../assets/icons/left.svg';
import right from '../assets/icons/right.svg';
import doubleRight from '../assets/icons/doubleright.svg';

type props = {
    totalPages: number;
    currentPage: number;
    changePage: any;
}



export const Pagination: React.FC<props> = ({ totalPages, currentPage, changePage }) => {
    // const [visiblePages, setVisiblePages] = useState(3);
    const visiblePages = 3;

    // const handlePageClick = (page: number) => {
    //     changePage(page);
    // };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
        let endPage = startPage + visiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - visiblePages + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`w-12 h-12 border-[1px] px-4 py-2 ${currentPage === i ? 'bg-blue-500 text-white ' : 'bg-white text-black border-[#ECECEC]'} rounded-full`}
                    onClick={() => changePage(i)}
                >
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(
                <button
                    key={'left'}
                    className={`w-12 h-12 border-[1px] px-4 py-2 bg-white text-black border-[#ECECEC] rounded-full`}
                // onClick={() => changePage(page)}
                >
                    ...
                </button>
            );
            pageNumbers.unshift(
                <button
                    key={1}
                    className={`w-12 h-12 border-[1px] px-4 py-2 bg-white text-black border-[#ECECEC] rounded-full`}
                    onClick={() => changePage(1)}
                >
                    {1}
                </button>
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(
                <button
                    key={'right'}
                    className={`w-12 h-12 border-[1px] px-4 py-2 bg-white text-black border-[#ECECEC] rounded-full`}
                // onClick={() => changePage(page)}
                >
                    ...
                </button>
            );
            pageNumbers.push(
                <button
                    key={totalPages}
                    className={`w-12 h-12 border-[1px] px-4 py-2 bg-white text-black border-[#ECECEC] rounded-full`}
                    onClick={() => changePage(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };
    return <div className="flex justify-center items-center space-x-2 mt-4">
        <button
            onClick={() => changePage(1)}
            className={` border-[1px] px-4 py-2 w-12 h-12 ${'bg-white text-black border-[#ECECEC]'} rounded-full`}
        >
            <img alt="doubleLeft" src={doubleLeft} />
        </button>
        <button
            onClick={() => { if (currentPage !== 1) changePage(currentPage - 1) }}
            className={` border-[1px] px-4 py-2 w-12 h-12 ${'bg-white text-black border-[#ECECEC]'} rounded-full`}
        >
            <img alt="left"  src={left} />
        </button>

        {renderPageNumbers()}
        <button
            onClick={() => { if (currentPage !== totalPages) changePage(currentPage + 1) }}
            className={` border-[1px] px-4 py-2 w-12 h-12 ${'bg-white text-black border-[#ECECEC]'} rounded-full`}
        >
            <img alt="right" src={right} />
        </button>
        <button
            onClick={() => changePage(totalPages)}
            className={` border-[1px] px-4 py-2 w-12 h-12 ${'bg-white text-black border-[#ECECEC]'} rounded-full`}
        >
            <img alt="doubleRight" src={doubleRight} />
        </button>

    </div>
}