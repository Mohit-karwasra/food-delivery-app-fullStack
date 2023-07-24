const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();

router.post("/create", async (req, res) => {
	try {
		const id = Date.now();
		const data = {
			productId: id,
			product_name: req.body.product_name,
			product_category: req.body.product_category,
			product_price: req.body.product_price,
			imageURL: req.body.imageURL,
		};

		const response = await db.collection("products").doc(`/${id}/`).set(data);
		return res.status(200).send({ success: true, data: response });
	} catch (error) {
		return res.send({ success: false, msg: `Error: ${error}` });
	}
});

// get all products
router.get("/all", async (req, res) => {
	(async () => {
		try {
			let query = db.collection("products");
			let response = [];
			await query.get().then((querySnap) => {
				let docs = querySnap.docs;
				docs.map((doc) => {
					response.push({ ...doc.data() });
				});
				return response;
			});
			return res.status(200).send({ success: true, data: response });
		} catch (error) {
			return res.send({ success: false, msg: `Error: ${error}` });
		}
	})();
});

// delete a product
router.delete("/delete/:productId", async (req, res) => {
	const productId = req.params.productId;
	try {
		await db
			.collection("products")
			.doc(`/${productId}/`)
			.delete()
			.then((result) => {
				return res.status(200).send({ success: true, data: result });
			});
	} catch (err) {
		return res.send({ success: false, msg: `Error :${err}` });
	}
});

//create a cart
router.post("/addToCart/:userId", async (req, res) => {
	const userId = req.params.userId;
	const productId = req.body.productId;

	try {
		const doc = await db
			.collection("cartItems")
			.doc(`/${userId}/`)
			.collection("items")
			.doc(`/${productId}/`)
			.get();

		if (doc.data()) {
			const quantity = doc.data().quantity + 1;
			const updatedItem = await db
				.collection("cartItems")
				.doc(`/${userId}/`)
				.collection("items")
				.doc(`/${productId}/`)
				.update({ quantity });

			return res.status(200).send({ success: true, data: updatedItem });
		} else {
			const data = {
				productId: productId,
				product_name: req.body.product_name,
				product_category: req.body.product_category,
				product_price: req.body.product_price,
				imageURL: req.body.imageURL,
				quantity: 1,
			};

			const addItems = await db
				.collection("cartItems")
				.doc(`/${userId}/`)
				.collection("items")
				.doc(`/${productId}/`)
				.set(data);

			return res.status(200).send({ success: true, data: addItems });
		}
	} catch (error) {
		return res.send({ success: false, msg: `Error :${error}` });
	}
});

// get all the cart items for user
router.get("/getCartItems/:user_id", async (req, res) => {
	const userId = req.params.user_id;
	(async () => {
		try {
			let query = db.collection("cartItems").doc(`/${userId}/`).collection("items");

			let response = [];

			await query.get().then((querySnap) => {
				let docs = querySnap.docs;

				docs.map((doc) => response.push({ ...doc.data() }));
				return response;
			});
			return res.status(200).send({ success: true, data: response });
		} catch (error) {
			return res.send({ success: false, msg: `Error :${error}` });
		}
	})();
});

module.exports = router;
