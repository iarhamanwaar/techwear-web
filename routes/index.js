const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  const data = {
    imageUrl: "https://wallpapercave.com/wp/wp12113051.jpg",
    title1: "CYBER DARK",
    title2: "COLLECTION",
    title3: "FW//",
    title4: "2324",
  };

  res.render("../views/index", data);
});

/* GET men page. */
router.get("/men", (req, res) => {
  const data = {
    imageUrl: "https://wallpapercave.com/wp/wp12113051.jpg",
    title1: "CYBER DARK",
    title2: "COLLECTION",
    title3: "FW//",
    title4: "2324",
  };

  res.render("../views/men", data);
});

/* GET women page. */
router.get("/women", (req, res) => {
  const data = {
    imageUrl: "https://wallpapercave.com/wp/wp12113051.jpg",
    title1: "CYBER DARK",
    title2: "COLLECTION",
    title3: "FW//",
    title4: "2324",
  };

  res.render("../views/women", data);
});

module.exports = router;
