import { Request, Response } from "express";


import {
    getProfileService,
    updateProfileService,
    uploadProfilePictureService,
    changePasswordService
}
    from "../services/profile.service";




// GET PROFILE

export const getProfile =
    async (
        req: Request,
        res: Response
    ) => {


        const user =
            await getProfileService(
                req.user!.id
            );



        res.status(200).json({

            success: true,

            data: user

        });


    };




// UPDATE PROFILE

export const updateProfile =
    async (
        req: Request,
        res: Response
    ) => {


        const user =
            await updateProfileService(
                req.user!.id,
                req.body
            );



        res.status(200).json({

            success: true,

            message:
                "Profile updated successfully",

            data: user

        });


    };




// UPLOAD PROFILE IMAGE

export const uploadProfilePicture =
    async (
        req: Request,
        res: Response
    ) => {


        const image =
            req.file?.path;



        if (!image) {

            res.status(400).json({

                success: false,

                message:
                    "Image required"

            });

            return;

        }



        const user =
            await uploadProfilePictureService(
                req.user!.id,
                image
            );



        res.status(200).json({

            success: true,

            message:
                "Profile picture uploaded",

            data: user

        });


    };




// CHANGE PASSWORD

export const changePassword =
    async (
        req: Request,
        res: Response
    ) => {


        const {
            currentPassword,
            newPassword
        }
            =
            req.body;



        await changePasswordService(
            req.user!.id,
            currentPassword,
            newPassword
        );



        res.status(200).json({

            success: true,

            message:
                "Password changed successfully"

        });


    };