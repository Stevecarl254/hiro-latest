import express from "express";
import { Equipment } from "../models/index.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const router = express.Router();

// GET all equipment
router.get("/", async (req, res) => {
  try {
    const equipmentList = await Equipment.findAll({ order: [["name", "ASC"]] });
    res.json({ data: equipmentList });
  } catch (err) {
    console.error("Error fetching equipment:", err);
    res.status(500).json({ error: err.message || "Failed to fetch equipment" });
  }
});

// POST new equipment (Admin adds)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, type, category, size } = req.body;
    if (!name || !type || !category) {
      if (req.file) {
        fs.unlinkSync(req.file.path); // Clean up uploaded file if validation fails
      }
      return res.status(400).json({ error: "Name, Type & Category required" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newEquipment = await Equipment.create({
      name,
      type,
      category,
      size: size || null,
      imageUrl,
    });

    // Emit event to clients via Socket.IO
    req.app.get("socketio")?.emit("newEquipmentAdded", newEquipment);

    res.status(201).json(newEquipment);
  } catch (err) {
    console.error("Error creating equipment:", err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: err.message || "Failed to create equipment" });
  }
});

// DELETE equipment by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const eq = await Equipment.findByPk(id);

    if (!eq) return res.status(404).json({ error: "Equipment not found" });

    await eq.destroy();

    // Emit event
    req.app.get("socketio")?.emit("equipmentDeleted", { _id: id });

    res.json({ data: eq, message: "Equipment deleted" });
  } catch (err) {
    console.error("Error deleting equipment:", err);
    res.status(500).json({ error: err.message || "Failed to delete equipment" });
  }
});

// UPDATE equipment by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, category, size } = req.body;

    const eq = await Equipment.findByPk(id);
    if (!eq) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: "Equipment not found" });
    }

    if (name) eq.name = name;
    if (type) eq.type = type;
    if (category) eq.category = category;
    if (size !== undefined) eq.size = size;

    if (req.file) {
      // Delete old image if exists
      if (eq.imageUrl) {
        const oldPath = path.join(uploadsDir, path.basename(eq.imageUrl));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      eq.imageUrl = `/uploads/${req.file.filename}`;
    }

    await eq.save();

    req.app.get("socketio")?.emit("equipmentUpdated", eq);

    res.json({ data: eq });
  } catch (err) {
    console.error("Error updating equipment:", err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: err.message || "Failed to update equipment" });
  }
});

export default router;
