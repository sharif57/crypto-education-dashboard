
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useVerifyEmailMutation } from "../../redux/features/authSlice";

// export default function VerifyEmail() {
//   const router = useNavigate();
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);

//   const [verifyEmail] =useVerifyEmailMutation();

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Verifying OTP:", otp.join(""));
//       router("/auth/reset-password");
//     } catch (error) {
//       console.error("Verification failed:", error);
//     }
//   };

//   const handleOtpChange = (index, value) => {
//     if (/^[0-9]?$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Move focus to next input if value is entered
//       if (value && index < 5) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     // Move focus to previous input on backspace if current input is empty
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       document.getElementById(`otp-${index - 1}`).focus();
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
//       style={{ backgroundImage: "url(/login.png)" }}
//         >
//       <div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#161616] via-[#2c2c2c] to-[#3f3d3d] border border-gray-600 backdrop-blur-sm rounded-lg shadow-lg">
//         <div className="p-6 space-y-1">
//           <h2 className="text-2xl lg:text-5xl text-center font-medium text-white">
//             Verify Email
//           </h2>
//         </div>
//         <div className="p-6 space-y-6">
//           <form onSubmit={handleVerify} className="space-y-6">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="flex space-x-2">
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                     id={`otp-${index}`}
//                     type="text"
//                     maxLength={1}
//                     value={digit}
//                     onChange={(e) => handleOtpChange(index, e.target.value)}
//                     onKeyDown={(e) => handleKeyDown(index, e)}
//                     className="w-12 h-12 text-lg lg:text-xl bg-[#535353] text-white border border-gray-600 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//                   />
//                 ))}
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full transition-colors"
//             >
//               Verify
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useVerifyEmailMutation } from "../../redux/features/authSlice";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  // Extract email from URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const otpString = otp.join(""); // Combine OTP digits into a single string
      if (!email || otpString.length !== 6) {
        setError("Please enter a valid OTP and ensure email is provided.");
        return;
      }

      // Call the verifyEmail mutation with email and OTP
      const response = await verifyEmail({
        email,
        otp: otpString,
      }).unwrap();
      console.log("Verification response:", response);
      localStorage.setItem("token", response.access_token);

      // On successful verification, navigate to reset password page
      navigate("/auth/reset-password");
    } catch (error) {
      console.error("Verification failed:", error);
      setError(
        error?.data?.message || "Verification failed. Please try again."
      );
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input if value is entered
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move focus to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: "url(/login.png)" }}
    >
      <div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#161616] via-[#2c2c2c] to-[#3f3d3d] border border-gray-600 backdrop-blur-sm rounded-lg shadow-lg">
        <div className="p-6 space-y-1">
          <h2 className="text-2xl lg:text-5xl text-center font-medium text-white">
            Verify Email
          </h2>
        </div>
        <div className="p-6 space-y-6">
          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-lg lg:text-xl bg-[#535353] text-white border border-gray-600 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 ${
                isLoading ? "bg-teal-300" : "bg-teal-500 hover:bg-teal-600"
              } text-black font-medium rounded-full transition-colors`}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}