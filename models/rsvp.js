const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    status: {type: String, enum:["Yes", "Maybe", "No"]},
    eventId: {type: String, required: [true, "Event must have a title"]},
    hostId: {type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("RSVP", rsvpSchema);