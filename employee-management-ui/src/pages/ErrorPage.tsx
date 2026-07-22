import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#161717] px-6">
      <div className="text-center max-w-lg">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <h1
            className="
                        text-[120px]
                        md:text-[160px]
                        font-extrabold
                        leading-none
                        text-blue-600
                        dark:text-blue-500
                    "
          >
            404
          </h1>

          <div
            className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                    "
          >
            <FiSearch
              className="
                                text-white
                                dark:text-[#161717]
                                bg-blue-600
                                rounded-full
                                p-3
                                w-16
                                h-16
                                shadow-lg
                            "
            />
          </div>
        </div>

        {/* Content */}

        <h2
          className="
                    text-3xl
                    font-bold
                    text-gray-900
                    dark:text-white
                    mb-3
                "
        >
          Page Not Found
        </h2>

        <p
          className="
                    text-gray-600
                    dark:text-gray-400
                    mb-8
                    leading-relaxed
                "
        >
          Sorry, the page you are looking for does not exist or might have been
          moved.
        </p>

        {/* Actions */}

        <div
          className="
                    flex
                    flex-col
                    sm:flex-row
                    justify-center
                    gap-4
                "
        >
          <button
            onClick={() => navigate(-1)}
            className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            px-6
                            py-3
                            rounded-xl
                            border
                            border-gray-300
                            dark:border-gray-700
                            text-gray-700
                            dark:text-gray-200
                            hover:bg-gray-100
                            dark:hover:bg-gray-800
                            transition
                        "
          >
            <FiArrowLeft />
            Go Back
          </button>

          <Link
            to="/dashboard"
            className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            px-6
                            py-3
                            rounded-xl
                            bg-blue-600
                            text-white
                            hover:bg-blue-700
                            transition
                            shadow-lg
                        "
          >
            <FiHome />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
