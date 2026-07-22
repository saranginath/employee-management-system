import Department from "./department.model";

export const createDepartment =
    async (data: any) => {

        return await Department.create(data);

    };

export const getDepartments =
    async () => {

        return await Department.find()
            .populate(
                "manager",
                "firstName lastName email"
            );

    };

export const getDepartmentById =
    async (id: string) => {

        return await Department.findById(id)
            .populate(
                "manager",
                "firstName lastName email"
            );

    };

export const updateDepartment =
    async (
        id: string,
        data: any
    ) => {

        return await Department.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );

    };

export const deleteDepartment =
    async (id: string) => {

        return await Department.findByIdAndDelete(id);

    };