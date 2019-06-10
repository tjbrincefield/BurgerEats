// Our Burger controller
// =====================
// This file uses Sequelize to manage data manipulation
// for all apropos http requests.
// NOTE: This is the same file from last unit's homework,
// but with each route gutted and replaced with sequelize queries
// where references to our outmoded ORM file once sat.
var express = require("express");

var router = express.Router();
// edit burger model to match sequelize
var db = require("../models/");

// get route, edited to match sequelize
router.get("/api/burgers", function(req, res) {
  // replace old function with sequelize function
  db.Burger.findAll()
    // use promise method to pass the burgers...
    .then(function(burgerData) {
      res.json(burgerData);
    });
});

// post route to create burgers
router.post("/api/burgers", function(req, res) {
  // edited burger create to add in a burger_name
  db.Burger.create({
    burger_name: req.body.burger_name
  })
    // pass the result of our call
    .then(function(result) {
      // log the result to our terminal/bash window
      res.json({ id: result.insertId });
    });
});

// put route to devour a burger
router.put("/api/burgers/:id", function(req, res) {
  // update one of the burgers
  db.Burger.update({
    devoured: true
  },
  {
    where: {
      id: req.params.id
    }
  }
  ).then(function(result) {
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;
