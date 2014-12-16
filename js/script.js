// Javascript Code.
//Codigo de los paises
$(document).ready(function(){
	$(".boton").click(function(){
		var tempType = ($('input[name="temp"]:checked').val());
		var country = $("input[name=country]").val();
		var city = $("input[name=city]").val();
		if (city.length!=0 && country.length!=0){
			jQuery(document).ready(function($) { 
				var codPais = "";
				$.ajax({ 
					url : "paises.json", dataType : "json",
					success : function(parsed_json) {
						for (var i = 0; i <= 242; i++) { //recorrer el json de paises para encontrar su codigo
							if (((parsed_json[i]["name"]).toLowerCase()) == country.toLowerCase()){
								codPais = parsed_json[i]["code"];
							};
						};

						//Codigo de las cuidades
						if (codPais.length==0) { //error si no encontro el codigo para el pais ingresado
							alert("¡I'm sorry!, but apparently the country seeking is not found.");
						}else{
							var direccion = "http://api.wunderground.com/api/b4140d828a73ad41/conditions/q/"+codPais+"/"+city+".json";
							$(document).ready(function(){
								jQuery(document).ready(function($) { 
									$.ajax({ url : direccion, dataType : "jsonp",
										success : function(parsed_json2) {
											if(parsed_json2["current_observation"]){ //revisar si el departamento tiene esta llave
												var location = parsed_json2['current_observation']['display_location']['full']; 
												var lastUpdate = parsed_json2['current_observation']['observation_time']; 
												var actualTemp;
												if (tempType==="Fahrenheit"){
													actualTemp = parsed_json2['current_observation']['temp_f']; 
													actualTemp = actualTemp + "°F";
												}else{
													actualTemp = parsed_json2['current_observation']['temp_c']; 
													actualTemp = actualTemp + "°C";
												}
												var weather = parsed_json2['current_observation']['weather']; 
												var weatherImg = parsed_json2['current_observation']['icon_url']; 
												$(".busquedafinalizada").empty();
												$(".busquedafinalizada").append("Current temperature in " + location + " is: " + actualTemp +"<br/>Weather: "+ weather + "<br/><img src=\""+weatherImg+"\"><br/>" + lastUpdate);
											} else {
												alert("¡I'm sorry!, but apparently the city that search is not available");
											}
										}
									});
								});
							});
						};
					}
				});
			});
			$("input[type=\"text\"]").val("");
		}else if (city.length==0 && country.length==0){
			alert("¡Hey!, can not leave the fields empty please enter your details");
		}else if(city.length==0){
			alert("Sorry you must enter your city to look for");
		}else if(country.length==0){
			alert("Sorry you must enter your country to look for");
		}
		
	});
});
