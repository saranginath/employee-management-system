import User from "../models/user.model";


// Get user profile

export const getUserProfileRepo = async (
    userId: string
) => {

    return User
        .findById(userId)
        .select("-password -refreshToken");

};



// Update profile

export const updateUserProfileRepo = async (
    userId: string,
    data: Partial<any>
) => {

    return User.findByIdAndUpdate(
        userId,
        data,
        {
            new: true,
            runValidators: true
        }
    )
        .select("-password -refreshToken");

};



// Update profile picture

export const updateProfilePictureRepo = async (
    userId: string,
    imagePath: string
) => {

    return User.findByIdAndUpdate(
        userId,
        {
            profilePicture: imagePath
        },
        {
            new: true
        }
    )
        .select("-password -refreshToken");

};



// Find user with password

export const findUserWithPasswordRepo = async (
    userId: string
) => {


    return User
        .findById(userId)
        .select("+password");


};



// Update password

export const updatePasswordRepo = async (
    userId: string,
    password: string
) => {


    return User.findByIdAndUpdate(
        userId,
        {
            password
        },
        {
            new: true
        }
    );


};