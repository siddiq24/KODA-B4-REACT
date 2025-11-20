import React, { useState, useEffect } from "react"
import { Mail, Phone, Lock, MapPin, User, Eye, EyeOff, PhoneCall, Upload } from "lucide-react"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { clearError, updateProfile, updateProfileImage, clearSuccess } from "../../redux/slice/AuthSlice"
import { useNavigate } from "react-router"
import { logout } from "../../redux/slice/AuthSlice"

export default function Profile() {

    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const { user: userFromRedux, token, loading, uploading, error, success } = useSelector(state => state.auth)
    const navigate = useNavigate()
    console.log(userFromRedux)

    const {
        register,
        handleSubmit,
        setValue,
        watch,

        formState: { errors, isDirty }
    } = useForm({
        defaultValues: {
            name: userFromRedux?.full_name,
            email: userFromRedux?.email,
            phone: userFromRedux?.phone,
            password: "*************",
            address: userFromRedux?.address,
            photo: userFromRedux?.image,
        }
    })

    const watchPassword = watch("password")
    const watchName = watch("name")
    const watchEmail = watch("email")

    useEffect(() => {
        if (success) {
            toast.success("Profile updated successfully!")
            dispatch(clearSuccess())
        }

        if (error) {
            setTimeout(() => {
                toast.error(error)
            }, 1000);


            if (error === 'Invalid or expired token' || error === 'No token available') {
                dispatch(logout())
                navigate("/")
            }
            dispatch(clearError())
        }
    }, [success, error, navigate, dispatch])

    const onSubmit = async (data) => {
        const updateData = {
            full_name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address
        }
        console.log(updateData)

        dispatch(updateProfile({ userData: updateData, token }))
    }

    const handleUpload = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async (e) => {
            const file = e.target.files[0]
            if (file) {
                if (!file.type.startsWith('image/')) {
                    toast.error("Please select an image file")
                    return
                }

                if (file.size > 5 * 1024 * 1024) {
                    toast.error("Image size should be less than 5MB")
                    return
                }

                dispatch(updateProfileImage({ imageFile: file, token }))
                    .unwrap()
                    .then((result) => {
                        if (result.imageUrl) {
                            setValue("photo", result.imageUrl)
                        }
                        toast.success("Profile photo updated successfully!")
                    })
                    .catch((error) => {
                        toast.error(error)
                    })
            }
        }
        input.click()
    }

    const handleSetNewPassword = () => {
        toast.info("Redirecting to password reset page...")
        window.location.href = "/forgot-password"
    }

    const handlePasswordChange = (e) => {
        const { value } = e.target
        if (value !== "*************") {
            setValue("password", value, { shouldDirty: true })
        }
    }

    const joinedDate = userFromRedux?.created_at
        ? new Date(userFromRedux?.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

    return (
        <section className="p-4 md:p-10 space-y-6 pt-22 md:px-[5%] md:pt-33">
            <h1 className="text-3xl font-semibold py-4">Profile</h1>

            <div className="grid md:grid-cols-4 gap-8 h-fit">
                {/* Left Card */}
                <div className="col-span-3 md:col-span-1">
                    <div className="border border-gray-300 rounded-lg p-6 md:p-12 flex flex-col items-center shadow-sm space-y-4">
                        <h2 className="text-2xl font-semibold text-center">
                            {watchName || "No Name"}
                        </h2>
                        <p className="text-gray-500 mb-4 text-center">
                            {watchEmail || "No Email"}
                        </p>
                        <div className="relative">
                            <img
                                src={userFromRedux.image}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border border-gray-300 mb-4"
                                onError={(e) => {
                                    e.target.src = "/img/default-avatar.jpg"
                                }}
                            />
                            {uploading && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploading}
                            className="bg-[#ff8906] hover:bg-[#ff7e00] disabled:bg-gray-400 px-6 py-3 rounded-md font-medium tracking-wide text-white transition-colors flex items-center gap-2"
                        >
                            <Upload size={18} />
                            {uploading ? "Uploading..." : "Upload New Photo"}
                        </button>
                        <p className="text-lg text-gray-500 text-center">
                            Member since <span className="font-semibold text-black">{joinedDate}</span>
                        </p>
                    </div>
                </div>

                {/* Right Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="col-span-3 border border-gray-300 rounded-lg p-6 md:p-12 shadow-sm space-y-6"
                >
                    {/* Full Name */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1">
                            Full Name *
                        </label>
                        <div className={`flex items-center border rounded-md p-3 mt-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}>
                            <User className="text-gray-500 mr-2" size={18} />
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Full name must be at least 2 characters"
                                    }
                                })}
                                className="w-full focus:outline-none"
                                placeholder="Enter your full name"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1">
                            Email *
                        </label>
                        <div className={`flex items-center border rounded-md p-3 mt-2 ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}>
                            <Mail className="text-gray-500 mr-2" size={18} />
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="w-full focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <div className={`flex items-center border rounded-md p-3 mt-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}>
                            <PhoneCall className="text-gray-500 mr-2" size={18} />
                            <input
                                type="tel"
                                {...register("phone", {
                                    pattern: {
                                        value: /^[0-9+\-\s()]*$/,
                                        message: "Invalid phone number format"
                                    }
                                })}
                                className="w-full focus:outline-none"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-lg font-medium text-gray-700 mb-1 flex justify-between">
                            <span>Password</span>
                            <button
                                type="button"
                                onClick={handleSetNewPassword}
                                className="text-[#ff8906] hover:underline text-sm font-medium"
                            >
                                Set New Password
                            </button>
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-3 mt-2">
                            <Lock className="text-gray-500 mr-2" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                onChange={handlePasswordChange}
                                className="w-full focus:outline-none"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                        {watchPassword === "*************" && (
                            <p className="text-sm text-gray-500 mt-1">
                                Password is hidden for security. Click "Set New Password" to change it.
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md p-3 mt-2">
                            <MapPin className="text-gray-500 mr-2" size={18} />
                            <textarea
                                {...register("address")}
                                className="w-full focus:outline-none resize-none"
                                placeholder="Enter your address"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !isDirty}
                        className="w-full bg-[#ff8906] hover:bg-[#ff7e00] disabled:bg-gray-400 text-white text-xl tracking-wide py-3 rounded-md font-medium transition-colors mt-4 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Updating...
                            </>
                        ) : (
                            "Update Profile"
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}