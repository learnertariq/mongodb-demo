const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to Mongodb..."))
  .catch((err) => console.log("Could not connect to Mongodb...", err));

const courseShema = new mongoose.Schema({
  name: String,
  instructor: String,
  date: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseShema);

async function createCourse() {
  const course = new Course({
    name: "NodeJs",
    instructor: "Tariq",
  });
  try {
    const result = await course.save();
    console.log(result);
    console.log("Course Saved");
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

async function findCourse() {
  const course = await Course.find({ instructor: "Tariq" })
    .limit(2)
    .sort({ name: -1 })
    .select({ name: 1, date: 1 });
  console.log(course);
}

findCourse();
