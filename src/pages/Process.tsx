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
  const [sortBy, setSortBy] = useState("createdAt");
  const [sort, setSort] = useState("DESC");
  const navigate = useNavigate();

  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const styles: any = {
    arrowContainer: {
      position:"absolute",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "10px",
      marginTop: "2px"
    },

    upArrow: {
      borderBottom: "5px solid rgb(65 130 235 / var(--tw-text-opacity))",
      width: "0",
      height: "0",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
    },
    downArrow: {
      borderTop: "5px solid grey",
      width: "0",
      height: "0",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      marginTop: "5px",
    },
    upArrowNo: {
      borderBottom: "5px solid grey",
      width: "0",
      height: "0",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
    },
    downArrowYes: {
      borderTop: "5px solid rgb(65 130 235 / var(--tw-text-opacity))",
      width: "0",
      height: "0",
      borderLeft: "5px solid transparent",
      borderRight: "5px solid transparent",
      marginTop: "5px",
    },
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    api
      .get("/process/get?page=1&limit=9&sortBy=createdAt&sort=DESC")
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
      .get(
        `/process/get?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sort=${sort}`
      )
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
  }, [currentPage, sortBy, sort]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleSortClick = (direction: string, orderBy: string) => {
    setSortBy(orderBy);
    setSort(direction);
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
                <table className="w-full text-xl text-left rounded-md border-[#E2E8F0] border-[1px] rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-sm text-[#4182EB] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Process Name
                        {sort == "ASC" && sortBy=="processName" ? <div style={styles.arrowContainer}>
                          <span
                            style={styles.upArrow}
                            onClick={() => handleSortClick("ASC", "processName")}
                          ></span>
                          <span
                            style={styles.downArrow}
                            onClick={() => handleSortClick("DESC", "processName")}
                          ></span>
                        </div>:<div style={styles.arrowContainer}>
                          <span
                            style={styles.upArrowNo}
                            onClick={() => handleSortClick("ASC", "processName")}
                          ></span>
                          <span
                            style={styles.downArrowYes}
                            onClick={() => handleSortClick("DESC", "processName")}
                          ></span>
                        </div>}
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Process Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Documents Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created at
                        {sort == "ASC" && sortBy=="createdAt" ? <div style={styles.arrowContainer}>
                          <span
                            style={styles.upArrow}
                            onClick={() => handleSortClick("ASC", "createdAt")}
                          ></span>
                          <span
                            style={styles.downArrow}
                            onClick={() => handleSortClick("DESC", "createdAt")}
                          ></span>
                        </div>: <div style={styles.arrowContainer}>
                          <span
                            style={styles.upArrowNo}
                            onClick={() => handleSortClick("ASC", "createdAt")}
                          ></span>
                          <span
                            style={styles.downArrowYes}
                            onClick={() => handleSortClick("DESC", "createdAt")}
                          ></span>
                        </div>}
                        
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="">Actions</span>
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
