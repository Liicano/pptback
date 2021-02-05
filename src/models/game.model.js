const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const gameSchema = mongoose.Schema(
  {
    round: {
      type: Number,
      default: 1,
    },
    rules: {
      rounds: {
        type: Number,
        default: 3,
      },
      objects: {
        type: Array,
        default: [
          {
            name: 'piedra',
            kill: ['tijera'],
            killedby: ['papel'],
          },
          {
            name: 'papel',
            kill: ['piedra'],
            killedby: ['tijera'],
          },
          {
            name: 'tijera',
            kill: ['papel'],
            killedby: ['piedra'],
          },
        ],
      },
    },
    data: {
      winner: {
        type: Object,
      },
      duration: {
        type: String,
      },
      participants: {
        one: {
          type: String,
          default: '',
        },
        two: { type: String, default: '' },
      },
      rounds: {
        type: Array,
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
gameSchema.plugin(toJSON);
gameSchema.plugin(paginate);

/**
 * @typedef Game
 */
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
