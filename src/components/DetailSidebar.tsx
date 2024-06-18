// src/components/Sidebar.tsx
import React from "react";
import logo from "../assets/images/logo.png";
import { Accordion } from "./Accordion";
import doc from "../assets/icons/doc.svg";
import { useDropzone } from "react-dropzone";
import api from "../api/axios";
import { QueryGroup, QueryProps } from "../utils/interface";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

interface ApplicationInterface {
  document: any;
  application: any;
  setDocument: any;
  setApplication: any;
  queries?: QueryGroup;
  query?: QueryProps;
  setQuery: any;
}

interface Document {
  id: number;
  path: string;
  status: string;
}

const DetailSidebar: React.FC<ApplicationInterface> = ({
  document,
  application,
  setDocument,
  setApplication,
  queries,
  query,
  setQuery,
}) => {
  const navigate = useNavigate();
  const { getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "text/plain": [".txt"], // Accepts .txt files
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [], // Accepts .docx files
        "application/pdf": [], // Accepts .pdf files
      },
      multiple: false,
      onDrop: async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          let tempDocument: Document = {
            id: -1,
            path: "uploads\\1716972591915-" + acceptedFiles[0].name,
            status: "A",
          };
          setDocument(tempDocument);
          let tempDocuments = [tempDocument, ...application.loanDocuments];
          setApplication({
            ...application,
            loanDocuments: [tempDocument, ...application.loanDocuments],
          });
          const formData = new FormData();
          acceptedFiles.forEach((file) => formData.append("documents", file));
          try {
            const response = await api.post(
              `/report/${application.id}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            const result: Document[] = response.data as Document[];
            setDocument(result[0]);
            setApplication({
              ...application,
              loanDocuments: tempDocuments.map((item: any) => {
                if (item.id !== -1) return item;
                return result[0];
              }),
            });
          } catch (error) {
            console.log(error);
            console.error("Failed to create application", error);
          }
        }
      },
    });
  const extractFileName = (path: string): string => {
    // Split the path by the '\' to isolate the file part
    const parts = path.split("\\");
    const fullFileName = parts.pop(); // Get the last element which is the file name with timestamp

    if (!fullFileName) {
      return "Invalid path"; // Return an error message or handle it as needed
    }

    // Remove the timestamp by splitting on the first dash and taking the rest parts
    const nameParts = fullFileName.split("-");
    nameParts.shift(); // Remove the timestamp part (first element)

    // Rejoin the remaining parts that were split, to handle cases where filename might contain dashes
    return nameParts.join("-");
  };
  return (
    <div className="max-h-screen overflow-auto max-w-[265px] min-w-[265px] bg-[#151719] shadow-md px-[15px]">
      <div className="flex flex-row justify-center">
        <div
          onClick={() => navigate("/")}
          className="pt-8 pb-6 flex cursor-pointer flex-row gap-3 mx-auto"
        >
          <img src={logo} alt="" className="w-[46px] h-[46px]" />
          <h1 className="text-xl font-bold text-white my-auto">LoanEazy</h1>
        </div>
      </div>
      <hr className="border-[#4E525A] opacity-20 pb-7" />

      <section>
        <div
          {...getRootProps()}
          className="border-dashed border-[#575859] border-[1px] rounded-lg py-7 bg-[#222325] hover:cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-white text-[16px] font-semibold text-center">
            + New Document
          </p>
          <p className="text-[#8C8C8D] text-[14px] text-center">
            Drop .docs, .pdf or .txt here
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-7 pt-7">
        <Accordion header="All Document">
          <div className="pl-3 py-3 flex flex-col gap-1">
            {application?.loanDocuments?.length > 0 ? (
              application.loanDocuments.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => setDocument(item)}
                    className="p-3 flex flex-row gap-2"
                  >
                    <img alt="" src={doc} />
                    <p
                      className={`hover:cursor-pointer  text-[16px] my-auto leading-[28px] break-all ${
                        document.id === item.id
                          ? "font-bold, text-white"
                          : "text-[#8C8C8D]"
                      } `}
                    >
                      {`${extractFileName(item.path)} (${
                        item.status === "Y"
                          ? "Processed"
                          : item.status === "A"
                          ? "Processing"
                          : "Not processed"
                      })`}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="p-3 flex flex-row gap-2">
                <img alt="" src={doc} />
                <p className="text-white text-[16px] my-auto leading-[28px]">
                  No document
                </p>
              </div>
            )}
          </div>
        </Accordion>
        <Accordion header="Interaction Queries">
          <div className="p-3 pt-[24px] flex flex-col gap-[10px]">
            {queries?.last7Days && queries?.last7Days?.length > 0 && (
              <>
                <p className="text-[#858687] text-[14px] font-bold px-2">
                  Previous 7 Days
                </p>
                {queries.last7Days.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setQuery(item)}
                      className={`${
                        item.id === query?.id ? "bg-blue-800" : "bg-[#161719]"
                      }   rounded-lg py-4 px-3 cursor-pointer`}
                    >
                      <p className="text-white text-[16px] ">
                        {item.user.fullName}
                      </p>
                      <div className="flex flex-row justify-between">
                        <p className="text-[#858687] text-[12px] font-semibold">
                          {item.user.role}
                        </p>
                        <p className="text-[#858687] text-[12px] font-semibold">
                          {format(
                            parseISO(item.messages[0].createdAt),
                            "dd MMM"
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {queries?.lastMonth && queries?.lastMonth?.length > 0 && (
              <>
                <p className="text-[#858687] text-[14px] font-bold px-2">
                  Previous 7 Days
                </p>
                {queries.lastMonth.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setQuery(item)}
                      className={`${
                        item.id === query?.id ? "bg-blue-800" : "bg-[#161719]"
                      }   rounded-lg py-4 px-3 cursor-pointer`}
                    >
                      <p className="text-white text-[16px] ">
                        {item.user.fullName}
                      </p>
                      <div className="flex flex-row justify-between">
                        <p className="text-[#858687] text-[12px] font-semibold">
                          {item.user.role}
                        </p>
                        <p className="text-[#858687] text-[12px] font-semibold">
                          {format(
                            parseISO(item.messages[0].createdAt),
                            "dd MMM"
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {queries?.lastYear && queries?.lastYear?.length > 0 && (
              <>
                <p className="text-[#858687] text-[14px] font-bold px-2">
                  Previous 7 Days
                </p>
                {queries.lastYear.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setQuery(item)}
                      className={`${
                        item.id === query?.id ? "bg-blue-800" : "bg-[#161719]"
                      }   rounded-lg py-4 px-3 cursor-pointer`}
                    >
                      <p className="text-white text-[16px] ">
                        {item.user.fullName}
                      </p>
                      <div className="flex flex-row justify-between">
                        <p className="text-[#858687] text-[12px] font-semibold">
                          {item.user.role}
                        </p>
                        <p className="text-[#858687] text-[12px] font-semibold">
                          {format(
                            parseISO(item.messages[0].createdAt),
                            "dd MMM"
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {queries?.longAgo && queries?.longAgo?.length > 0 && (
              <>
                <p className="text-[#858687] text-[14px] font-bold px-2">
                  Previous 7 Days
                </p>
                {queries.longAgo.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => setQuery(item)}
                      className={`${
                        item.id === query?.id ? "bg-blue-800" : "bg-[#161719]"
                      }   rounded-lg py-4 px-3 cursor-pointer`}
                    >
                      <p className="text-white text-[16px] ">
                        {item.user.fullName}
                      </p>
                      <div className="flex flex-row justify-between">
                        <p className="text-[#858687] text-[12px] font-semibold">
                          {item.user.role}
                        </p>
                        <p className="text-[#858687] text-[12px] font-semibold">
                          {format(
                            parseISO(item.messages[0].createdAt),
                            "dd MMM"
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default DetailSidebar;
