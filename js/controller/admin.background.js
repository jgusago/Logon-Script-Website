//Notifications

//Back Background
function tablecheck(mod, trig){

    var contentview = document.getElementById("ContentCardBody");

    //Get if Table Exist
    var table  = document.getElementById("datalist");

    if(table == null){
      contentview.innerHTML = "<table id=\"datalist\" class=\"table able-bordered table-striped\" module=\""+mod+"\" trigger=\""+trig+"\" style=\"width: 100%;\"></table>";
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
        contentview.innerHTML = "<table id=\"datalist\" class=\"table able-bordered\" module=\""+mod+"\" trigger=\""+trig+"\" style=\"width: 100%;\"></table>";
        return false;
      }
    }

}
