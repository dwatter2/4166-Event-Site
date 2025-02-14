const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    category: {type: String, enum:["Video Games", "Tabletop / Board Game", "Club Event", "Tournament", "Other"], required: [true, "Event must be in a category"]},
    title: {type: String, required: [true, "Event must have a title"]},
    host: {type: Schema.Types.ObjectId, ref: "User"},
    startTime: {type: Date, required: [true, "Event must set a start time"]},
    endTime: {type: Date, required: [true, "Event must set an end time"]},
    details: {type: String, required: [true, "Event must have a description"]},
    location: {type: String, required: [true, "Event must specify location"]},
    image: {type: String, required: [true, "Event must have an image"]}
});

module.exports = mongoose.model("Event", eventSchema);