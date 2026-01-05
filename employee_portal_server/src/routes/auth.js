const express = require('express');
const { validateEmployeeData, validateLoginData } = require('../utils/validation');
const { INTERNAL_SERVER_ERROR, CONTACT_SUPPORT, UN_AUTHORIZED, INVALID_CREDS } = require('../utils/constants');
const { saveEmployee, getEmployeeObjWithoutPassword } = require('../utils/helpers');
const Employee = require('../models/employee');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        validateEmployeeData(req?.body);
        const { name, emailId, password, department } = req?.body;
        const employee = await saveEmployee(name, emailId, password, department);
        res.status(201).json({
            message: `${name} signup successful`,
            data: employee
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: INTERNAL_SERVER_ERROR + CONTACT_SUPPORT + err.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        validateLoginData(req?.body);
        const { emailId, password } = req?.body;
        // Check if user exits 
        const employee = await Employee.findOne({ emailId });
        if (!employee) {
            return res.status(401).json({
                message: UN_AUTHORIZED,
            })
        }
        // Validate password  
        const isValidPassword = await employee.validatePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: INVALID_CREDS,
            })
        }

        // Set token 
        const token = await employee.getJWT();
        res.cookie('token', token, {
            expires: new Date(Date.now() + 360000000)
        });

        res.status(200).json({
            message: `${emailId} login successful`,
            data: getEmployeeObjWithoutPassword(employee),
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: INTERNAL_SERVER_ERROR + CONTACT_SUPPORT + err.message
        });
    }
});

router.post('/logout', async (req, res) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
        });
        res.status(200).json({
            message: 'Employee logout successful!'
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: INTERNAL_SERVER_ERROR + CONTACT_SUPPORT + err.message
        });
    }
});


module.exports = router;