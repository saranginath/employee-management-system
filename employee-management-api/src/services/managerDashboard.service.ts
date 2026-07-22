import {

    getManagerProfile,
    getTeamMembers,
    getTeamAttendance,
    getPendingLeaveRequests,
    getDepartmentEmployeeGrowth

}
    from "../repositories/managerDashboard.repository";





export const getManagerDashboardService =
    async (
        userId: string
    ) => {
        const manager =
            await getManagerProfile(
                userId
            );
        console.log(manager)
        if (!manager) {
            throw new Error(
                "Manager profile not found"
            );
        }



        const departmentId =
            manager.department._id.toString();




        const team =
            await getTeamMembers(
                departmentId
            );



        const attendance =
            await getTeamAttendance(
                departmentId
            );



        const pendingLeaves =
            await getPendingLeaveRequests(
                departmentId
            );



        const growth =
            await getDepartmentEmployeeGrowth(
                departmentId
            );





        return {


            profile: {

                name:
                    `${manager.firstName} ${manager.lastName}`,

                email:
                    manager.email,

                designation:
                    manager.designation,

                department:
                    manager.department

            },



            team: {

                total:
                    team[0]?.total || 0,


                active:
                    team[0]?.active || 0,


                inactive:
                    team[0]?.inactive || 0

            },



            attendance,


            leaves: {

                pending:
                    pendingLeaves

            },



            employeeGrowth: growth


        };


    };