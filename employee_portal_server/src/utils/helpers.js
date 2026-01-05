const Employee = require('../models/employee');
const bcrypt = require('bcrypt');

const saveEmployee = async (name, emailId, password, department) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({
        name,
        emailId,
        password: hashPassword,
        department,
    });
    const savedEmployee = await employee.save();
    return getEmployeeObjWithoutPassword(savedEmployee);
}

const getEmployeeObjWithoutPassword = (employee) => {
    const employeeObj = employee.toObject();
    // Delete password
    delete employeeObj.password;
    return employeeObj;
}

module.exports = {
    saveEmployee,
    getEmployeeObjWithoutPassword
}