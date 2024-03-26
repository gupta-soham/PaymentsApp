import { useState } from "react"
import { BottomComp } from "../components/BottomComp"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"; 
import { useNavigate, Navigate } from "react-router-dom"
import { UserDetails } from "../components/UserDetails"

export const SignUp = () => {
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const navigate = useNavigate();
    const user = UserDetails();
    if(user.loading) {
        return ;
    }

    if(user.userDetails) {
        return <Navigate to={"/dashboard"} />
    }  

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e) => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={(e) => {
          setUsername(e.target.value);
        }} placeholder="example@gmail.com" label={"Email"} type="email" />
        <InputBox onChange={(e) => {
          setPassword(e.target.value);
        }} placeholder="p@$sw0rD" label={"Password"} type="password" />
        <div className="pt-4">
          <Button onClick={async() => {
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            }); 
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
            }
            catch (e) {
                alert("Incorrect Inputs");
            }
          }} label={"Sign up"} />
        </div>
        <BottomComp label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}