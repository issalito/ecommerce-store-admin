import { mongooseConnect } from "@/lib/mongoose";
import { Admin } from "@/models/Admin";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "POST") {
    const { adminName, adminEmail } = req.body;
    const adminDoc = await Admin.create({
      adminName,
      adminEmail,
    });
    res.json(adminDoc);
  }

  if (method === "GET") {
    res.json(await Admin.find());
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Admin.deleteOne({ _id });
    res.json("ok");
  }
}
