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

async function createCourse() {
  const Course = mongoose.model("Course", courseShema);
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

createCourse();