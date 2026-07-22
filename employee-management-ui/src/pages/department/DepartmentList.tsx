import { Link } from "react-router-dom";

import {
  useGetDepartmentsQuery,
  useDeleteDepartmentMutation,
} from "../../features/department/departmentApi";

const DepartmentList = () => {
  const { data, isLoading, isError } = useGetDepartmentsQuery();

  const [deleteDepartment, { isLoading: isDeleting }] =
    useDeleteDepartmentMutation();

  if (isLoading) {
    return (
      <div
        className="
                p-6
            "
      >
        <div
          className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                "
        >
          Loading departments...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
                p-6
            "
      >
        <div
          className="
                    bg-red-50
                    text-red-600
                    rounded-xl
                    p-5
                "
        >
          Failed to load departments
        </div>
      </div>
    );
  }

  const departments = data?.data || [];

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this department?")) return;

    try {
      await deleteDepartment(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
            p-6
            space-y-6
        "
    >
      {/* Header */}

      <div
        className="
                flex
                justify-between
                items-center
                bg-white
                rounded-2xl
                shadow-sm
                p-6
            "
      >
        <div>
          <h1
            className="
                        text-3xl
                        font-bold
                        text-slate-800
                    "
          >
            Departments
          </h1>

          <p
            className="
                        text-slate-500
                        mt-1
                    "
          >
            Manage company departments
          </p>
        </div>

        <Link
          to="/dashboard/departments/create"

          className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    font-medium
                    shadow
                    transition
                    "
        >
          + Add Department
        </Link>
      </div>

      {/* Table Card */}

      <div
        className="
                bg-white
                rounded-2xl
                shadow-sm
                overflow-hidden
            "
      >
        <div
          className="
                    overflow-x-auto
                "
        >
          <table
            className="
                    w-full
                    text-left
                "
          >
            <thead>
              <tr
                className="
                            bg-slate-100
                            text-slate-600
                            text-sm
                        "
              >
                <th className="px-6 py-4">Name</th>

                <th className="px-6 py-4">Code</th>

                <th className="px-6 py-4">Description</th>

                <th className="px-6 py-4">Status</th>

                <th className="px-6 py-4">Manager</th>

                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="
                            text-center
                            py-10
                            text-slate-500
                            "
                  >
                    No departments found
                  </td>
                </tr>
              ) : (
                departments.map((department) => (
                  <tr
                    key={department._id}

                    className="
                            border-t
                            hover:bg-slate-50
                            transition
                            "
                  >
                    <td
                      className="
                                    px-6
                                    py-4
                                    font-semibold
                                    text-slate-800
                                "
                    >
                      {department.name}
                    </td>

                    <td
                      className="
                                    px-6
                                    py-4
                                "
                    >
                      <span
                        className="
                                    bg-blue-100
                                    text-blue-700
                                    px-3
                                    py-1
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    "
                      >
                        {department.code}
                      </span>
                    </td>

                    <td
                      className="
                                    px-6
                                    py-4
                                    text-slate-500
                                    max-w-xs
                                "
                    >
                      {department.description || "-"}
                    </td>

                    <td
                      className="
                                    px-6
                                    py-4
                                "
                    >
                      <span
                        className={`
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-medium

                                    ${
                                      department.status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }

                                    `}
                      >
                        {department.status}
                      </span>
                    </td>

                    <td
                      className="
                                    px-6
                                    py-4
                                "
                    >
                      {department.manager ? (
                        <div>
                          <p
                            className="
                                    font-medium
                                    "
                          >
                            {department.manager.firstName}{" "}
                            {department.manager.lastName}
                          </p>
                        </div>
                      ) : (
                        <span
                          className="
                                    text-slate-400
                                    "
                        >
                          Not Assigned
                        </span>
                      )}
                    </td>

                    <td
                      className="
                                    px-6
                                    py-4
                                "
                    >
                      <div
                        className="
                                        flex
                                        justify-center
                                        gap-3
                                    "
                      >
                        <Link
                          to={`/dashboard/departments/${department._id}/edit`}

                          className="
                                    bg-amber-500
                                    hover:bg-amber-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    text-sm
                                    "
                        >
                          Edit
                        </Link>

                        <button
                          disabled={isDeleting}

                          onClick={() => handleDelete(department._id)}

                          className="
                                    bg-red-500
                                    hover:bg-red-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    text-sm
                                    disabled:opacity-50
                                    "
                        >
                          {isDeleting ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
