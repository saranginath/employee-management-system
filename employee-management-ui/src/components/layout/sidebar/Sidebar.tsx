import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FiGrid } from "react-icons/fi";
import { adminMenu } from "./AdminMenu";
import { managerMenu } from "./ManagerMenu";
import { employeeMenu } from "./EmployeeMenu";
import type { RootState } from "../../../api/store";

export default function Sidebar() {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  const menu =
    user?.role === "admin"
      ? adminMenu
      : user?.role === "manager"
        ? managerMenu
        : employeeMenu;

  return (
    <aside
      className="
                fixed
                top-16
                left-0
                h-[calc(100vh-4rem)]
                w-72
                border-r
                border-slate-200
                shadow-xl
                backdrop-blur-lg
                overflow-hidden
                flex
                flex-col
            "
    >
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-6">
        <div className="flex items-center gap-4">
          <div
            className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-blue-700
                            shadow-lg
                        "
          >
            <FiGrid size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800"></h2>

            <p className="text-2xl text-slate-500 capitalize ">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Navigation
        </p>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                                    group
                                    relative
                                    flex
                                    items-center
                                    gap-4
                                    rounded-2xl
                                    px-4
                                    py-3.5
                                    font-medium
                                    transition-all
                                    duration-300

                                    ${
                                      isActive
                                        ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                                        : "text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-md hover:translate-x-1"
                                    }
                    `
                }
              >
                <Icon
                  size={21}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
