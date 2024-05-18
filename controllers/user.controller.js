async function private(req,res){
    try {
        res.status(200).json({messge:"reached private route"})
    } catch (error) {
        res.status(500).json({messge:"SERVER ERROR"})

        
    }
}




module.exports = {
    private
}