import Sidebar from "../../components/adminCompenents/Sidebar";

const AdminPage = () => {

  const token = localStorage.getItem("token");
  // console.log(token)
  return (
    <Sidebar>
      <div>Wellcome to Admin Page!</div>
    </Sidebar>
  );
};

export default AdminPage;
