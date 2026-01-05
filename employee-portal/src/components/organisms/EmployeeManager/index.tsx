import { Button, Grid, Pagination, Box } from "@mui/material";
import { InputField } from "../../molecules/TextInput";
import ListItem from "../../molecules/ListItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import BadgeIcon from "@mui/icons-material/Badge";
import React, { useEffect } from "react";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
} from "../../../utils/api";

type Employee = {
  _id: string;
  name: string;
  emailId: string;
  department: string;
};

const EmployeeManager = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [employeeNameError, setEmployeeNameError] = React.useState<string>("");
  const [departmentError, setDepartmentError] = React.useState<string>("");
  const [employeeName, setEmployeeName] = React.useState<string>("");
  const [department, setDepartment] = React.useState<string>("");
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
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

  // Pagination logic
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = employees.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Grid container display={"flex"} flexDirection={"column"} gap={4}>
        <Grid item>
          <Grid container display={"flex"} flexDirection={"row"} gap={8}>
            <Grid item gap={2} display={"flex"} flexDirection={"row"}>
              <InputField
                placeholder={"Employee name"}
                variant={"outlined"}
                value={employeeName}
                error={employeeNameError}
                handleChange={(e) => {setEmployeeName(e.target.value), setEmployeeNameError("")}}
                styles={{}}
              />
              <InputField
                placeholder={"Department"}
                variant={"outlined"}
                value={department}
                error={departmentError}
                handleChange={(e) => {setDepartment(e.target.value), setDepartmentError("")}}
                styles={{}}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ height: "3.4rem" }}
                onClick={handleAddEmployee}
              >
                {editingIndex !== null ? "Save" : "Add"}
              </Button>
              {editingIndex !== null && (
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ height: "3.4rem" }}
                  onClick={handleCancel}
                >
                  {"Cancel"}
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item spacing={2} maxWidth={"700px"}>
          <Grid container display={"flex"} flexDirection={"column"} alignItems={"flex-start"} gap={2} border={"1px solid #aba7a7ff"} width={"100%"} padding={2} borderRadius={"12px"}>
            <Grid item>
              <InputField
                placeholder={"Search employee"}
                variant={"outlined"}
                value={searchQuery}
                handleChange={(e) => setSearchQuery(e.target.value)}
                styles={{width: '41.5rem'}}
              />
            </Grid>
            <Grid item width={`100%`}>
              {paginatedEmployees && paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((employee, index) => (
                  <ListItem
                    key={employee._id}
                    title={employee.name}
                    infoIcon={<BadgeIcon />}
                    action1Icon={<EditIcon />}
                    action2Icon={<DeleteOutlineIcon />}
                    onAction1Click={() => handleEditEmployee(startIndex + index)}
                    onAction2Click={() => handleDeleteEmployee(startIndex + index)}
                  />
                ))
              ) : (
                <Box padding={2}>{"No employees found"}</Box>
              )}
            </Grid>
            {totalPages > 1 && (
              <Grid item display={"flex"} justifyContent={"center"} width={"100%"}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeeManager;