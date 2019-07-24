const express = require("express");

const app = require("./server/server");
const port = process.env.PORT || 5555;

app.listen(port, (() => {
    console.log(`Listening on port ${port}`);
}));