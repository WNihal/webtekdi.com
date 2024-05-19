import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Divider,
  Image,
  Input,
  Button,
} from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import Logo from "../assets/webtekdi2.png";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Login successful");
        navigate("/");
        const responseData = await response.json();
        console.log("Response Data:", responseData);
      } else if (response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("An error occurred while logging in");
      }
    } catch (error) {
      console.error("Catch Block Error:", error);
      alert("An error occurred while logging in");
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center bg-[#3F2F5D] h-[100vh]">
      <Card className="w-[450px] bg-[#796ecc] p-2 m-2 shadow-lg shadow-slate-600">
        <CardHeader className="flex flex-col font-bold">
          <Image src={Logo} alt="" className="h-28 w-48" />
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center flex-col gap-2 mb-4 justify-center">
            <Input
              type="email"
              label="Email"
              name="email"
              className="m-2 w-72 text-4xl sm:w-96"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              className="m-2 w-72 text-4xl sm:w-96"
              label="Password"
              name="password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <IoEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              color=""
              type="submit"
              className="m-2 w-m-2 w-72 sm:w-96 bg-[#3F2F5D] text-white font-semibold"
            >
              Log In
            </Button>
          </div>
        </form>
        <Divider />
        <CardFooter className="flex justify-center items-center">
          <Button
            startContent={<FaGoogle />}
            className="m-2 w-m-2 w-72 sm:w-96 font-semibold bg-slate-50 text-black"
          >
            Log In With Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
