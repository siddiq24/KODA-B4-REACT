import { CupSoda, Truck, UserRoundCheck } from 'lucide-react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import React, { useState } from 'react'

function Dashboard() {

    const [dateRange, setDateRange] = useState("16 - 23 January 2023");

    const salesData = [
        { date: "16 Jan", cup: 90 },
        { date: "17 Jan", cup: 80 },
        { date: "18 Jan", cup: 130 },
        { date: "19 Jan", cup: 150 },
        { date: "20 Jan", cup: 140 },
        { date: "21 Jan", cup: 200 },
        { date: "22 Jan", cup: 220 },
        { date: "23 Jan", cup: 250 },
    ];

    const products = [
        { no: 1, name: "Caramel Machiato", sold: "300 Cup", profit: "IDR 9.000.000" },
        { no: 2, name: "Hazelnut Latte", sold: "200 Cup", profit: "IDR 8.000.000" },
        { no: 3, name: "Kopi Susu", sold: "100 Cup", profit: "IDR 7.000.000" },
        { no: 4, name: "Espresso Supreme", sold: "90 Cup", profit: "IDR 6.000.000" },
        { no: 5, name: "Caramel Velvet Latte", sold: "80 Cup", profit: "IDR 5.000.000" },
        { no: 6, name: "Hazelnut Dream Brew", sold: "70 Cup", profit: "IDR 4.000.000" },
        { no: 7, name: "Vanilla Silk Mocha", sold: "60 Cup", profit: "IDR 3.000.000" },
        { no: 8, name: "Dark Roast Delight", sold: "50 Cup", profit: "IDR 2.000.000" },
        { no: 9, name: "Ethiopian Yirgacheffe Euphoria", sold: "40 Cup", profit: "IDR 1.000.000" },
        { no: 10, name: "Indonesian Sumatra Reserve", sold: "30 Cup", profit: "IDR 500.000" },
    ];

    return (
        <div className='w-full space-y-8'>
            <section className='flex gap-5'>
                {
                    [
                        {
                            Icon: () => { return <CupSoda size={33} stroke='#ff8906' strokeWidth={1.5} /> },
                            title: 'Order On Progress',
                            totalOld: 180,
                            totalNew: 200,
                            color: 'bg-[#6FC276]'
                        },
                        {
                            Icon: () => { return <Truck size={33} stroke='#ff8906' strokeWidth={1.5} /> },
                            title: 'Order Shipping',
                            totalOld: 98,
                            totalNew: 100,
                            color: 'bg-[#6C69D4]'
                        },
                        {
                            Icon: () => { return <UserRoundCheck size={33} stroke='#ff8906' strokeWidth={1.5} /> },
                            title: 'Order Done',
                            totalOld: 48,
                            totalNew: 50,
                            color: 'bg-[#C56FBC]'
                        },
                    ].map(data => {
                        const percent = (data.totalNew - data.totalOld) / data.totalOld
                        return (
                            <div className={`flex-1 ${data.color} rounded-lg p-6 py-4`}>
                                <div className='flex gap-3 items-center'>
                                    <div className='rounded-full bg-white p-2'>
                                        <data.Icon />
                                    </div>
                                    <h1 className='text-white'>{data.title}</h1>
                                </div>
                                <div className='text-white flex gap-5 items-center mt-3'>
                                    <h3 className='text-3xl tracking-wider'>{data.totalNew}</h3>
                                    <h5 className='text-md flex items-center gap-1'>+{percent.toFixed(2)}%
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z" fill="white" />
                                        </svg>
                                    </h5>
                                </div>
                            </div>
                        )
                    })
                }
            </section>

            <div className="p-6 space-y-8 min-h-screen">
                {/* Total Penjualan */}
                <div className="bg-white shadow rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-3">
                        <div className='space-y-2'>
                            <h2 className="font-semibold text-gray-700">Total Penjualan</h2>
                            <p className="text-sm text-gray-500">1000 Cup ({dateRange})</p>
                        </div>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="border rounded-md px-3 py-1 text-sm"
                        >
                            <option>16 - 23 January 2023</option>
                        </select>
                    </div>

                    <ResponsiveContainer width="100%" height={350} color='#000000'>
                        <AreaChart data={salesData}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid horizontal vertical={false} strokeDasharray="10 10" />
                            <XAxis dataKey="date"  stroke='#000000'/>
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="cup"
                                stroke="#16a34a"
                                strokeWidth={3}
                                fill="url(#colorSales)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>


                </div>

                {/* Produk Terlaris */}
                <div className="bg-white shadow rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-gray-700">Produk Terlaris</h2>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="border rounded-md px-3 py-1 text-sm"
                        >
                            <option>16 - 23 January 2023</option>
                        </select>
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-gray-700">
                                <th className="py-5 px-3 text-center">No</th>
                                <th className="py-5 px-3">Nama Produk</th>
                                <th className="py-5 ">Terjual</th>
                                <th className="py-5 px-3">Keuntungan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, i) => (
                                <tr key={i+1} className={`${i % 2 == 0 && 'bg-gray-100'} text-gray-600`}>
                                    <td className="py-5 px-3 text-center">{i+1}</td>
                                    <td className="py-5 px-3">{p.name}</td>
                                    <td className="py-5">{p.sold}</td>
                                    <td className="py-5 px-3 text-green-600">{p.profit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard