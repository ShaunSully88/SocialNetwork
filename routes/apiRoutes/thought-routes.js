const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    deleteReaction
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

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    
router
    .route('/:thoughtId/:reactionId')
    .delete(deleteReaction)    

module.exports = router;