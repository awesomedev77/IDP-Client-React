import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
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
import { Process, Type } from "../utils/interface";
import SelectSearch from "react-select-search";
import uploadIcon from "../assets/icons/upload.svg";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState<DocumentProps[]>([]);
  const { isAuthenticated, user } = useAuthStore();
  const [viewMode, setViewMode] = useState("card");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [documentTypes, setDocumentTypes] = useState<Type[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [processFilter, setProcessFilter] = useState(
    (searchParams.get("process") as string) || ""
  );
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sort, setSort] = useState("DESC");
  
  const itemsPerPage = 9;
  const handleClose = () => {
    setShowModal(false);
  };
  const styles: any = {
    arrowContainer: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "10px",
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
    api
      .get("/type/getAll")
      .then((res) => {
        setDocumentTypes(res.data);
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
      .get("/process/getAll")
      .then((res) => {
        setProcesses(res.data);
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
        `/document/get?page=1&limit=9&sortBy=createdAt&sort=DESC&query=${query}&processFilter=${processFilter}&typeFilter=${typeFilter}`
      )
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
    console.log(processFilter);
    api
      .get(
        `/document/get?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sort=${sort}&query=${query}&processFilter=${processFilter}&typeFilter=${typeFilter}`
      )
      .then((res) => {
        setTotalItems(res.data.total);
        setItems(res.data.data);
      });
  }, [currentPage, typeFilter, processFilter, query,sortBy, sort]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };
  const typeOptions = [
    { name: "No Type", value: "-1" },
    ...documentTypes.map((type) => ({
      name: type.typeName,
      value: type.id,
    })),
  ];

  const processOptions = [
    { name: "No Process", value: "-1" },
    ...processes.map((process) => ({
      name: process.processName,
      value: process.id,
    })),
  ];
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSortClick = (direction: string, orderBy: string) => {
    setSortBy(orderBy);
    setSort(direction);
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar />
      <div className="flex flex-col grow py-5 gap-[38px]">
        <Header query={query} setQuery={setQuery} />
        <div className="flex justify-between">
          <p className="text-[24px] font-bold ms-[30px]">
            Intelligence Document Processing
          </p>
          <div className="flex-grow"></div>
          <SelectSearch
            placeholder="Filter Type"
            emptyMessage="empty"
            search
            value={typeFilter}
            onChange={(value) => setTypeFilter(value as string)}
            options={typeOptions}
            className="select-search"
          />
          <div className="mx-3">
            <SelectSearch
              placeholder="Filter Process"
              emptyMessage="empty"
              search
              value={processFilter}
              onChange={(value) => setProcessFilter(value as string)}
              options={processOptions}
              className="select-search"
            />
          </div>
          <button
            className={`${
              viewMode !== "card" ? "text-gray-600" : "text-blue-500"
            } hover:text-blue-600 transition mx-3`}
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
              className="me-[36px] flex items-center text-blue-500 border-2 border-blue-500 py-[10px] px-[20px] rounded-full text-[18px] font-bold leading-[13px]"
            >
              <img
                src={uploadIcon}
                alt="upload"
                className="w-[20px] h-[20px] me-[10px]"
              />
              Upload Document
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
                <table className="w-full text-xl text-left rtl:text-right text-gray-500 border-[1px] rounded-md border-[#E2E8F0] dark:text-gray-400">
                  <thead className="text-sm text-[#4182EB] bg-[#f0f6ff] uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        File Name
                        {sort == "ASC" && sortBy=="fileName" ? <div style={styles.arrowContainer}>
                          <span
                            style={styles.upArrow}
                            onClick={() => handleSortClick("ASC", "fileName")}
                          ></span>
                          <span
                            style={styles.downArrow}
                            onClick={() => handleSortClick("DESC", "fileName")}
                          ></span>
                        </div>:<div style={styles.arrowContainer}>
                          <span
                            style={styles.upArrowNo}
                            onClick={() => handleSortClick("ASC", "fileName")}
                          ></span>
                          <span
                            style={styles.downArrowYes}
                            onClick={() => handleSortClick("DESC", "fileName")}
                          ></span>
                        </div>}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Process Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Document Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
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
                        </div>:<div style={styles.arrowContainer}>
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
                        <span>Actions</span>
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
