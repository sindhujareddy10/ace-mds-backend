require("dotenv").config();
const app = require("./app");

const PORT = 8080;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
