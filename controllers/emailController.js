const asyncHandler = require("express-async-handler")
const sendEmail = require('./../utils/email')

//@desc send email
//@route /api/users/sendemail
//@access still not setup
const sendMessage = asyncHandler(async(req, res)=>{
    try {
        await sendEmail({
           email: 'arifur15-2111@diu.edu.bd',
           subject: 'Just a message',
           message: 'Just a message' 
        })
        res.status(200).json({message: 'sent successfully'})
    } catch (error) {
        res.status(401)
        throw new Error(error)
        
    }
})

module.exports = {
    sendMessage,
}