const router = require("express").Router();
const path = require("path");
require("dotenv").config({ path: "../../env.env" });

router.get("/hello", (req, res) => {
  res.send(<div>Hello</div>);
});

module.exports = router;
