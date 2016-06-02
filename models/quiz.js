module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
         { question: { type: DataTypes.STRING,
                       validate: { notEmpty: {msg: "Falta Pregunta"}}
                        
         },answer:   { type: DataTypes.STRING,
                       validate: { notEmpty: {msg: "Falta Respuesta"}}
                        }
});
};

//datos de la BBDD que se modifican desde el controller