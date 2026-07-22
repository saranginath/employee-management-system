import { Router } from "express";
import {
  createRecruitmentController,
  deleteRecruitmentController,
  getRecruitmentByIdController,
  getRecruitmentController,
  updateRecruitmentController,
} from "../controllers/recruitment.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleare";
import { ROLES } from "../constants/leave.constnt";

/**
 * @openapi
 * /api/v1/recruitment:
 *   post:
 *     summary: Create a recruitment entry
 *     tags: [Recruitment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recruitment entry created successfully
 *   get:
 *     summary: Get all recruitment entries
 *     tags: [Recruitment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recruitment entries
 * /api/v1/recruitment/{id}:
 *   get:
 *     summary: Get recruitment entry by id
 *     tags: [Recruitment]
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
 *         description: Recruitment details
 *   put:
 *     summary: Update recruitment entry
 *     tags: [Recruitment]
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
 *         description: Recruitment updated successfully
 *   delete:
 *     summary: Delete recruitment entry
 *     tags: [Recruitment]
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
 *         description: Recruitment entry deleted successfully
 */

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  createRecruitmentController,
);

router.get(
  "/",
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
  getRecruitmentController,
);

router.get(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
  getRecruitmentByIdController,
);

router.put(
  "/:id",
  authorize(ROLES.ADMIN, ROLES.MANAGER),
  updateRecruitmentController,
);

router.delete("/:id", authorize(ROLES.ADMIN), deleteRecruitmentController);

export default router;
