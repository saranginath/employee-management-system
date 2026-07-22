import { FiAlertTriangle, FiX } from "react-icons/fi";

interface ConfirmDialogProps {
    isOpen: boolean;

    title?: string;

    message?: string;

    confirmText?: string;

    cancelText?: string;

    onConfirm: () => void;

    onCancel: () => void;

    loading?: boolean;
}

const ConfirmDialog = ({
    isOpen,
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this item?",
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    loading = false,
}: ConfirmDialogProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                backdrop-blur-sm
            "
        >
            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-xl
                    w-full
                    max-w-md
                    p-6
                    animate-in
                    fade-in
                    zoom-in
                    duration-200
                "
            >
                {/* Header */}

                <div
                    className="
                        flex
                        justify-between
                        items-start
                    "
                >
                    <div
                        className="
                            flex
                            gap-3
                            items-center
                        "
                    >
                        <div
                            className="
                                bg-red-100
                                text-red-600
                                p-3
                                rounded-full
                            "
                        >
                            <FiAlertTriangle size={24} />
                        </div>

                        <div>
                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                {title}
                            </h2>
                        </div>
                    </div>

                    <button
                        onClick={onCancel}
                        className="
                            text-slate-400
                            hover:text-slate-700
                        "
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Message */}

                <p
                    className="
                        mt-5
                        text-slate-600
                        text-sm
                    "
                >
                    {message}
                </p>

                {/* Actions */}

                <div
                    className="
                        mt-8
                        flex
                        justify-end
                        gap-3
                    "
                >
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="
                            px-5
                            py-2
                            rounded-lg
                            border
                            border-slate-300
                            text-slate-700
                            hover:bg-slate-100
                        "
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            px-5
                            py-2
                            rounded-lg
                            bg-red-600
                            text-white
                            hover:bg-red-700
                            disabled:opacity-50
                        "
                    >
                        {loading ? "Processing..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
