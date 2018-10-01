angular
.module("planeacion")
.controller("LibrosCtrl", LibrosCtrl);
 function LibrosCtrl($scope, $meteor, $reactive, $state, toastr){
 	
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	 
  this.libro = {}; 
  
	this.subscribe('libros',()=>{
		return [{}]
	 });
	this.subscribe('categorias', () => {
        return [{}]
    });
	 
	this.helpers({
	  libros : () => {
		  return Libros.find();
	  },
	  categorias: () => {
		return Categorias.find();
	}
  }); 
  
  this.Nuevo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.libro = {};		
  };

  this.guardar = function(libro,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			console.log(libro);
			libro.estatus = true;
			libro.usuarioInserto = Meteor.userId();
			Libros.insert(libro);
			toastr.success('Guardado correctamente.');
			this.libro = {}; 
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
		
	};

	this.editar = function(id)
	{
	    this.libro = Libros.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(libro,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  	}
			libro.usuarioActualizo = Meteor.userId(); 
			Libros.update({_id:libro._id},{$set: libro});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};

	this.cambiarEstatus = function(id)
	{
			var libro = Libros.findOne({_id:id});
			if(libro.estatus == true)
				libro.estatus = false;
			else
				libro.estatus = true;
			
			Libros.update({_id: id},{$set :  {libro : libro.estatus}});
	};	

	this.getCategoria = function(id)
	{
		var categoria = Categorias.findOne({_id: id});
		if (categoria != undefined)
			return categoria.nombreCategoria;	
	};
		
	
};