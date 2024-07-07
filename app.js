const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require('method-override')
const Listing = require("./models/listing.js")
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")

//for delete and put request
app.use(methodOverride("_method"))
// ejs(html) file linking
app.set("views", path.join(__dirname, "views"))
app.set("views engine", "ejs")
//ejs mate
app.engine("ejs",ejsMate)
// css file linking
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

//Mongoose connectioin

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

//index path(home page)
app.get("/listings", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("./listing/index.ejs", { allListing });
})
//Adding list path
app.get("/listings/new", (req, res) => {
    res.render("listing/new.ejs");
})
//Show path
app.get("/listings/:id", async (req, res) => {
    let {id}  = req.params;
    console.log(id)
    const item = await Listing.findById(id);
    res.render("listing/show.ejs", { item });
})
//Reciving data and storing to DB
app.post("/listings", async (req, res) => {

    let listitem = await new Listing(req.body.listing)
    listitem.save()
        .then(() => {
            console.log("done")
        })
        .catch((err) => {
            console.log(err);
        })
    res.redirect("/listings")
})
//edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id)
    res.render("listing/edit.ejs", { data });
})
//Update route
app.put("/listings/:id/update", async (req, res) => {
    let new_data = req.body;
    console.log(new_data)
    let { id } = req.params
    await Listing.findByIdAndUpdate(id, { ...new_data });
    res.redirect(`/listings/${id}`)
})
//Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params
    let deleted_data = await Listing.findByIdAndDelete(id)
    console.log(deleted_data)
    res.redirect("/listings")
})
//root path
app.get("/", (req, res) => {
    res.send("root path is ready")
})
//server Listening
app.listen(8080, () => {
    console.log("app is listening on 8080");
})

