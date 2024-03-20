async function private(req,res){
    try {
        console.log("you are loggedIN")
        res.status(200).json({messge:"reached private route"})
    } catch (error) {
        res.status(500).json({messge:"SERVER ERROR"})

    }
}




module.exports = {
    private
}