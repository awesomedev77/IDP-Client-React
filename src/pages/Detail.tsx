import { useEffect, useState } from "react";
import DetailSidebar from "../components/DetailSidebar";
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
  ApplicationProps,
  DocumentProps,
  QueryGroup,
  QueryProps,
  ReportProps,
} from "../utils/interface";
import { useAuthStore } from "../store/authStore";
import Chat from "../components/Chat";

export const Detail = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [show, setShow] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [application, setApplication] = useState<ApplicationProps>();
  const [queries, setQueries] = useState<QueryGroup>();
  const [myQuery, setMyQuery] = useState("");
  const [query, setQuery] = useState<QueryProps>();
  const [document, setDocument] = useState<DocumentProps>();
  const [item, setItem] = useState<ReportProps>();
  const { id } = useParams();
  const navigate = useNavigate();
  const onClose = () => {
    setShow(false);
  };
  const onWarningClose = () => {
    setShowWarning(false);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    api
      .get(`/applications/getItem/${id}`)
      .then((res) => {
        setApplication(res.data);
        if (res.data.loanDocuments.length > 0) {
          setDocument(res.data.loanDocuments[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
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
        if (error.response.status === 404) {
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

  useEffect(() => {
    console.log(item);
    if (
      item &&
      item.companyName &&
      item.companyName !== application?.company.companyName
    ) {
      console.log(
        item &&
          item.companyName &&
          item.companyName !== application?.company.companyName
      );
      setShowWarning(true);
    }
  }, [item]);
  const updateStatus = (status: string) => {
    api
      .post(`/applications/status/${application?.id}`, { status })
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const generateReport = () => {
    if (application && document) {
      setDocument({ ...document, status: "A" });
      setApplication({
        ...application,
        loanDocuments: application?.loanDocuments.map((item: any) => {
          if (item.id !== document?.id) return item;
          return {
            ...item,
            status: "A",
          };
        }),
      });
      api
        .get(`/report/generate/${document?.id}`)
        .then((res) => {
          setApplication({
            ...application,
            loanDocuments: application?.loanDocuments.map((item: any) => {
              if (item.id !== document?.id) return item;
              return res.data;
            }),
          });
          setDocument(res.data);
        })
        .catch((error) => {
          if (error.response.status === 501) {
            setApplication({
              ...application,
              loanDocuments: application?.loanDocuments.map((item: any) => {
                if (item.id !== document?.id) return item;
                return {
                  ...item,
                  status: "N",
                };
              }),
            });
            setDocument({ ...document, status: "N" });
          }
        });
    }
  };
  const parseNameAndPercent = (
    input: string
  ): { name: string; percent: string } => {
    // Step 1: Remove 'Mr.' prefix if present
    const cleanedInput = input.replace(/^mr\.\s*/i, "");

    // Step 2: Extract the percentage using a regex that captures digits followed by '%'
    const percentRegex = /\((\d+%)\)/;
    const percentMatch = cleanedInput.match(percentRegex);
    const percent = percentMatch ? percentMatch[1] : "No percentage found";

    // Step 3: Remove the percentage part from the string to isolate the name
    const name = cleanedInput.replace(percentRegex, "").trim();

    return { name, percent };
  };

  return (
    <div className="flex h-screen bg-[#F2F2F2]">
      <DetailSidebar
        document={document}
        query={query}
        setQuery={setQuery}
        queries={queries}
        setDocument={setDocument}
        setApplication={setApplication}
        application={application}
      />
      <div className="grid grid-cols-2 grow">
        <Chat
          application={application}
          myQuery={myQuery}
          setMyQuery={setMyQuery}
          query={query}
          setQuery={setQuery}
          queries={queries}
          setQueries={setQueries}
        />
        {application?.loanDocuments && application?.loanDocuments.length > 0 ? (
          document?.status === "Y" ? (
            <div className="bg-white flex flex-col gap-[8px]">
              <div className="p-[30px]  flex flex-col gap-[30px] max-h-[calc(100vh-120px)] overflow-auto">
                <div className="p-[18px] flex flex-row gap-[18px] bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
                  <img
                    alt="itemimage"
                    src={`https://ui-avatars.com/api/?length=2&rounded=true&bold=true&name=${
                      application?.company.companyName || "No provided"
                    }`}
                    className="w-[68px] h-[68px] my-auto"
                  />
                  <div className="flex flex-col gap-1 my-auto">
                    <p className="text-[18px] font-semibold leading-normal ">
                      {application?.company.companyName || "No provided"}
                    </p>
                    <p className="text-[16px] font-semibold leading-normal text-[#656F93]">
                      {application?.company.companyLocation || "No provided"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
                  <div className="flex flex-row gap-3 p-5">
                    <img alt="itemimage" src={book} className="my-auto" />
                    <p className="text-[18px] text-black font-semibold">
                      Description :
                    </p>
                  </div>
                  <hr className="border-[#ececec]" />
                  <p className="p-5 text-black text-[16px] leading-[26px]">
                    {item?.companyDescription || "No provided"}
                  </p>
                </div>
                <div className="flex flex-col bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
                  <div className="flex flex-row gap-3 p-5">
                    <img alt="itemimage" src={medal} className="my-auto" />
                    <p className="text-[18px] text-black font-semibold">
                      Company Director :
                    </p>
                  </div>
                  <hr className="border-[#ececec]" />
                  <div className="grid grid-cols-3 p-5 gap-5">
                    {item?.directors && item?.directors.length > 0 ? (
                      item?.directors.map((director, index) => {
                        return <UserProfile key={index} name={director} />;
                      })
                    ) : (
                      <div className="text-center">No Directors</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
                  <div className="flex flex-row gap-3 p-5">
                    <img alt="itemimage" src={cube} className="my-auto" />
                    <p className="text-[18px] text-black font-semibold">
                      Company Shareholder :
                    </p>
                  </div>
                  <hr className="border-[#ececec]" />
                  <div className="grid grid-cols-3 p-5 gap-5">
                    {item?.shareholders && item?.shareholders.length > 0 ? (
                      item?.shareholders.map((shareholder, index) => {
                        return (
                          <UserProfile
                            key={index}
                            name={parseNameAndPercent(shareholder).name}
                            location={parseNameAndPercent(shareholder).percent}
                          />
                        );
                      })
                    ) : (
                      <div className="text-center">No ShareHolders</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
                  <div className="flex flex-row gap-3 p-5">
                    <img alt="itemimage" src={book} className="my-auto" />
                    <p className="text-[18px] text-black font-semibold">
                      Explanation :
                    </p>
                  </div>
                  <hr className="border-[#ececec]" />
                  <p className="p-5 text-black text-[16px] leading-[26px]">
                    {item?.explanation || "No Explanation"}
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-[20px] font-semibold text-[#161719]">
                    AI-Suggested Risk Management Details :
                  </p>
                  <div className="grid grid-cols-3 gap-5">
                    <div className="flex flex-col bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
                      <div className="flex flex-row gap-3 p-5">
                        <img alt="itemimage" src={alert} className="my-auto" />
                        <p className="text-[18px] text-black font-semibold">
                          Company Risk :
                        </p>
                      </div>
                      <hr className="border-[#ececec]" />
                      <div className="p-5 ">
                        <Progress
                          name={`${item?.companyRisk} Risk`}
                          color="#FE734C"
                          value={80}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
                      <div className="flex flex-row gap-3 p-5">
                        <img alt="itemimage" src={alert} className="my-auto" />
                        <p className="text-[18px] text-black font-semibold">
                          Director Risk :
                        </p>
                      </div>
                      <hr className="border-[#ececec]" />
                      <div className="p-5 ">
                        <Progress
                          name={`${item?.directorsRisk} Risk`}
                          color="#42B06F"
                          value={60}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">
                      <div className="flex flex-row gap-3 p-5">
                        <img alt="itemimage" src={alert} className="my-auto" />
                        <p className="text-[18px] text-black font-semibold">
                          Shareholder Risk :
                        </p>
                      </div>
                      <hr className="border-[#ececec]" />
                      <div className="p-5 ">
                        <Progress
                          name={`${item?.shareHolderRisk} Risk`}
                          color="#EB4646"
                          value={60}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 p-[30px]">
                <button
                  onClick={() => {
                    updateStatus("Reject");
                  }}
                  className="bg-[#F3F4F7] text-[#656F93] text-[18px] font-semibold rounded-full py-3"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => {
                    updateStatus("Approve");
                  }}
                  className="bg-[#4182EB] text-[#ffffff] text-[18px] font-semibold rounded-full py-3"
                >
                  Approve Application
                </button>
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
                onClick={generateReport}
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
      <Modal
        show={show}
        onClose={onClose}
        content="Evaluating company, shareholder and director's risk profile. Searching internet for adverse news which may impact risk profile."
      />
      <Modal
        show={showWarning}
        onClose={onWarningClose}
        title="Warning"
        content="The Company name of your document is different from the application."
        error={true}
      />
    </div>
  );
};

/*

<div className=" bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow">

</div>

*/
