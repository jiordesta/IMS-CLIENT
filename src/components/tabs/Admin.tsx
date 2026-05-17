import { useEffect, useState } from "react";
import { HEADERTYPES } from "../../libs/enums";
import GlobalTable from "../GlobalTable";
import { useDispatch, useSelector } from "react-redux";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import {
  createRole,
  fetchAllRoles,
  fetchRolePermissions,
} from "../../configs/redux/reducers/role";
import {
  createPermission,
  fetchAllPermissions,
} from "../../configs/redux/reducers/permission";

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModal();

  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { permissions, showPermissionsLoading } = useSelector(
    (state: RootState) => state.permission,
  );
  const { roles, showRolesLoading } = useSelector(
    (state: RootState) => state.role,
  );
  const handleCreatePermission = () => {
    const callBack = async (payload: any) => {
      if (!accessToken) return;
      return dispatch(
        createPermission({
          token: accessToken,
          payload: payload,
        }),
      ).then(() => {
        handlePermissionTableRefresh();
      });
    };
    openModal(ModalType.PERMISSION, ModalAction.CREATE, {
      callBack: callBack,
      title: "CREATE PERMISSION",
      success: "Created",
      error: "Failed to create",
    });
  };
  const handlePermissionTableRefresh = () => {
    setRefreshPermissions(!refreshPermissions);
  };

  const handleCreateRoles = () => {
    const callBack = async (payload: any) => {
      if (!accessToken) return;
      return dispatch(
        createRole({
          token: accessToken,
          payload: payload,
        }),
      ).then(() => {
        handleRolesTableRefresh();
      });
    };
    openModal(ModalType.ROLE, ModalAction.CREATE, {
      callBack: callBack,
      title: "CREATE ROLE",
      success: "Created",
      error: "Failed to create",
    });
  };
  const handleRolesTableRefresh = () => {
    setRefreshRoles(!refreshRoles);
  };
  //PERMISSIONS
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [isSelectedAllPermissions, setIsSelectedAllPermissions] =
    useState(false);
  const [refreshPermissions, setRefreshPermissions] = useState(false);

  const handleSelectPermission = (permissionId: number) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(
        selectedPermissions.filter((i) => i !== permissionId),
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchAllPermissions({ token: accessToken }));
  }, [refreshPermissions]);

  useEffect(() => {
    if (isSelectedAllPermissions) {
      setSelectedPermissions(permissions.map((item) => item.id));
    } else {
      setSelectedPermissions([]);
    }
  }, [isSelectedAllPermissions, refreshPermissions]);

  const permissionHeaders = [
    {
      label: "",
      dkey: "",
      type: HEADERTYPES.CHECKBOX,
      itemRenderer: (deliveryId: number) => (
        <input
          type="checkbox"
          className="rounded-full cursor-pointer"
          checked={selectedPermissions.includes(deliveryId)}
          onChange={() => handleSelectPermission(deliveryId)}
        />
      ),
      headerRenderer: () => (
        <input
          type="checkbox"
          className="rounded-full cursor-pointer"
          checked={isSelectedAllPermissions}
          onChange={() =>
            setIsSelectedAllPermissions(!isSelectedAllPermissions)
          }
        />
      ),
      col: 1,
    },
    {
      label: "Permission",
      dkey: "permission",
      col: 4,
    },
  ];

  /// ROLES
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [isSelectedAllRoles, setIsSelectedAllRoles] = useState(false);
  const [refreshRoles, setRefreshRoles] = useState(false);

  const handleSelectRole = (productId: number) => {
    if (selectedRoles.includes(productId)) {
      setSelectedRoles(selectedRoles.filter((i) => i !== productId));
    } else {
      setSelectedRoles([...selectedRoles, productId]);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchAllRoles({ token: accessToken }));
  }, [refreshRoles]);

  useEffect(() => {
    if (isSelectedAllRoles) {
      setSelectedRoles(roles.map((role) => role.id));
    } else {
      setSelectedRoles([]);
    }
  }, [isSelectedAllRoles, refreshRoles]);

  const handleDisplayRolePermissions = (roleId: number) => {
    const role = roles.find((item) => item.id === roleId);

    const displayHeaders = [
      {
        label: "Permissions",
        dkey: "permission",
        col: 8,
      },
    ];

    const apiCall = () => {
      if (!accessToken) return;

      return dispatch(
        fetchRolePermissions({
          token: accessToken,
          payload: {},
          id: roleId,
        }),
      )
        .unwrap()
        .then((res) => {
          setRefreshRoles((prev) => !prev);
          return res;
        });
    };

    openModal(ModalType.DISPLAY, ModalAction.DISPLAY, {
      items: [],
      displayHeaders: displayHeaders,
      title: `${role?.role} Permissions`,
      apiCall: apiCall,
    });
  };

  const roleHeaders = [
    {
      label: "",
      dkey: "",
      type: HEADERTYPES.CHECKBOX,
      itemRenderer: (deliveryId: number) => (
        <input
          type="checkbox"
          className="rounded-full cursor-pointer"
          checked={selectedRoles.includes(deliveryId)}
          onChange={() => handleSelectRole(deliveryId)}
        />
      ),
      headerRenderer: () => (
        <input
          type="checkbox"
          className="rounded-full cursor-pointer"
          checked={isSelectedAllRoles}
          onChange={() => setIsSelectedAllRoles(!isSelectedAllRoles)}
        />
      ),
      col: 1,
    },
    {
      label: "Role",
      dkey: "role",
      col: 4,
    },
    {
      label: "",
      dkey: "permissions",
      col: 2,
      type: HEADERTYPES.SHOW,
      displayItemsRenderer: (roleId: number) => (
        <button
          className="cursor-pointer"
          onClick={() => handleDisplayRolePermissions(roleId)}
        >
          <img src="/icons/showlist.svg" width={18} alt="" />
        </button>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
      <GlobalTable
        data={roles}
        add={handleCreateRoles}
        headers={roleHeaders}
        refresh={handleRolesTableRefresh}
        isLoading={showRolesLoading}
      />
      <GlobalTable
        data={permissions}
        add={handleCreatePermission}
        headers={permissionHeaders}
        refresh={handlePermissionTableRefresh}
        isLoading={showPermissionsLoading}
      />
    </div>
  );
}
