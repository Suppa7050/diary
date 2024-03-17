
const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');

router.get('/overall', async (req, res) => {
  try {
    const overallActivities = await Idea.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }
    ]);
    const overallCount = overallActivities.length > 0 ? overallActivities[0].count : 0;
    res.json({ overallCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch day-wise activities
router.get('/daywise', async (req, res) => {
  try {
    const dayWiseActivities = await Idea.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$Date" } },
          count: { $sum: 1 }
        }
      }
    ]);
    const labels = dayWiseActivities.map(activity => activity._id);
    const data = dayWiseActivities.map(activity => activity.count);
    res.json({ labels, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
