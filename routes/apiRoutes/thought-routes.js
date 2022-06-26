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

router
    .route('/:userId')    
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);
   
router
    .route('/:userId/:thoughtId')    
    .delete(removeThought);

module.exports = router;