const express = require("express");
const app = express();
app.use(express.static("./dist/online-marketplace-frontend"));
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/online-marketplace-frontend/" });
});
app.listen(process.env.PORT || 8080);
