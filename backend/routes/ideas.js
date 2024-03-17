const express = require("express");
const router = express.Router();
const Idea = require("../models/idea");

router.post("/add", async (req, res) => {
  const { Title, Date,Statuscr } = req.body;

  try {
    const newIdea = new Idea({
      Title,
      Date,
      Statuscr,
    });

    await newIdea.save();

    res.json({ success: true, message: "Idea added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/list", async (req, res) => {
  const { student_id } = req.query;

  try {
    const acts = await Idea.find({ student_id });
    res.json({ success: true, acts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { Statuscr } = req.body;

  try {
    // Find the document by ID
    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({ success: false, message: "Idea not found" });
    }

    // Update the Statuscr field
    idea.Statuscr = Statuscr;
    await idea.save();

    res.json({ success: true, message: "Statuscr updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.get('/overall', async (req, res) => {
  try {
    const overallData = await Idea.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 }
        }
      }
    ]);
    res.json(overallData);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to fetch day-wise activities
router.get('/daywise', async (req, res) => {
  try {
    const dayWiseData = await Idea.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$Date' } },
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(dayWiseData);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
