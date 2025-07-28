
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/features/authSlice";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [forgotPassword] =useForgotPasswordMutation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
      try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || "OTP sent successfully!");
      router(`/auth/verify-email?email=${email}`);
    } catch (error) {
      let errorMessage = "Failed to send OTP. Please try again.";
      if (error && typeof error === "object" && "data" in error && error.data && typeof error.data === "object" && "error" in error.data) {
        errorMessage = (error.data.error || errorMessage);
      }
      toast.error(errorMessage);
      console.error("Failed to send OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: "url(/login.png)" }}
    >
      <div className="w-full max-w-md bg-gradient-to-b from-[#161616] via-[#2c2c2c] to-[#3f3d3d] border border-[#62C1BF] backdrop-blur-sm rounded-xl shadow-lg">
        <div className="p-6 space-y-1">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl lg:text-5xl text-center font-normal text-white">
             Forgot Password
            </h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-[#535353] border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md"
              />
            </div>


            <button
              type="submit"
              className="w-full py-2.5 bg-[#62C1BF] hover:bg-teal-600 text-black font-medium rounded-full transition-colors"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Otp"}
            </button>
          </form>

      
       
        </div>
      </div>
    </div>
  );
}