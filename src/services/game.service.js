const httpStatus = require('http-status');
const { Game } = require('../models');
const ApiError = require('../utils/ApiError');

// GET - TODOS LOS JUEGOS
const queryGames = async (filter, options) => {
  const games = await Game.paginate(filter, options);
  return games;
};

// POST - NUEVO JUEGO
const createGame = async (gameBody) => {
  const game = await Game.create(gameBody);
  return game;
};

// GET - JUEGOS DE UN USUARIO SEPARADOS POR GANADOS / PERDIDOS
const userGames = async (username) => {
  const won = await Game.find({ 'data.winner': username });
  const lost = await Game.find({ $and: [{ 'data.winner': { $nin: [username] } }, { 'data.rounds.loser.name': username }] });

  return { won, lost, total: won.length + lost.length };
};

// GET - USUARIOS QUE HAN JUGADO
const getAllUsers = async () => {
  const users = await Game.find().select('data');

  let first_users = users.map((u) => u.data.participants.one);
  let seconds_users = users.map((u) => u.data.participants.two);
  let allUsers = [...new Set([...first_users, ...seconds_users])];

  return { allUsers };
};

module.exports = {
  queryGames,
  createGame,
  userGames,
  getAllUsers,
};
