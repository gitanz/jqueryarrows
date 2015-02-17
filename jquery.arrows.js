/*plugin arrows -> by anooz*/

(function($){

		var ElementModel = function DOMElement(element){
			this.element = $(element);
			this.Xl = $(element).offset().left;
			this.elementWidth = $(element).outerWidth();
			this.elementHeight = $(element).outerHeight();
			this.Xr = this.Xl+$(element).outerWidth();
			this.Yt = $(element).offset().top;
			this.Yb = this.Yt + $(element).outerHeight();
			this.centerHeight = (this.Yt+this.Yb)/2;
			this.centerWidth = (this.Xl+this.Xr)/2;
		}

		var draw = {
			//drawing styles
			top2bottom:function(src, target, options){
				if(options.autoalign){
					draw._checkAlignment(src, target, "left");	
				}
				line = $("<div/>");
				line.attr("class","line-top2bottom");
				line.css({
				  "position":"absolute",
				  "top":src.Yb+"px",
				  "bottom":target.Yt+"px",
				  "height":(target.Yt-src.Yb)+"px",
				   left:target.centerWidth+"px",
				   width:options.width,
				   background:options.color,
				   "z-index":"9999"
				})
				$("body").append(line);
			},
			bottom2top:function(src, target, options){
				if(options.autoalign){
					draw._checkAlignment(src, target, "left");	
				}
				line = $("<div/>");
				line.attr("class","line-bottom2top");
				line.css({
				  "position":"absolute",
				  "top":target.Yb+"px",
				  "bottom":src.Yt+"px",
				  "height":(src.Yt-target.Yb)+"px",
				   left:target.centerWidth+"px",
				   width:options.width,
				   background:options.color,
				   "z-index":"9999"
				})
				$("body").append(line);
			},
			left2right:function(src, target,options){
				if(options.autoalign){
					draw._checkAlignment(src, target, "top");	
				}
				line = $("<div/>");
				line.attr("class","line-left2right");
				line.css({
				  "position":"absolute",
				  "top":target.centerHeight+"px",
				   left:src.Xr+"px",
				   right:target.Xl+"px",
				   width:(target.Xl - src.Xr)+"px",
				  "height":options.width,
				   background:options.color,
				   "z-index":"9999"
				})
				$("body").append(line);
			},
			right2left:function(src, target, options){
				if(options.autoalign){
					draw._checkAlignment(src, target, "top");	
				}
				line = $("<div/>");
				line.attr("class","line-right2left");
				line.css({
				  "position":"absolute",
				  "top":target.centerHeight+"px",
				   left:target.Xr+"px",
				   right:src.Xl+"px",
				   width:(src.Xl - target.Xr)+"px",
				  "height":options.width,
				   background:options.color,
				   "z-index":"9999"
				})
				$("body").append(line);
			},
			top2MultipleBottom:function(src, targets, options){
				//get smallest xl and longest xr among targets
				//get smallest Yt
				//create div left:(xl+xr)/2 , top:(Yb+Yt)/2, height: (Yb-Yt), width:options.width
				Xl = targets[0].Xl;
				Xr = targets[0].Xr;
				Yt = targets[0].Yt;
				smCenterWidth = (Xl+Xr)/2;
				lgCenterWidth = (Xl+Xr)/2;
				$.each(targets,function(key,element){
					if(element.Xl < Xl){
					   Xl = element.Xl;
					}
					if(element.Xr > Xr){
					  Xr = element.Xr;
					}
					if(element.Yt < Yt){
					  Yt = element.Yt;
					}
					if(element.centerWidth < smCenterWidth){
					   smCenterWidth = element.centerWidth;
					}
					if(element.centerWidth > lgCenterWidth){
					   lgCenterWidth = element.centerWidth;
					}
				});
				var css = {
					"position":"absolute",
					"left" : (Xl+Xr)/2+"px",
					"top" : src.Yb+"px",
					"height" : (Yt-src.Yb)/2+"px",
					"width" : options.width,
					"background" : options.color,
					"z-index":"9999"	
				};
				line = $("<div/>");
				line.attr("class","line-top2bottom");
				line.css(css);

				$("body").append(line);
				var css = {
					"position":"absolute",
					"left" : smCenterWidth+"px",
					"top" : (src.Yb+Yt)/2+"px",
					"height" : options.width,
					"width" : (lgCenterWidth-smCenterWidth)+"px",
					"background" : options.color,
					"z-index":"9999"	
				};
				horizontalLine = $("<div/>");
				horizontalLine.css(css);
				$("body").append(horizontalLine);
				$.each(targets,function(key,element){
					//draw bottom top line that meets horizontal line
					var css = {
					"position":"absolute",
					"left" : element.centerWidth+"px",
					"top" : (src.Yb+Yt)/2+"px",
					"width" : options.width,
					"height" : (element.Yt-src.Yb)/2+"px",
					"background" : options.color,
					"z-index":"9999"	
					};	
					verticalLine = $("<div/>");
					verticalLine.attr("class","line-top2bottom");
					verticalLine.css(css);
					$("body").append(verticalLine);
				});

			},
			_checkAlignment:function(src, target, align){
				switch(align){
					case("left"):
						if(src.Xl == target.Xl){
							return true;
						}
						else if(src.Xl < target.Xl){
							var left = src.Xl;
							draw._leftalign(target, left);
							return true;

						}else{
							var left = target.Xl;
							draw._leftalign(src, left);
							return true;
						}	
						break;
					case("top"):
						if(src.Yt == target.Yt){
							return true;
						}
						else if(src.Yt < target.Yt){
							var top = src.Yt;
							draw._topalign(target, top);	
						}else{
							var top = target.Yt;
							draw._topalign(src, top);
						}	
						break;	
				}
				
			},
			_leftalign:function($element, leftOffset){
				cloneDiv = $element.element.clone();
				$element.element.after(cloneDiv);
				cloneDiv.attr("id",$element.element.attr("id")+"cloned");
				cloneDiv.css({
				 	"visibility":"hidden"
				 });
				$element.element.css({"position":"absolute",
				 	"left":leftOffset+"px",
				 	"top":$element.Yt+"px",
				 	"margin":0,
				 	"height":$element.elementHeight+"px",
				 	"width":$element.elementWidth+"px",
				 	"z-index":"99"
				});
			},
			_topalign:function($element, topOffset){

				cloneDiv = $element.element.clone();
				$element.element.after(cloneDiv);
				cloneDiv.attr("id",$element.element.attr("id")+"cloned");
				cloneDiv.css({
				 	"visibility":"hidden"
				 });
				$element.element.css({"position":"absolute",
				 	"left":$element.Yt+"px",
				 	"top":topOffset+"px",
				 	"margin":0,
				 	"height":$element.elementHeight+"px",
				 	"width":$element.elementWidth+"px",
				 	"z-index":"99"
				});
				
			}
		}
		var self = {
			_initialize:function(element){
				element.find("[class*='connect']").each(function(){
					options = self._buildOptions(this);
					var extendedRules = self._extendDefaults(options);	
					options = extendedRules;	
					if(options.connectionStyle=="top2MultipleBottom"){
						sourceElement = new ElementModel($(this));
						if(options.connect2div.indexOf(',')==-1){
							console.log("top2MultipleBottom option requires at least 2 target divs separated by comma");
							return false;
						}else{
							targets = options.connect2div.split(",");
							targetElements= [];
							$.each(targets, function(k,v){
								targetElements[k] =new ElementModel($("#"+v)); 
							});
							eval("draw."+options.connectionStyle)(sourceElement, targetElements, options);					
						}
					}else{
						sourceElement = new ElementModel($(this));
						targetElement = new ElementModel($("#"+options.connect2div));		
						eval("draw."+options.connectionStyle)(sourceElement, targetElement, options);					
					}
				});
			},
			_extendDefaults:function(options){
				return $.extend({},$.fn.defaults, options);
			},
			_buildOptions:function($element){
				var exp = /^connect/;
				rawClass = $.makeArray($element.classList);
				optionsObj = false;
				rawClass.forEach(function(value){

					if(exp.exec(value)){
						var regExp = /\[([^)]+)\]/;
						methodString = regExp.exec(value)[1];
						if(methodString.indexOf('|')!=-1){
							allMethods = methodString.split('|');
							//build options from allmethods
							var options = {"connect2div":allMethods[0], "connectionStyle":allMethods[1]};
							
							if(allMethods[2]!=undefined){
								options["color"]=allMethods[2];
							}
							if(allMethods[3]!=undefined){
								options["autoalign"]=allMethods[3];
							}
							optionsObj = options;
						}else{
							alert("provide connectionStyle");
						}
					}
				});
				return optionsObj;
			}
		};
		$.extend($.fn, {
			//public methods
			connectArrows : function(options){
				$elem = $(this);
				$.fn.defaults = self._extendDefaults(options);								
				self._initialize($elem);
				return this;
			},
			defaults:{
				"connectionStyle":"top2bottom",
				"connect2div":"",
				"color":"#000",
				"autoalign":true,
				"width":"5px"
			}
		});
	}(jQuery))

