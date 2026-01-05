const express = require('express');
const { employeeAuth } = require('../middlewares/auth');
const { validateEmployeeData } = require('../utils/validation');
const { ALLOWED_UPDATE_LIST, INTERNAL_SERVER_ERROR, CONTACT_SUPPORT, SCHEMA_FIELDS } = require('../utils/constants');
const { saveEmployee, getEmployeeObjWithoutPassword } = require('../utils/helpers');
const bcrypt = require('bcrypt');
const Employee = require('../models/employee');
const router = express.Router();

router.post('/', employeeAuth, async (req, res) => {
    try {
        const loggedInEmployee = req.loggedInEmployee;
        if (loggedInEmployee?.department !== 'operations') {
            return res.status(403).json({
                message: 'You are not authorized to perform this operation.'
            });
        }

        validateEmployeeData(req?.body);

        const { name, emailId, password, department } = req?.body;
        const employee = await saveEmployee(name, emailId, password, department);
        res.status(200).json({
            message: `${name} added successful`,
            data: employee
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: INTERNAL_SERVER_ERROR + CONTACT_SUPPORT + err.message
        });
    }
});

router.patch('/:employeeId', employeeAuth, async (req, res) => {
    try {
        const { employeeId } = req.params;
        const loggedInEmployee = req.loggedInEmployee;
        if (loggedInEmployee?.department !== 'operations') {
            return res.status(403).json({
                message: 'You are not authorized to perform this operation.'
            });
        }
        const updatedData = req?.body;
        const isUpdateAllowed = Object.keys(updatedData).every(key => ALLOWED_UPDATE_LIST.includes(key));

        if (!isUpdateAllowed) {
            return res.status(400).json({
                message: 'Cannot update emailId / random data.'
            });
        }

        const employee = await Employee.findByIdAndUpdate(employeeId, {
            $set: updatedData
        }, { new: true, runValidators: true });

        res.status(201).json({
            message: `${employee.name} update successful`,
            data: getEmployeeObjWithoutPassword(employee),
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: INTERNAL_SERVER_ERROR + CONTACT_SUPPORT + err.message
        });
    }
});

router.delete('/:employeeId', employeeAuth, async (req, res) => {
    try {
        const loggedInEmployee = req.loggedInEmployee;
        if (loggedInEmployee?.department !== 'operations') {
            return res.status(403).json({
                message: 'You are not authorized to perform this operation.'
            });
        }
        const { employeeId } = req.params;
        if (!employeeId) {
            return res.status(400).json({
                message: `Employee ID missing while deleting Employee.`,
            });
        }
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({
                message: `Employee with ${employeeId} not found!`,
            });
        }

        res.status(200).json({
            message: `${deletedEmployee.name} deleted!`,
            data: getEmployeeObjWithoutPassword(deletedEmployee)
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: INTERNAL_SERVER_ERROR + CONTACT_SUPPORT + err.message
        });
    }
});

// router.get('/', employeeAuth, async (req, res) => {
//     try {
//         const limit = parseInt(req?.query?.limit) || 5;
//         const page = parseInt(req?.query?.page) || 1;

//         const skip = (page - 1) * limit;

//         const query = Object.keys(req?.query).reduce((acc, curr) => {
//             if (curr == 'page' || curr === 'limit') {
//                 return acc;
//             }
//             if (!SCHEMA_FIELDS.includes(curr)) {
//                 return acc;
//             }
//             if (Array.isArray(req?.query[curr])) {
//                 acc[curr] = { $in: req?.query[curr].map(param => new RegExp(param, 'i')) }
//             }
//             acc[curr] = { $regex: req?.query[curr], $options: 'i' }
//             return acc;
//         }, {})

//         const employees = await Employee.find(query, { password: 0 }).skip(skip).limit(limit).lean();

//         res.status(200).json({
//             message: `Employees fetched successfully!`,
//             data: employees
//         });
//     } catch (err) {
//         res.status(err.status || 500).json({
//             message: INTERNAL_SERVER_ERROR + CONTACT_SUPPORT + err.message
//         });
//     }
// });

router.get('/', employeeAuth, async (req, res) => {
    try {
        const limit = req?.query?.limit ? parseInt(req?.query?.limit) : null;
        const page = parseInt(req?.query?.page) || 1;

        let skip = 0;
        if (limit) {
            skip = (page - 1) * limit;
        }

        const query = Object.keys(req?.query).reduce((acc, curr) => {
            if (curr == 'page' || curr === 'limit') {
                return acc;
            }
            if (!SCHEMA_FIELDS.includes(curr)) {
                return acc;
            }
            if (Array.isArray(req?.query[curr])) {
                acc[curr] = { $in: req?.query[curr].map(param => new RegExp(param, 'i')) }
            }
            acc[curr] = { $regex: req?.query[curr], $options: 'i' }
            return acc;
        }, {})

        let findQuery = Employee.find(query, { password: 0 });
        
        if (limit) {
            findQuery = findQuery.skip(skip).limit(limit);
        }

        const employees = await findQuery.lean();

        res.status(200).json({
            message: `Employees fetched successfully!`,
            data: employees
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: INTERNAL_SERVER_ERROR + CONTACT_SUPPORT + err.message
        });
    }
});

module.exports = router;