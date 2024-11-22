"use client";
import React, { useState } from "react";

interface TableCreationModalProps {
  restaurantId: string;
  onClose: () => void;
  onTableCreated: () => void;
}

const TableCreationModal = ({
  restaurantId,
  onClose,
  onTableCreated,
}: TableCreationModalProps) => {
  const [number, setNumber] = useState<number | "">("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateTable = async () => {
    if (!number || !capacity) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tables/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, capacity, restaurantId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create table");
      }

      await response.json();
      onTableCreated();
      onClose();
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the table.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full sm:w-96">
        <h2 className="text-2xl text-blue-500 font-semibold mb-4">
          Add a table
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-[#888888]">Table number</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#888888]">Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-softBlack text-white rounded-lg mr-2"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTable}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableCreationModal;
