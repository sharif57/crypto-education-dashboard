import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../../redux/features/authSlice";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  // State for form inputs
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  // State for password visibility
  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  // State for errors
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.old_password) {
      newErrors.old_password = "Old password is required";
    }
    if (!formData.new_password) {
      newErrors.new_password = "New password is required";
    } 
    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please confirm your new password";
    } else if (formData.new_password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError("");
    setSuccessMessage("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      }).unwrap();
      console.log("Password change response:", response);

      

      setSuccessMessage("Password changed successfully!");
      setFormData({ old_password: "", new_password: "", confirm_password: "" });
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setApiError(error?.data?.message || "Failed to change password. Please try again.");
      toast.error(error?.data?.message || "Failed to change password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[610px] h-[725px] mx-auto py-10 px-8">
        <div className="flex flex-col w-full max-w-md mx-auto mt-10 p-4 rounded-lg space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
            <FaArrowLeft />
            <h1 className="text-xl font-semibold">Change Password</h1>
          </div>

          {/* Error/Success Messages */}
          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
            {[
              {
                label: "Enter old password",
                name: "old_password",
                placeholder: "Enter old password",
              },
              {
                label: "Set new password",
                name: "new_password",
                placeholder: "Set new password",
              },
              {
                label: "Re-enter new password",
                name: "confirm_password",
                placeholder: "Re-enter new password",
              },
            ].map(({ label, name, placeholder }, index) => (
              <div key={index}>
                <label className="mb-2 block text-sm font-medium">{label}</label>
                <div className="relative flex items-center">
                  <MdLockOutline className="absolute left-3 text-gray-500" />
                  <input
                    type={showPasswords[name] ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2 border ${
                      errors[name] ? "border-red-500" : "border-black"
                    } rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                  />
                  <div
                    className="absolute right-3 cursor-pointer text-gray-500"
                    onClick={() => togglePasswordVisibility(name)}
                  >
                    {showPasswords[name] ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                </div>
                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
              </div>
            ))}


            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-6 w-full py-2 rounded-lg text-white ${
                isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-gray-800"
              }`}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;