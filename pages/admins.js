import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Admins({ swal }) {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  function fetchAdmins() {
    axios.get("/api/admins").then((result) => {
      setAdmins(result.data);
      console.log(admins);
    });
  }

  async function saveAdmin(ev) {
    ev.preventDefault();
    const data = { adminName, adminEmail };
    await axios.post("/api/admins", data);
    setAdminName("");
    setAdminEmail("");
    fetchAdmins();
  }

  function deleteAdmin(admin) {
    swal
      .fire({
        title: "Are you sure",
        text: `Do you want to delete ${admin.adminName}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes Delete",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = admin;
          await axios.delete("/api/admins?_id=" + _id);
          fetchAdmins();
        }
      });
  }

  return (
    <Layout>
      <h1>Admins</h1>
      <label>Add new Admin</label>

      <form onSubmit={saveAdmin}>
        <div className="flex gap-1">
          <input
            type="text"
            onChange={(ev) => setAdminName(ev.target.value)}
            value={adminName}
            placeholder="Admin name"
          />
          <input
            type="email"
            onChange={(ev) => setAdminEmail(ev.target.value)}
            value={adminEmail}
            placeholder="Admin email"
          />
        </div>
        <button type="submit" className="btn-primary py-1 ">
          save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Admin Name</td>
            <td>Admin Email</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {admins.length > 0 &&
            admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.adminName}</td>
                <td>{admin.adminEmail}</td>
                <td>
                  <button
                    onClick={() => deleteAdmin(admin)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Admins swal={swal} />);
