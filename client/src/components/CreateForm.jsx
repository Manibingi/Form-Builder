// src/components/CreateForm.js
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createForm, getFormById, updateForm } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState([]);
  const { id } = useParams(); // Get the form ID from the URL (if editing)
  const navigate = useNavigate();

  // Fetch form data if editing
  useEffect(() => {
    if (id) {
      const fetchForm = async () => {
        const form = await getFormById(id);
        setTitle(form.title);
        setInputs(form.inputs);
      };
      fetchForm();
    }
  }, [id]);

  const addInput = (type) => {
    const newInput = {
      id: `input-${inputs.length + 1}`,
      type,
      title: "",
      placeholder: "",
    };
    setInputs([...inputs, newInput]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(inputs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setInputs(items);
  };

  // Save or update the form
  const handleSaveForm = async () => {
    try {
      const formData = {
        title,
        inputs: inputs.map((input) => ({
          type: input.type,
          title: input.title,
          placeholder: input.placeholder,
        })),
      };

      if (id) {
        // Update existing form
        await updateForm(id, formData);
      } else {
        // Create new form
        await createForm(formData);
      }
      toast.success("Form saved successfully!");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      toast.error(
        id
          ? "error occurred updating the form. Please try again."
          : "error occurred creating the form. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center m-10 ">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">
          {id ? "Update Form" : "Create New Form"}
        </h1>
        <input
          type="text"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded mb-4 w-100"
          required
        />
        <div className="mb-4">
          <button
            onClick={() => addInput("text")}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
          >
            Add Text Input
          </button>
          <button
            onClick={() => addInput("email")}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
          >
            Add Email Input
          </button>
          <button
            onClick={() => addInput("number")}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
          >
            Add Number Input
          </button>
          <button
            onClick={() => addInput("password")}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
          >
            Add Password Input
          </button>
          <button
            onClick={() => addInput("date")}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Add Date Input
          </button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="inputs">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid md:grid-cols-2 gap-4"
              >
                {inputs.map((input, index) => (
                  <Draggable
                    key={input.id}
                    draggableId={input.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border p-4 mb-2 rounded"
                      >
                        <input
                          type="text"
                          placeholder="Input Title"
                          value={input.title}
                          onChange={(e) => {
                            const newInputs = [...inputs];
                            newInputs[index].title = e.target.value;
                            setInputs(newInputs);
                          }}
                          className="border p-2 rounded mb-2 w-full"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Placeholder"
                          value={input.placeholder}
                          onChange={(e) => {
                            const newInputs = [...inputs];
                            newInputs[index].placeholder = e.target.value;
                            setInputs(newInputs);
                          }}
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <button
                          onClick={() => {
                            const newInputs = inputs.filter(
                              (_, i) => i !== index
                            );
                            setInputs(newInputs);
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button
          type="submit"
          onClick={handleSaveForm}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
        >
          {id ? "Update Form" : "Save Form"}
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
