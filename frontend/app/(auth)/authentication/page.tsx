"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { User } from "@/lib/types";
import Cookie from "js-cookie";
import { Eye, EyeClosed } from "lucide-react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  Cookie.set("isAdmin", "", { expires: 7 });
  useEffect(() => {
    const sendUser = async () => {
      if (data != null) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/userAuth`,
          data
        );
        toast(res.data.message);
        if (res.data.message == "Succesfully Logged In") {
          console.log(res.data.token)
          Cookie.set("isAdmin", res.data.token, { expires: 7 });
          
          router.push("/admin");
        } else {
          setLoading(false);
        }
      }
    };
    sendUser();
  }, [data]);
  function checkUser() {
    if (username != "" && password != "") {
      setLoading(true);
      setData({ username: username, password: password, isAdmin: true });
    } else {
      if (username == "") {
        toast.warn("User-Name Cant Be Empty");
      }
      if (password == "") {
        toast.warn("Password Cant Be Empty");
      }
    }
  }
  return (
    <>
      <ToastContainer />
      <Image
        className="w-full h-screen object-cover"
        src="https://images.unsplash.com/photo-1556742517-fde6c2abbe11?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={1000}
        height={1000}
        alt="Cafe Img"
      />
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
        <div className="modal p-8 rounded-lg shadow-lg w-[90vw] max-w-md bg-white bg-opacity-80 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary dark:text-text">
            Login
          </h2>
          <div className="mb-4">
            <p className="block text-sm font-semibold mb-2 text-primary dark:text-text">
              Username
            </p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6 relative">
            <p className="block text-sm font-semibold mb-2 text-primary dark:text-text">
              Password
            </p>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye size={20} color="#555" />
              ) : (
                <EyeClosed size={20} color="#555" />
              )}
            </span>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={checkUser}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-4">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
