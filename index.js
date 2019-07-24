const express = require("express");

const app = require("./server/server");
const port = process.env.PORT || 5000;

app.listen(port, (() => {
    console.log(`Listening on port ${port}`);
}));