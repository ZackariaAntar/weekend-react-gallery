const express = require("express");
const router = express.Router();
// const galleryItems = require('../modules/gallery.data');
const pool = require("../modules/pool");

// DO NOT MODIFY THIS FILE FOR BASE MODE

// GET Route
router.get("/", (req, res) => {
	const getQuery = `SELECT * FROM gallery ORDER BY "id" ASC;`;

	pool.query(getQuery)
		.then((response) => {
			console.log("Successfully got data");
			res.send(response.rows);
		})
		.catch((err) => {
			console.log("Error with the get route", err);
			response.sendStatus(500);
		});
}); // END GET Route

// POST Route
router.post("/new", (req, res) => {
	const postData = req.body;
	const postQuery = `
                    INSERT INTO gallery (path, description)
                    VALUES ($1, $2);
                    `;
	pool.query(postQuery, [postData.path, postData.description])
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log("Error in post path", err);
			res.sendStatus(500);
		});
}); // END POST Route

// DELETE Route
router.delete("/delete/:id", (req, res) => {
	const idToDelete = req.params.id;
	const deleteQuery = `DELETE FROM gallery WHERE id = $1;`;
	pool.query(deleteQuery, [idToDelete])
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log("error in the delete route", error);
			res.sendStatus(500);
		});
}); // END DELETE Route

// PUT Route
router.put("/like/:id", (req, res) => {
	const idToEdit = req.params.id;
	const editQuery = `UPDATE gallery SET likes = likes + 1 WHERE id=$1;`;

	pool.query(editQuery, [idToEdit])
		.then((response) => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log("Error with the put route", error);
		});
}); // END PUT Route

module.exports = router;
