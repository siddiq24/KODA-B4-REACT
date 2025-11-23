import React from "react";

export default function ConfirmDeleteModal({ open, onClose, onConfirm, productName }) {
    if (!open) return null;
    console.log(productName)

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold text-gray-800">Delete Product</h2>
                <p className="text-sm text-gray-500 mt-2">
                    Are you sure you want to delete <span className="font-medium text-red-500">{productName}</span>?
                </p>

                <div className="flex justify-between gap-3 mt-5">
                    <button
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                        onClick={() => { onConfirm() }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
