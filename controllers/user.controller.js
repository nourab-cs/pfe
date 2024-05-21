async function private(req, res) {
    try {
        res.status(200).json({ messge: "reached private route" })
    } catch (error) {
        res.status(500).json({ messge: "SERVER ERROR" })


    }
}
const User = require("../models/user.model")
const cloudinary = require("cloudinary").v2;

async function updateProfile(req, res) {
    try {
        require("../database");
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_KEY,
            api_secret: process.env.CLOUD_SECRET,
            secure: true,
        });
        let body = { username: req.body.username }

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                req.body.img,
                { folder: "images", resource_type: "auto" },
                async function (error, result) {
                    if (error) {
                        console.log(error);
                        reject(error);
                        return res.status(500).json({ messsage: " error while updating profile " })

                    }
                    body.avatar = { url: result.secure_url, public_id: result.public_id }
                    console.log(body)
                    const user = await User.findByIdAndUpdate(req.query.id, body, { new: true })
                    console.log(user);
                    resolve(result);
                    return res.status(200).json(user)

                }
            );
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ messge: "SERVER ERROR" })


    }
}

module.exports = {
    private, updateProfile
}