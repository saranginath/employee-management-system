import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model"

export const findUserByEmail = async (email: string) => {
    return User.findOne({
        email
    }).select("+password");
}

export const createUser = async (data: IUser) => {
    console.log(data)
    return User.create(data);
}

export const updateRefreshToken = async (userId: string, refreshToken: string) => {
    return User.findByIdAndUpdate(
        userId,
        {
            refreshToken
        }, {
        new: true
    }
    )
};

export const findUserById = async (id: string) => {
    return await User.findById(id).select("+password");
}

export const removeRefreshToken = async (id: string) => {
    return await User.findByIdAndUpdate(id, {
        refreshToken: null
    }, {
        new: true
    })
}

export const updateChangePassword = async (userId: string, newPassword: string) => {
    return User.findByIdAndUpdate(userId, {
        password: newPassword
    }, {
        new: true
    })
}