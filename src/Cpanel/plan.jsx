import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "@nextui-org/react"; // Import Input and Button components
import { IoEyeOff, IoEye } from "react-icons/io5"; // Import IoEyeOff and IoEye icons

function Plan() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
    firstName: "", // Added firstName state
    lastName: "", // Added lastName state
    phone: "", // Added phone state
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/save", {
        email: email,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        confirmPassword: input.confirmPassword,
      });

      if (response.status === 200) {
        //navigate("/order");
        alert(response.data);
      } else if (response.status === 409) {
        alert(response.data);
        console.log(response.data) // Display the message from the server
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error(error); 
      navigate("/order");
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="ml-72 mt-24">
      <div className="">
        <h1 className="text-3xl font-semibold">Create Account</h1>
        <p className="text-xl mt-2 font-semibold">
          New to WebTekdi.com? Please Create an account and Confirm your Order
          to get started today.
        </p>
        <p>
          Already have an account?{" "}
          <Link to="/sign-in" className="text-violet-500">
            Sign In
          </Link>{" "}
          now.
        </p>
      </div>

      <div className="flex gap-8 ">
        <form className="mt-16 flex border pt-4 gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center flex-col gap-2 mb-4 justify-center ">
            <div className="flex">
              <Input
                type="text"
                label="First Name"
                name="firstName"
                value={input.firstName}
                color="secondary"
                className="m-2 w-80 text-4xl"
                onChange={onInputChange}
                required
              />
              <Input
                type="text"
                label="Last Name"
                name="lastName"
                value={input.lastName}
                color="secondary"
                className="m-2 w-80 text-4xl"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="flex">
              <Input
                type="number"
                name="phone"
                color="secondary"
                value={input.phone}
                label="Number"
                className="m-2 w-80 text-4xl"
                onChange={onInputChange}
                required
              />

              <Input
                type="email"
                name="email"
                color="secondary"
                label="Email"
                className="m-2 w-80 text-4xl"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex">
              <div className="flex flex-col items-center">
                <Input
                  className="m-2 w-80  text-4xl "
                  color="secondary"
                  label="Password"
                  name="password"
                  value={input.password}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  type="password"
                  required
                />
                {error.password && (
                  <span className="err">{error.password}</span>
                )}
              </div>

              <div className="flex flex-col items-center">
                <Input
                  color="secondary"
                  className="m-2 w-80 text-4xl "
                  label="Confirm Password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={onInputChange}
                  onBlur={validateInput}
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
                />

                {error.confirmPassword && (
                  <span className="err">{error.confirmPassword}</span>
                )}
              </div>
            </div>
            <div className="text-center text-lg">
              <p>
                By clicking "Confirm Order", you are agreeing to WebTekdi.com{" "}
                <br />
                Policy's,
                <Link className="text-violet-500 underline ml-3">
                  Terms and Conditions.
                </Link>{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-col mr-10 items-center">
            <table className=" text-xl   border-separate border-spacing-2 border border-slate-500">
              <thead>
                <tr>
                  <th
                    className="bg-[#7D2FCA] border text-white text-2xl border-slate-700"
                    colSpan={2}
                  >
                    Your Order
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-700 p-2 font-semibold">
                    Website Development
                  </td>
                  <td className="border border-slate-700 p-2 font-semibold">
                    ₹ 6000.0
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-700 p-2 font-semibold">
                    Website Name
                  </td>
                  <td className="border border-slate-700 p-2 font-semibold">
                    ₹ 1000.0
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-700 p-2 font-semibold">
                    Website Hosting +<sub>Additional Products</sub>{" "}
                  </td>
                  <td className="border border-slate-700 p-2 font-semibold">
                    ₹ 3000.0
                  </td>
                </tr>

                <tr className="bg-[#7D2FCA] text-white">
                  <td className="border border-slate-700 p-2 font-semibold">
                    Current total
                  </td>
                  <td className="border font-bold border-slate-700 p-2">
                    ₹ 10000.0
                  </td>
                </tr>
              </tbody>
            </table>

            <Button
              color=""
              type="submit"
              className="m-2 mt-6 px-8 text-lg bg-[#7D2FCA] text-white font-semibold"
            >
              Confirm Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Plan;
