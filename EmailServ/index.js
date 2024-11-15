require("dotenv").config();
const express = require("express");
const { sendEmail } = require("./emailservice");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

app.post("/send-email", async (req, res) => {
  const {to, subject, text} = req.body;
  if (!to || !subject || (!text)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = await sendEmail(to, subject, text);
  if (result.success) {
    res.status(200).json({ message: "Email sent successfully", messageId: result.messageId });
  } else {
    res.status(500).json({ error: "Failed to send email", details: result.error });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Email microservice running on port ${PORT}`);
});
