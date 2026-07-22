import { Router } from "express";

import {
    createDocumentController,
    deleteDocumentController,
    getDocumentByIdController,
    getDocumentsController,
    updateDocumentController,
} from "../controllers/document.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/leave.constnt";



/**
 * @openapi
 * /api/v1/documents:
 *   post:
 *     summary: Create a document
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Document created successfully
 *   get:
 *     summary: Get all documents
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of documents
 * /api/v1/documents/{id}:
 *   get:
 *     summary: Get document by id
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document details
 *   put:
 *     summary: Update a document
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document updated successfully
 *   delete:
 *     summary: Delete a document
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted successfully
 */

const router = Router();

router.use(authenticate);

router.post(
    "/",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    createDocumentController
);

router.get(
    "/",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    getDocumentsController
);

router.get(
    "/:id",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    getDocumentByIdController
);

router.put(
    "/:id",
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    updateDocumentController
);

router.delete(
    "/:id",
    authorize(ROLES.ADMIN),
    deleteDocumentController
);

export default router;