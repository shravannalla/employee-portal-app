const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { DEPARTMENTS } = require('../utils/constants');

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        immutable: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        validate: validator.isStrongPassword
    },
    department: {
        type: String,
        enum: {
            values: DEPARTMENTS,
            message: '{VALUE} is not a valid department'
        },
        required: true,
    }
});

employeeSchema.methods.getJWT = async function () {
    const employee = this;
    const token = await jwt.sign({ _id: employee._id }, process.env.EMPLOYEE_PORTAL_SECRET, {
        expiresIn: '1d'
    });
    return token;
}

employeeSchema.methods.validatePassword = async function (password) {
    const employee = this;
    const isValidPassword = await bcrypt.compare(password, employee.password);
    return isValidPassword;
}

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;