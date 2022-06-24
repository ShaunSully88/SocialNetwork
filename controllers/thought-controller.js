const { Thought, User } = require('../models');

const thoughtController = {

  getAllThought(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
      },
  
    removeThought({ params}, res) {
      Thought.findOneAndDelete(
          { _id: params.id}
      )
      .then(deleteThought => {
          if (!deleteThought) {
              res.status(404).json({ message: 'No thought with this id'});
              return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: id }},
                { new: true }
              );
          }
           
      res.json(deleteThought);
      })
      .catch(err => res.json(err));
    },
  

      addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true }
        )
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!'});
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
      },

      deleteReaction({ params }, res) {
        Thought.findOneAndDelete(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionID: params.reactionID } } },
          { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
      },


    
};

module.exports = thoughtController;