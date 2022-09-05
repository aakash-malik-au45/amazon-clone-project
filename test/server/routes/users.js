const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validObjectId");
const path = require("path");
let pat = path.join(__dirname, "../");
const Post = require("../models/post");
const Comment = require("../models/comments")

//const upload = require("./image/img");


const sigNUP = (req, res) => {
    res.sendFile(`${pat}public/signup.html`)
}

router.get("/", sigNUP)


// create user
router.post("/signup", async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
        return res
            .status(403)
            .send({ message: "User with given email already Exist!" });
    //f
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let newUser = await new User({
        ...req.body,
        password: hashPassword,
    }).save();
    //f
    newUser.password = undefined;
    newUser.__v = undefined;
    res
        .status(200)
        .send({ data: newUser, message: "Account created successfully" });

});


//router.post('/file/upload', upload.single('file'), uploadImage);
//router.get('/file/:filename', getImage);


module.exports = router;