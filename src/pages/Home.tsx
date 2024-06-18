import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
// import api from '../api/axios';
import Item from "../components/Item";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import ModalForm from "../components/ModalForm";
import api from "../api/axios";
import { ApplicationProps } from "../utils/interface";

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState<ApplicationProps[]>([]);
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  const itemsPerPage = 9;
  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    api
      .get("/applications/get?page=1&limit=9")
      .then((res) => {
        setTotalItems(res.data.total);
        setItems(res.data.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log(error);
          localStorage.removeItem("auth-storage");
          window.location.href = "/login";
        }
      });
  }, []);

  useEffect(() => {
    api
      .get(`/applications/get?page=${currentPage}&limit=${itemsPerPage}`)
      .then((res) => {
        setTotalItems(res.data.total);
        setItems(res.data.data);
      });
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar />
      <div className="flex flex-col grow py-5 gap-[38px]">
        <Header />
        <div className="flex justify-between">
          <p className="text-[24px] font-bold ms-[30px]">
            Corporate Loan Applications
          </p>
          {(user?.role.replaceAll(" ", "").toLowerCase() === "admin" ||
            user?.role.replaceAll(" ", "").toLowerCase() === "bankmanager") && (
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="me-[36px] bg-blue-500 text-white py-[10px] px-[20px] rounded-full text-[18px] font-bold leading-[13px]"
            >
              Create
            </button>
          )}
        </div>
        <div className="overflow-auto flex flex-col gap-[38px] px-[30px] h-full">
          {items.length === 0 && (
            <div className="grow text-center justify-center font-extrabold flex items-center text-3xl">
              No Data
            </div>
          )}
          <div className="">
            <div className="grid grid-cols-3 gap-4">
              {items.map((item) => (
                <Item
                  key={`loanitem-${item.id}`}
                  setItems={setItems}
                  item={item}
                />
              ))}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            changePage={changePage}
            totalPages={totalPages}
          />
        </div>
      </div>
      <ModalForm key={Math.random()} show={showModal} onClose={handleClose} />
    </div>
  );
};

export default Home;
