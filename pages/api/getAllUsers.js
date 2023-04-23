// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import user from "../../models/Usersmodel";
import connectDB from "../../middleware/mongoose";
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const allUsers = await user.find();
      res.status(200).json({ success: false, allUsers });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: "Internal Error Occurred" });
    }
  } else {
    res.status(400).json({ error: "not allowed" });
  }
};

export default connectDB(handler);
