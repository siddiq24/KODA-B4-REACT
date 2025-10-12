import React, { useState } from "react";
import { Mail, Phone, Lock, MapPin, User, Eye, EyeOff, PhoneCall } from "lucide-react";

export default function Profile() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        name: "Ghaluh Wizard",
        email: "ghaluhwizz@gmail.com",
        phone: "082116304338",
        password: "password",
        address: "Griya Bandung Indah",
        joined: "20 January 2022",
        photo: "/img/profile.jpg", // ganti path sesuai aset kamu
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile updated!");
    };

    const handleUpload = () => {
        alert("Upload photo clicked");
    };

    return (
        <section className="p-4 md:p-10 space-y-6 pt-22 md:px-[5%] md:pt-33">
            <h1 className="text-3xl font-semibold py-4">Profile</h1>

            <div className="grid md:grid-cols-4 gap-8 h-fit">
                {/* Kartu kiri */}
                <div className="col-span-3 md:col-span-1 ">
                    <div className="border border-gray-300 rounded-lg p-6 md:p-12 flex flex-col items-center shadow-sm space-y-4">
                        <h2 className="text-2xl font-semibold">{user.name}</h2>
                        <p className="text-gray-500 mb-4">{user.email}</p>
                        <img
                            src={user.photo}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border border-gray-300 mb-4"
                        />
                        <button
                            onClick={handleUpload}
                            className="bg-[#ff8906] hover:bg-[#ff7e00] px-12 py-4 rounded-md font-medium tracking-wide"
                        >
                            Upload New Photo
                        </button>
                        <p className="text-lg text-gray-500">
                            Since <span className="font-semibold text-black">{user.joined}</span>
                        </p>
                    </div>
                </div>

                {/* Form kanan */}
                <form
                    onSubmit={handleSubmit}
                    className="col-span-3 border border-gray-300 rounded-lg p-6 md:p-12 shadow-sm space-y-6"
                >
                    {/* Full Name */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-3 mt-2">
                            <User className="text-gray-500 mr-2" size={18} />
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-3 mt-2">
                            <Mail className="text-gray-500 mr-2" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-3 mt-2">
                            <PhoneCall className="text-gray-500 mr-2" size={18} />
                            <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-lg font-medium text-gray-700 mb-1 flex justify-between">
                            <span>Password</span>
                            <button
                                type="button"
                                onClick={() => alert("Redirect to password reset")}
                                className="text-[#ff8906] hover:underline text-sm"
                            >
                                Set New Password
                            </button>
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-3 mt-2">
                            <Lock className="text-gray-500 mr-2" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="text-gray-500" size={18} />
                                ) : (
                                    <Eye className="text-gray-500" size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-3 mt-2">
                            <MapPin className="text-gray-500 mr-2" size={18} />
                            <input
                                type="text"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                                className="w-full focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-[#ff8906] hover:bg-[#ff7e00] text-xl tracking-wide py-3 rounded-md  mt-4"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}
