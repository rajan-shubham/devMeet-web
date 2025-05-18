import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            const res = await axios.post(BASE_URL+"/login", {
                emailId,
                password,
            },
            { withCredentials: true }    
            );
            dispatch(addUser(res.data));
            navigate("/");
        } catch (err) {
            setError(err?.response?.data || "Something went Wrong!");
        }
    }

    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went Wrong!");
        }
    }

    return (
        <div className="my-30 flex justify-center">
            <div className="card card-border bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl">{isLoginForm ? "Login" : "Signup"}</h2>
                    <div className="py-2">
                        {!isLoginForm && (
                            <>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-xl">First Name</legend>
                                    <input type="text" value={firstName} className="input" placeholder="John"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-xl">Last Name</legend>
                                    <input type="text" value={lastName} className="input" placeholder="wick"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </>)}        
                        <fieldset className="fieldset">
                        <legend className="fieldset-legend text-xl">Email Id</legend>
                            <input type="text" value={emailId} className="input" placeholder="sam@gmail.com"
                            onChange={(e) => setEmailId(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                        <legend className="fieldset-legend text-xl">Password</legend>
                        <input type="password" value={password} className="input" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className="text-red-600">{error}</p>
                    <div className="card-actions justify-center">
                        <button
                            className="btn btn-soft btn-accent"
                            onClick={isLoginForm ? handleLogin : handleSignup}
                        >{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value)=> !value)}><small>{isLoginForm ? "New User ? SignUp Here" : "Existing User? Login Here"}</small></p>
                </div>
            </div>
        </div>
    );
};

export default Login;