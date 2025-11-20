import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { Logo } from "../../svg/svg";
import { KeyRound, LockKeyhole, Mail } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
    const [searchParams] = useSearchParams();
    const emailParam = searchParams.get("email") || "";
    const pinParam = searchParams.get("pin") || "";

    const [email, setEmail] = useState(emailParam);
    const [pin, setPin] = useState(pinParam);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const origin = window.location.origin;
    const pathname = window.location.pathname;

    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);
        setMessage("");

        try {
            if (pin === "") {
                const url = origin + pathname;
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/auth/forgot-password`,
                    {
                        email: email,
                        origin: url
                    }
                );
                setMessage("PIN telah dikirim ke email Anda");
                console.log(response.data);
            } else {
                if (password !== confirmPassword) {
                    setMessage("Password dan konfirmasi password tidak cocok");
                    return;
                }

                if (password.length < 8) {
                    setMessage("Password harus minimal 8 karakter");
                    return;
                }

                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/auth/set-new-password`,
                    {
                        email: email,
                        pin: pin,
                        new_password: password
                    }
                );
                setMessage("Password berhasil diubah");
                console.log(response.data);

                setTimeout(() => {
                    window.location.href = "auth/login";
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage(error.response?.data?.message || "Terjadi kesalahan");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthLayout img={"/forgot-password.jpg"} className={"object-cover object-right"}>
            <div className="h-full flex flex-col justify-center gap-8">
                <Logo w={150} h={50} color={"#8E6447"} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="text-3xl text-[#8E6447] font-semibold">Fill out the form correctly</h1>
                    <p className="text-gray-500">We will send new password to your email</p>

                    {message && (
                        <div className={`p-3 rounded-lg ${message.includes("berhasil") || message.includes("dikirim")
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}>
                            {message}
                        </div>
                    )}

                    {pinParam === "" ? (
                        <>
                            <label className="text-xl">Email</label>
                            <div className="relative w-full mt-3 flex items-center">
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="w-full p-3 rounded-lg pl-14 outline outline-gray-300 text-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Mail className="absolute left-4 text-gray-500" size={20} />
                            </div>
                        </>
                    ) : (
                        <>
                            <label className="text-xl">OTP</label>
                            <div className="relative w-full mt-3 flex items-center">
                                <input
                                    type="text"
                                    placeholder="Enter Your OTP"
                                    className="w-full p-3 rounded-lg pl-14 outline outline-gray-300 text-lg"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    required
                                />
                                <LockKeyhole className="absolute left-4 text-gray-500" size={20} />
                            </div>

                            <label className="text-xl">Email</label>
                            <div className="relative w-full mt-3 flex items-center">
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="w-full p-3 rounded-lg pl-14 outline outline-gray-300 text-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Mail className="absolute left-4 text-gray-500" size={20} />
                            </div>

                            <label className="text-xl">New Password</label>
                            <div className="relative w-full mt-3 flex items-center">
                                <input
                                    type="password"
                                    placeholder="Enter New Password"
                                    value={password}
                                    className="w-full p-3 rounded-lg pl-14 outline outline-gray-300 text-lg"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <KeyRound className="absolute left-4 text-gray-500" size={20} />
                            </div>

                            <label className="text-xl">Confirm Password</label>
                            <div className="relative w-full mt-3 flex items-center">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    placeholder="Enter New Password Again"
                                    className="w-full p-3 rounded-lg pl-14 outline outline-gray-300 text-lg"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <KeyRound className="absolute left-4 text-gray-500" size={20} />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="p-4 bg-[#ff8906] w-full rounded-lg text-lg hover:bg-[#e67a06] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}

export default ForgotPassword;