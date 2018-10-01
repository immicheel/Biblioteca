Libros 						= new Mongo.Collection("libros");
Libros.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});