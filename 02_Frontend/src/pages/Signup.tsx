import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { Welcome } from "../components/Welcome";

export function Signup() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function signup() {
    try {
      setLoading(true);
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      await axios.post(BACKEND_URL + "/api/v1/user/signup", {
        username,
        password,
      });
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="h-screen w-screen bg-gray-200 dark:bg-gray-900 flex flex-col lg:flex-row justify-center gap-10 lg:gap-20 items-center">
        <Welcome />
        <div className="bg-white dark:bg-gray-800 lg:min-w-md pt-10 rounded-xl border-2 border-gray-300 dark:border-gray-600 shadow-xl px-10 py-6 relative transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-600/70">
          <div className="my-10">
            <h2 className="text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 animate-fade-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                Join Second Brain
              </span>
            </h2>

            <div>
              <Input ref={usernameRef} placeholder="Username" />
              <Input ref={passwordRef} placeholder="Password" />
            </div>

            <div className="flex justify-center items-center px-8 py-5 mt-2">
              <Button
                onClick={signup}
                variant="primary"
                text={loading ? "Signing Up..." : "Sign Up"}
                fullWidth={true}
                loading={loading}
              />
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account ?{" "}
                <Link to="/signin" className="text-blue-500 hover:underline">
                  Log-in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
