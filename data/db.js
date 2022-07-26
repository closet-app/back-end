const { v4 } = require('uuid');

const users = [
  {
    id: '114c4a06-b411-40f3-a6a3-83578f840122',
    username: 'hehe ho ho',
    location: 'murica',
    height: 23,
    weight: 124,
    bottomSize: 12,
    topSize: 19,
    showSize: 12,
    reviews: [],
    closet: [],
  },
  {
    id: v4(),
    username: 'hehe ho ho',
    location: 'murica',
    height: 23,
    weight: 124,
    bottomSize: 12,
    topSize: 19,
    showSize: 12,
    reviews: [],
    closet: [],
  },
  {
    id: v4(),
    username: 'hehe ho ho',
    location: 'murica',
    height: 23,
    weight: 124,
    bottomSize: 12,
    topSize: 19,
    showSize: 12,
    reviews: [],
    closet: [],
  },
];

module.exports = {
  users,
};
