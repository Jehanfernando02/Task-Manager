// boardRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Access req.user (decoded token data) here
  res.json({ message: 'Authenticated', user: req.user });
});

module.exports = router;
