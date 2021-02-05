const express = require('express');
const gameController = require('../../controllers/game.controller');

const router = express.Router();

router.route('/').post(gameController.createGame).get(gameController.getGames);

router.route('/user/:username').get(gameController.userGames);

router.route('/users').get(gameController.getAllUsers);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Juegos
 *   description: Manejo de la data de los juegos.
 */

/**
 * @swagger
 * path:
 *  /games:
 *    post:
 *      summary: Ingresar un juego a BBDD
 *      description: Ingresa un juego ya concluido a la base de datos.
 *      tags: [Juegos]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - rules
 *                - data
 *              properties:
 *                rules:
 *                  type: object
 *                  description: Objeto con las reglas del juego.
 *                data:
 *                  type: object
 *                  description: Objecto con la data del juego.
 *
 *              example:
 *                round: 1
 *                rules: { rounds: 3, objects: [ { name: "piedra", kill: ["tijera"], killedby: ["papel"], }, { name: "papel", kill: ["piedra"], killedby: ["tijera"], }, { name: "tijera", kill: ["papel"], killedby: ["piedra"], }, ], }
 *                data: { winner: 'liicano', duration: "", participants: { one: "liicano", two: "daniela", }, rounds: [{ user: 'liicano', move: 'piedra', },{ user: 'daniela', move: 'tijera', }], }
 *
 *      responses:
 *        "201":
 *          description: Creado
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Juegos'
 *
 *
 *    get:
 *      summary: Devuelve todos los juegos
 *      description: Get que devuelve los juegos con ganador y perdedor.
 *      tags: [Juegos]
 *      parameters:
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of users
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Juegos'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *
 *
 *
 */

/**
 * @swagger
 * path:
 *  /games/user/{username}:
 *    get:
 *      summary: Get de usuario
 *      description: Get que retorna los juegos de un usuario (Ganados, perdidos, totales).
 *      tags: [Juegos]
 *      parameters:
 *        - in: path
 *          name: username
 *          required: true
 *          schema:
 *            type: string
 *          description: Username
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Juegos'
 
 */

/**
 * @swagger
 * path:
 *  /games/users/:
 *    get:
 *      summary: Get de usuarios
 *      description: Get que retorna todos los usernames que han jugado
 *      tags: [Juegos]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Juegos'
 
 */
