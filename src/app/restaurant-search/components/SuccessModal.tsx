import React from "react";

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

const SuccessModal = ({ message, onClose }: SuccessModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">Success</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
