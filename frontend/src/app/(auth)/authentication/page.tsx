"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { User } from "@/lib/types";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const sendUser = async () => {
      if (data != null) {
        const res = await axios.post(
          "https://cafe-menu-green.vercel.app/api/v1/userAuth",
          data
        );
        toast(res.data.message);
        if (res.status == 200) {
          router.push("/admin");
        }
      }
    };
    sendUser();
  }, [data, router]);
  function checkUser() {
    if (username != "" && password != "") {
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
        className="w-[50%] max-h-screen  text-primary dark:text-text "
        src={
          "https://images.unsplash.com/photo-1556742517-fde6c2abbe11?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        width={1000}
        height={1000}
        alt="Cafe Img"
      />
      <div className="absolute top-[15vw] right-[10vw] flex justify-center items-center">
        <div className="modal p-8 rounded-lg shadow-lg w-[25vw]">
          <h2 className="text-2xl font-bold text-center mb-6  text-primary dark:text-text ">
            Login
          </h2>
          <div className="mb-4">
            <p className="block text-sm font-semibold mb-2  text-primary dark:text-text ">
              Username
            </p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300  text-primary  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <p className="block text-sm font-semibold mb-2  text-primary dark:text-text ">
              Password
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-primary  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            className="w-full bg-blue-500  text-primary dark:text-text  py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={checkUser}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
