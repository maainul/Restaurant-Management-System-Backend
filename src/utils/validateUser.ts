import CreateCustomerRequestDto from "../dto/user/CreateCustomerRequest.dto";
import CreateUserRequestDto from "../dto/user/CreateUserRequest.dto";
import { ValidationError } from "../errors/errors";

const validateCustomerData = (userData: CreateCustomerRequestDto): void => {
    const fieldErrors: { field: string; message: string }[] = [];


    // Validate the email field
    if (!userData.mobileNumber || userData.mobileNumber.trim() === "") {
        fieldErrors.push({
            field: "mobileNumber",
            message: "mobileNumber is required",
        });
    } else if (!isValidMobileNumber(userData.mobileNumber)) {
        fieldErrors.push({
            field: "mobileNumber",
            message: "Invalid mobile Number address",
        });
    }
    // Validate the password field
    if (!userData.password || userData.password.trim() === "") {
        fieldErrors.push({
            field: "password",
            message: "Password is required",
        });
    } else if (userData.password.length < 6) {
        fieldErrors.push({
            field: "password",
            message: "Password must be at least 6 characters long",
        });
    }

    // If there are validation errors, throw a ValidationError
    if (fieldErrors.length > 0) {
        throw new ValidationError(fieldErrors, 400);
    }
};


const validateRegistrationData = (userData: CreateUserRequestDto): void => {
    const fieldErrors: { field: string; message: string }[] = [];

    // Validate the username field
    if (!userData.username || userData.username.trim() === "") {
        fieldErrors.push({
            field: "username",
            message: "Username is required",
        });
    } else if (typeof userData.username !== "string") {
        fieldErrors.push({
            field: "username",
            message: "Username must be a string",
        });
    } else if (userData.username.length < 3) {
        fieldErrors.push({
            field: "username",
            message: "Username must be at least 3 characters long",
        });
    }

    // Validate the email field
    if (!userData.email || userData.email.trim() === "") {
        fieldErrors.push({
            field: "email",
            message: "Email is required",
        });
    } else if (!isValidEmail(userData.email)) {
        fieldErrors.push({
            field: "email",
            message: "Invalid email address",
        });
    }

    // Validate the password field
    if (!userData.password || userData.password.trim() === "") {
        fieldErrors.push({
            field: "password",
            message: "Password is required",
        });
    } else if (userData.password.length < 6) {
        fieldErrors.push({
            field: "password",
            message: "Password must be at least 6 characters long",
        });
    }

    // If there are validation errors, throw a ValidationError
    if (fieldErrors.length > 0) {
        throw new ValidationError(fieldErrors, 400);
    }
};

const validateLoginData = (email: string, password: string): void => {
    const fieldErrors: { field: string; message: string }[] = [];

    // Validate the email field
    if (!email || email.trim() === "") {
        fieldErrors.push({
            field: "email",
            message: "Email is required",
        });
    } else if (!isValidEmail(email)) {
        fieldErrors.push({
            field: "email",
            message: "Invalid email address",
        });
    }

    // Validate the password field
    if (!password || password.trim() === "") {
        fieldErrors.push({
            field: "password",
            message: "Password is required",
        });
    }

    // If there are validation errors, throw a ValidationError
    if (fieldErrors.length > 0) {
        throw new ValidationError(fieldErrors, 400);
    }
};

// Helper function to validate email format
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidMobileNumber = (mobileNumber: string): boolean => {
    if(mobileNumber.length == 11){
        return true
    }
    return false
};
export default { validateRegistrationData, validateLoginData,validateCustomerData };
