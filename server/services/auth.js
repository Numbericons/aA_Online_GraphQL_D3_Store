const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");

// here is our validator function
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        name,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();
    // we'll create a token for the user
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);  

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
        // use our other validator we wrote to validate this data
        const { message, isValid } = validateLoginInput(data);

        if (!isValid) {
        throw new Error(message);
        }

        const { email, password } = data;

        const user = await User.findOne({email});
        if(!user){
            throw new Error("I can't find that user, yo.");
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) throw new Error("That password is incorrect bud");

        const token = jwt.sign({ id: user.id }, keys.secretOrKey);  

        return { token, loggedIn: true, ...user._doc, password: null };

    } catch (err) {
        throw err;
    }
};

const logout = async data => {
    try{
       const {_id} = data;
       
       const user = await User.findById(_id);
       if(!user){
           throw new Error("NO USER FOUND!");
       }

        const token = "";
        return {token, loggedIn: false, ...user._doc, password: null};
    } catch (err) {
        throw err;
    }

};

const verifyUser = async data => {
  try {
    // we take in the token from our mutation
    const { token } = data;
    // we decode the token using our secret password to get the
    // user's id
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;

    // then we try to use the User with the id we just decoded
    // making sure we await the response
    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, login, logout, verifyUser };