import { Link, useNavigate } from "react-router-dom";
import type { SignInInput, SignUpInput } from "@harshchh/medium-common";
import { useState } from "react";
import { BACKEND_URL} from '../components/config'
import axios from 'axios';
import { toast } from "react-toastify";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const isSignup = type === "signup";
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold text-left flex-col">
                        {isSignup ? "Create an Account" : "Welcome Back"}
                    </div>
                    <div className="text-slate-500">
                        {isSignup ? (
                            <>
                                Already have an account?{" "}
                                <Link to="/signin" className="text-blue-400 pl-2 underline">
                                    Login
                                </Link>
                            </>
                        ) : (
                            <>
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-blue-400 pl-2 underline">
                                    Create One
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <LabelInputs type={type} />
            </div>
        </div>
    );
};

const LabelInputs = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignInInput | SignUpInput>(
        type === "signup" ? 
        { email: "", password: "", name: "" } as SignUpInput :
        { email: "", password: "" } as SignInInput
    );
    const [isLoading , setIsLoading] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        try{
            if (type === "signup") {
                const signupData = formData as SignUpInput;
                console.log("Signup data:", signupData);
                const response = await axios.post(`${BACKEND_URL}api/v1/user/signup`, signupData);
                // console.log("Signup succesfull : "+ response.data);
                const jwt = response.data.jwt;
                localStorage.setItem("token",jwt)
                toast.success(response.data.msg || "Account created successfully!");
                setIsLoading(false);
                navigate('/blogs'); 


            } else {
                const signinData = formData as SignInInput;
                console.log("Signin data:", signinData);
                const response = await axios.post(`${BACKEND_URL}api/v1/user/signin`, signinData);
                // console.log("Signin successful:", response.data);
                const jwt = response.data.jwt;
                localStorage.setItem("token",jwt);
                toast.success(response.data.msg || "Welcome back!");
                setIsLoading(false);
                navigate('/blogs');

            } 
        }
        catch(error){
            console.log("Auth error : "+error); 
                        // Handle error (show error message to user)
                        console.log(error);
                        //@ts-ignore
                        const errorMessage =  error.message || 
                        "Something went wrong. Please try again.";
                        toast.error(JSON.stringify(errorMessage));
                        setIsLoading(false);
        }
    
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto mt-4">
            {type === "signup" && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        value={(formData as SignUpInput).name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    /> 
                </div>
            )}
            
            {/* Email Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@email.com"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            {/* Password Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            {/* Submit Button */}
            <div>
                        <button
                type="submit"
                disabled={isLoading}
                className={`cursor-pointer w-full font-semibold py-2 px-4 rounded transition duration-200 flex items-center justify-center ${
                    isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-black text-white hover:bg-slate-800'
                }`}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    type === "signup" ? "Create Account" : "Login"
                )}
                    </button>
            </div>
        </form>
    );
};