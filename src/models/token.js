import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    token: { type: "String", unique: true, required: true },
  },
  { timestamps: true }
);

const Token = mongoose.models.Token || mongoose.model("Token", tokenSchema);

export default Token;