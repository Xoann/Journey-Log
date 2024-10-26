import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import StyledButton from "./StyledButton";
import { FiFile } from "react-icons/fi";

interface CSVUploadProps {
  onDataUpload: (data: { date: string; value: number }[] | null) => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onDataUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const uploadedFile = event.target.files?.[0];

  //   if (file && file.type === "text/csv") {
  //     setFile(uploadedFile);
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const content = e.target?.result as string;
  //       const parsedData = parseCSV(content);
  //       onDataUpload(parsedData);
  //     };

  //     reader.readAsText(file);
  //   } else {
  //     alert("Please upload a valid CSV file.");
  //     setFile(null);
  //   }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
    } else {
      alert("Please upload a valid CSV file.");
      setFile(null);
    }
  };

  const convertDateFormat = (dateString: string): string => {
    let [month, day, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const parseCSV = (data: string): { date: string; value: number }[] | null => {
    const rows = data.split("\r\n").map((row) => row.split(","));

    const result: { date: string; value: number }[] = [];
    for (const row of rows) {
      if (row.length !== 2) {
        alert("Each row must contain exactly 2 columns.");
        return null;
      }

      const dateStr = row[0];
      const valueStr = row[1];

      const date = convertDateFormat(dateStr);

      const value = parseFloat(valueStr);
      if (isNaN(value)) {
        alert(`Invalid number in row: ${valueStr}.`);
        return null;
      }

      result.push({ date, value });
    }
    return result;
  };

  const handleImport = () => {
    if (!file) {
      alert("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const parsedData = parseCSV(content);
      onDataUpload(parsedData);
    };
    reader.readAsText(file);
    setFile(null);
    (document.querySelector('input[type="file"]') as HTMLInputElement).value =
      "";
  };

  return (
    <div className="flex gap-3 items-center justify-center">
      <label className="relative flex items-center p-2 border border-white bg-transparent text-white rounded cursor-pointer w-36 h-10">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        <FiFile className="mr-2 text-white" size={20} />
        <span>{file ? file.name : "Choose File"}</span>
      </label>
      <StyledButton onClick={handleImport}>Import</StyledButton>
      <div className="relative">
        <button
          className="text-white"
          onMouseEnter={() => setShowModal(true)}
          onMouseLeave={() => setShowModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </button>

        {showModal && (
          <div className="absolute bottom-0 left-0 mb-8 p-4 bg-background  border border-gray-300 rounded shadow-lg text-text w-64">
            <p>Directly import entries from a csv file</p>
            <ul className="list-disc list-inside">
              <li>Date in MM/DD/YYYY format</li>
              <li>Value as a number in minutes</li>
            </ul>
            <p>Example:</p>
            <pre>
              01/01/2023, 100
              <br />
              02/01/2023, 200
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSVUpload;
