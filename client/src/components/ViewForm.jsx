// src/components/ViewForm.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormById, submitResponse } from "../api";
import { toast } from "react-toastify";

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      const data = await getFormById(id);
      setForm(data);
    };
    fetchForm();
  }, [id]);

  const validateInput = (input) => {
    const { type, value } = input;

    if (!value) return "This field is required.";

    switch (type) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email address.";
        break;
      case "number":
        if (isNaN(value)) return "Must be a number.";
        if (!/^\d{10}$/.test(value))
          return "Mobile number must be exactly 10 digits.";
        break;
      case "password":
        if (value.length < 8) return "Password must be at least 8 characters.";
        break;
      case "date":
        if (isNaN(Date.parse(value))) return "Invalid date.";
        break;
      default:
        if (value.length < 3) return "Input must be at least 3 characters.";
    }

    return null; // No error
  };

  const handleSubmit = async () => {
    const errors = {};

    form.inputs.forEach((input) => {
      const error = validateInput({
        type: input.type,
        value: responses[input._id],
      });
      if (error) {
        errors[input._id] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        await submitResponse(form._id, responses);
        toast.success("Response submitted successfully!");
        navigate("/");
      } catch (error) {
        console.error("Failed to submit response:", error);
        toast.error("Failed to submit response. Please try again.");
      }
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
          <div className="h-3">
            {errors[input._id] && (
              <p className="text-red-500 text-sm">{errors[input._id]}</p>
            )}
          </div>
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
