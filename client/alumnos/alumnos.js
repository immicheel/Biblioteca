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
			alumno.usuarioActualizo = Meteor.userId(); 
			Alumnos.update({_id:alumno._id},{$set: alumno});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};

	this.cambiarEstatus = function(id)
	{
			var alumno = Alumnos.findOne({_id:id});
			if(alumno.estatus == true)
				alumno.estatus = false;
			else
				alumno.estatus = true;
			
			Alumnos.update({_id: id},{$set :  {alumno : alumno.estatus}});
	};	
	
};