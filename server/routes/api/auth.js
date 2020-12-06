const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const passwordHash = require('password-hash');

// @route POST api/auth
// @desc  User Login
// @access Public

router.post('/login', [], async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      });
    }

    const isMatch = passwordHash.verify(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid Credentials',
          },
        ],
      });
    }

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/auth
// @desc Logout user
// @access Public

router.post('/logout', [], async (req, res) => {
  try {
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
