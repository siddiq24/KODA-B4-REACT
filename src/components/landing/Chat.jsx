import { Send } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'

const mockMessages = [
    {
        id: 1,
        sender: 'admin',
        name: 'Admin Pertama',
        role: 'Admin Support',
        message: 'Halo! Selamat datang di Coffee Shop kami. Ada yang bisa saya bantu?',
        timestamp: '2024-01-15T10:30:00Z',
        avatar: '/testi1.jpg'
    },
    {
        id: 2,
        sender: 'user',
        name: 'Anda',
        role: 'Customer',
        message: 'Halo admin, saya ingin menanyakan tentang menu kopi yang tersedia hari ini.',
        timestamp: '2024-01-15T10:32:00Z',
        avatar: '/user-avatar.jpg'
    },
    {
        id: 3,
        sender: 'admin',
        name: 'Admin Pertama',
        role: 'Admin Support',
        message: 'Tentu saja! Hari ini kami memiliki special blend dari Brazil dan Ethiopia. Juga ada promo untuk hazelnut latte.',
        timestamp: '2024-01-15T10:33:00Z',
        avatar: '/testi1.jpg'
    },
    {
        id: 4,
        sender: 'user',
        name: 'Anda',
        role: 'Customer',
        message: 'Wah menarik! Bisa tolong berikan detail harga untuk hazelnut latte?',
        timestamp: '2024-01-15T10:35:00Z',
        avatar: '/user-avatar.jpg'
    },
    {
        id: 5,
        sender: 'admin',
        name: 'Admin Pertama',
        role: 'Admin Support',
        message: 'Hazelnut latte kami harga IDR 25.000. Untuk hari ini ada diskon 10% jika order melalui chat ini!',
        timestamp: '2024-01-15T10:36:00Z',
        avatar: '/testi1.jpg'
    }
]

const fetchMessagesFromDB = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockMessages)
        }, 500)
    })
}

const saveMessageToDB = async (message) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newMessage = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                ...message
            }
            resolve(newMessage)
        }, 300)
    })
}

function Chat({isOpen = false}) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const messagesEndRef = useRef(null)
    const chatContainerRef = useRef(null)

    useEffect(() => {
        const loadMessages = async () => {
            try {
                setIsLoading(true)
                const messagesFromDB = await fetchMessagesFromDB()
                setMessages(messagesFromDB)
            } catch (error) {
                console.error('Error loading messages:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadMessages()
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()

        if (!newMessage.trim()) return

        const userMessage = {
            sender: 'user',
            name: 'Anda',
            role: 'Customer',
            message: newMessage.trim(),
            avatar: '/user-avatar.jpg'
        }

        try {
            const savedMessage = await saveMessageToDB(userMessage)

            setMessages(prev => [...prev, savedMessage])
            setNewMessage('')

            setTimeout(async () => {
                const adminReply = {
                    sender: 'admin',
                    name: 'Admin Pertama',
                    role: 'Admin Support',
                    message: 'Terima kasih atas pesannya! Apakah ada hal lain yang bisa saya bantu?',
                    avatar: '/testi1.jpg'
                }

                const savedReply = await saveMessageToDB(adminReply)
                setMessages(prev => [...prev, savedReply])
            }, 2000)

        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const groupMessagesByDate = () => {
        const groups = {}
        messages.forEach(message => {
            const date = new Date(message.timestamp).toDateString()
            if (!groups[date]) {
                groups[date] = []
            }
            groups[date].push(message)
        })
        return groups
    }

    const messageGroups = groupMessagesByDate()

    return (
        <div className={`${!isOpen && 'hidden'}
        flex items-center justify-center w-full h-full p-4 absolute z-10 md:mt-10`}>
            <section className='aspect-4/6 bg-white rounded-2xl w-[90%] md:w-[55%] md:min-w-88 max-w-2xl overflow-hidden flex flex-col shadow-lg'>
                <div className='bg-[#ff8906] w-full h-[3%]'></div>
                <section className='border-b border-gray-300 p-4 flex gap-3 items-center bg-gray-50'>
                    <img
                        src="/testi1.jpg"
                        alt="Admin Avatar"
                        className='size-12 object-cover rounded-full object-top border-2 border-[#ff8906]'
                    />
                    <div className='flex flex-col justify-center'>
                        <h2 className='text-lg font-semibold text-gray-800'>Admin Pertama</h2>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <h3 className='text-sm text-[#ff8906] font-medium'>Online - Admin Support</h3>
                        </div>
                    </div>
                </section>

                <section className='flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-white'>
                    <main
                        ref={chatContainerRef}
                        className='h-full overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[#ff8906] scrollbar-track-gray-100 px-4'
                        style={{
                            scrollBehavior: 'smooth'
                        }}
                    >
                        {isLoading ? (
                            <div className='flex justify-center items-center h-full'>
                                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff8906]'></div>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className='flex justify-center items-center h-full text-gray-500'>
                                <p>Belum ada pesan. Mulai percakapan!</p>
                            </div>
                        ) : (
                            <div className='space-y-6'>
                                {Object.entries(messageGroups).map(([date, dayMessages]) => (
                                    <div key={date}>
                                        <div className='flex justify-center my-6'>
                                            <span className='bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-600'>
                                                {formatDate(dayMessages[0].timestamp)}
                                            </span>
                                        </div>

                                        <div className='space-y-4'>
                                            {dayMessages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`flex gap-3 items-end ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                                        }`}
                                                >
                                                    <img
                                                        src={msg.avatar}
                                                        alt={`${msg.name} Avatar`}
                                                        className='size-8 object-cover rounded-full flex-shrink-0'
                                                    />

                                                    <div className={`max-w-[70%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                                        <div className={`flex items-center gap-2 mb-1 ${msg.sender === 'user' && 'justify-end'}`}>
                                                            <span className={`text-xs font-medium ${msg.sender === 'user' ? 'text-[#ff8906]' : 'text-gray-600'
                                                                }`}>
                                                                {msg.name}
                                                            </span>
                                                            <span className='text-xs text-gray-400'>
                                                                {formatTime(msg.timestamp)}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={`rounded-2xl px-4 py-3 ${msg.sender === 'user'
                                                                    ? 'bg-[#ff8906] text-white rounded-br-none'
                                                                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                                                }`}
                                                        >
                                                            <p className='text-sm leading-relaxed'>{msg.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </main>
                </section>

                <section className='px-4 pt-4 pb-4 border-t border-gray-200 bg-white'>
                    <form onSubmit={handleSendMessage} className='flex gap-3'>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder='Ketik pesan Anda...'
                            className='border border-gray-300 p-3 text-sm w-full rounded-xl outline-none focus:border-[#ff8906] transition-all'
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || isLoading}
                            className='bg-[#ff8906] hover:bg-[#e67a05] disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl aspect-square h-12 flex items-center justify-center transition-colors duration-200'
                        >
                            <Send strokeWidth={2} size={20} color='white' />
                        </button>
                    </form>
                </section>
            </section>
        </div>
    )
}

export default Chat