import { Request, Response } from "express";
import userModel from "../models/user.model";

const saveFormData = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      linkedin,
      higherEducation,
      college,
      jobRole,
      company,
      experience,
      achievements,
      skills,
      projects,
    } = req.body;

    // Check if any required field is missing or empty
    if (
      Object.values(req.body).some(
        (value) => value === "" || value === undefined
      )
    ) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (!req.body.username) {
      req.body.username = `user_${Date.now()}`; // Assign a temporary unique value
    }

    // Create and save new entry
    const newEntry = await userModel.create({
      name,
      phone,
      email,
      linkedin,
      higherEducation,
      college,
      jobRole,
      company,
      experience,
      achievements,
      skills,
      projects,
    });

    if (!newEntry) {
      res.status(400).json({ error: "Failed to submit form" });
      return;
    }

    res
      .status(201)
      .json({ message: "Form submitted successfully!", data: newEntry });
    return;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message || "Failed to submit form" });
    } else {
      res.status(500).json({ error: "Failed to submit form" });
    }
  }
};

const getFormData = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const newEntry = await userModel.findOne({ email });

    if (!newEntry) {
      res.status(400).json({ error: "User with this email does not exist" });
      return;
    }

    await newEntry.save();
    res
      .status(201)
      .json({ message: "Form fetched successfully!", data: newEntry || "" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the form" });
  }
};

export { saveFormData, getFormData };
