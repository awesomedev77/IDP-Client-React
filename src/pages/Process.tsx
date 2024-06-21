import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Process } from "../utils/interface";
import api from "../api/axios";
import { ProcessItem } from "../components/Process/ProcessItem";
import CreateProcessModal from "../components/Process/CreateProcessModal";
import { Pagination } from "../components/Pagination";
import { CompactIcon } from "../components/icons/compact";
import { SheetsIcon } from "../components/icons/sheets";
import ProcessCardItem from "../components/Process/ProcessCardItem";

export const DocumentProcess: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<Process[]>([]);
  const { isAuthenticated } = useAuthStore();
  const [viewMode, setViewMode] = useState("card");
  const navigate = useNavigate();

  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    api
      .get("/process/get?page=1&limit=9")
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
      .get(`/process/get?page=${currentPage}&limit=${itemsPerPage}`)
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
  }, [currentPage]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar />
      <div className="flex flex-col grow py-5 gap-[38px]">
        <Header />
        <div className="flex">
          <p className="text-[24px] font-bold ms-[30px]">IDP Processes</p>
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
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="me-[36px] bg-blue-500 text-white py-[10px] px-[20px] rounded-full text-[18px] font-bold leading-[13px]"
          >
            Create
          </button>
        </div>
        <div className="overflow-auto flex flex-col gap-[38px] px-[30px] h-full">
          {items.length === 0 ? (
            <div className="grow text-center justify-center font-extrabold flex items-center text-3xl">
              No Data
            </div>
          ) : viewMode === "table" ? (
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
                        Description
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
                      <ProcessItem
                        no={index + 1}
                        key={`useritem-${item.id}`}
                        process={item}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="">
              <div className="grid grid-cols-3 gap-4">
                {items.map((item) => (
                  <ProcessCardItem key={`processitem-${item.id}`} item={item} />
                ))}
              </div>
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            changePage={changePage}
            totalPages={totalPages}
          />
        </div>
      </div>
      <CreateProcessModal
        key={Math.random()}
        show={showModal}
        onClose={handleClose}
      />
    </div>
  );
};
