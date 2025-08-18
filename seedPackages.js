const mongoose = require('mongoose');
const Package = require('./models/Package');

mongoose.connect('mongodb+srv://ayshahalzayed:33799173@student-cluster.pf8i304.mongodb.net/MEA?retryWrites=true')
.then(async () => {
  const packages = [
    {
      name: "Dressage Training Package",
      description: "Develop grace, balance, and precision in your riding. Ideal for riders who want to master the art of dressage with a structured monthly plan.",
      price: 60,
      session: 8,
      sessionsPerMonth: 8,
      duration: "1 month",
      discipline: "Dressage",
      imageUrl: "/images/Dressage.jpg"
    },
    {
      name: "Show Jumping Training Package",
      description: "Enhance your agility, timing, and confidence in jumping courses. Designed for riders aiming to progress in show jumping.",
      price: 60,
      session: 8,
      sessionsPerMonth: 8,
      duration: "1 month",
      discipline: "Show Jumping",
      imageUrl: "/images/Jumping.jpg"
    },
    {
      name: "Endurance Training Package",
      description: "Build stamina, consistency, and connection with your horse over long rides. Perfect for riders interested in endurance riding and distance challenges.",
      price: 60,
      session: 8,
      sessionsPerMonth: 8,
      duration: "1 month",
      discipline: "Endurance",
      imageUrl: "/images/Dressage.jpg" 
    }
  ];

  await Package.deleteMany({});
  await Package.insertMany(packages);
  console.log('📦 Packages seeded!');
  mongoose.disconnect();
})
.catch(err => console.error(err));
