import mongoose, { model, models, Schema } from "mongoose";

const AdminSchema = new Schema({
  adminName: { type: String, required: true },
  adminEmail: {
    type: String,
    unique: true,
    required: true,
  },
});

export const Admin = models?.Admin || model("Admin", AdminSchema);
