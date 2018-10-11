angular
.module("planeacion")
.controller("PrestamosCtrl", PrestamosCtrl);
 function PrestamosCtrl($scope, $meteor, $reactive, $state, toastr){
 	
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	 
  this.prestamo = {}; 
  
	this.subscribe('prestamos',()=>{
		return [{}]
	 });
	this.subscribe('alumnos', () => {
    return [{}]
		});
	this.subscribe('libros', () => {
		return [{}]
		});
	 
	this.helpers({
	  prestamos : () => {
		  return Prestamos.find();
	  },
	  alumnos: () => {
			return Alumnos.find();
		},
		libros: ()=> {
			return Libros.find();

	}
  }); 
  
  this.Nuevo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.prestamo = {};		
  };

  this.guardar = function(prestamo,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			console.log(prestamo);
			prestamo.estatus = true;
			prestamo.usuarioInserto = Meteor.userId();
			Prestamos.insert(prestamo);
			toastr.success('Guardado correctamente.');
			this.prestamo = {}; 
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
		
	};

	this.editar = function(id)
	{
	    this.prestamo = Prestamos.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(prestamo,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  	}
			prestamo.usuarioActualizo = Meteor.userId(); 
			Prestamos.update({_id:prestamo._id},{$set: prestamo});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};

	this.cambiarEstatus = function(id)
	{
			var prestamo = Prestamos.findOne({_id:id});
			if(prestamo.estatus == true)
			prestamo.estatus = false;
			else
				prestamo.estatus = true;
			
			Prestamos.update({_id: id},{$set :  {prestamo : prestamo.estatus}});
	};	

	this.getAlumno = function(id)
	{
		var alumno = Alumnos.findOne({_id: id});
		if (alumno != undefined)
			return alumno.nombreAlumno;	
	};
	
	this.getLibro = function(id)
	{
		var libro = Libros.findOne({_id: id});
		if (libro != undefined)
			return libro.nombreLibro;
	}
		
	
};