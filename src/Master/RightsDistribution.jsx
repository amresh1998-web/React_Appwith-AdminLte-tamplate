import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {fetchRoles,fetchMenuRights, setSelectedRole, updateRights, saveRights} from '../Redux/RightsDistribution';
import DataTableComponent from "../CommonComponents/DataTableComponent";
import '../CommonComponents/Datatable.css';

const RightsDistribution = () => {
  const dispatch = useDispatch();
  // const [roles, setRoles] = useState([]);
  // const [selectedRole, setSelectedRole] = useState("");
  // const [menuRights, setMenuRights] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { roles, selectedRole, menuRights, loading } = useSelector((state) => state.rights);


  // useEffect(() => {
  //   fetchRoles();
  // }, []);

  // const fetchRoles = async () => {
  //   try {
  //     const response = await apiService.get("/role/ComboRole");
  //     setRoles(response.data);
  //   } catch (error) {
  //     console.error("Error fetching roles", error);
  //   }
  // };

  // const fetchMenuRights = async (roleId) => {
  //   setLoading(true);
  //   try {
  //     const response = await apiService.get(`/Menu/GetMenuForRights/${roleId}`);
  //     setMenuRights(Array.isArray(response.data.Table) ? response.data.Table : []);
  //   } catch (error) {
  //     console.error("Error fetching menu rights", error);
  //   }
  //   setLoading(false);
  // };

  // const handleRoleChange = (e) => {
  //   const roleId = e.target.value;
  //   setSelectedRole(roleId);
  //   if (roleId) {
  //     fetchMenuRights(roleId);
  //   } else {
  //     setMenuRights([]);
  //   }
  // };

  // const handleRightsChange = (index, field, value) => {
  //   setMenuRights((prevRights) =>
  //     prevRights.map((menu, i) =>
  //       i === index ? { ...menu, [field]: value ? 1 : 0 } : menu
  //     )
  //   );
  // };

  // const saveRights = async () => {
  //   if (selectedRole === "") {
  //     alert("Please select a role");
  //     return;
  //   }

  //   const rightsData = menuRights.map((menu) => ({
  //     ...menu,
  //     RoleCode: selectedRole,
  //     MenuCode: menu.MENUID,
  //   }));

  //   try {
  //     await apiService.post(`/Role/CreateRoleDetails`, rightsData);
  //     alert("Rights updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating rights", error);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleRoleChange = (e) => {
    const roleId = e.target.value;
    dispatch(setSelectedRole(roleId));
    if (roleId) {
      dispatch(fetchMenuRights(roleId));
    }
  };

  const handleRightsChange = (index, field, value) => {
    dispatch(updateRights({ index, field, value }));
  };

  const handleSaveRights = () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    const rightsData = menuRights.map((menu) => ({
      ...menu,
      RoleCode: selectedRole,
      MenuCode: menu.MENUID,
    }));

    dispatch(saveRights({ roleId: selectedRole, rightsData }));
  };

  const columns = [
    { name: "Menu", selector: (row) => row.MENUNAME, sortable: true },
    { name: "View" ,cell: (row, index) => (
        <input type="checkbox"checked={row.ALLOWVIEW === 1}onChange={(e) => handleRightsChange(index, "ALLOWVIEW", e.target.checked)} />
      ),
      center: true,
    },
    {
      name: "Add",
      cell: (row, index) => (
        <input
          type="checkbox"
          checked={row.ALLOWADD === 1}
          onChange={(e) => handleRightsChange(index, "ALLOWADD", e.target.checked)}
        />
      ),
      center: true,
    },
    {
      name: "Update",
      cell: (row, index) => (
        <input
          type="checkbox"
          checked={row.ALLOWUPDATE === 1}
          onChange={(e) => handleRightsChange(index, "ALLOWUPDATE", e.target.checked)}
        />
      ),
      center: true,
    },
    {
      name: "Delete",
      cell: (row, index) => (
        <input
          type="checkbox"
          checked={row.ALLOWDELETE === 1}
          onChange={(e) => handleRightsChange(index, "ALLOWDELETE", e.target.checked)}
        />
      ),
      center: true,
    },
    {
      name: "Print",
      cell: (row, index) => (
        <input
          type="checkbox"
          checked={row.ALLOWPRINT === 1}
          onChange={(e) => handleRightsChange(index, "ALLOWPRINT", e.target.checked)}
        />
      ),
      center: true,
    },
  ];

  

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <h2 className="text-2xl font-bold mb-4 text-center">Rights Distribution</h2>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <div className="col-md-12">
                  <div className="row">
                    <div className="mb-4 col-md-4">
                      <label className="block font-medium p-2">Role</label>
                      <select
                        className="border p-2 w-full"
                        value={selectedRole}
                        onChange={handleRoleChange}
                      >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                          <option key={role.MASTCODE} value={role.MASTCODE}>
                            {role.MASTNAME}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <button onClick={handleSaveRights} className="btn btn-primary rounded">Save </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <DataTableComponent columns={columns} data={menuRights} progressPending={loading} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RightsDistribution;
