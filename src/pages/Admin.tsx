import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/interface";
import { UserItem } from "../components/UserItem";
import api from "../api/axios";
import CreateUserModal from "../components/CreateUserModal";

export const Admin: React.FC = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<User[]>([]);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    api
      .get("/auth/getAll?page=1&limit=10")
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
      .get(`/auth/getAll?page=${currentPage}&limit=${itemsPerPage}`)
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
  const refreshPage = async () => {
    api
      .get(`/auth/getAll?page=${currentPage}&limit=${itemsPerPage}`)
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
  };

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
        <div className="flex justify-between">
          <p className="text-[24px] font-bold ms-[30px]">
            Corporate Loan Users
          </p>
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
          ) : (
            <>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Full Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <UserItem
                        no={itemsPerPage * (currentPage - 1) + index + 1}
                        key={`useritem-${item.id}`}
                        user={item}
                        refreshPage={refreshPage}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="">
                <div className="grid grid-cols-3 gap-4"></div>
              </div>
              <Pagination
                currentPage={currentPage}
                changePage={changePage}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </div>
      <CreateUserModal
        key={Math.random()}
        show={showModal}
        onClose={handleClose}
      />
    </div>
  );
};
