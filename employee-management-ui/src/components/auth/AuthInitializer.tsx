import {
    useEffect
}
    from "react";

import {
    useDispatch
}
    from "react-redux";

import {
    useRefreshTokenMutation
}
    from "../../features/auth/authApi";

import {
    setAccessToken
}
    from "../../features/auth/authSlice";



const AuthInitializer = ({

    children

}: {
    children: React.ReactNode
}) => {


    const dispatch = useDispatch();


    const [
        refreshToken
    ] = useRefreshTokenMutation();



    useEffect(() => {


        const refresh = async () => {


            try {


                const result =
                    await refreshToken()
                        .unwrap();



                dispatch(

                    setAccessToken(

                        result.data.accessToken

                    )

                );


            }

            catch (error) {


                console.log(
                    error
                );


            }


        };



        refresh();



    }, []);



    return children;


};


export default AuthInitializer;