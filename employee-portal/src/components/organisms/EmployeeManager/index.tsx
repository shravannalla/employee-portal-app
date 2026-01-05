import { Button, Grid, Pagination, Box } from "@mui/material";
import { InputField } from "../../molecules/TextInput";
import ListItem from "../../molecules/ListItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import BadgeIcon from "@mui/icons-material/Badge";
import useEmployeeManager from "./hook";
import {
  ADD,
  CANCEL,
  DEPARTMENT,
  EMPLOYEE_NAME,
  EMPLOYEE_NOT_FOUND,
  SAVE,
  SEARCH_EMPLOYEE,
} from "../../../utils/constants";

const EmployeeManager = () => {
  const {
    employeeName,
    setEmployeeName,
    department,
    setDepartment,
    employeeNameError,
    setEmployeeNameError,
    departmentError,
    setDepartmentError,
    editingIndex,
    handleAddEmployee,
    handleCancel,
    handleEditEmployee,
    totalPages,
    handleDeleteEmployee,
    startIndex,
    searchQuery,
    setSearchQuery,
    currentPage,
    paginatedEmployees,
    handlePageChange,
  } = useEmployeeManager();

  return (
    <>
      <Grid container display={"flex"} flexDirection={"column"} gap={4}>
        <Grid item>
          <Grid container display={"flex"} flexDirection={"row"} gap={8}>
            <Grid item gap={2} display={"flex"} flexDirection={"row"}>
              <InputField
                placeholder={EMPLOYEE_NAME}
                variant={"outlined"}
                value={employeeName}
                error={employeeNameError}
                handleChange={(e) => {
                  setEmployeeName(e.target.value), setEmployeeNameError("");
                }}
                styles={{}}
              />
              <InputField
                placeholder={DEPARTMENT}
                variant={"outlined"}
                value={department}
                error={departmentError}
                handleChange={(e) => {
                  setDepartment(e.target.value), setDepartmentError("");
                }}
                styles={{}}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ height: "3.4rem" }}
                onClick={handleAddEmployee}
              >
                {editingIndex !== null ? SAVE : ADD}
              </Button>
              {editingIndex !== null && (
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ height: "3.4rem" }}
                  onClick={handleCancel}
                >
                  {CANCEL}
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item spacing={2} maxWidth={"700px"}>
          <Grid
            container
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={2}
            border={"1px solid #aba7a7ff"}
            width={"100%"}
            padding={2}
            borderRadius={"12px"}
          >
            <Grid item>
              <InputField
                placeholder={SEARCH_EMPLOYEE}
                variant={"outlined"}
                value={searchQuery}
                handleChange={(e) => setSearchQuery(e.target.value)}
                styles={{ width: "41.5rem" }}
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
                    onAction1Click={() =>
                      handleEditEmployee(startIndex + index)
                    }
                    onAction2Click={() =>
                      handleDeleteEmployee(startIndex + index)
                    }
                  />
                ))
              ) : (
                <Box padding={2}>{EMPLOYEE_NOT_FOUND}</Box>
              )}
            </Grid>
            {totalPages > 1 && (
              <Grid
                item
                display={"flex"}
                justifyContent={"center"}
                width={"100%"}
              >
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
