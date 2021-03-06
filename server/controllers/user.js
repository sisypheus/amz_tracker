import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import PostMessage from '../models/postMessage.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({message: 'User does not exist.'});
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid)
      return res.status(400).json({message: 'Invalid credentials'});
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h"});
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({message: 'Something went wrong'});
  }
}

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({message: 'User already exists'});
  
    if (password !== confirmPassword)
      return res.status(400).json({message: 'Passwords don\'t match'});
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ email: email, password: hashedPassword, name: `${firstName} ${lastName}`});

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h"});
    res.status(200).json({ result: result, token });
  } catch (err) {
    res.status(500).json({message: 'Something went wrong'});
  }
}

export const googlesignup = async (req, res) => {
  try {
    const { email, name } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      res.status(200);
    const result = await User.create({ email: email, password: 'googleAccount', name: name, items: []});
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({message: err.message});
    console.log(err);
  }
}

export const users = async (req, res) => {
  try {
    const all_models = await PostMessage.find();
    res.status(200).json({ Users: all_models });
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}