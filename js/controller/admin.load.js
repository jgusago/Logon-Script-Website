function load(){
    SESSIONConfirm();
    DSHBRDbtnsCompList();
    DSHBRDbtnsCompLogs();
    NAVBARNotification();
    Departmentlist("department");
    Dashboard();
    // PieChart();
}

/* Buttons Computer List*/
function DSHBRDbtnsCompList(){
    complistul = document.getElementById("COMPLISTlist");

    $.post("php/functions/load/dashboard.complistbuttons.php",function(data){
        var complstbtn = document.getElementById("DSHBRDRecordsComplist");
        complstbtn.innerHTML = data;

      });
}

/* Buttons Computer Details*/
function DSHBRDbtnsCompLogs(){
    complistul = document.getElementById("COMPLISTlist");

    $.post("php/functions/load/dashboard.complogsbuttons.php",function(data){
        var complstbtn = document.getElementById("DSHBRDRecordsComplogs");
        complstbtn.innerHTML = data;

      });
}

function Dashboard(){
  var cch = document.getElementById("ContentCardHead");
  var ccb = document.getElementById("ContentCardBody");
  var ccf = document.getElementById("ContentCardFoot");
  ccf.classList.remove("text-muted");

  document.getElementById("dtitle").innerHTML = "Dashboard";
  document.getElementById("dtitle2").innerHTML = "My Dashboard";
  cch.innerHTML = "Summary";
  ccb.innerHTML = "";
  ccf.innerHTML = "";
  ccf.innerHTML = "Updated at "+ myDate("dddd, mmmm d, yyyy","");

  var container = newElement(ccb, "div", ["container-fluid"], "", "");
    var maindiv = newElement(container, "div", ["col", "col-md-12"], "", "");
      var date_row = newElement(maindiv, "div", ["row"], "","");
        var date = newElement(date_row, "small",["text-muted", "text-tiny", "mt-1", "font-weight-normal"], "", "Today is " + myDate("dddd, mmmm dd, yyyy", ""));
      var card_div = newElement(maindiv, "div", ["row"], ["id=card_div"], "");
      var prog_div = newElement(maindiv, "div", ["row"], ["id=prog_div"], "");
        //var prog_row = newElement(prog_div, "div", ["row"],"","");
        var prog_col = newElement(prog_div, "div", ["col", "col-md-12"], "", "");
          var prog_txt = newElement(prog_col, "h4", "", "", "Logonscript Installation Success Rate");
          var breaks = newElement(prog_col, "hr", "", "", "");

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      for (x in myObj) {
        var color = "";
        switch (myObj[x].display) {
          case "exclamation":
            color = "danger";
            break;
          case "upload":
            color = "warning";
            break;
          case "desktop":
            color = "primary";
            break;
          case "users":
            color = "default";
            break;
          default:
            color = "success";
        }

        switch (myObj[x].element) {
          case "card":
            var card_base = newElement(card_div, "div", ["col-sm-6", "col-xl-3"], ["id=asdasd"+color], "");
            var card_frame = newElement(card_base, "div", ["card", "mb-4"], "", "");
            var card_body = newElement(card_frame, "div", ["card-body"],"", "");
            var card_item = newElement(card_body, "div", ["d-flex", "align-items-center"], "", "");
            var card_icon = newElement(card_item, "div",["fa", "fa-"+myObj[x].display, "display-4", "text-"+color, "aria-hidden:true"], [], "")
            var card_text = newElement(card_item, "div", ["ml-3"], "", "");
            var card_name = newElement(card_text, "div", ["text-muted"], "", myObj[x].name);
            var card_disp = newElement(card_text, "div", "", "", myObj[x].count);
            break;
          case "progressbar":
            if(myObj[x].count >= myObj[x].display && myObj[x].display != 0){
              var value = 100;
              var progress = 100;
            }
            else if (myObj[x].display == 0 && myObj[x].count == 0) {
              var value = 0;
              var progress = 100;
            }
            else {
              var value = (myObj[x].count/myObj[x].display)*100;
              value = Math.trunc( value );
              var progress = value;
            }
            if (value <= 100 && value > 70){
              var prog_bg = "bg-success";
            }
            else if (value < 69 && value > 40) {
              var prog_bg = "bg-warning";
            }
            else if(value < 39 && value > 0){
              var prog_bg = "bg-danger";
            }
            else{
              var prog_bg = "bg-secondary";
            }


            var prog_sept = newElement(prog_col, "div", "", "", "");
            var prog_name = newElement(prog_sept, "label", "", "", myObj[x].name);
            var prog_rang = newElement(prog_sept, "span", ["pull-right","strong"],"",myObj[x].count+" out of "+myObj[x].display);
            var prog_div = newElement(prog_sept, "div", ["progress"], "", "");
            var prog_bar = newElement(prog_div, "div",["progress-bar", prog_bg],["role:progressbar", "aria-valuenow:", "aria-valuemin:0", "ariavaluemax:100"], value+"%");
            prog_bar.style.width = progress+"%";
            break;
          default:
        }

      }
    }//if ready state
  }//funtion
  xmlhttp.open("POST", "php/functions/dashboard/dashboard.summary.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send();

}

function NAVBARNotification()
{
  getNotification();
  setInterval(function(){
    getNotification();
  }, 600000);
}
