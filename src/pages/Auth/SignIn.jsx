
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../redux/features/authSlice";
// import toast from "react-hot-toast";

// export default function SignIn() {
//   const router = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [login]= useLoginMutation();

//   const handleSignIn = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // Validate inputs
//         if (!email || !password) {
//             toast.error("Email and password are required.");
//             setLoading(false);
//             return;
//         }


//         try {
//             const res = await login({
//                 email,
//                 password,
//             }).unwrap();

//             toast.success(res.message || "Login successful!");
//             localStorage.setItem("accessToken", res.access_token);
//             // await refetch();

//             router.push("/");
//             window.location.href = "/";

//         } catch (error) {
//             const errorMessage = (error?.data?.message || "Login failed. Please try again.");
//             toast.error(errorMessage);
//             console.error("Sign in failed:", error);
//         } finally {
//             setLoading(false);
//             // refetch();
//         }
//     };


//   return (
//     <div
//       className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
//       style={{ backgroundImage: "url(/login.png)" }}
//     >
//       <div className="w-full max-w-md bg-gradient-to-b from-[#161616] via-[#2c2c2c] to-[#3f3d3d] border border-[#62C1BF] backdrop-blur-sm rounded-xl shadow-lg">
//         <div className="p-6 space-y-1">
//           <div className="flex items-center justify-center">
//             <h2 className="text-2xl lg:text-5xl text-center font-medium text-white">
//               Sign In
//             </h2>
//           </div>
//         </div>
//         <div className="p-6 space-y-4">
//           <form onSubmit={handleSignIn} className="space-y-4">
//             <div className="space-y-2">
//               <label
//                 htmlFor="signup-email"
//                 className="text-sm font-medium text-gray-300"
//               >
//                 Email
//               </label>
//               <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}  
//                 id="signup-email"
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 bg-[#535353] border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md"
//               />
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="signup-password"
//                 className="text-sm font-medium text-gray-300"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                   id="signup-password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="w-full px-4 py-2 bg-[#535353] border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md pr-10"
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-300"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div className="text-right">
//               <Link
//                 to="/auth/forgot-password"
//                 className="text-sm text-gray-300 hover:text-gray-200 font-normal transition-colors"
//               >
//                 Forget password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full transition-colors"
//                 disabled={loading}
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>
           
//           </form>

       
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/authSlice";
import toast from "react-hot-toast";

export default function SignIn() {
  const navigate = useNavigate(); // Updated from `router` to `navigate` for clarity
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate inputs
    if (!email || !password) {
      toast.error("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      toast.success(res.message || "Login successful!");
      localStorage.setItem("accessToken", res.access_token);
      navigate("/"); // Use navigate instead of router.push and window.location.href
    } catch (error) {
      const errorMessage = error?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Sign in failed:", error);
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
            <h2 className="text-2xl lg:text-5xl text-center font-medium text-white">
              Sign In
            </h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="signin-email" // Updated ID to avoid confusion with signup
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="signin-email" // Updated ID
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-[#535353] border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md"
                required // Added for basic HTML validation
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="signin-password" // Updated ID to avoid confusion with signup
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="signin-password" // Updated ID
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-[#535353] border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md pr-10"
                  required // Added for basic HTML validation
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="text-right">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-gray-300 hover:text-gray-200 font-normal transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}