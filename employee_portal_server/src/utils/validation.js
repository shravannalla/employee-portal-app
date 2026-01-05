const validator = require('validator');
const { DEPARTMENTS } = require('./constants');


function validateEmployeeData(data) {
    const errors = []

    if (!data?.name) {
        errors.push('Name is required.');
    }

    if (!data?.emailId) {
        errors.push('Email is required.');
    }

    if (data?.emailId && !validator.isEmail(data?.emailId)) {
        errors.push('Invalid emailId!.');
    }

    if (!data?.password) {
        errors.push('Password is required.');
    }

    if (data?.password && !validator.isStrongPassword(data?.password)) {
        errors.push('Password is not strong.');
    }

    if (!data?.department) {
        errors.push('Department is required.');
    }

    if (data?.department && !DEPARTMENTS.includes(data?.department)) {
        errors.push('Department should be one if hr, engineering and operations.');
    }

    if (errors.length) {
        const err = new Error(errors.join(' '));
        err.status = 400;
        throw err;
    }

}

function validateLoginData(data) {
    const errors = [];

    if (!data?.emailId) {
        errors.push('emailId is required for login.');
    }

    if (data?.emailId && !validator.isEmail(data?.emailId)) {
        errors.push('Invalid emailId for login.');
    }

    if (!data?.password) {
        errors.push('password is required for login.');
    }

    if (errors.length) {
        const err = new Error(errors.join(' '));
        err.status = 400;
        throw err;
    }
}

module.exports = {
    validateEmployeeData,
    validateLoginData
}