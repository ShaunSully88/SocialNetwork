const { Thought, User } = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
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

      removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionID: params.reactionID } } },
          { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
      },

    removeThought({ params, body }, res) {
        Thought.findOneAndDelete(
            { _id: params.thoughtId}
        )
        .then(deleteThought => {
            if (!deleteThought) {
                rs.status(404).json({ message: 'No thought with this id'});
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }

    
};

module.exports = thoughtController;