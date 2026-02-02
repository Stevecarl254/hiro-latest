import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import User from "./src/models/User.js";

dotenv.config();

(async () => {
  try {
    await sequelize.authenticate();

    const admin = await User.findOne({
      where: { email: "admin@hiro.co.ke" },
    });

    if (!admin) {
      console.log("❌ Admin NOT found");
      process.exit(1);
    }

    console.log("✅ Admin found");
    console.log("Role:", admin.role);
    console.log("Hashed password:", admin.password);

    const isMatch = await admin.comparePassword("hirocateringservices");

    console.log("Password match:", isMatch);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
