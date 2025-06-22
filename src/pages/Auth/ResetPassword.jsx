import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Handle sign-in logic
      console.log("Signing in...");
      router.push("/");
      // Example: await signIn(email, password);
    } catch (error) {
      console.error("Sign in failed:", error);
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
              Reset Password
            </h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="signup-password"
                className="text-sm font-medium text-gray-300"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-[#535353] border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md pr-10"
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
            <div className="space-y-2">
              <label
                htmlFor="signup-password"
                className="text-sm font-medium text-gray-300"
              >
                Confirm Password{" "}
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-[#535353] border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md pr-10"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-black font-medium rounded-full transition-colors"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
