var require = meteorInstall({"server":{"initializers":{"db.initializer.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/initializers/db.initializer.js                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
                                                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"users.initializer.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/initializers/users.initializer.js                                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.startup(function () {                                                                                  // 1
  if (Meteor.users.find().count() === 0) {                                                                    // 2
    var usuario_id = Accounts.createUser({                                                                    // 3
      username: 'admin',                                                                                      // 4
      password: '123qwe',                                                                                     // 5
      profile: {                                                                                              // 6
        nombre: 'Super Administrador'                                                                         // 7
      }                                                                                                       //
    });                                                                                                       //
                                                                                                              //
    Roles.addUsersToRoles(usuario_id, 'sAdmin');                                                              // 11
                                                                                                              //
    var adminInicial = Accounts.createUser({                                                                  // 13
      username: 'admin1',                                                                                     // 14
      password: '123qwe',                                                                                     // 15
      profile: {                                                                                              // 16
        nombre: 'Administrador General'                                                                       // 17
      }                                                                                                       //
    });                                                                                                       //
    Roles.addUsersToRoles(adminInicial, 'admin');                                                             // 20
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"getArchivo.js":["docxtemplater","jszip","better-unoconv","fibers/future","fs","path",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/methods/getArchivo.js                                                                               //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.methods({                                                                                              // 1
                                                                                                              //
  report: function report(params) {                                                                           // 3
    var Docxtemplater = require('docxtemplater');                                                             // 4
    var JSZip = require('jszip');                                                                             // 5
    var unoconv = require('better-unoconv');                                                                  // 6
    var future = require('fibers/future');                                                                    // 7
    var fs = require('fs');                                                                                   // 8
    var objParse = function objParse(datos, obj, prof) {                                                      // 9
      if (!obj) {                                                                                             // 10
        obj = {};                                                                                             // 11
      }                                                                                                       //
      _.each(datos, function (d, dd) {                                                                        // 13
        var i = prof ? prof + dd : dd;                                                                        // 14
        if (_.isDate(d)) {                                                                                    // 15
          obj[i] = moment(d).format('DD-MM-YYYY');                                                            // 16
        } else if (_.isArray(d)) {                                                                            //
          obj[i] = arrParse(d, []);                                                                           // 18
        } else if (_.isObject(d)) {                                                                           //
          objParse(d, obj, i + '.');                                                                          // 20
        } else {                                                                                              //
          obj[i] = d;                                                                                         // 22
        }                                                                                                     //
      });                                                                                                     //
      return obj;                                                                                             // 25
    };                                                                                                        //
                                                                                                              //
    var arrParse = function arrParse(datos, arr) {                                                            // 28
      _.each(datos, function (d) {                                                                            // 29
        if (_.isArray(d)) {                                                                                   // 30
          arr.push(arrParse(d, []));                                                                          // 31
        } else if (_.isObject(d)) {                                                                           //
          var obj = objParse(d, {});                                                                          // 33
          arr.push(obj);                                                                                      // 34
        } else {                                                                                              //
          arr.push(!_.isDate(d) ? d : moment(d).format('DD-MM-YYYY'));                                        // 36
        }                                                                                                     //
      });                                                                                                     //
      return arr;                                                                                             // 39
    };                                                                                                        //
                                                                                                              //
    params.datos = objParse(params.datos);                                                                    // 42
    params.datos.fechaReporte = moment().format('DD-MM-YYYY');                                                // 43
    var templateType = params.type === 'pdf' ? '.docx' : params.type === 'excel' ? '.xlsx' : '.docx';         // 44
    if (Meteor.isDevelopment) {                                                                               // 45
      var path = require('path');                                                                             // 46
      var publicPath = path.resolve('.').split('.meteor')[0];                                                 // 47
      var templateRoute = publicPath + "public/templates/" + params.templateNombre + templateType;            // 48
    } else {                                                                                                  //
      var publicPath = '/home/casserole/bundle/programs/web.browser/app/';                                    // 50
      var templateRoute = publicPath + "templates/" + params.templateNombre + templateType;                   // 51
    }                                                                                                         //
                                                                                                              //
    var content = fs.readFileSync(templateRoute, "binary");                                                   // 54
    var res = new future();                                                                                   // 55
    var zip = new JSZip(content);                                                                             // 56
    var doc = new Docxtemplater().loadZip(zip).setOptions({                                                   // 57
      nullGetter: function nullGetter(part) {                                                                 // 58
        if (!part.module) {                                                                                   // 59
          return "";                                                                                          // 60
        }                                                                                                     //
        if (part.module === "rawxml") {                                                                       // 62
          return "";                                                                                          // 63
        }                                                                                                     //
        return "";                                                                                            // 65
      }                                                                                                       //
    });                                                                                                       //
                                                                                                              //
    doc.setData(params.datos);                                                                                // 69
    doc.render();                                                                                             // 70
    var buf = doc.getZip().generate({ type: "nodebuffer" });                                                  // 71
    if (params.type == 'pdf') {                                                                               // 72
      var rutaOutput = publicPath + (Meteor.isDevelopment ? ".outputs/" : "templates/") + params.reportNombre + moment().format('x') + templateType;
      fs.writeFileSync(rutaOutput, buf);                                                                      // 74
      unoconv.convert(rutaOutput, 'pdf', function (err, result) {                                             // 75
        if (!err) {                                                                                           // 76
          fs.unlink(rutaOutput);                                                                              // 77
          res['return']({ uri: 'data:application/pdf;base64,' + result.toString('base64'), nombre: params.reportNombre + '.pdf' });
        } else {                                                                                              //
          res['return']({ err: err });                                                                        // 80
        }                                                                                                     //
      });                                                                                                     //
    } else {                                                                                                  //
      var mime;                                                                                               // 84
      if (templateType === '.xlsx') {                                                                         // 85
        mime = 'vnd.openxmlformats-officedocument.spreadsheetml.sheet';                                       // 86
      } else {                                                                                                //
        mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';                     // 88
      }                                                                                                       //
      res['return']({ uri: 'data:application/' + mime + ';base64,' + buf.toString('base64'), nombre: params.reportNombre + templateType });
    }                                                                                                         //
    return res.wait();                                                                                        // 92
  }                                                                                                           //
                                                                                                              //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"getDatos.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/methods/getDatos.js                                                                                 //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.methods({                                                                                              // 1
                                                                                                              //
	getUnidad: function getUnidad(id) {                                                                          // 3
		var objeto = Unidades.findOne({ _id: id });                                                                 // 4
		return objeto;                                                                                              // 5
	}                                                                                                            //
                                                                                                              //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"templates.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/methods/templates.js                                                                                //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
if (Meteor.isClient) {                                                                                        // 1
    Template.script_template.onRendered(function () {                                                         // 2
        $(document).ready(function () {                                                                       // 3
            $('.js-example-basic-single').select2();                                                          // 4
        });                                                                                                   //
    });                                                                                                       //
}                                                                                                             //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"usuariosMethods.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/methods/usuariosMethods.js                                                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.methods({                                                                                              // 1
	createUsuario: function createUsuario(usuario, rol) {                                                        // 2
		var usuario_id = Accounts.createUser({                                                                      // 3
			username: usuario.username,                                                                                // 4
			password: usuario.password,                                                                                // 5
			profile: usuario.profile                                                                                   // 6
		});                                                                                                         //
                                                                                                              //
		Roles.addUsersToRoles(usuario_id, rol);                                                                     // 9
		return usuario_id;                                                                                          // 10
	},                                                                                                           //
	userIsInRole: function userIsInRole(usuario, rol, grupo, vista) {                                            // 12
		if (!Roles.userIsInRole(usuario, rol, grupo)) {                                                             // 13
			throw new Meteor.Error(403, "Usted no tiene permiso para entrar a " + vista);                              // 14
		}                                                                                                           //
	},                                                                                                           //
	updateUsuario: function updateUsuario(usuario, rol) {                                                        // 17
		var user = Meteor.users.findOne({ "username": usuario.username });                                          // 18
		Meteor.users.update({ _id: user._id }, { $set: {                                                            // 19
				username: usuario.username,                                                                               // 20
				roles: [rol],                                                                                             // 21
				profile: usuario.profile                                                                                  // 22
			} });                                                                                                      //
		if (usuario.password != undefined) {                                                                        // 24
			Accounts.setPassword(user._id, usuario.password, { logout: false });                                       // 25
		}                                                                                                           //
	}                                                                                                            //
                                                                                                              //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"startup":{"loadModels.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/startup/loadModels.js                                                                               //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.startup(function () {});                                                                               // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"alumnosPublish.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/alumnosPublish.js                                                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("alumnos", function (params) {                                                                 // 1
    return Alumnos.find();                                                                                    // 2
});                                                                                                           //
                                                                                                              //
Meteor.publish("buscarAlumnos", function (options) {                                                          // 5
    if (options != undefined) {                                                                               // 6
        var selector = {                                                                                      // 7
            "NombreCompleto": { '$regex': '.*' + options.where.nombreCompleto || '' + '.*', '$options': 'i' }
        };                                                                                                    //
        return Alumnos.find(selector, options.options);                                                       // 11
    }                                                                                                         //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categoriasPublish.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/categoriasPublish.js                                                                                //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("categorias", function (params) {                                                              // 1
  return Categorias.find(params);                                                                             // 2
});                                                                                                           //
                                                                                                              //
Meteor.publish("listaCategorias", function () {                                                               // 5
  return Categorias.find();                                                                                   // 6
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"departamentosPublish.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/departamentosPublish.js                                                                             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("departamentos", function (params) {                                                           // 1
    return Departamentos.find(params);                                                                        // 2
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"librosPublish.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/librosPublish.js                                                                                    //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("libros", function (params) {                                                                  // 1
  return Libros.find(params);                                                                                 // 2
});                                                                                                           //
                                                                                                              //
Meteor.publish("listaLibros", function () {                                                                   // 5
  return Libros.find();                                                                                       // 6
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"maestrosPublish.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/maestrosPublish.js                                                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("maestros", function (params) {                                                                // 1
    return Maestros.find();                                                                                   // 2
});                                                                                                           //
                                                                                                              //
Meteor.publish("buscarMaestros", function (options) {                                                         // 5
    if (options != undefined) {                                                                               // 6
        var selector = {                                                                                      // 7
            "NombreCompleto": { '$regex': '.*' + options.where.nombreCompleto || '' + '.*', '$options': 'i' }
        };                                                                                                    //
        return Maestros.find(selector, options.options);                                                      // 11
    }                                                                                                         //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"materiasPublish.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/materiasPublish.js                                                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("materias", function (params) {                                                                // 1
  return Materias.find(params);                                                                               // 2
});                                                                                                           //
                                                                                                              //
Meteor.publish("listaMaterias", function () {                                                                 // 5
  return Materias.find();                                                                                     // 6
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"planEstudioPublish.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/planEstudioPublish.js                                                                               //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("planesEstudio", function (params) {                                                           // 1
    return PlanesEstudio.find(params);                                                                        // 2
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"programasEducativos.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/programasEducativos.js                                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("programasEducativos", function (params) {                                                     // 1
    return ProgramasEducativos.find(params);                                                                  // 2
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unidadesPublish.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/unidadesPublish.js                                                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("unidades", function (params) {                                                                // 1
    return Unidades.find(params);                                                                             // 2
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"usuariosPublish.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/usuariosPublish.js                                                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("usuarios", function (params) {                                                                // 1
  return Meteor.users.find(params);                                                                           // 2
});                                                                                                           //
                                                                                                              //
Meteor.publish('usuariosCatalogo', function () {                                                              // 5
  return Roles.getUsersInRole('Maestro');                                                                     // 6
});                                                                                                           //
                                                                                                              //
Meteor.publish('listaUsuarios', function () {                                                                 // 9
  return Meteor.users.find({ "roles": "Maestro" });                                                           // 10
});                                                                                                           //
                                                                                                              //
Meteor.publish('listaCoordinadores', function () {                                                            // 13
  return Meteor.users.find({ "roles": "Coordinador" });                                                       // 14
});                                                                                                           //
                                                                                                              //
Meteor.publish('listaAdministradores', function () {                                                          // 17
  return Meteor.users.find({ "roles": "Administrador" });                                                     // 18
});                                                                                                           //
                                                                                                              //
Meteor.publish('listaAdministradoresPorUnidad', function (params) {                                           // 21
  return Meteor.users.find(params);                                                                           // 22
});                                                                                                           //
                                                                                                              //
Meteor.publish('listaMaestrosPorUnidad', function (params) {                                                  // 26
  return Meteor.users.find(params);                                                                           // 27
});                                                                                                           //
                                                                                                              //
Meteor.publish("buscarUsuarios", function (options) {                                                         // 31
  if (options != undefined) {                                                                                 // 32
    var selector = {                                                                                          // 33
      "username": { '$regex': '.*' + options.where.username || '' + '.*', '$options': 'i' }                   // 34
    };                                                                                                        //
    return Meteor.users.find(selector, options.options);                                                      // 37
  }                                                                                                           //
});                                                                                                           //
                                                                                                              //
Meteor.publish('listaCoordinadoresPorUnidad', function (params) {                                             // 41
  return Meteor.users.find(params);                                                                           // 42
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"modelos":{"alumnos.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// modelos/alumnos.js                                                                                         //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Alumnos = new Mongo.Collection("alumnos");                                                                    // 1
Alumnos.allow({                                                                                               // 2
  insert: function insert() {                                                                                 // 3
    return true;                                                                                              // 3
  },                                                                                                          //
  update: function update() {                                                                                 // 4
    return true;                                                                                              // 4
  },                                                                                                          //
  remove: function remove() {                                                                                 // 5
    return true;                                                                                              // 5
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categorias.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// modelos/categorias.js                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Categorias = new Mongo.Collection("categorias");                                                              // 1
Categorias.allow({                                                                                            // 2
  insert: function insert() {                                                                                 // 3
    return true;                                                                                              // 3
  },                                                                                                          //
  update: function update() {                                                                                 // 4
    return true;                                                                                              // 4
  },                                                                                                          //
  remove: function remove() {                                                                                 // 5
    return true;                                                                                              // 5
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"departamentos.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// modelos/departamentos.js                                                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Departamentos = new Mongo.Collection("departamentos");                                                        // 1
Departamentos.allow({                                                                                         // 2
  insert: function insert() {                                                                                 // 3
    return true;                                                                                              // 3
  },                                                                                                          //
  update: function update() {                                                                                 // 4
    return true;                                                                                              // 4
  },                                                                                                          //
  remove: function remove() {                                                                                 // 5
    return true;                                                                                              // 5
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"libros.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// modelos/libros.js                                                                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Libros = new Mongo.Collection("libros");                                                                      // 1
Libros.allow({                                                                                                // 2
  insert: function insert() {                                                                                 // 3
    return true;                                                                                              // 3
  },                                                                                                          //
  update: function update() {                                                                                 // 4
    return true;                                                                                              // 4
  },                                                                                                          //
  remove: function remove() {                                                                                 // 5
    return true;                                                                                              // 5
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"maestros.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// modelos/maestros.js                                                                                        //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Maestros = new Mongo.Collection("maestros");                                                                  // 1
Maestros.allow({                                                                                              // 2
  insert: function insert() {                                                                                 // 3
    return true;                                                                                              // 3
  },                                                                                                          //
  update: function update() {                                                                                 // 4
    return true;                                                                                              // 4
  },                                                                                                          //
  remove: function remove() {                                                                                 // 5
    return true;                                                                                              // 5
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"materias.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// modelos/materias.js                                                                                        //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Materias = new Mongo.Collection("materias");                                                                  // 1
Materias.allow({                                                                                              // 2
  insert: function insert() {                                                                                 // 3
    return true;                                                                                              // 3
  },                                                                                                          //
  update: function update() {                                                                                 // 4
    return true;                                                                                              // 4
  },                                                                                                          //
  remove: function remove() {                                                                                 // 5
    return true;                                                                                              // 5
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"planEstudio.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// modelos/planEstudio.js                                                                                     //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
PlanesEstudio = new Mongo.Collection("planesdeEstudio");                                                      // 1
PlanesEstudio.allow({                                                                                         // 2
  insert: function insert() {                                                                                 // 3
    return true;                                                                                              // 3
  },                                                                                                          //
  update: function update() {                                                                                 // 4
    return true;                                                                                              // 4
  },                                                                                                          //
  remove: function remove() {                                                                                 // 5
    return true;                                                                                              // 5
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"programasEducativos.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// modelos/programasEducativos.js                                                                             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
ProgramasEducativos = new Mongo.Collection("programasEducativos");                                            // 1
ProgramasEducativos.allow({                                                                                   // 2
  insert: function insert() {                                                                                 // 3
    return true;                                                                                              // 3
  },                                                                                                          //
  update: function update() {                                                                                 // 4
    return true;                                                                                              // 4
  },                                                                                                          //
  remove: function remove() {                                                                                 // 5
    return true;                                                                                              // 5
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unidades.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// modelos/unidades.js                                                                                        //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Unidades = new Mongo.Collection("unidades");                                                                  // 1
Unidades.allow({                                                                                              // 2
  insert: function insert() {                                                                                 // 3
    return true;                                                                                              // 3
  },                                                                                                          //
  update: function update() {                                                                                 // 4
    return true;                                                                                              // 4
  },                                                                                                          //
  remove: function remove() {                                                                                 // 5
    return true;                                                                                              // 5
  }                                                                                                           //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html"]});
require("./server/initializers/db.initializer.js");
require("./server/initializers/users.initializer.js");
require("./server/methods/getArchivo.js");
require("./server/methods/getDatos.js");
require("./server/methods/templates.js");
require("./server/methods/usuariosMethods.js");
require("./server/startup/loadModels.js");
require("./modelos/alumnos.js");
require("./modelos/categorias.js");
require("./modelos/departamentos.js");
require("./modelos/libros.js");
require("./modelos/maestros.js");
require("./modelos/materias.js");
require("./modelos/planEstudio.js");
require("./modelos/programasEducativos.js");
require("./modelos/unidades.js");
require("./server/alumnosPublish.js");
require("./server/categoriasPublish.js");
require("./server/departamentosPublish.js");
require("./server/librosPublish.js");
require("./server/maestrosPublish.js");
require("./server/materiasPublish.js");
require("./server/planEstudioPublish.js");
require("./server/programasEducativos.js");
require("./server/unidadesPublish.js");
require("./server/usuariosPublish.js");
//# sourceMappingURL=app.js.map
