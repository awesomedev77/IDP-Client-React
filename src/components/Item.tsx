import React, { useState } from 'react';

import loan from '../assets/images/loan.png';
import calendar from '../assets/images/calendar.png';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ApplicationProps } from '../utils/interface';
import { Dropdown } from 'flowbite-react';
import AssignModal from './AssignModal';
import { useAuthStore } from '../store/authStore';
interface ItemProps {
  item: ApplicationProps;
  setItems: any;
}

const Item: React.FC<ItemProps> = ({ item, setItems }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const status = item.loanDocuments.every((doc) => doc.status === 'Y');
  const [show, setShow] = useState(false)

  return (
    <div className="bg-white shadow-md rounded-xl p-[18px] flex flex-col gap-6">
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row gap-[18px]'>
          <img alt='itemimage' src={`https://ui-avatars.com/api/?length=2&rounded=true&bold=true&name=${item.company.companyName}`} className='w-[68px] h-[68px] my-auto' />
          <div className='flex flex-col gap-1 my-auto'>
            <p className='text-[18px] font-semibold leading-normal '>{item.company.companyName}</p>
            <p className='text-[16px] font-semibold leading-normal text-[#656F93]'>{item.company.companyLocation}</p>
          </div>
        </div>
        <div className={`border-[1px] p-4 rounded-xl my-auto w-[108px] 
        ${item.loanDocuments.length === 0
            ? "bg-[#F7F8F9] border-[#E0E2E9]"
            : status
              ? "bg-[#FFF1E8] border-[#EB744166]"
              : "bg-[#E7F0FF] border-[#4182EB66]"}`}>
          <p className={`text-[14px] font-semibold leading-normal text-center 
          ${item.loanDocuments.length === 0
              ? "text-[#656F93]"
              : status
                ? "text-[#EB7441]"
                : "text-[#4182EB]"}`}>
            {item.loanDocuments.length === 0
              ? "Upload Documents"
              : status ? "Documents Processed"
                : "Documents Uploaded"}
          </p>
        </div>
      </div>
      <hr className='border-dashed border-[#D4D7E1]' />
      <div className='flex flex-col gap-7 pt-[-4px]'>
        <div className='grid grid-cols-2'>
          <div className='flex flex-row gap-3'>
            <img alt='itemimage' src={loan} className='w-12 h-12 my-auto' />
            <div className='flex flex-col gap-1 my-auto'>
              <p className='text-[14px] font-semibold text-[#656F93] leading-normal'>Loan Amount</p>
              <p className='text-[16px] font-semibold text-[#161719] leading-normal'>{item.currency} {new Intl.NumberFormat('en-US').format(item?.loanAmount)}</p>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <img alt='itemimage' src={calendar} className='w-12 h-12 my-auto' />
            <div className='flex flex-col gap-1 my-auto'>
              <p className='text-[14px] font-semibold text-[#656F93] leading-normal'>Date and Time</p>
              <p className='text-[16px] font-semibold text-[#161719] leading-normal'>{format(parseISO(item.createdAt), 'dd MMM, yyyy, hh:mm aaa')}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-3'>
          <img alt='itemimage' src={`https://ui-avatars.com/api/?length=2&rounded=true&bold=true&name=${item.applicantName}`} className='w-12 h-12' />
          <div className='flex flex-col gap-1 my-auto'>
            <p className='text-[14px] font-semibold text-[#656F93] leading-normal'>Applied By</p>
            <div className='flex flex-row gap-2'>
              <p className='text-[16px] font-semibold text-[#161719] leading-normal'>{item.applicantDescription}</p>
              <p className='text-[16px] font-semibold text-[#161719] leading-normal'>|</p>
              <p className='text-[16px] font-semibold text-[#161719] leading-normal'>{item.applicantName}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
        <button className="bg-blue-500 flex-grow text-white py-[16px] rounded-full text-[18px] font-bold leading-[13px]" onClick={() => navigate(`/detail/${item.id}`)}>
          Interact With Application Document
        </button>
        {(user?.role.replaceAll(' ', '').toLowerCase() === "admin" || user?.role.replaceAll(' ', '').toLowerCase() === "bankmanager") &&
          <Dropdown renderTrigger={() => <span className='after:content-["\2807"] text-[30px] ms-2'></span>} label="" placement="top-end" dismissOnClick={true}>
            <Dropdown.Item onClick={() => setShow(true)} className='font-bold text-black'>Assign</Dropdown.Item>
          </Dropdown>
        }
      </div>
      <AssignModal key={Math.random()} setItems={setItems} item={item} show={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default Item;