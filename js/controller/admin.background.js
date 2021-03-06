//Notifications

//Back Background

//Table Check
function tablecheck(mod, trig){

    var contentview = document.getElementById("ContentCardBody");
    //Get if Table Exist
    var table  = document.getElementById("datalist");

    if(table == null){
      contentview.innerHTML = "<table id=\"datalist\" class=\"table table-hover\" module=\""+mod+"\" trigger=\""+trig+"\" style=\"width: 100%;\"></table>";
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
        contentview.innerHTML = "<table id=\"datalist\" class=\"table table-hover\" module=\""+mod+"\" trigger=\""+trig+"\" style=\"width: 100%;\"></table>";
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

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

format = format.match(/(.)\1*/g);
//Hour
var h = ["12","01","02","03","04","05","06","07","08","09","10","11","12","01","02","03","04","05","06","07","08","09","10","11"];
var min = date.getMinutes();
min = (min).pad(2);
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
      newdate = newdate+date.getHours()+":"+min;
      break;
    case "h":
      newdate = newdate+h[date.getHours()]+":"+min+" "+h_a[date.getHours()];
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


//OVERLAY
function OVERLAYenable(){
  document.getElementById("overlay").style.display = "block";
  document.getElementById("miniwindow").style.display = "block";
}

function OVERLAYdisable()
{

    document.getElementById("overlay").style.display = "none";
    document.getElementById("miniwindow").style.display = "none";

        //get mini window ID;
        var ch = document.getElementById("mnch");
        var cb = document.getElementById("mncb");
        var cf = document.getElementById("mncf");

        //Clear Previous Text
        ch.innerHTML = "";
        cb.innerHTML = "";
        cf.innerHTML = "";

}

function Loading(state){

  if(state == true){
    document.getElementById("loading_overlay").style.display = "block";
    document.getElementById("loading_wrapper").style.display = "block";
  }
  else{
    document.getElementById("loading_overlay").style.display = "none";
    document.getElementById("loading_wrapper").style.display = "none";
  }

}

function getNotification(){
  var nav_notif = document.getElementById("NAVBARNotifContent");
  var notif_mbc = document.getElementById("NOTIFmbcount");
  var notif_dtc = document.getElementById("NOTIFdtcount");
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      if (myObj.length > 0){
        nav_notif.innerHTML = "";
        notif_mbc.innerHTML = myObj.length+" new";
        notif_dtc.innerHTML = myObj.length;
        for (x in myObj) {
          if(x > 0){
            var divider = newElement(nav_notif, "div", ["dropdown-divider"],"","");
          }
          var n_a = newElement(nav_notif, "a", ["dropdown-item"], ["href=#", "onClick=NOTIFOpen("+myObj[x].id+")"],"");
          var n_str = newElement(n_a, "strong", ["text-"+myObj[x].class], "", myObj[x].title);
          var time = newElement(n_a, "span", ["small", "float-right","text-muted"],"", myDate("hh",""));
          var msg = newElement(n_a, "div", ["dropdown-message","small"], "", myObj[x].msg);
        }//for
      }//if
      else{
        var nonotif = newElement(nav_notif, "h1", ["dropdown-item","small"], ["href=#"],"No Notifications");
      }
      //var all = newElement(nav_notif, "a", ["dropdown-item","small"], ["href=#"],"View all notifications")
    }//if
  };//xmlhttp function
  xmlhttp.open("POST", "php/functions/notification/notification.summary.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send();

}

function Departmentlist(id){
  var select = document.getElementById(id);
  select.innerHTML = "";

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
        for (x in myObj) {
          var option = newElement(select, "option", "", ["value="+myObj[x]],myObj[x]);
        }//for
    }//if
  };//xmlhttp function
  xmlhttp.open("POST", "php/functions/load/department.list.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send();

}

function Subdepartmentlist(dept_id, subdept_id){
  var selectdept = document.getElementById(dept_id);
  var dept = selectdept.options[selectdept.selectedIndex].value;

  var selectsubdept = document.getElementById(subdept_id);
  selectsubdept.innerHTML = "";

  obj = {department:dept};
  dbParam = JSON.stringify(obj);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      if(myObj.length !== 0){
          selectsubdept.removeAttribute("disabled");
          for (x in myObj) {
            var option = newElement(selectsubdept, "option", "", ["value="+myObj[x]],myObj[x]);
          }//for
      }//if myObj
      else{
        selectsubdept.setAttribute("disabled",true);
      }
    }//if
  };//xmlhttp function
  xmlhttp.open("POST", "php/functions/load/sub.department.list.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);

}

function ACCeditvalidate(){
  var butn = document.getElementById("UserAccountupdate");

  var name = document.getElementById("ae_name");
  var dept = document.getElementById("ae_department");
  var post = document.getElementById("ae_position");
  var role = document.getElementById("ae_role");
  var stat = document.getElementById("ae_status");

  var n_name = name.value;
  var n_dept = dept.options[dept.selectedIndex].value;
  var n_post = post.value;
  var n_role = role.options[role.selectedIndex].value;
  var n_stat = stat.options[stat.selectedIndex].value;

  var d_name = name.getAttribute("default-value");
  var d_dept = dept.getAttribute("default-value");
  var d_post = post.getAttribute("default-value");
  var d_role = role.getAttribute("default-value");
  var d_stat = stat.getAttribute("default-value");

  if( (n_name !== d_name)||(n_dept !== d_dept)||(n_post !== d_post)||(n_role !== d_role)||(n_stat !== d_stat)){
    butn.removeAttribute("disabled");
  }
  else{
    butn.setAttribute("disabled","true");
  }
}
