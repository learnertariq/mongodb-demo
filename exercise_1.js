const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/mongo-exercises", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const courseSchema = new Schema({}, { strict: false });

const Course = mongoose.model("Course", courseSchema);

/// exercise 1
// async function getCourses() {
//   // .sort('-name')
//   // .select({ 'name', 'author');
//   return await Course.find({ isPublished: true, tags: "backend" })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });
// }

///// Exercise 2
// async function getCourses() {
//   return await Course.find({
//     isPublished: true,
//   })
//   .or([{ tags: "frontend" }, { tags: "backend" }])
//   .sort("-price")
//   .select("name author price");
// }

///// Exercise 3
async function getCourses() {
  return await Course.find({
    isPublished: true,
  })
  .or([{ price: { $gte: 15 } }, { name: /.*by*/i }])
    .sort("-price")
    .select("name author price");
}

async function run() {
  const resule = await getCourses();
  console.log(resule);
}

run();
