const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

const saltcount = 15;

app.post("/hashpassword", async (req, resp) => {
  const { password } = req.body;
  console.log(password);

  let hashedpass = await bcrypt.hash(password, saltcount);
  resp.send(hashedpass);
});

hashedpass = "$2b$15$wE6eTCPytPIfY6ARn8fIIeXC/beHLRE0mABdVooZn3NtdNl3A2ULy";

app.post("/compare", async (req, resp) => {
  const { password } = req.body;
  //   console.log(password);
  const comparepass = await bcrypt.compare(password, hashedpass);
  if (comparepass) {
    resp
      .status(200)
      .send({ message: "Password is matched with hashedpassword !" });
  } else {
    resp
      .status(200)
      .send({ message: "Password is not matched with hashed password !" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on PORT No. ${PORT} at http://127.0.0.1:${PORT}`
  );
});
