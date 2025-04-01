import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";


// Register User => /api/v1/user/register

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password ,role} = req.body;
  
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password
    ) {
      return next(new ErrorHandler("Please fill all fields", 400));
    }
  
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already Registered!", 400));
    }
  
    user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role,
    });
  
    generateToken(user, "User Registered!", 200, res);
  });


// Login User => /api/v1/user/login


  export const login =catchAsyncErrors(async (req, res, next) => {
    const {email , password, confirmpassword, role} = req.body;
    if(!email || !password || !confirmpassword || !role) {
        return next(new ErrorHandler("Please fill all fields", 400));
    }
    if(password!== confirmpassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match", 400));
    }
    const user =await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    const ispasswordMatched = await user.comparePassword(password);
    if(!ispasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    generateToken(user, "Login Successfully!", 201, res);
});



// new admin => /api/v1/user/newadmin

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});