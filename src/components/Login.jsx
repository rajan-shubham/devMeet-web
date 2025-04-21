import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("rajan@gmail.com");
    const [password, setPassword] = useState("Rajan@123");
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
            console.error(err);
        }
    }

    return (
        <div className="my-56 flex justify-center">
            <div className="card card-border bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl">Welcome Developer</h2>
                    <div className="py-2">
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
                    <div className="card-actions justify-center">
                        <button
                            className="btn btn-primary"
                            onClick={handleLogin}
                        >Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;