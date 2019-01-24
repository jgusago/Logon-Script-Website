//Notifications

//Back Background

//Table Check
function tablecheck(mod, trig){

    var contentview = document.getElementById("ContentCardBody");
    //Get if Table Exist
    var table  = document.getElementById("datalist");

    if(table == null){
      contentview.innerHTML = "<table id=\"datalist\" class=\"table table-bordered table-hover\" module=\""+mod+"\" trigger=\""+trig+"\" style=\"width: 100%;\"></table>";
      table  = document.getElementById("datalist");
      return false;
    }
    else{
      var cur_mod = table.getAttribute("module");
      var cur_trig = table.getAttribute("trigger");

      if(cur_mod == mod && cur_trig == trig ){
        return true;
      }
      else{
        contentview.innerHTML = "<table id=\"datalist\" class=\"table table-bordered table-hover\" module=\""+mod+"\" trigger=\""+trig+"\" style=\"width: 100%;\"></table>";
        return false;
      }
    }

}

//date date_format

function myDate(format, date){
var newdate = "";
if (date != ""){
var date = new Date(date);
}
else{
  date = new Date();
}

format = format.match(/(.)\1*/g);
//Hour
var h = ["12","01","02","03","04","05","06","07","08","09","10","11","12","01","02","03","04","05","06","07","08","09","10","11"];
var h_a = ["AM","AM","AM","AM","AM","AM","AM","AM","AM","AM","AM","AM","PM","PM","PM","PM","PM","PM","PM","PM","PM","PM","PM","PM"];
//Day
var dd = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
var ddd = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var dddd = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//Month
var mmmm = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var mmm = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var mm = ["01","02","03","04","05","06","07","08","09","10","11","12"];
var m = [1,2,3,4,5,6,7,8,9,10,11,12];
for(var x = 0; x < format.length; x++){

  switch (format[x]) {
    case "yyyy":
      newdate = newdate+date.getFullYear();
      break;
    case "yyy":
      var yr = date.getFullYear();
      yr = yr.split();
      newdate = newdate+yr[2]+yr[3];
      break;
    case "mmmm":
      newdate = newdate+mmmm[date.getMonth()];
      break;
    case "mmm":
      newdate = newdate+mmm[date.getMonth()];
      break;
    case "mm":
      newdate = newdate+mm[date.getMonth()];
      break;
    case "m":
      newdate = newdate+m[date.getMonth()];
      break;
    case "dddd":
      newdate = newdate+dddd[date.getDay()];
      break;
    case "ddd":
      newdate = newdate+ddd[date.getDay()];
      break;
    case "dd":
      newdate = newdate+dd[date.getDate()-1];
      break;
    case "d":
      newdate = newdate+date.getDate();
      break;
    case "hh":
      newdate = newdate+date.getHours()+date.getMinutes();
      break;
    case "h":
      newdate = newdate+h[date.getHours()]+":"+date.getMinutes()+" "+h_a[date.getHours()];
      break;
    default:
      newdate = newdate+format[x];
  }

}
return newdate;
}

//create new elements
function newElement(parent, element, classes, attribute, data){
  var newelement = document.createElement(element);

  for (var i = 0; i < classes.length; i++){
    newelement.classList.add(classes[i]);
  }

  for (var j = 0; j < attribute.length; j++){
    attrib = attribute[j].split("=");
    newelement.setAttribute(attrib[0],attrib[1]);
  }

  newelement.innerHTML = data;

  parent.appendChild(newelement);

  return newelement;

}

function onChangeCheck(id){
  var currentElement, defaultvalue, currentvalue, tagname, index, changed = false;
  var submitbtn = document.getElementById("submitbtn");
  for(var x = 0; x < id.length; x++){
    currentElement = document.getElementById(id[x]);
    defaultvalue = currentElement.getAttribute("default");
    tagname = currentElement.tagName;

    if(tagname == "SELECT"){
      index = currentElement.selectedIndex;
      currentvalue = currentElement.options[index].text;
    }
    else{
      currentvalue = currentElement.value;
    }

    if(currentvalue == defaultvalue && changed == false){
      changed = false;
    }
    else{
      changed = true;
    }

    if(changed == true){
      submitbtn.removeAttribute("disabled");
    }
    else{
      submitbtn.setAttribute("disabled","true");
    }
  }
}
