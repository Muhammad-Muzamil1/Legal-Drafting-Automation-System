import { useState, useMemo } from "react";
import { formatLabel } from "@/utils/formatLabel";
import { getInputType } from "@/utils/inputTypeHelper";

export const DynamicForm = ({ fields, onSubmit, isLoading }) => {
  const uniqueFields = useMemo(() => [...new Set(fields)], [fields]);

  const initializeState = () => {
    const state = {};
    uniqueFields.forEach((field) => {
      state[field] = "";
    });
    return state;
  };

  const [formData, setFormData] = useState(initializeState);
  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    uniqueFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = `${formatLabel(field)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {uniqueFields.map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-2">
            {formatLabel(field)}
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            type={getInputType(field)}
            value={formData[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            inputMode={
              field.toLowerCase().includes("cnic") ? "numeric" : "text"
            }
            className="w-full px-4 py-2 border rounded-md"
          />

          {errors[field] && (
            <p className="text-red-500 text-sm">{errors[field]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-3 rounded-md disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Generate Document"}
      </button>
    </form>
  );
};