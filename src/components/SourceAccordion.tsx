import { useState } from "react";

interface AccordionState {
  parent: string | null;
  nested: string | null;
  source: string | null;
  preview: string | null;
}

export const SourceAccordion: React.FC = () => {
  const [openSection, setOpenSection] = useState<AccordionState>({
    parent: null,
    nested: null,
    source: null,
    preview: null,
  });

  const toggleParent = (section: string) => {
    setOpenSection({
      parent: openSection.parent === section ? null : section,
      nested: null,
      source: null,
      preview: null,
    });
  };

  const toggleNested = (section: string) => {
    setOpenSection({
      ...openSection,
      nested: openSection.nested === section ? null : section,
      source: null,
      preview: null,
    });
  };

  const toggleSource = (section: string) => {
    setOpenSection({
      ...openSection,
      source: openSection.source === section ? null : section,
      preview: null,
    });
  };

  const showPreview = (section: string) => {
    setOpenSection({
      ...openSection,
      preview: openSection.preview === section ? null : section,
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div
        id="accordion-nested-parent"
        className="w-full h-[710px] overflow-y-scroll p-2"
      >
        {/* First Parent Section */}
        <div className="flex flex-col bg-[#FFFFFF] mb-4 mt-4 mx-2 border-[1px] rounded-xl border-[#ECECEC] shadow-md">
          <div
            className="px-3 py-4 flex flex-row justify-between cursor-pointer"
            onClick={() => toggleParent("1")}
            id="accordion-collapse-heading-1"
          >
            <p className="text-black">
              What is the purpose of KVM extenders and switch in the ...
            </p>
            <svg
              className={`w-3 h-3 transform ${
                openSection.parent === "1" ? "" : "rotate-180"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </div>
          <hr
            className={`border-gray-300 ${
              openSection.parent === "1" ? "opacity-100" : "opacity-0"
            } transition`}
          />
          <div
            className={`transition ${
              openSection.parent === "1" ? "opacity-100" : "opacity-0"
            }`}
            data-accordion="collapse"
          >
            {openSection.parent === "1" && (
              <div className="px-5 pb-5 border border-b-0 border-gray-200">
                {/* Nested accordion */}
                <div className="flex flex-col">
                  <div
                    className="px-1 py-4 flex flex-row justify-between cursor-pointer"
                    onClick={() => toggleNested("nested1")}
                  >
                    <p>
                      <span className="text-gray-500">1.Source : </span>
                      <span>BCE-DH-002.dox</span>
                    </p>
                    <svg
                      className={`w-3 h-3 transform ${
                        openSection.nested === "nested1" ? "" : "rotate-180"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </div>
                  <hr className="border-gray-300 opacity-100 -mt-2" />
                  <div
                    className={`transition ${
                      openSection.nested === "nested1"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {openSection.nested === "nested1" && (
                      <div className="py-2">
                        <p className="text-gray-500">Sections from Source</p>
                        <div className="flex flex-col bg-blue-50 rounded-xl border border-blue-100">
                          <div
                            className="px-3 py-4 flex flex-row justify-between cursor-pointer"
                            onClick={() => toggleSource("sourceNested1")}
                          >
                            <p>4.7 KVM EXTENDERES & KVM SWITCH FOR HIS</p>
                            <svg
                              className={`w-3 h-3 transform ${
                                openSection.source === "sourceNested1"
                                  ? ""
                                  : "rotate-180"
                              }`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                              />
                            </svg>
                          </div>
                          <div
                            className={`transition ${
                              openSection.source === "sourceNested1"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {openSection.source === "sourceNested1" && (
                              <div className="px-3 pb-2 -mt-2">
                                <p className="text-gray-500">
                                  KVM extenders provide remote connections
                                  between HIS machines in server cabinets and
                                  operator control interfaces, specifying
                                  hardware models like CRK-2DTXTD1D/R and KVM
                                  -4TDDL/A1.
                                </p>
                                <a
                                  className="text-blue-600 hover:underline cursor-pointer"
                                  onClick={() =>
                                    showPreview("sourceNested1Preview")
                                  }
                                >
                                  {openSection.preview ===
                                  "sourceNested1Preview"
                                    ? "Hide Preview"
                                    : "View Preview"}
                                </a>
                                {openSection.preview ===
                                  "sourceNested1Preview" && (
                                  <div>
                                    <div
                                      style={{ height: "300px" }}
                                      className="py-6 px-[18px] flex flex-col gap-1 bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow"
                                    >
                                      <div className="flex flex-col gap-2 my-auto">
                                        <div className="bg-[#F3F4F7] rounded-full"></div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div
                    className="px-1 py-4 flex flex-row justify-between cursor-pointer"
                    onClick={() => toggleNested("nested1")}
                  >
                    <p>
                      <span className="text-gray-500">1.Source : </span>
                      <span>BCE-EG-006.dox</span>
                    </p>
                    <svg
                      className={`w-3 h-3 transform ${
                        openSection.nested === "nested1" ? "" : "rotate-180"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </div>
                  <hr className="border-gray-300 opacity-100 -mt-2" />
                  <div
                    className={`transition ${
                      openSection.nested === "nested1"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {openSection.nested === "nested1" && (
                      <div className="py-2">
                        <p className="text-gray-500">Sections from Source</p>
                        <div className="flex flex-col bg-blue-50 rounded-xl border border-blue-100">
                          <div
                            className="px-3 py-4 flex flex-row justify-between cursor-pointer"
                            onClick={() => toggleSource("sourceNested2")}
                          >
                            <p>4.7 KVM EXTENDERES & KVM SWITCH FOR HIS</p>
                            <svg
                              className={`w-3 h-3 transform ${
                                openSection.source === "sourceNested2"
                                  ? ""
                                  : "rotate-180"
                              }`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                              />
                            </svg>
                          </div>
                          <div
                            className={`transition ${
                              openSection.source === "sourceNested2"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {openSection.source === "sourceNested2" && (
                              <div className="px-3 pb-2 -mt-2">
                                <p className="text-gray-500">
                                  KVM extenders provide remote connections
                                  between HIS machines in server cabinets and
                                  operator control interfaces, specifying
                                  hardware models like CRK-2DTXTD1D/R and KVM
                                  -4TDDL/A1.
                                </p>
                                <a
                                  className="text-blue-600 hover:underline cursor-pointer pb-2"
                                  onClick={() =>
                                    showPreview("sourceNested2Preview")
                                  }
                                >
                                  {openSection.preview ===
                                  "sourceNested2Preview"
                                    ? "Hide Preview"
                                    : "View Preview"}
                                </a>
                                {openSection.preview ===
                                  "sourceNested2Preview" && (
                                  <div>
                                    <div
                                      style={{ height: "300px" }}
                                      className="py-6 px-[18px] flex flex-col gap-1 bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow"
                                    >
                                      <div className="flex flex-col gap-2 my-auto">
                                        <div className="bg-[#F3F4F7] rounded-full"></div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* End: Nested accordion */}
              </div>
            )}
          </div>
        </div>
        {/* Second Parent Section */}
        <div className="flex flex-col bg-[#FFFFFF] mb-4 mt-4 mx-2 border-[1px] rounded-xl border-[#ECECEC] shadow-md">
          <div
            className="px-3 py-4 flex flex-row justify-between cursor-pointer"
            onClick={() => toggleParent("2")}
          >
            <p className="text-black">
              How does financial analysis help stakeholders make infor...
            </p>
            <svg
              className={`w-3 h-3 transform ${
                openSection.parent === "2" ? "" : "rotate-180"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </div>
          <hr
            className={`border-gray-300 ${
              openSection.parent === "2" ? "opacity-100" : "opacity-0"
            } transition`}
          />
          <div
            className={`transition ${
              openSection.parent === "2" ? "opacity-100" : "opacity-0"
            }`}
          >
            {openSection.parent === "2" && (
              <div className="px-5 pb-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                {/* Nested accordion */}
                <div className="flex flex-col">
                  <div
                    className="px-1 py-4 flex flex-row justify-between cursor-pointer"
                    onClick={() => toggleNested("nested1")}
                  >
                    <p>
                      <span className="text-gray-500">1.Source : </span>
                      <span>BCE-DH-002.dox</span>
                    </p>
                    <svg
                      className={`w-3 h-3 transform ${
                        openSection.nested === "nested1" ? "" : "rotate-180"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </div>
                  <hr className="border-gray-300 opacity-100 -mt-2" />
                  <div
                    className={`transition ${
                      openSection.nested === "nested1"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {openSection.nested === "nested1" && (
                      <div className="py-2">
                        <p className="text-gray-500 dark:text-gray-400">
                          Sections from Source
                        </p>
                        <div className="flex flex-col bg-blue-50 rounded-xl border border-blue-100">
                          <div
                            className="px-3 py-4 flex flex-row justify-between cursor-pointer"
                            onClick={() => toggleSource("sourceNested1")}
                          >
                            <p>5.3.2 Financial Reporting and Analysis</p>
                            <svg
                              className={`w-3 h-3 transform ${
                                openSection.source === "sourceNested1"
                                  ? ""
                                  : "rotate-180"
                              }`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                              />
                            </svg>
                          </div>
                          <div
                            className={`transition ${
                              openSection.source === "sourceNested1"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {openSection.source === "sourceNested1" && (
                              <div className="px-3 pb-2 -mt-2">
                                <p className="text-gray-500">
                                  Discusses the importance of financial reports
                                  in evaluating an organization's performance
                                  and supporting stakeholder decision-making
                                  through comprehensive financial data analysis.
                                </p>
                                <a
                                  className="text-blue-600 hover:underline cursor-pointer"
                                  onClick={() =>
                                    showPreview("sourceNested1Preview")
                                  }
                                >
                                  {openSection.preview ===
                                  "sourceNested1Preview"
                                    ? "Hide Preview"
                                    : "View Preview"}
                                </a>
                                {openSection.preview ===
                                  "sourceNested1Preview" && (
                                  <div>
                                    <div
                                      style={{ height: "300px" }}
                                      className="py-6 px-[18px] flex flex-col gap-1 bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow"
                                    >
                                      <div className="flex flex-col gap-2 my-auto">
                                        <div className="bg-[#F3F4F7] rounded-full"></div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* End: Nested accordion */}
              </div>
            )}
          </div>
        </div>
        {/* Third Parent Section */}
        <div className="flex flex-col bg-[#FFFFFF] mb-4 mt-4 mx-2 border-[1px] rounded-xl border-[#ECECEC] shadow-md">
          <div
            className="px-3 py-4 flex flex-row justify-between cursor-pointer"
            onClick={() => toggleParent("3")}
            id="accordion-collapse-heading-1"
          >
            <p className="text-black">
              Why are budgeting and forecasting considered crucial for...
            </p>
            <svg
              className={`w-3 h-3 transform ${
                openSection.parent === "3" ? "" : "rotate-180"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </div>
          <hr
            className={`border-gray-300 ${
              openSection.parent === "3" ? "opacity-100" : "opacity-0"
            } transition`}
          />
          <div
            className={`transition ${
              openSection.parent === "3" ? "opacity-100" : "opacity-0"
            }`}
            data-accordion="collapse"
          >
            {openSection.parent === "3" && (
              <div className="px-5 pb-5 border border-b-0 border-gray-200">
                {/* Nested accordion */}
                <div className="flex flex-col">
                  <div
                    className="px-1 py-4 flex flex-row justify-between cursor-pointer"
                    onClick={() => toggleNested("nested1")}
                  >
                    <p>
                      <span className="text-gray-500">1.Source : </span>
                      <span>BCE-DH-002.dox</span>
                    </p>
                    <svg
                      className={`w-3 h-3 transform ${
                        openSection.nested === "nested1" ? "" : "rotate-180"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </div>
                  <hr className="border-gray-300 opacity-100 -mt-2" />
                  <div
                    className={`transition ${
                      openSection.nested === "nested1"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {openSection.nested === "nested1" && (
                      <div className="py-2">
                        <p className="text-gray-500">Sections from Source</p>
                        <div className="flex flex-col bg-blue-50 rounded-xl border border-blue-100">
                          <div
                            className="px-3 py-4 flex flex-row justify-between cursor-pointer"
                            onClick={() => toggleSource("sourceNested1")}
                          >
                            <p>4.7 KVM EXTENDERES & KVM SWITCH FOR HIS</p>
                            <svg
                              className={`w-3 h-3 transform ${
                                openSection.source === "sourceNested1"
                                  ? ""
                                  : "rotate-180"
                              }`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                              />
                            </svg>
                          </div>
                          <div
                            className={`transition ${
                              openSection.source === "sourceNested1"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {openSection.source === "sourceNested1" && (
                              <div className="px-3 pb-2 -mt-2">
                                <p className="text-gray-500">
                                  KVM extenders provide remote connections
                                  between HIS machines in server cabinets and
                                  operator control interfaces, specifying
                                  hardware models like CRK-2DTXTD1D/R and KVM
                                  -4TDDL/A1.
                                </p>
                                <a
                                  className="text-blue-600 hover:underline cursor-pointer"
                                  onClick={() =>
                                    showPreview("sourceNested1Preview")
                                  }
                                >
                                  {openSection.preview ===
                                  "sourceNested1Preview"
                                    ? "Hide Preview"
                                    : "View Preview"}
                                </a>
                                {openSection.preview ===
                                  "sourceNested1Preview" && (
                                  <div>
                                    <div
                                      style={{ height: "300px" }}
                                      className="py-6 px-[18px] flex flex-col gap-1 bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow"
                                    >
                                      <div className="flex flex-col gap-2 my-auto">
                                        <div className="bg-[#F3F4F7] rounded-full"></div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div
                    className="px-1 py-4 flex flex-row justify-between cursor-pointer"
                    onClick={() => toggleNested("nested1")}
                  >
                    <p>
                      <span className="text-gray-500">1.Source : </span>
                      <span>BCE-EG-006.dox</span>
                    </p>
                    <svg
                      className={`w-3 h-3 transform ${
                        openSection.nested === "nested1" ? "" : "rotate-180"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </div>
                  <hr className="border-gray-300 opacity-100 -mt-2" />
                  <div
                    className={`transition ${
                      openSection.nested === "nested1"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {openSection.nested === "nested1" && (
                      <div className="py-2">
                        <p className="text-gray-500">Sections from Source</p>
                        <div className="flex flex-col bg-blue-50 rounded-xl border border-blue-100">
                          <div
                            className="px-3 py-4 flex flex-row justify-between cursor-pointer"
                            onClick={() => toggleSource("sourceNested2")}
                          >
                            <p>4.7 KVM EXTENDERES & KVM SWITCH FOR HIS</p>
                            <svg
                              className={`w-3 h-3 transform ${
                                openSection.source === "sourceNested2"
                                  ? ""
                                  : "rotate-180"
                              }`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                              />
                            </svg>
                          </div>
                          <div
                            className={`transition ${
                              openSection.source === "sourceNested2"
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {openSection.source === "sourceNested2" && (
                              <div className="px-3 pb-2 -mt-2">
                                <p className="text-gray-500">
                                  KVM extenders provide remote connections
                                  between HIS machines in server cabinets and
                                  operator control interfaces, specifying
                                  hardware models like CRK-2DTXTD1D/R and KVM
                                  -4TDDL/A1.
                                </p>
                                <a
                                  className="text-blue-600 hover:underline cursor-pointer pb-2"
                                  onClick={() =>
                                    showPreview("sourceNested2Preview")
                                  }
                                >
                                  {openSection.preview ===
                                  "sourceNested2Preview"
                                    ? "Hide Preview"
                                    : "View Preview"}
                                </a>
                                {openSection.preview ===
                                  "sourceNested2Preview" && (
                                  <div>
                                    <div
                                      style={{ height: "300px" }}
                                      className="py-6 px-[18px] flex flex-col gap-1 bg-[#fff] border-[1px] rounded-xl border-[#ECECEC] card-shadow"
                                    >
                                      <div className="flex flex-col gap-2 my-auto">
                                        <div className="bg-[#F3F4F7] rounded-full"></div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* End: Nested accordion */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
