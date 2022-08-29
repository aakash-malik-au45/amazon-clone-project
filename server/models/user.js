const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, name: this.name, isAdmin: this.isAdmin },
		process.env.JWTPRIVATEKEY,
		{ expiresIn: "7d" }
	);
	return token;
};

const validate = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(10).required(),
		email: Joi.string().email().required(),
		password: passwordComplexity().required(),
	});
	return schema.validate(user);
};
const signUP = ("/",(req,res) => {
	let path  = path.join(__dirname,"../");
	res.sendfile(`${path}public/index.html`)
})

const User = mongoose.model("user", userSchema);

module.exports = { User, validate ,signUP};
