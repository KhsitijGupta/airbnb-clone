const mongoose = require("mongoose")
const initData = require("./data.js")
const Listing = require("../models/listing.js")

main()
    .then(() => {
        console.log("connected to mongoDB")
    })
    .catch((err) => {
        console.log(err)
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/mjProject")
}

const initDB = async () => {
    await Listing.insertMany(initData.data)
    console.log("data was initialized")
}

initDB();
