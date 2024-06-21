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
import { DocumentProps } from "../utils/interface";
import { TableItem } from "../components/TableItem";
import { CompactIcon } from "../components/icons/compact";
import { SheetsIcon } from "../components/icons/sheets";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState<DocumentProps[]>([]);
  const { isAuthenticated, user } = useAuthStore();
  const [viewMode, setViewMode] = useState("card");
  const navigate = useNavigate();

  const itemsPerPage = 9;
  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log("-----------");
    api
      .get("/document/get?page=1&limit=9")
      .then((res) => {
        setTotalItems(res.data.total);
        setItems(res.data.data);
        console.log(res.data.data);
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
      .get(`/document/get?page=${currentPage}&limit=${itemsPerPage}`)
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
            Intelligence Document Processing
          </p>
          <div className="flex-grow"></div>
          <button
            className={`${
              viewMode !== "card" ? "text-gray-600" : "text-blue-500"
            } hover:text-blue-600 transition mr-3`}
            onClick={() => setViewMode("card")}
          >
            <CompactIcon />
          </button>
          <button
            className={`${
              viewMode === "card" ? "text-gray-600" : "text-blue-500"
            } hover:text-blue-600 transition mr-5`}
            onClick={() => setViewMode("table")}
          >
            <SheetsIcon />
          </button>
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
          {viewMode === "table" ? (
            <>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Process
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created By
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created at
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <TableItem
                        no={index + 1}
                        key={`useritem-${item.id}`}
                        document={item}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {items.map((item) => (
                <Item key={`loanitem-${item.id}`} item={item} />
              ))}
            </div>
          )}
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
