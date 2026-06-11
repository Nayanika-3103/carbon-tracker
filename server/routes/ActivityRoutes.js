// import express from "express";
// import Activity from "../models/Activity.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// router.post("/add", auth, async (req, res) => {
//   try {
//     const { activity, carbon } = req.body;

//     const newActivity = new Activity({
//       userId: req.user.id,
//       activity,
//       carbon
//     });

//     await newActivity.save();

//     res.json({ message: "Activity added successfully" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
// router.get("/all", auth, async (req, res) => {
//   try {
//     const activities = await Activity.find({ userId: req.user.id });

//     res.json(activities);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


import express from "express";
import Activity from "../models/Activity.js";
import auth from "../middleware/auth.js";

const router = express.Router();


// ================= ADD ACTIVITY =================
router.post("/add", auth, async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { activity, carbon } = req.body;

    if (!activity || carbon === undefined) {
      return res.status(400).json({
        message: "Activity and carbon are required"
      });
    }

    const newActivity = new Activity({
      userId: req.user.id,
      activity,
      carbon: Number(carbon)
    });

    await newActivity.save();

    console.log("ACTIVITY SAVED");

    res.status(201).json({
      success: true,
      message: "Activity added successfully"
    });

  } catch (err) {

    console.error("ACTIVITY ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});


// ================= GET ALL ACTIVITIES =================
router.get("/all", auth, async (req, res) => {
  try {

    const activities = await Activity.find({
      userId: req.user.id
    });

    res.json(activities);

  } catch (err) {

    console.error("GET ACTIVITY ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

export default router;