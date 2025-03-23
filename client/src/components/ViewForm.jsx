// src/components/ViewForm.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormById, submitResponse } from "../api";
import { toast } from "react-toastify";

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      const data = await getFormById(id);
      setForm(data);
    };
    fetchForm();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const responseData = {
        formId: id,
        responses: Object.keys(responses).map((inputId) => ({
          inputId,
          value: responses[inputId],
        })),
      };
      await submitResponse(responseData);
      toast.success("Response saved successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error saving response. Please try again.");
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      {form.inputs?.map((input, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2">{input.title}</label>
          <input
            type={input.type}
            placeholder={input.placeholder}
            value={responses[input._id] || ""}
            onChange={(e) =>
              setResponses({ ...responses, [input._id]: e.target.value })
            }
            className="border p-2 rounded w-100"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
};

export default ViewForm;
