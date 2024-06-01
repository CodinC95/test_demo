module.exports.messageError = Object.freeze({
    error_email: "Email is in wrong format",
    error_password:"'Password must be between 0 and 10 characters",
    user_exist:"User already exists",
    login_error: "Invalid credentials",
    server_error:"Server Error"
})

module.exports.userInterface = Object.freeze({
    email:"email",
    firstName:"firstName",
    lastName:"lastName",
    password:"password"
})

module.exports.Flag = Object.freeze({
    OK:"SUCCESS",
    ERROR:"ERROR"
})