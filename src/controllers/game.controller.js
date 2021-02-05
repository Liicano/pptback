const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { gameService } = require('../services');

const getGames = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await gameService.queryGames(filter, options);
  res.send(result);
});

const createGame = catchAsync(async (req, res) => {
  const game = await gameService.createGame(req.body);
  res.status(httpStatus.CREATED).send(game);
});

const userGames = catchAsync(async (req, res) => {
  const result = await gameService.userGames(req.params.username);
  res.send(result);
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await gameService.getAllUsers();
  res.send(result);
});

module.exports = {
  getGames,
  createGame,
  userGames,
  getAllUsers,
};
