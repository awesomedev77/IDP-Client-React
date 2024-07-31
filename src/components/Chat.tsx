import React, { useEffect, useRef, useState } from "react";
import {
  MessageProps,
  Process,
  QueryGroup,
  QueryProps,
} from "../utils/interface";
import loan from "../assets/images/loan.png";
import empty from "../assets/images/background.png";
import brain from "../assets/images/brain.png";
import plane from "../assets/icons/paperplane.svg";
import { Message } from "./message";
import "react-chat-elements/dist/main.css";
import { Input } from "react-chat-elements";
import api from "../api/axios";

type ChatProps = {
  process?: Process;
  query?: QueryProps;
  setQuery: any;
  queries?: QueryGroup;
  setQueries: any;
  myQuery?: string;
  setMyQuery: any;
};

const Chat: React.FC<ChatProps> = ({
  process,
  query,
  setQuery,
  myQuery,
  queries,
  setQueries,
  setMyQuery,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState("");
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [query]);
  useEffect(() => {
    if (prompt === "") {
      setUpdate(false);
    }
    if (ref.current) ref.current.value = prompt;
  }, [prompt]);
  const reGenerate = async (regenPrompt: string) => {
    setQuery({ ...query, messages: query?.messages.slice(1) });
    const response = await api.post("/query/edit", {
      queryId: myQuery,
      prompt: regenPrompt,
    });
    setQuery(response.data);
    setQueries({
      last7Days: [
        response.data,
        ...(queries?.last7Days.filter((item: any) => {
          return item.id !== myQuery;
        }) ?? []),
      ],
      lastMonth: queries?.lastMonth.filter((item: any) => {
        return item.id !== myQuery;
      }),
      lastYear: queries?.lastYear.filter((item: any) => {
        return item.id !== myQuery;
      }),
      longAgo: queries?.longAgo.filter((item: any) => {
        return item.id !== myQuery;
      }),
    });
  };
  const onSubmit = async () => {
    console.log(prompt, update);
    if (prompt === "") {
      return;
    }
    try {
      if (update) {
        if (ref.current) ref.current.value = "";
        setQuery({ ...query, messages: query?.messages.slice(1) });
        const response = await api.post("/query/edit", {
          queryId: myQuery,
          prompt: prompt,
        });
        setQuery(response.data);
        setQueries({
          last7Days: [
            response.data,
            ...(queries?.last7Days.filter((item: any) => {
              return item.id !== myQuery;
            }) ?? []),
          ],
          lastMonth: queries?.lastMonth.filter((item: any) => {
            return item.id !== myQuery;
          }),
          lastYear: queries?.lastYear.filter((item: any) => {
            return item.id !== myQuery;
          }),
          longAgo: queries?.longAgo.filter((item: any) => {
            return item.id !== myQuery;
          }),
        });

        setPrompt("");
      } else if (myQuery !== "") {
        if (ref.current) ref.current.value = "";
        const response = await api.post("/query/add", {
          queryId: myQuery,
          prompt,
        });
        setQuery(response.data);
        setQueries({
          last7Days: [
            response.data,
            ...(queries?.last7Days.filter((item: any) => {
              return item.id !== myQuery;
            }) ?? []),
          ],
          lastMonth: queries?.lastMonth.filter((item: any) => {
            return item.id !== myQuery;
          }),
          lastYear: queries?.lastYear.filter((item: any) => {
            return item.id !== myQuery;
          }),
          longAgo: queries?.longAgo.filter((item: any) => {
            return item.id !== myQuery;
          }),
        });

        setPrompt("");
      } else {
        if (ref.current) ref.current.value = "";
        const response = await api.post("/query", {
          processId: process?.id,
          prompt,
        });
        setQuery(response.data);
        setMyQuery(response.data.id);
        setQueries({
          ...queries,
          last7Days: [response.data, ...(queries?.last7Days ?? [])],
        });
        setPrompt("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-between p-[30px]">
      <div className=" flex flex-col gap-7">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            {/* <img
              alt="itemimage"
              src={`https://ui-avatars.com/api/?length=2&rounded=true&bold=true&name=${application?.applicantName}`}
              className="w-12 h-12"
            /> */}
            <div className="flex flex-col gap-1 my-auto">
              <p className="text-[14px] font-semibold text-[#656F93] leading-normal">
                Process By
              </p>
              <div className="flex flex-row gap-2">
                <p className="text-[16px] font-semibold text-[#161719] leading-normal">
                  {process?.creator?.fullName}
                </p>
                <p className="text-[16px] font-semibold text-[#161719] leading-normal">
                  |
                </p>
                <p className="text-[16px] font-semibold text-[#161719] leading-normal">
                  {process?.creator?.role}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <img alt="itemimage" src={loan} className="w-12 h-12 my-auto" />
            <div className="flex flex-col gap-1 my-auto">
              <p className="text-[14px] font-semibold text-[#656F93] leading-normal">
                Total Documents Processed
              </p>
              {/* <p className="text-[16px] font-semibold text-[#161719] leading-normal">
                {application?.currency}{" "}
                {new Intl.NumberFormat("en-US").format(
                  application?.loanAmount || 0
                )}
              </p> */}
            </div>
          </div>
        </div>
        <hr className="border-[#B1B7CC] border-dashed" />
      </div>
      {query?.messages?.length ? (
        <div
          className="grow flex flex-col gap-7 pt-7 max-h-[calc(100vh-270px)] overflow-auto"
          ref={messagesContainerRef}
        >
          {[...query.messages]
            .slice()
            .reverse()
            .map((item: MessageProps, index: number) => (
              <Message
                userFullName={query.user.fullName}
                answer={item.answer}
                prompt={item.prompt}
                setPrompt={setPrompt}
                setUpdate={setUpdate}
                reGenerate={reGenerate}
                key={"message-" + index}
                editable={
                  index === query.messages.length - 1 && query.id === myQuery
                }
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-7">
          <img
            alt="itemimage"
            src={empty}
            className="w-[500px] h-[500px] grayscale mx-auto"
          />
          <p className="text-[18px] text-center font-semibold ">
            There are currently no queries!
            <br />
            You can start your query.
          </p>
        </div>
      )}

      <div className="py-[6px] pl-5 pr-[6px] rounded-[30px] bg-white input-shadow items-end flex flex-row gap-2">
        <img alt="itemimage" src={brain} className="w-6 h-6 mb-2" />
        <Input
          maxHeight={100}
          referance={ref}
          placeholder="What's in your mind?..."
          multiline={true}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrompt(e.target.value)
          }
          // rightButtons={<Button color='white' backgroundColor='black' text='Send' />}
        />
        <button onClick={onSubmit} className="p-3 bg-[#4182EB] rounded-[30px]">
          <img alt="itemimage" src={plane} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
