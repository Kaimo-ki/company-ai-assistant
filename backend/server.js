const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        project: "Center Krasok AI"
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});