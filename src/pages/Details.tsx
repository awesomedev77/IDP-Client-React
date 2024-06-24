import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import book from "../assets/icons/book.svg";
import medal from "../assets/icons/medal.svg";
import { UserProfile } from "../components/UserProfile";
import cube from "../assets/icons/cube.svg";
import alert from "../assets/icons/alert.svg";
import { Progress } from "../components/Progress";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import {
  DocumentProps,
  Process,
  QueryGroup,
  QueryProps,
  ReportProps,
} from "../utils/interface";
import { useAuthStore } from "../store/authStore";
import Chat from "../components/Chat";
import DetailsSidebar from "../components/Details/DetailsSidebar";

export const Details = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [process, setProcess] = useState<Process>();
  const [queries, setQueries] = useState<QueryGroup>();
  const [myQuery, setMyQuery] = useState("");
  const [query, setQuery] = useState<QueryProps>();
  const [document, setDocument] = useState<DocumentProps>();
  const [item, setItem] = useState<ReportProps>();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    api
      .get(`/details/process/${id}`)
      .then((res) => {
        setProcess(res.data);
        if (res.data.documents?.length > 0) {
          setDocument(res.data.documents[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 404) {
          navigate("/");
        }
      });
  }, []);
  useEffect(() => {
    api
      .get(`/query/${id}`)
      .then((res) => {
        setQueries(res.data);
        const allQueries = [
          ...res.data.last7Days,
          ...res.data.lastMonth,
          ...res.data.lastYear,
          ...res.data.longAgo,
        ];
        const myquery = allQueries.find((query) => query.user.id === user?.id);
        setMyQuery(myquery?.id ?? "");
        setQuery(myquery);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          navigate("/");
        }
      });
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    if (document?.status === "Y") {
      api
        .get(`/report/${document.id}`)
        .then((res) => {
          setItem(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setItem({});
    }
  }, [document]);

  // const generateReport = () => {
  //   if (process && document) {
  //     setDocument({ ...document, status: "A" });
  //     setProcess({
  //       ...process,
  //       documents: process?.documents.map((item: any) => {
  //         if (item.id !== document?.id) return item;
  //         return {
  //           ...item,
  //           status: "A",
  //         };
  //       }),
  //     });
  //     api
  //       .get(`/report/generate/${document?.id}`)
  //       .then((res) => {
  //         setProcess({
  //           ...process,
  //           documents: process?.documents.map((item: any) => {
  //             if (item.id !== document?.id) return item;
  //             return res.data;
  //           }),
  //         });
  //         setDocument(res.data);
  //       })
  //       .catch((error) => {
  //         if (error.response.status === 501) {
  //           setProcess({
  //             ...process,
  //             documents: process?.documents.map((item: any) => {
  //               if (item.id !== document?.id) return item;
  //               return {
  //                 ...item,
  //                 status: "N",
  //               };
  //             }),
  //           });
  //           setDocument({ ...document, status: "N" });
  //         }
  //       });
  //   }
  // };
  return (
    <div className="flex h-screen bg-[#F2F2F2]">
      {process && (
        <DetailsSidebar
          document={document}
          query={query}
          setQuery={setQuery}
          queries={queries}
          setDocument={setDocument}
          setProcess={setProcess}
          process={process}
        />
      )}

      <div className="grid grid-cols-2 grow">
        <Chat
          process={process}
          myQuery={myQuery}
          setMyQuery={setMyQuery}
          query={query}
          setQuery={setQuery}
          queries={queries}
          setQueries={setQueries}
        />
        {process?.documents && process?.documents.length > 0 ? (
          document?.status === "Y" ? (
            <div className="flex flex-col gap-[8px]">
              <div className="p-[30px]  flex flex-col gap-[30px] h-full overflow-auto">
                <div className="h-full flex flex-col bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
                  <div className="flex flex-row gap-3 p-5">
                    <p className="text-[22px] text-black font-bold">
                      Sources
                    </p>
                  </div>
                  <hr className="border-[#ececec]" />
                  <p className="p-5 text-black text-[16px] leading-[26px]">
                    {item?.companyDescription || "No provided"}
                  </p>
                </div>
              </div>
            </div>
          ) : document?.status === "A" ? (
            <div className="bg-white flex items-center text-center justify-center text-2xl gap-[8px]">
              Please Wait. Document is processing now
            </div>
          ) : (
            <div className="bg-white flex flex-col items-center text-center justify-center text-2xl gap-[8px]">
              <p className="mb-2">Document is not processed</p>
              <button
                // onClick={generateReport}
                className="bg-[#4182EB] text-[#ffffff] text-[18px] font-semibold rounded-full px-5 py-2"
              >
                Generate again
              </button>
            </div>
          )
        ) : (
          <div className="bg-white flex items-center text-center justify-center text-2xl gap-[8px]">
            There is no documents. Please upload the documents
          </div>
        )}
      </div>
      {/* <Modal
        show={show}
        onClose={onClose}
        content="Evaluating company, shareholder and director's risk profile. Searching internet for adverse news which may impact risk profile."
      /> */}
    </div>
  );
};

/*

<div className=" bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">

</div>

*/
