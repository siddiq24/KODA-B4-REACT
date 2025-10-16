import { toast } from "react-toastify"

// === Regex Patterns ===
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/

/**
 * Validasi email
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
    if (!email) {
        toast("Email is required", {type:'warning', theme:'dark'})
        return false
    }

    if (!emailRegex.test(email)) {
        toast("Please enter a valid email address", {type:'warning', theme:'dark'})
        return false
    }

    return true
}

/**
 * Validasi password
 * @param {string} password
 * @returns {boolean}
 */
export function validatePassword(password) {
    if (!password) {
        toast("Password is required", {type:'warning', theme:'dark'})
        return false
    }

    if (!passwordRegex.test(password)) {
        toast(
            `Password must be at least 8 characters,\ncontain uppercase,\nlowercase,\nand a number`, {type:'warning', theme:'dark'})
        return false
    }

    return true
}
