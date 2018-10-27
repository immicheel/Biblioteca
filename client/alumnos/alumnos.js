angular
.module("planeacion")
.controller("AlumnosCtrl", AlumnosCtrl);
 function AlumnosCtrl($scope, $meteor, $reactive, $state, toastr){
 	
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	 
  this.alumno = {}; 
  this.alumnosTabla = [];


	this.subscribe('alumnos',()=>{
		return [{
			
		}]
	 });
	 
	this.helpers({
	  alumnos : () => {
		  alumnosTabla = Alumnos.find();
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
	
	
	
	$('#tablaAlumnos').dataTable({
		data: Alumnos.find().fetch(),
		language: {
			"decimal": "",
			"emptyTable": "No hay información",
			"info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
			"infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
			"infoFiltered": "(Filtrado de _MAX_ total entradas)",
			"infoPostFix": "",
			"thousands": ",",
			"lengthMenu": "Mostrar _MENU_ Entradas",
			"loadingRecords": "Cargando...",
			"processing": "Procesando...",
			"search": "Buscar:",
			"zeroRecords": "Sin resultados encontrados",
			"paginate": {
				"first": "Primero",
				"last": "Ultimo",
				"next": "Siguiente",
				"previous": "Anterior"
			}
		},
		columns: [
			{ 
				data: "matricula",				
			
			},
			{ data: "nombreAlumno"},
			{ data: "grupo"},
			{
				data: "_id",
				render: function(data) {
					return `<button type="button" class="btn btn-xs btn-info" title="Editar" ng-click="alum.editar(${data})"><i class="fa fa-pencil"></i></a></li></button>`
				}
			}
		]
	});


};