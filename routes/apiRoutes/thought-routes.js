const router = require('express').Router();

const {
    createThought,
    removeThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
    .route('/:userId')
    .post(createThought);

router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(deleteReaction);

module.exports = router;