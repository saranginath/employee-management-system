import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { router } from "./router";
import { useRefreshTokenMutation } from "./features/auth/authApi";

import { setAccessToken, setInitialized } from "./features/auth/authSlice";

import type { RootState } from "./app/store";

function App() {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state: RootState) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await refreshToken().unwrap();
        if (response.accessToken) {
          dispatch(setAccessToken(response.accessToken));
        }
      } catch (error) {
        console.log("Refresh failed", error);
      } finally {
        dispatch(setInitialized());
      }
    };
    checkAuth();
  }, [dispatch, refreshToken]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  return <RouterProvider router={router} />;
}

export default App;
