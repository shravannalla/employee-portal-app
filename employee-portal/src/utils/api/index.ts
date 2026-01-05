import axios from "axios";

const EMPLOYEES_URL = "http://localhost:3000";

export const getEmployees = async () => {
  let employees: Record<string, any>[] | null = null;

  await axios
    .get(`${EMPLOYEES_URL}/employee`, { withCredentials: true })
    .then((res) => {
      employees = res.data.data;
    })
    .catch((err) => console.log("cannot fetch employees " + err));

  return employees;
};

export const loginToEmployeePortal = async (
  email: string,
  password: string
) => {
  return await axios.post(
    EMPLOYEES_URL + "/auth/login",
    {
      emailId: email,
      password: password,
    },
    { withCredentials: true }
  );
};

export const addEmployee = async (employee: {
  name: string;
  emailId: string;
  department: string;
  password: string;
}) => {
  return await axios.post(
    EMPLOYEES_URL + "/employee",
    {
      ...employee,
    },
    { withCredentials: true }
  );
};

export const updateEmployee = async (
  id: string,
  employee: { name: string; department: string }
) => {
  return await axios.patch(
    EMPLOYEES_URL + `/employee/${id}`,
    {
      ...employee,
    },
    { withCredentials: true }
  );
};

export const deleteEmployee = async (id: string) => {
  return await axios.delete(EMPLOYEES_URL + `/employee/${id}`, {
    withCredentials: true,
  });
};

export const searchEmployees = async (name: string) => {
  return await axios
    .get(EMPLOYEES_URL + `/employee?name=${name}`, { withCredentials: true })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log("cannot search employees " + err);
      return [];
    });
};

export const logoutEmployee = async () => {
  return await axios.post(
    EMPLOYEES_URL + "/auth/logout",
    {},
    { withCredentials: true }
  );
};