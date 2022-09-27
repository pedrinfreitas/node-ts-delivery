import express from 'express';

const app = express();

app.get("/", (req, res) => {
  return res.json({
    message: "ola mundo",
  });
});

app.listen(3000, () => console.log("Server is running"));
