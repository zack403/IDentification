const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const upload = require('../middleware/multer');
const imageUpload = require('../helper/imageUpload');

let imageUrl;


router.post('/', upload.single('image'), async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let {description} = req.body;
    description = description.toLowerCase();
    if(req.file){
        const result = await imageUpload(req.file.path);
        if(result) {
          imageUrl = result.url;
        }
        else {
            return res.status(500).send("Error while trying to process your request, try again...");
        }
    }
    const {rows: created} = await User.save(description, imageUrl);
    if ( created[0] ) {
        const {id, description, image} = created[0];
        res.status(201).json({
            status : 201,
            data : {
                message: "Successfuly Posted",
                id,
                description,
                image
            }
        })
    }
});


router.get('/', async (req, res) => {
    let search = req.query.search;
    if(search) {
        search = search.toLowerCase();
        const {rows} = await User.find(search);
        if(rows.length <= 0) {
            return res.status(404).send("No results");
        }
            return res.status(200).send(rows);
    }
    const {rows} = await User.findAll();
    if(rows.length <= 0) {
        return res.status(404).send("No Record Found");
    }
    return res.status(200).send(rows);
});

module.exports = router;
