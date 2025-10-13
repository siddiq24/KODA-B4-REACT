import React, { useEffect, useState } from "react";
import { X, Trash2, Upload, ImagePlus } from "lucide-react";

const UserSidebar = ({ isOpen, onClose, productData, onSave }) => {
    const [formData, setFormData] = useState(productData || {
        id: 0,
        image: "",
        fullname: "",
        phone: "",
        address: "",
        email: "",
        role: ""
    });
    useEffect(() => {
        setFormData(productData)
    }, [productData])
    const [role, setrole] = useState('user')

    console.log(formData)
    console.log(productData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map((file) => URL.createObjectURL(file));
        setFormData({ ...formData, image: formData.image, ...urls });
    };

    const handleImageDelete = (url) => {
        setFormData({
            ...formData,
            images: formData.images.filter((img) => img !== url),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };


    return (
        <div
            className={`fixed top-0 right-0 w-full sm:w-[400px] md:w-[40%] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="flex justify-between items-center px-8 py-4 border-gray-300 border-b">
                <h2 className="text-4xl font-semibold">
                    {productData ? formData?.fullname : "Insert User"}
                </h2>
                <button onClick={onClose} className="text-red-500 hover:text-red-600">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="px-8 overflow-y-auto space-y-2 h-[calc(100%-64px)] flex-col pb-8 justify-between flex">
                <label className="block text-lg font-semibold mb-2">Image User</label>
                <div className="flex gap-2 flex-wrap mb-3">
                    {productData == null
                        ? <div className="p-4 md:p-6 bg-gray-300 w-fit rounded-xl mb-4">
                            <ImagePlus />
                        </div>
                        : <div className="relative">
                            <img
                                src={formData?.image}
                                alt="preview"
                                className="w-16 h-16 object-cover rounded-md border-gray-300 border"
                            />
                            <button
                                type="button"
                                onClick={() => handleImageDelete(formData.image)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    }
                </div>
                <label className="inline-block">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    <div className="bg-orange-400 w-fit hover:bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                    </div>
                </label>

                <div>
                    <label className="block text-lg font-semibold mb-2">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData?.fullname}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg text-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter Full Name"
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">Email</label>
                    <input
                        type="text"
                        name="price"
                        value={formData?.email}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg text-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter Your Email"
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData?.phone}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg text-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter Your Phone"
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        name="phone"
                        value={formData?.phone}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg text-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter Your Password"
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold mb-2">Adress</label>
                    <input
                        type="text"
                        name="address"
                        value={formData?.address}
                        onChange={handleChange}
                        className="w-full border-gray-300 border rounded-lg text-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter Your Address"
                    />
                </div>

                {!productData && <div>
                    <label className="block text-lg font-semibold mb-2">Type Of User</label>
                    <div className="flex gap-8">
                        <div
                            type="button"
                            name="address"
                            value={formData?.address}
                            onClick={() => {
                                setrole('user')
                            }}
                            className={` ${role == 'user' ? 'bg-[#ff8906] border-[#ff8906] text-white' : 'border-gray-300'}
                            w-full text-center rounded-lg p-3 focus:outline-none focus:ring-2 hover:border-[#ff8906] border-2`}
                        >Normal User</div>
                        <div
                            type="button"
                            name="address"
                            value={formData?.address}
                            onClick={() => {
                                setrole('admin')
                            }}
                            className={` ${role == 'admin' ? 'bg-[#ff8906] border-[#ff8906] text-white' : 'border-gray-300'}
                            w-full text-center rounded-lg p-3 focus:outline-none focus:ring-2 hover:border-[#ff8906] border-2`}
                        >Admin</div>
                    </div>
                </div>}

                <button
                    type="submit"
                    className="w-full  bg-orange-400 hover:bg-orange-500 text-white py-5 mt-4 rounded-lg font-semibold"
                >
                    {productData ? "Edit Save" : "Add User"}
                </button>
            </form>
        </div>
    );
};

export default UserSidebar;
