const seedSubjectsOnce = require("./seedOnBoot");
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 8080;
seedSubjectsOnce().catch(console.error);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});