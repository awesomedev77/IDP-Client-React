import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Type } from "../utils/interface";
import api from "../api/axios";
import { TypeItem } from "../components/TypeItem";
import CreateTypeModal from "../components/CreateTypeModal";

export const DocumentType: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<Type[]>([]);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    api
      .get("/type/getAll")
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log(error);
          localStorage.removeItem("auth-storage");
          window.location.href = "/login";
        }
      });
  }, []);

  const refreshPage = async () => {
    api
      .get(`/type/getAll`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log(error);
          localStorage.removeItem("auth-storage");
          window.location.href = "/login";
        }
      });
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
          <p className="text-[24px] font-bold ms-[30px]">IDP Types</p>
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
                        Type Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <TypeItem
                        no={index + 1}
                        key={`useritem-${item.id}`}
                        type={item}
                        refreshPage={refreshPage}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="">
                <div className="grid grid-cols-3 gap-4"></div>
              </div>
            </>
          )}
        </div>
      </div>
      <CreateTypeModal
        key={Math.random()}
        show={showModal}
        onClose={handleClose}
      />
    </div>
  );
};
