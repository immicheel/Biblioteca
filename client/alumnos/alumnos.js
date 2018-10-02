angular
.module("planeacion")
.controller("AlumnosCtrl", AlumnosCtrl);
 function AlumnosCtrl($scope, $meteor, $reactive, $state, toastr){
 	
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	 
  this.alumno = {}; 
  
	this.subscribe('alumnos',()=>{
		return [{
			
		}]
	 });
	 
	this.helpers({
	  alumnos : () => {
		  return Alumnos.find();
	  }
  }); 
  
  this.Nuevo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.alumno = {};		
  };

  this.guardar = function(alumno,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			console.log(alumno);
			alumno.estatus = true;
			alumno.usuarioInserto = Meteor.userId();
			Alumnos.insert(alumno);
			toastr.success('Guardado correctamente.');
			this.alumno = {}; 
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
		
	};

	this.editar = function(id)
	{
	    this.alumno = Alumnos.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(alumno,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  }
			var idTemp = alumno._id;
			delete alumno._id;		
			alumno.usuarioActualizo = Meteor.userId(); 
			Alumno.update({_id:idTemp},{$set : alumnos});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};

	this.cambiarEstatus = function(id)
	{
			var libro = Alumnos.findOne({_id:id});
			if(libro.estatus == true)
				libro.estatus = false;
			else
				libro.estatus = true;
			
			Alumnos.update({_id: id},{$set :  {libro : libro.estatus}});
	};	
	
};