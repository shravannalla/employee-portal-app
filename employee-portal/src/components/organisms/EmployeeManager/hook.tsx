import React from "react";
import { addEmployee, deleteEmployee, getEmployees, searchEmployees, updateEmployee } from "../../../utils/api";

type Employee = {
  _id: string;
  name: string;
  emailId: string;
  department: string;
};

const useEmployeeManager = () => {
    const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [employeeNameError, setEmployeeNameError] = React.useState<string>("");
  const [departmentError, setDepartmentError] = React.useState<string>("");
  const [employeeName, setEmployeeName] = React.useState<string>("");
  const [department, setDepartment] = React.useState<string>("");
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = 5;

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    getEmployees().then((data) => {
      setEmployees(data!);
      setCurrentPage(1);
    });
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);
      if (searchQuery.trim()) {
        searchEmployees(searchQuery).then((data) => setEmployees(data!));
      } else {
        fetchEmployees();
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const handleAddEmployee = () => {
    if (!employeeName || !department) {
      if (!employeeName) setEmployeeNameError("Employee name is required");
      if (!department) setDepartmentError("Department is required");
      return;
    }

    if (editingIndex !== null) {
      const oldEmployee = employees[editingIndex];
      updateEmployee(oldEmployee._id, {
        name: employeeName,
        department,
      }).then(() => {
        setEmployeeName("");
        setDepartment("");
        setEditingIndex(null);
        fetchEmployees();
      });
    } else {
      addEmployee({
        name: employeeName,
        emailId: employeeName + "@example.com", //hardcoded for now
        department,
        password: "Test@123",  //hardcoded for now
      }).then(() => {
        setEmployeeName("");
        setDepartment("");
        fetchEmployees();
      });
    }
  };

  const handleEditEmployee = (index: number) => {
    const employee = employees[index];
    setEmployeeName(employee.name);
    setDepartment(employee.department);
    setEditingIndex(index);
    setEmployeeNameError("");
    setDepartmentError("");
  };

  const handleDeleteEmployee = (index: number) => {
    const employee = employees[index];
    deleteEmployee(employee._id).then(() => {
      fetchEmployees();
    });
  };

  const handleCancel = () => {
    setEmployeeName("");
    setDepartment("");
    setEditingIndex(null);
    setEmployeeNameError("");
    setDepartmentError("");
  };

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = employees.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    employeeName,
    setEmployeeName,
    department,
    setDepartment,
    employeeNameError,
    setEmployeeNameError,
    departmentError,
    setDepartmentError,
    editingIndex,
    setEditingIndex,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    paginatedEmployees,
    handlePageChange,
    handleAddEmployee,
    handleCancel,
    handleDeleteEmployee,
    startIndex,
    totalPages,
    handleEditEmployee
  }
}

export default useEmployeeManager;