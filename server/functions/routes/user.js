const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

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

const listAllUsers = (nextPageToken) => {
	// List batch of users, 1000 at a time.
	admin
		.auth()
		.listUsers(1000, nextPageToken)
		.then((listuserresult) => {
			listuserresult.users.forEach((rec) => {
				data.push(rec.toJSON());
			});
			if (listuserresult.pageToken) {
				listALlUsers(listuserresult.pageToken);
			}
		})
		.catch((er) => console.log(er));
};
// Start listing users from the beginning, 1000 at a time.
listAllUsers();

router.get("/all", async (req, res) => {
	listAllUsers();
	try {
		return res.status(200).send({ success: true, data: data, dataCount: data.length });
	} catch (error) {
		return res.send({
			success: false,
			msg: `Error in listing users : ${error}`,
		});
	}
});

// router.get("/all", async (req, res) => {
// 	try {
// 		// Fetch the users and await the result before sending the response
// 		const listuserresult = await admin.auth().listUsers(1000);

// 		// Convert user records to JSON and send the response
// 		const data = listuserresult.users.map((rec) => rec.toJSON());
// 		return res.status(200).send({ success: true, data: data, dataCount: data.length });
// 	} catch (error) {
// 		return res.send({
// 			success: false,
// 			msg: `Error in listing users : ${error}`,
// 		});
// 	}
// });

module.exports = router;
