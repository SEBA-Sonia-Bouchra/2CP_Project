import React from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 font-montserral">
      <div className="bg-[#E8E5D9] p-6 rounded-lg shadow-lg w-96 text-center">
        <p className="text-gray-900 text-lg">Do you want to delete this project?</p>

        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-[#213824] text-[#213824] rounded-full text-sm font-medium transition hover:bg-[#213824] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-[#213824] text-white rounded-full text-sm font-medium transition hover:bg-opacity-80"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
