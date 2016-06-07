var express = require('express');
var router = express.Router();

var multer  = require('multer');
var upload = multer({ dest: './uploads/' });

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');



/* GET home page. */
router.get('/', sessionController.autologout, function(req, res, next) {
  res.render('index');
});


router.get('/author', sessionController.autologout, function(req, res, next) {
  res.render('author');
  //res.render('author', {authors: 'Miguel Sánchez Martín'});
});

// Autoload de parametros
router.param('quizId', quizController.load);  // autoload :quizId
router.param('userId', userController.load);  // autoload :userId
router.param('commentId', commentController.load);  // autoload :commentId


// Definición de rutas de sesion
router.get('/session',    sessionController.new);     // formulario login
router.post('/session',   sessionController.create);  // crear sesión
router.delete('/session', sessionController.destroy); // destruir sesión


// Definición de rutas de cuenta
router.get('/users',                    sessionController.autologout, userController.index);   // listado usuarios
router.get('/users/:userId(\\d+)',      sessionController.autologout, userController.show);    // ver un usuario
router.get('/users/new',                sessionController.autologout, userController.new);     // formulario sign un
router.post('/users',                   sessionController.autologout, userController.create);     // registrar usuario
router.get('/users/:userId(\\d+)/edit', sessionController.autologout, sessionController.loginRequired, 
										sessionController.adminOrMyselfRequired, 
										userController.edit);     // editar información de cuenta
router.put('/users/:userId(\\d+)',      sessionController.autologout, sessionController.loginRequired, 
										sessionController.adminOrMyselfRequired, 
										userController.update);   // actualizar información de cuenta
router.delete('/users/:userId(\\d+)',   sessionController.autologout, sessionController.loginRequired, 
										sessionController.adminAndNotMyselfRequired, 
										userController.destroy);  // borrar cuenta

// Definición de rutas de /quizzes
router.get('/quizzes.:format?',                     sessionController.autologout, 	quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?',       	sessionController.autologout, quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', 	sessionController.autologout, quizController.check);
router.get('/quizzes/new',                 	sessionController.autologout, sessionController.loginRequired, 
											quizController.new);
router.post('/quizzes',                    	sessionController.autologout, sessionController.loginRequired, 
											upload.single('image'),
											quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',  	sessionController.autologout, sessionController.loginRequired, 
										   	quizController.ownershipRequired, 
										   	quizController.edit);
router.put('/quizzes/:quizId(\\d+)',       	sessionController.autologout, sessionController.loginRequired, 
											quizController.ownershipRequired, 
											upload.single('image'),
											quizController.update);
router.delete('/quizzes/:quizId(\\d+)',    	sessionController.autologout, sessionController.loginRequired, 
											quizController.ownershipRequired, 
											quizController.destroy);

// Definición de rutas de comentarios
router.get('/quizzes/:quizId(\\d+)/comments/new',  sessionController.autologout, sessionController.loginRequired, 
	                                               commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments',     sessionController.autologout, sessionController.loginRequired, 
	                                               commentController.create);
router.put('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/accept', sessionController.autologout, 
	                                               sessionController.loginRequired, 
	                                               quizController.ownershipRequired, 
	                                               commentController.accept);

module.exports = router;