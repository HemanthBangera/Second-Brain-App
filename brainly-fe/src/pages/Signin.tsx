import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });

    const token: any = response.data.token;
    localStorage.setItem("token", token);
    navigate("/dashboard");
  }

  return (
    <div className=" h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <div className="flex justify-center text-4xl items-center pb-6 text-purple-800">Sign in</div>
        <Input reference={usernameRef} placeholder="Username" />

        <Input reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4">
          <Button
            onClick={signin}
            loading={false}
            variants="primary"
            text="Signin"
            fullWidth={true}
          />
          
        </div>
        <div className="flex justify-center text-gray-650">
            <BottomWarning label={"Don't have an account?"} buttontext="Sign up" to={'/signup'}/>

        </div>
      </div>
      </div>
  );
}
