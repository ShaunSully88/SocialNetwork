const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controller');



router
    .route('/')
    .get(getAllThought)
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

module.exports = router;