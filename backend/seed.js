const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const Annotation = require('./models/annotation');

const userId1 = new mongoose.Types.ObjectId(); // the owner
const userId2 = new mongoose.Types.ObjectId(); // contributor

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Project.deleteMany();
  await Annotation.deleteMany();

  const project1 = await Project.create({
    title: 'Algerian Casbah',
    description: 'Heritage restoration',
    owner: userId1,
    contributors: [userId2],
    sections: [
      { title: 'Minaret', content: 'Old stone tower', dimension: '5x5' },
      { title: 'Archway', content: 'Historical gate', dimension: '3x2' }
    ]
  });

  await Annotation.create({
    user: userId2,
    project: project1._id,
    sectionId: project1.sections[0]._id.toString(),
    content: 'Needs preservation'
  });

  console.log('✅ Seeded data');
  process.exit();
};

run();
