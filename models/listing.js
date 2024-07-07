const mongoose = require("mongoose")
const schema = mongoose.Schema

const listingSchema = new schema({
    title:
    {
        type: String,
        require: true,
    },
    description:
    {
        type: String,
    },
    image:
    {
        type: String,
        default: "https://unsplash.com/photos/a-small-cabin-in-the-middle-of-a-forest-qXbueROjM9I"
    },
    price:
    {
        type: Number,
    },
    location:
    {
        type: String,
    },
    country:
    {
        type: String,
    },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;