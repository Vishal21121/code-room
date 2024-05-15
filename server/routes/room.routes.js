import express from "express";
import {
  adminUpdateValidator,
  roomCreateValidator,
  roomJoinValidator,
} from "../validators/room.validator.js";
import { validation } from "../middleware/validate.middlewares.js";
import {
  createRoom,
  joinRoom,
  updateCode,
  getCode,
  getRoomsWithUser,
  updateAdmin,
  createFolderWithRoomName,
} from "../controllers/room.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();

router
  .route("/create-room")
  .post(verifyJWT, roomCreateValidator(), validation, createRoom);
router
  .route("/join-room")
  .post(verifyJWT, roomJoinValidator(), validation, joinRoom);
router.route("/update-code").patch(verifyJWT, updateCode);
router.route("/get-code").get(verifyJWT, getCode);
router.route("/get-rooms").get(verifyJWT, getRoomsWithUser);
router
  .route("/update-admin")
  .patch(verifyJWT, adminUpdateValidator(), validation, updateAdmin);
router.route("/create-room-folder").post(verifyJWT, createFolderWithRoomName);

export default router;
