/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

require("dotenv").config();
const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// body parser for JSON data

app.use(express.json());

// cross origin enable
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
	res.set("Access-Control-Allow-Origin", "*");
	next();
});

// firebase credentials admin
admin.initializeApp({
	credential: admin.credential.cert(serviceAccountKey),
});

// api endpoints
app.get("/", (req, res) => {
	return res.send("Hello app");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productRoute = require("./routes/product");
app.use("/api/products", productRoute);

exports.app = functions.https.onRequest(app);
