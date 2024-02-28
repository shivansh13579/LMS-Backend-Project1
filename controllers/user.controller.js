import User from "../../server1/models/user.model";
import AppError from "../utils/error.util";

const register = async (req,res,next) => {
    const {fullName,email,password} = req.body;

    if(!fullName || !email || !password) {
        return next(new AppError("All fields are required", 400));
    }

    const userExist = await User.findOne({email});

    if(userExist) {
        return next(new AppError('Email already exist', 400));
    }

    const user = await User.create({
        fullName,
        password,
        email,
        avatar: {
            public_id: email,
            secure_url: "https://images.pexels.com/photos/12590401/pexels-photo-12590401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    });

    if(!user) {
        return next(new AppError('User registration failed, please try again', 400))
    }

    //TODO: File upload

    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken();

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
    })
};

const login = (req,res) => {

};

const logout = (req,res) => {

};

const getProfile = (req,res) => {

}

export {
    register,
    login,
    logout,
    getProfile
}