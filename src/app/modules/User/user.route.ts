/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";

import { UserControllers } from "./user.controller";
import { USER_ROLE } from "./user.constant";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",

  UserControllers.createUser
);

router.get("/me", auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getMe);
export const UserRoutes = router;
