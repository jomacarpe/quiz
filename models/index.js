var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite: 
var url, storage;
if(!process.env.DATABASE_URL){
	url= "sqlite:///";
	storage= "quiz.sqlite";
}else {
	url=process.env.DATABASE_URL;
	storage=process.env.DATABASE_STORAGE || "";
}
var sequelize = new Sequelize(url,{storage: storage,
                                   omitNull: true});

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
var Comment = sequelize.import(path.join(__dirname,'comment'));
var User = sequelize.import(path.join(__dirname,'user'));
// Relaciones entre modelos
Quiz.hasMany(Comment, {foreignKey: 'QuizId'});
Comment.belongsTo(Quiz, {foreignKey: 'QuizId'});
// Relacion 1 a N entre User y Quiz:
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

exports.Quiz = Quiz; // exportar definición de tabla Quiz 
exports.Comment = Comment; // exportar definición de tabla Comments
exports.User = User;