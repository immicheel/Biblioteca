angular
.module("planeacion")
.controller("CategoriasCtrl", CategoriasCtrl);
 function CategoriasCtrl($scope, $meteor, $reactive, $state, toastr){
 	
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	 
  this.categoria = {}; 
  
	this.subscribe('categorias',()=>{
		return [{
			
		}]
	 });
	 
	this.helpers({
	  categorias : () => {
		  return Categorias.find();
	  }
  }); 
  
  this.Nuevo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.categoria = {};		
  };

  this.guardar = function(categoria,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			console.log(categoria);
			categoria.estatus = true;
			categoria.usuarioInserto = Meteor.userId();
			Categorias.insert(categoria);
			toastr.success('Guardado correctamente.');
			this.categoria = {}; 
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
		
	};

	this.editar = function(id)
	{
	    this.categoria = Categorias.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(categoria,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  }
			var idTemp = categoria._id;
			delete categoria._id;		
			categoria.usuarioActualizo = Meteor.userId(); 
			Categorias.update({_id:idTemp},{$set : categorias});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};
};