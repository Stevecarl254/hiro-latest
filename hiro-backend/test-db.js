import sequelize from "./config/database.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Neon DB connected");
    process.exit(0);
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
})();