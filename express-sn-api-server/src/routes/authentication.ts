import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import authenticationController from "../controllers/authenticationController";
dotenv.config();

const router = express.Router();
const upload = multer();

/*-------------------- AUTHENTICATION API START ---------------*/

/**
 * @swagger
 * /validateuser:
 *   post:
 *     summary: validate user with email
 *     description: validates a user and checks if a user with the specified email exists in the sys_users table.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: gt.tester@test.com
 *     responses:
 *       200:
 *         description: success response with sys_id of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: error status from the API
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: message explaining details from the response
 *                   example: successfully retrieved sys_id for gt.tester@test.com
 *                 data:
 *                   type: string
 *                   description: sys_id of the user retrieved from the specified email
 *                   example: 280ff2a097352110bb0cb0efe153af04
 *       400:
 *         description: malformed body response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: error status from the API
 *                 message:
 *                   type: string
 *                   description: message explaining details from the response
 *                   example: Missing mandatory fields
 *                 data:
 *                   type: string
 *                   description: sys_id of the user retrieved from the specified email
 *                   example: ''
 *       404:
 *         description: user not found response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   description: error status from the API
 *                 message:
 *                   type: string
 *                   description: message explaining details from the response
 *                   example: successfully retrieved sys_id for gt.tester@test.com
 *                 data:
 *                   type: string
 *                   description: user with gt.tester@test.com not found!
 *                   example: ''
 *
 */
router.post("/validateuser", upload.none(), authenticationController.validateUser);

export default router;
