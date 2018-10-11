Meteor.publish("prestamos",function(params){
    return Prestamos.find(params);
  });
  
  Meteor.publish("listaPrestamos", () => {
  return Prestamos.find();
  });