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
  const pageNumber = 2;
  const pageSize = 10;
  const course = await Course
    /////////  Comparison operators
    // .find({ instructor: { $eq: 'Tariq'} })
    // .find({ instructor: { $in: ["Mosh", "Tariq"] } });
    ////////////  Logical operators
    // .find()
    // .and([{ instructor: 'Tariq' }, { name: 'NodeJs' }])
    ///////////  Ragular Expression
    // .find({ instructor: /^Tariq/ })
    // .find({ instructor: /Tariq$/ })
    // .find({ instructor: /.*ariq$/ })
    ///////////  Counting Documents
    // .countDocuments();
    ///////////  Pagination
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  // .sort({ name: -1 })
  //////////   Getting selected properties
  // .select({ name: 1, date: 1 });
  console.log(course);
}

findCourse();
