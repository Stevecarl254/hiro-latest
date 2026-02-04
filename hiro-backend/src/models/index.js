import User from "./User.js";
import Staff from "./Staff.js";
import Service from "./Service.js";
import Booking from "./Booking.js";
import Gallery from "./Gallery.js";
import Quote from "./Quote.js";
import Message from "./Message.js";
import EquipmentBooking from "./EquipmentBooking.js";
import Equipment from "./Equipment.js";

const initializeAssociations = () => {
  User.hasMany(Staff, { foreignKey: "addedById", as: "staffAddedBy" });
  Staff.belongsTo(User, { foreignKey: "addedById", as: "addedBy" });

  User.hasMany(Booking, { foreignKey: "userId", as: "userBookings" });
  Booking.belongsTo(User, { foreignKey: "userId", as: "bookingUser" });

  Staff.hasMany(Booking, { foreignKey: "staffId", as: "staffBookings" });
  Booking.belongsTo(Staff, { foreignKey: "staffId", as: "bookingStaff" });

  Service.hasMany(Booking, { foreignKey: "serviceId", as: "serviceBookings" });
  Booking.belongsTo(Service, { foreignKey: "serviceId", as: "bookingService" });
};

export {
  User,
  Staff,
  Service,
  Booking,
  Gallery,
  Quote,
  Message,
  EquipmentBooking,
  Equipment,
  initializeAssociations,
};
