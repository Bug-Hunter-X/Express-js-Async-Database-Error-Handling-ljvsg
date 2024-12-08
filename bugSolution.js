const express = require('express');
const app = express();
// Simulate an asynchronous database operation
const getUserData = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 'nonexistent') {
        reject(new Error('User not found'));
      } else {
        resolve({ id: userId, name: `User ${userId}` });
      }
    }, 500); // Simulate some delay
  });
};
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await getUserData(userId);
    res.send(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Error fetching user data'); // Or a more specific error message
  }
});
module.exports = app;
