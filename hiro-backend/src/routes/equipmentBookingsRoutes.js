import express from "express";
import EquipmentBooking from "../models/EquipmentBooking.js";

const router = express.Router();

// --- GET all bookings ---
router.get("/", async (req, res) => {
  try {
    const bookings = await EquipmentBooking.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- POST create new booking ---
router.post("/", async (req, res) => {
  try {
    const { fullName, phone, location, date, selectedEquipments } = req.body;

    // Validate inputs
    if (!fullName || !phone || !location || !date || !selectedEquipments || selectedEquipments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and at least one equipment must be selected.",
      });
    }

    const newBooking = await EquipmentBooking.create({
      fullName,
      phone,
      location,
      date,
      items: selectedEquipments,
      status: "pending",
    });

    /* -------- SOCKET EVENT -------- */
    const io = req.app.get("socketio");
    if (io) io.emit("newEquipmentBooking", newBooking);

    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- PATCH update booking status ---
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await EquipmentBooking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });

    booking.status = status;
    await booking.save();
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- DELETE booking ---
router.delete("/:id", async (req, res) => {
  try {
    const booking = await EquipmentBooking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });

    await booking.destroy();
    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
