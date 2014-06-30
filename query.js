var shiftCodes = {97:65, 98:66, 99:67, 100:68, 101:69, 102:70, 103:71, 104:72, 105:73, 
		  106:74, 107:75, 108:76, 109:77, 110:78, 111:79, 112:80, 113:81, 114:82, 
		  115:83, 116:84, 117:85, 118:86, 119:87, 120:88, 121:89, 122:90, 48:41, 
		  49:33, 50:64, 51:35, 52:36, 53:37, 54:94, 55:38, 56:42, 57:40, 39:95, 
		  44:43, 45:124, 46:123, 47:125, 58:59, 61:34, 91:60, 92:62, 191:63, 96:126}
	

function cFilter(a,c,e){
	map.disableKeyboardNavigation();
	window.cFilter = {layers:a, visible:e};
	window.cOperators = ["=","LIKE",">",">=","<","<="];
	window.cCache = {};
	var f = "<div id='cFilter'>";
	f += "<select id='addFilter' >";
	var b = a.layerInfos;
	for (x in b){
		f+= "<option value='"+x+"'>";
		f+= b[x].name;
		f+= "</option>";
		cCache[x] = {};
		}
	f+= "</select>";
	f+= "<button onClick='addFilter()'>Add Filter</button>";
	f+= "<div id='layerfilters'>"; 
	f+= "<div style='height:0px; overflow:hidden;'><span id='hspan'></span></div>";
	f+= "</div>";
	f+= "<div id='submit'><button id='apply' onclick='applyFilter()'>Apply</button>";
	f+= "<button id='clear' onclick='clearFilters()'>Clear</button></div>";	
	f+= "</div>";
	c.innerHTML = f;
	window.query = new esri.tasks.Query();
	query.returnGeometry = false;
	$("#cFilter").on("autocompleteselect", ".enter", function(event,ui){
		if(event.originalEvent.originalEvent.type == "click"){
			event.preventDefault();
			$(this).val(ui.item.label);
			$(this).trigger( jQuery.Event("keydown",{keyCode:186}) );
			}
		});
	$("#cFilter").on("autocompletefocus", ".enter", function(event,ui){
		event.preventDefault();
		});
	$("#cFilter").on("autocompleteopen", ".enter", function(){
		$(".ui-autocomplete").css({top:"100%",width:"100%",left:"-3px","margin-top":"0px"});		
		});				
	$("#cFilter").on("autocompletesearch", ".enter", function(){
		$("#cFilter").addClass("searching");
		});
	$("#cFilter").on("autocompleteresponse", ".enter", function(){
		$("#cFilter").removeClass("searching");
		});		
	$("#cFilter").on("click", ".clause", function(){
		$(this).children(".enter").last().focus();
		});
	$("#cFilter").on("focusin", ".enter", function(){
		cFilter.fLayer = $(this).parents(".filter").last().children(".layerID").last().val();
		cFilter.fField = $(this).siblings(".fs").find(".cv .fieldname").last().val();
		cFilter.fType = $(this).siblings(".fs").find(".cv .fieldtype").last().val();
		if(cFilter.fType == 'esriFieldTypeString'){ac(this, $(this).parents(".clause").last() ); }
		else{ $(this).hasClass(".ui-autocomplete-input") && $(this).autocomplete("disable"); }
		});
	$("#cFilter").on("click",".lv",function(){
		var x = $(this).parent().siblings(".opts");
		$(".opts").not(x).hide();
		x.toggle({duration:200});
		});
	$("#cFilter").on("click",".opts ul li",function(){
		var opts = $(this).parents(".opts").last();
		var target = $(opts).siblings(".cv").last();
		$(target).children(".lv").last().text($(this).text());
		$(target).children(".fieldname").last().val( $(this).children(".fieldname").last().val() );
		$(target).children(".fieldtype").last().val( $(this).children(".fieldtype").last().val() );
		$(opts).toggle();
		$(target).parent().siblings(".enter").last().focus();
		});
	$("#cFilter").on("mousewheel DOMMouseScroll",".opts ul",function(event){
		event.preventDefault()
		var a = event.originalEvent.wheelDelta;
		var b = event.originalEvent.detail;
		if (a > 0){$(this).scrollTop($(this).scrollTop()-a);}
		else if (a < 0){$(this).scrollTop($(this).scrollTop()-a);}
		else if (b > 0){$(this).scrollTop($(this).scrollTop()+20);}
		else if	(b < 0){$(this).scrollTop($(this).scrollTop()-20);}		
		})
	$("#cFilter").on("click",".del",function(){
		var pi = $(this).parents(".filter").last().index(".filter");
		var ri = $(this).index(".filter:eq("+pi+") .del");	
		if(ri == 0){
			$(".filter:eq("+pi+") .andor:eq(0)").remove();
		}else{
			$(".filter:eq("+pi+") .andor:eq("+(ri-1)+")").remove();
		}
		$(this).parents(".clause").last().remove();		
		});	
	$("#cFilter").on("keydown", ".enter", function(event){
		var k = event.shiftKey && shiftCodes[event.keyCode] || event.keyCode;
		if( k == 186 || k == 188|| k == 13 ){
			event.preventDefault(); 
			var y = $(this).val().replace(/^\s|\s$/g,"");
			if( y.length > 0 ){
				var p = (cFilter.fType == "esriFieldTypeString" ? "'" : ""); 
				$(this).before("<span class='value'>"+p+y+p+"</span>"); $(this).val('');
				}
		}else if( k == 8 ){
			var y = $(this).val().replace(/^\s|\s$/g,"");
			if( y.length == 0 ){
				event.preventDefault(); 
				var v = $(this).siblings(".value").last().text().replace(/^'|'$/g,"")
				$(this).val(v);
				$(this).siblings(".value").last().remove();
				}
		}else if( k == 63 ){
			if( ( $(this).val()=="" || $(this).val()=="?" || $(this).val()=="??" ) && cFilter.fType == 'esriFieldTypeString' ){
				event.preventDefault();
				$(this).autocomplete( "search", "%%" );
				$(this).val("%%");
				}
			}
		var t = $(this).val()+String.fromCharCode(k);
		$("#hspan").html( t.replace(/\s/g,"&nbsp;") );
		var w = Math.max($("#hspan").width(),15);
		$(this).width(w);
		});
	$("#cFilter").on("click",".value", function(){
		var x = $(this).text().replace(/^'|'$/g,"");
		$("#hspan").text(x);
		var w = Math.max($("#hspan").width(),15);
		$(this).siblings(".enter").last().val(x).width(w).focus().select();
		$(this).remove();
		});
	$("#cFilter").on("blur",".enter", function(){
		$(this).trigger(jQuery.Event("keydown",{keyCode:186}) );
		});	
}

function addFilter(){	
	var x = parseInt( $("#addFilter").val() );
	var v = cFilter.layers.visibleLayers.slice(); 
	v.indexOf(x) == -1 && v.push(x);
	cFilter.layers.setVisibleLayers(v); cFilter.layers.setVisibility(true);
	var a = cFilter.layers.layerInfos[x];	
	var f = "";
	f+= "<div class='filter'>";
	f+= "<h4>"+a.name+"</h4>";
	f+= "<input class='layerID' value='"+x+"' style='display:none;' >";
	f+= "<div class='clauses'>"+addClause(a.fields)+"</div>";
	f+= "<button onClick='addRow(this,"+x+")'>Add Rule</button>";
	f+= "<button class='deleteFilter' onClick='removeRow(this)' title='Delete Filter'>&times</button>";
	f+= "</div>";
	document.getElementById("layerfilters").innerHTML += f;
	if( $(".filter").length == 1 ){ $("#cFilter #submit").fadeIn("slow"); }
	$(".enter").last().focus();
}

function addClause(fields){
	var c= "<div class='clause'>";
	c+= "<div class='fs'>";
	c+= "<div class='cv'>"	
	c+= "<input class='fieldname' type='hidden' value='"+fields[0].name+"' />"
	c+= "<input class='fieldtype' type='hidden' value='"+fields[0].name+"' />"	
        c+= "<div class='del'>&times</div>"
        c+= "<div class='lv'>"+fields[0].alias+"</div>"        
	c+= "</div>"
	c+= "<div class='opts'><ul>"
	for(x in fields){
		c+= "<li>"+fields[x].alias;
		c+= "<input class='fieldname' type='hidden' value='"+fields[x].name+"' />";
		c+= "<input class='fieldtype' type='hidden' value='"+fields[x].type+"' />";
		c+= "</li>";
		}
	c+= "</ul></div></div>";
	c+= "<button class='operator' value='0' onclick='OpToggle(this)'>&#61;</button>";
	c+= "<input type='text' class='enter'>"	
	c+= "</div>";
	return c;
}

function addRow(a,b){
	var fields = cFilter.layers.layerInfos[b].fields;
	var x = $(a).siblings(".clauses");
	var c = "<button class='andor' value='AND' onclick='AndOrToggle(this)' >AND</button>";
	if($(x).children(".clause").length > 0 ){
		$(x).append(c);
	}
	$(x).append(addClause(fields));
	$(x).find(".enter").last().focus();
}

function removeRow(a){
	var x = parseInt( $(a).siblings(".layerID").last().val() );
	var l = $("#cFilter .layerID[value = "+x+"]").length;
	if (l == 1){
		var v = cFilter.layers.visibleLayers.slice();
		var i = v.indexOf(x); 
		i >= 0 && v.splice(i,1); 
		cFilter.layers.setVisibleLayers(v);
		v.length == 0 && cFilter.layers.setVisibility(false);
		}
	$(a).parent().remove();
}

function ac(a,b){
	$(a).autocomplete({
		minLength: 2,
		delay:250,
		appendTo:b,
		source:function(request,response){
			var cached = cFilter.fField in cCache[cFilter.fLayer];
			if( cached == false){
				query.where = cFilter.fField +" LIKE '%'" ;
				query.outFields = [cFilter.fField];
				var queryTask = new esri.tasks.QueryTask(cFilter.layers.url+"/"+cFilter.fLayer);
				queryTask.execute(query,function(results){
					var r = results.features;
					var p = [];
				   	for(var x in r){p.push(r[x]['attributes'][cFilter.fField]);}
				    	var li = ''; p.sort(); var y = [];
					for(i in p ){var c = p[i]; c != li && y.push(c); li = c}
					y[0].replace(/\s/g,"") == "" && y.shift();
					cCache[cFilter.fLayer][cFilter.fField] = y;
					response( selectResponse(request.term) );
				});
			}
			else if( cached == true && (request.term == "%%") ){ 
				response( cCache[cFilter.fLayer][cFilter.fField].slice(0,50) ); 
			}
			else if (cached == true) {
				response( selectResponse(request.term) );
			}
		}	
	});
}
function selectResponse(term){
	var y= []; 
	t = new RegExp("^"+term.replace(/%/g,".*")+".*","gi");
	var limit = 0;
	var x = 0;
	while( limit < 50 && x < cCache[cFilter.fLayer][cFilter.fField].length ){
		var u = cCache[cFilter.fLayer][cFilter.fField][x];
		if(u.search(t) >= 0){y.push(u); limit++;}
		x++;
		}
	if(y.length == 0){y = ["No Matches Found"]}
	return y;
}

function AndOrToggle(a){
	if(a.value == 'AND'){a.value='OR'; $(a).text("OR");}else{a.value='AND'; $(a).text("AND");}
}

function OpToggle(a){
	var v = parseInt(a.value)+1;
	if( v > (cOperators.length-1) ){a.value = 0; $(a).text(cOperators[0]);}
	else{a.value = v; $(a).text(cOperators[v]);}
}

function applyFilter(){
	var ld = [];
	var vl = [];
	var values = [];
	var concat = ''
	var x = $("#cFilter .layerID, #cFilter .cv .fieldname, #cFilter .operator, #cFilter .value, #cFilter .andor").get().reverse();
	$(x).each(function(){
		var c = $(this).attr("class");
		var v = $(this).val();
		var t = $(this).text();
		switch(c){
		  case "value":
		    values.push(t)
		    break;
		  case "operator":
		    for(x in values){ values[x] = cOperators[v]+' '+values[x]; };
		    break;
		  case "fieldname":
		    for(x in values){ values[x] = v+' '+values[x]; };
		    concat = concat + "("+ values.join(' OR ') + ")";
		    values = [];
		    break;
		  case "andor":
		    concat = concat + " " +v;
		    break;
		  case "layerID":
		    if( ld[v] ){ ld[v] = ld[v]+"OR ( "+ concat+")" ;}
		    else  {ld[v] = "("+concat+")";  }
		    vl.push(v);
		    concat = '';
		    break;	  		  		  		  
		}
	});
	cFilter.layers.setLayerDefinitions(ld);
	cFilter.layers.setVisibleLayers(vl);
}

function clearFilters(){
	x = cFilter.visible.slice(); 
	l = $.unique($("#cFilter .layerID"));
	$(l).each(function(i,e){ 
		v = parseInt( $(e).val() );
		t = x.indexOf(v);
		t < 0 && x.push(v);
		});
	cFilter.layers.setLayerDefinitions();
	cFilter.layers.setVisibleLayers(x);
	cFilter.layers.setVisibility(true);
}