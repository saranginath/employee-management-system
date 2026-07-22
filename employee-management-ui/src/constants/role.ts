const MenuMap = {
  admin: "adminMenu",
  manager: "managerMenu",
  employee: "employeeMenu",
} as const;
export type MenuMap = (typeof MenuMap)[keyof typeof MenuMap];
