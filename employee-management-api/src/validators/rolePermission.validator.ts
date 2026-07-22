import { z } from "zod";


export const createRolePermissionSchema = z.object({

    role: z.string()
        .min(3)
        .lowercase(),

    permissions: z.array(
        z.string()
    )
        .min(1),


    description: z.string()
        .optional()

});



export const updateRolePermissionSchema =
    createRolePermissionSchema.partial();