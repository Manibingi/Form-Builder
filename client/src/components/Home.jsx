// src/components/Home.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteForm, getForms } from "../api";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Home = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      const data = await getForms();
      setForms(data);
    };
    fetchForms();
  }, []);

  // Handle form deletion
  const handleDeleteForm = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this form?")) {
        await deleteForm(id);
        setForms(forms.filter((form) => form._id !== id)); // Remove the deleted form from the list
        toast.success("Form deleted successfully!");
      }
    } catch (error) {
      toast.error("Error deleting form. Please try again.");
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Forms</h1>
      <Link
        to="/form/create"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create New Form
      </Link>
      <div className="w-100">
        {forms.length === 0 ? (
          <p>You have no forms created yet.</p>
        ) : (
          forms.map((form) => (
            <div
              key={form._id}
              className="border p-4 mb-2 rounded flex justify-between"
            >
              <Link to={`/form/${form._id}`} className="text-blue-500">
                {form.title}
              </Link>
              <div className="flex gap-2">
                <CiEdit
                  className="cursor-pointer text-2xl hover:text-blue-600"
                  onClick={() => navigate(`/form/${form._id}/edit`)}
                />
                <MdDeleteOutline
                  className="cursor-pointer text-2xl hover:text-red-600"
                  onClick={() => handleDeleteForm(form._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
