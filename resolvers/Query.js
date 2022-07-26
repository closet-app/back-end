const { users } = require('../data/db');

// String, Int, Float, Boolen, Id
exports.Query = {
  hello: () => {
    return 'World';
  },
  // add an id argument
  profile: (parent, args, context) => {
    const { id } = args;
    return users.find((user) => user.id === id);
  },
};
