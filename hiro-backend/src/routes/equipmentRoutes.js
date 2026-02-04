import express from "express";
import { Equipment } from "../models/index.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

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
router.post("/", async (req, res) => {
  try {
    const { name, type, category, size } = req.body;
    if (!name || !type || !category) {
      return res.status(400).json({ error: "Name, Type & Category required" });
    }

    const newEquipment = await Equipment.create({
      name,
      type,
      category,
      size: size || null,
    });

    // Emit event to clients via Socket.IO
    req.app.get("socketio")?.emit("newEquipmentAdded", newEquipment);

    res.status(201).json(newEquipment);
  } catch (err) {
    console.error("Error creating equipment:", err);
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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, category, size } = req.body;

    const eq = await Equipment.findByPk(id);
    if (!eq) return res.status(404).json({ error: "Equipment not found" });

    if (name) eq.name = name;
    if (type) eq.type = type;
    if (category) eq.category = category;
    if (size !== undefined) eq.size = size;

    await eq.save();

    req.app.get("socketio")?.emit("equipmentUpdated", eq);

    res.json({ data: eq });
  } catch (err) {
    console.error("Error updating equipment:", err);
    res.status(500).json({ error: err.message || "Failed to update equipment" });
  }
});

export default router;
