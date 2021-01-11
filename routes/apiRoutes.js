const Workout = require("../models/workout.js");

module.exports = function (app) {
  app.get("/api/workouts", (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/api/workouts", (req, res) => {
    Workout.create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", ({ params, body }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  app.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
      { $sort: { day: -1 } },
      { $limit: 7 },
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .then((dbWorkout) => {
        res.json(dbWorkout.reverse());
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
