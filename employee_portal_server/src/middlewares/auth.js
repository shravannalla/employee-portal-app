const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const { UN_AUTHORIZED } = require('../utils/constants');
const {INTERNAL_SERVER_ERROR} = require('../utils/constants');
const { getEmployeeObjWithoutPassword } = require('../utils/helpers');

async function employeeAuth(req, res, next) {
    try {
        const { token } = req?.cookies;
        if (!token) {
            return res.status(401).json({
                message: 'Please login to call this API.',
            })
        }
        let decodedObj;
        try {
            decodedObj = await jwt.verify(token, process.env.EMPLOYEE_PORTAL_SECRET);
        } catch (err) {
            throw new Error('Invalid token or Token expired!');
        }

        const { _id } = decodedObj;

        const employee = await Employee.findById(_id);

        if (!employee) {
            return res.status(401).json({
                message: UN_AUTHORIZED
            });
        }

        req.loggedInEmployee = getEmployeeObjWithoutPassword(employee);

        next();


    } catch (err) {
        res.status(err.status || 500).json({
            message: INTERNAL_SERVER_ERROR + CONTACT_SUPPORT + err.message
        });
    }
}

module.exports = {
    employeeAuth
}