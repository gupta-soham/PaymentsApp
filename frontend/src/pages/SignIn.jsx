import { useState } from "react"
import { BottomComp } from "../components/BottomComp"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { UserDetails } from "../components/UserDetails"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"

export const SignIn = () => {

  const navigate = useNavigate();
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

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
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e) => {
          setUsername(e.target.value);
        }} placeholder="example@gmail.com" label={"Email"} type="email" />
        <InputBox onChange={(e) => {
          setPassword(e.target.value);
        }} placeholder="p@$sw0rD" label={"Password"} type="password" />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={async () => {
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                  username,
                  password
              }); 
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }
            catch (e) {
                alert("Incorrect Inputs");
            }
          }}/>
        </div>
        <BottomComp label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}