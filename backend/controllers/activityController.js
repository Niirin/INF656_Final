// activityController.js

const Activity = require("../models/Activity");
const jwt = require("jsonwebtoken");
const secretKey = "jwtSecret";

exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.createActivity = async (req, res) => {
    try {
        let activity;
        if (req.body) {
            activity = req.body;
            console.log(activity);
            // Validate request body against your schema
            const { activityTitle, duration, burnedCalories, steps, distance } = activity;

            // Check if all required fields are present and of the correct type
            if (!activityTitle || !duration || !burnedCalories) {
                return res.status(400).json({ msg: "Missing required fields" });
            }

            const newActivity = new Activity({
                userId: '1',
                activityTitle,
                duration,
                burnedCalories,
                steps,
                distance
            });


            // Save the activity to the database
            const savedActivity = await newActivity.save();
            console.log(savedActivity);

            // Respond with the saved activity
            res.status(201).json(savedActivity);
        } else {
            res.status(400).send("No data provided");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.getActivityById = async (req, res) => {
    try {
        const id = req.params.id;
        const activity = await Activity.findById(id);
        if (!activity){
            return res.status(404).json({ msg: "Activity not found" });
        }
        res.json(activity);
        console.log(activity);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { activityTitle, duration, burnedCalories, steps, distance } =
            req.body;
        const activity = await Activity.findByIdAndUpdate(
            id,
            {
                activityTitle,
                duration,
                burnedCalories,
                steps,
                distance,
            },
            { new: true }
        );
        if (!activity) {
            return res.status(404).json({ msg: "Activity not found" });
        }
        console.log(activity);
        res.json(activity);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({ msg: "Activity not found" });
        }
        res.json({ msg: "Activity deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};