import { Send, Paperclip, Smile, X, Minimize2, Clock, Check, CheckCheck, Bot, User } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'

const mockMessages = [
    {
        id: 1,
        sender: 'admin',
        name: 'Coffee Specialist',
        role: 'Support Team',
        message: 'Halo! Selamat datang di Coffee Shop kami. Ada yang bisa saya bantu? ☕',
        timestamp: '2024-01-15T10:30:00Z',
        avatar: '/testi1.jpg',
        status: 'read'
    },
    {
        id: 2,
        sender: 'user',
        name: 'Anda',
        role: 'Customer',
        message: 'Halo admin, saya ingin menanyakan tentang menu kopi yang tersedia hari ini.',
        timestamp: '2024-01-15T10:32:00Z',
        avatar: '/user-avatar.jpg',
        status: 'read'
    },
    {
        id: 3,
        sender: 'admin',
        name: 'Coffee Specialist',
        role: 'Support Team',
        message: 'Tentu saja! Hari ini kami memiliki special blend dari Brazil dan Ethiopia. Juga ada promo untuk hazelnut latte! 🎉',
        timestamp: '2024-01-15T10:33:00Z',
        avatar: '/testi1.jpg',
        status: 'read'
    },
    {
        id: 4,
        sender: 'user',
        name: 'Anda',
        role: 'Customer',
        message: 'Wah menarik! Bisa tolong berikan detail harga untuk hazelnut latte?',
        timestamp: '2024-01-15T10:35:00Z',
        avatar: '/user-avatar.jpg',
        status: 'read'
    },
    {
        id: 5,
        sender: 'admin',
        name: 'Coffee Specialist',
        role: 'Support Team',
        message: 'Hazelnut latte kami harga IDR 25.000. Untuk hari ini ada diskon 10% jika order melalui chat ini! ✨',
        timestamp: '2024-01-15T10:36:00Z',
        avatar: '/testi1.jpg',
        status: 'read'
    }
]

const quickReplies = [
    "Menu hari ini apa?",
    "Ada promo khusus?",
    "Jam buka sampai kapan?",
    "Bisa delivery?",
    "Recommendasi kopi"
]

const fetchMessagesFromDB = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockMessages)
        }, 800)
    })
}

const saveMessageToDB = async (message) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newMessage = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                status: 'sent',
                ...message
            }
            resolve(newMessage)
        }, 500)
    })
}

function Chat({ isOpen = false, onClose }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isTyping, setIsTyping] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const messagesEndRef = useRef(null)
    const chatContainerRef = useRef(null)
    const inputRef = useRef(null)

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

        if (isOpen) {
            loadMessages()
        }
    }, [isOpen])

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 300)
        }
    }, [isOpen])

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
            avatar: '/user-avatar.jpg',
            status: 'sent'
        }

        try {
            const savedMessage = await saveMessageToDB(userMessage)
            setMessages(prev => [...prev, savedMessage])
            setNewMessage('')
            setIsTyping(true)

            // Simulate admin typing
            setTimeout(async () => {
                const adminReplies = [
                    "Terima kasih atas pesannya! Apakah ada hal lain yang bisa saya bantu? 😊",
                    "Saya siap membantu Anda dengan informasi lebih lanjut!",
                    "Ada menu lain yang ingin Anda tanyakan?",
                    "Jangan ragu untuk bertanya lebih banyak! ☕"
                ]

                const randomReply = adminReplies[Math.floor(Math.random() * adminReplies.length)]

                const adminMessage = {
                    sender: 'admin',
                    name: 'Coffee Specialist',
                    role: 'Support Team',
                    message: randomReply,
                    avatar: '/testi1.jpg',
                    status: 'read'
                }

                const savedReply = await saveMessageToDB(adminMessage)
                setMessages(prev => [...prev, savedReply])
                setIsTyping(false)
            }, 2000)

        } catch (error) {
            console.error('Error sending message:', error)
            setIsTyping(false)
        }
    }

    const handleQuickReply = (reply) => {
        setNewMessage(reply)
        inputRef.current?.focus()
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
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (date.toDateString() === today.toDateString()) {
            return 'Hari Ini'
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Kemarin'
        } else {
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        }
    }

    const getStatusIcon = (status, isUser) => {
        if (!isUser) return null

        switch (status) {
            case 'sent':
                return <Check size={14} className="text-gray-400" />
            case 'delivered':
                return <CheckCheck size={14} className="text-gray-400" />
            case 'read':
                return <CheckCheck size={14} className="text-blue-500" />
            default:
                return <Clock size={14} className="text-gray-400" />
        }
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

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 md:inset-auto md:absolute md:right-6 md:bottom-24 z-100 flex items-end justify-end p-4 md:p-0">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 md:hidden"
                onClick={onClose}
            ></div>

            {/* Chat Container */}
            <section className={`
                relative bg-white rounded-3xl shadow-2xl w-full md:w-96 h-[85vh] md:h-[500px]
                flex flex-col overflow-hidden border border-gray-200
                transform transition-all duration-300
                ${isMinimized ? 'h-16 md:h-14' : 'animate-in fade-in-90 slide-in-from-bottom-10'}
            `}>
                {/* Header */}
                <div className="bg-gradient-to-r from-[#ff8906] to-orange-500 p-4 relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img
                                    src="/testi1.jpg"
                                    alt="Admin Avatar"
                                    className='w-10 h-10 object-cover rounded-full border-2 border-white shadow-lg'
                                />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='text-white font-bold text-lg'>Coffee Support</h2>
                                <div className="flex items-center gap-1">
                                    <div className='w-2 h-2 bg-green-300 rounded-full animate-pulse'></div>
                                    <h3 className='text-white/90 text-sm'>Online • Membalas segera</h3>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <Minimize2 size={16} />
                            </button>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {!isMinimized && (
                    <>
                        {/* Messages Area */}
                        <section className="flex-1 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                            <main
                                ref={chatContainerRef}
                                className="h-full overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[#ff8906]/20 scrollbar-track-transparent px-4"
                                style={{ scrollBehavior: 'smooth' }}
                            >
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                                        <div className="flex space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div
                                                    key={i}
                                                    className="w-3 h-3 bg-[#ff8906] rounded-full animate-bounce"
                                                    style={{ animationDelay: `${i * 0.1}s` }}
                                                ></div>
                                            ))}
                                        </div>
                                        <p className="text-gray-500 text-sm">Memuat percakapan...</p>
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-[#ff8906] to-orange-500 rounded-2xl flex items-center justify-center">
                                            <Bot size={32} color="white" />
                                        </div>
                                        <p className="text-center max-w-xs">
                                            Mulai percakapan dengan tim support kami! 🚀
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {Object.entries(messageGroups).map(([date, dayMessages]) => (
                                            <div key={date}>
                                                <div className="flex justify-center my-6">
                                                    <span className="bg-white px-4 py-2 rounded-full text-xs text-gray-500 border shadow-sm">
                                                        {formatDate(dayMessages[0].timestamp)}
                                                    </span>
                                                </div>

                                                <div className="space-y-4">
                                                    {dayMessages.map((msg) => (
                                                        <div
                                                            key={msg.id}
                                                            className={`flex gap-3 items-start group ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                                                }`}
                                                        >
                                                            <div className="relative">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user'
                                                                    ? 'bg-gradient-to-r from-[#ff8906] to-orange-500'
                                                                    : 'bg-gray-200'
                                                                    }`}>
                                                                    {msg.sender === 'user' ? (
                                                                        <User size={16} color="white" />
                                                                    ) : (
                                                                        <Bot size={16} color="#666" />
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className={`max-w-[80%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'
                                                                }`}>
                                                                <div className={`flex items-center gap-2 mb-1 ${msg.sender === 'user' && 'flex-row-reverse'
                                                                    }`}>
                                                                    <span className={`text-xs font-semibold ${msg.sender === 'user' ? 'text-[#ff8906]' : 'text-gray-600'
                                                                        }`}>
                                                                        {msg.name}
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={`rounded-2xl px-4 py-3 relative ${msg.sender === 'user'
                                                                        ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 text-white rounded-br-none shadow-lg'
                                                                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200 shadow-sm'
                                                                        }`}
                                                                >
                                                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                                        {msg.message}
                                                                    </p>
                                                                </div>
                                                                <div className={`flex items-center gap-2 mt-1 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                                                    }`}>
                                                                    <span className="text-xs text-gray-400">
                                                                        {formatTime(msg.timestamp)}
                                                                    </span>
                                                                    {getStatusIcon(msg.status, msg.sender === 'user')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Typing Indicator */}
                                        {isTyping && (
                                            <div className="flex gap-3 items-start">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <Bot size={16} color="#666" />
                                                </div>
                                                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </main>
                        </section>

                        {/* Quick Replies */}
                        {messages.length > 0 && !isLoading && (
                            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {quickReplies.map((reply, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickReply(reply)}
                                            className="flex-shrink-0 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-full text-sm hover:bg-gray-100 hover:border-gray-400 transition-colors whitespace-nowrap"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <section className="border-t border-gray-200 bg-white p-4">
                            <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        <Paperclip size={20} />
                                    </button>
                                    <button
                                        type="button"
                                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        <Smile size={20} />
                                    </button>
                                </div>

                                <div className="flex-1 relative">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Ketik pesan Anda..."
                                        className="w-full border border-gray-300 p-3 text-sm rounded-xl outline-none focus:border-[#ff8906] focus:ring-2 focus:ring-[#ff8906]/20 transition-all pr-12 resize-none"
                                        rows="1"
                                        disabled={isLoading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!newMessage.trim() || isLoading}
                                    className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${newMessage.trim()
                                        ? 'bg-gradient-to-r from-[#ff8906] to-orange-500 hover:shadow-lg transform hover:scale-105'
                                        : 'bg-gray-200 cursor-not-allowed'
                                        }`}
                                >
                                    <Send
                                        size={20}
                                        color={newMessage.trim() ? 'white' : 'gray'}
                                    />
                                </button>
                            </form>
                        </section>
                    </>
                )}
            </section>
        </div>
    )
}

export default Chat