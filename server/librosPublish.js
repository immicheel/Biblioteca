Meteor.publish("libros",function(params){
    return Libros.find(params);
});

Meteor.publish("listaLibros", () => {
  return Libros.find();
});