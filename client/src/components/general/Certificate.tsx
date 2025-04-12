import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type CertificateProps = {
  name: string;
  role: string;
  score: number;
  greeting?: string;
};

const Certificate: React.FC<CertificateProps> = ({ name, role, score, greeting = "Congratulations on your achievement!" }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");
        pdf.addImage(imgData, "PNG", 10, 10, 280, 190);
        pdf.save(`${name}-certificate.pdf`);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div ref={certificateRef} className="w-full max-w-2xl bg-white shadow-lg border-4 border-gray-300 p-8 text-center rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800">Certificate of Achievement</h1>
        <p className="text-lg text-gray-600 mt-2">This is proudly presented to</p>
        <h2 className="text-4xl font-semibold text-blue-600 mt-2">{name}</h2>
        <p className="text-lg text-gray-700 mt-2">For excelling in the interview competition as</p>
        <h3 className="text-2xl font-medium text-gray-900 mt-1">{role}</h3>
        <p className="text-lg text-gray-700 mt-4">With a remarkable score of</p>
        <span className="text-3xl font-bold text-green-500">{score}</span>
        <p className="text-lg text-gray-600 mt-4 italic">{greeting}</p>
        <div className="mt-8 border-t-2 border-gray-300 pt-4">
          <p className="text-gray-500">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <button
        onClick={downloadPDF}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Certificate;
