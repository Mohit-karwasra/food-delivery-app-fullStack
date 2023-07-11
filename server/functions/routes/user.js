const router = require("express").Router();
const admin = require("firebase-admin");

router.get("/", (req, res) => {
	return res.send("Inside user router");
});

router.get("/jwtVerification", async (req, res) => {
	if (!req.headers.authorization) {
		return res.status(500).send({ msg: "Autherization token not found" });
	}

	const token = req.headers.authorization.split(" ")[1];
	// return res.status(200).send({ token: token });
	try {
		const decodedValue = await admin.auth().verifyIdToken(token);
		if (!decodedValue) {
			return res.status(500).json({ success: false, msg: "Unautherized value" });
		}

		return res.status(200).json({ success: true, data: decodedValue });
	} catch (err) {
		return res.send({ success: false, msg: `Error in extracting token : ${err}` });
	}
});

module.exports = router;
