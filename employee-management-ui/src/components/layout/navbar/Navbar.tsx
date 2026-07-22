import {
    FiBell,
    FiChevronDown,
    FiLock,
    FiLogOut,
    FiSearch,
    FiUser,
} from "react-icons/fi";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../features/auth/authSlice";
import { useLogoutMutation } from "../../../features/auth/authApi";
import { useGetProfileQuery } from "../../../features/profile/profileApi";

function Navbar() {
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutUser, { isLoading }] = useLogoutMutation();
    const {
        data: profileData,
        refetch
    } = useGetProfileQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const profile = profileData?.data;

    const fullName =
        `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim();

    const initials = `${profile?.firstName?.[0] ?? ""}${profile?.lastName?.[0] ?? ""
        }`.toUpperCase();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();

            dispatch(logout());

            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header
            className="
                fixed
                top-0
                left-0
                right-0
                z-50
                h-16
                border-b
                border-slate-200
                bg-white/90
                backdrop-blur-md
                shadow-sm
            "
        >
            <div className="mx-auto flex h-full items-center justify-between px-6">
                {/* Left */}

                <div className="flex w-64 items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow">
                        EMS
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-slate-800">
                            EMS
                        </h1>

                        <p className="text-xs text-slate-500">
                            Employee Management
                        </p>
                    </div>
                </div>

                {/* Search */}

                <div className="hidden flex-1 justify-center px-10 lg:flex">
                    <div
                        className="
                            flex
                            w-full
                            max-w-xl
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-4
                            py-2
                            transition-all
                            focus-within:border-blue-500
                            focus-within:bg-white
                            focus-within:shadow-md
                        "
                    >
                        <FiSearch className="text-slate-400" />

                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                </div>

                {/* Right */}

                <div className="flex items-center gap-5">
                    {/* Notification */}

                    <button
                        className="
                            relative
                            rounded-xl
                            p-2.5
                            transition
                            hover:bg-slate-100
                        "
                    >
                        <FiBell
                            size={21}
                            className="text-slate-600"
                        />

                        <span
                            className="
                                absolute
                                -right-1
                                -top-1
                                flex
                                h-5
                                w-5
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500
                                text-[10px]
                                font-semibold
                                text-white
                            "
                        >
                            3
                        </span>
                    </button>

                    {/* Profile */}

                    <div
                        ref={dropdownRef}
                        className="relative"
                    >
                        <button
                            onClick={() => setOpen(!open)}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-2
                                transition
                                hover:bg-slate-100
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-blue-700
                                    font-semibold
                                    text-white
                                    ring-2
                                    ring-blue-100
                                "
                            >
                                {initials || "U"}
                            </div>

                            <div className="hidden text-left md:block">
                                <p className="text-sm font-semibold text-slate-800">
                                    {fullName || "User"}
                                </p>

                                <span
                                    className="
                                        rounded-full
                                        bg-blue-100
                                        px-2
                                        py-0.5
                                        text-xs
                                        font-medium
                                        capitalize
                                        text-blue-700
                                    "
                                >
                                    {profile?.role}
                                </span>
                            </div>

                            <FiChevronDown
                                className={`transition-transform ${open ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {open && (
                            <div
                                className="
                                    absolute
                                    right-0
                                    mt-3
                                    w-72
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-2xl
                                "
                            >
                                {/* User */}

                                <div className="flex items-center gap-3 border-b p-5">
                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-gradient-to-r
                                            from-blue-600
                                            to-indigo-600
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        {initials}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            {fullName}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {profile?.email}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        navigate("/dashboard/profile");
                                    }}
                                    className="flex w-full items-center gap-3 px-5 py-3 text-sm transition hover:bg-slate-50"
                                >
                                    <FiUser />
                                    My Profile
                                </button>

                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        navigate("/dashboard/change-password");
                                    }}
                                    className="flex w-full items-center gap-3 px-5 py-3 text-sm transition hover:bg-slate-50"
                                >
                                    <FiLock />
                                    Change Password
                                </button>

                                <div className="border-t" />

                                <button
                                    disabled={isLoading}
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                >
                                    <FiLogOut />

                                    {isLoading
                                        ? "Logging out..."
                                        : "Logout"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;