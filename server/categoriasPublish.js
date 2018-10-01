Meteor.publish("categorias",function(params){
  return Categorias.find(params);
});

Meteor.publish("listaCategorias", () => {
return Categorias.find();
});