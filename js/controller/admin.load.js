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

  document.getElementById("dtitle").innerHTML = "Dashboard";
  document.getElementById("dtitle2").innerHTML = "My Dashboard";
  cch.innerHTML = "Summary";
  ccb.innerHTML = "";
  ccf.innerHTML = "Updated at "+ myDate("dddd, mmmm d, yyyy","");

  var divfluid = [], divclass = [], divDate =[], divCol = [], divdates = [], small = [],
  divrow1 = [], divColcard = [], divcard1 = [], divcardBody = [], divItems = [], divIcon = [], divml = [], divText = [], divcount = [],
  divrow = [], divcol = [], h4 = [], hrDshbrd = [], txtdept = [], spanCount = [], divProgress = [], divProgbar = [];

  createnewElement(divfluid, ccb, "div", ["container-fluid"], [], "");
  createnewElement(divclass, divfluid.newelement, "div", ["col", "col-md-12"], [], "");

  $.post("php/functions/dashboard/cards.php",function(data){
    data = data.split(";");
    //date
    createnewElement(divDate, divclass.newelement, "div", ["row"], [], "");
    createnewElement(divCol, divDate.newelement, "div", ["col", "col-md-12"], [], "");
    createnewElement(divdates, divCol.newelement,"div", ["text-muted", "text-tiny", "mt-1"], ["id:dshbrdDate"], "");
    createnewElement(small, divdates.newelement, "small", ["font-weight-normal"], [], "Today is "+data[0]);

    var icon = ["fa-exclamation","fa-upload","fa-desktop","fa-users"];
    var text = ["End Task Units", "Old Ver Units", "Installed Units", "Employees"];
    var id = ["dshbrdcountend","dshbrdcountold","dshbrdcountins","dshbrdcountemp"];
    var text_color = ["danger","warning", "primary", "default"]


    createnewElement(divrow1, divclass.newelement, "div", ["row"], [], "");

    for (var i = 1; i < data.length; i++)
    {
      createnewElement(divColcard, divrow1.newelement, "div", ["col-sm-6", "col-xl-3"], [], "");
      createnewElement(divcard1, divColcard.newelement, "div", ["card", "mb-4"], [], "");
      createnewElement(divcardBody, divcard1.newelement, "div", ["card-body"], [], "");
      createnewElement(divItems, divcardBody.newelement, "div", ["d-flex", "align-items-center"], [], "");
      createnewElement(divIcon, divItems.newelement, "div", ["fa", icon[i-1], "display-4", "text-"+text_color[i-1], "aria-hidden:true"], [], "");
      createnewElement(divml, divItems.newelement, "div", ["ml-3"], [], "");
      createnewElement(divText, divml.newelement, "div", ["text-muted"], [], text[i-1]);
      createnewElement(divcount, divml.newelement, "div", [], [], data[i]);
    }
  });

  $.post("php/functions/dashboard/progressbar.php", function(data){

    createnewElement(divrow, divfluid.newelement, "div", ["row"], ["id:dshbrdFluid"], "");
    createnewElement(divcol, divrow.newelement, "div", ["col", "col-md-12"], [], "");
    createnewElement(h4, divcol.newelement, "h4", [], [], "Logonscript Installation Success Rate");
    createnewElement(hrDshbrd, divcol.newelement, "hr", [], ["id:hr"], "");
    data = data.split(";");
    for(i = 0; i < data.length; i++){
      var mini = data[i].split("|");
      createnewElement(txtdept, divcol.newelement, "label", [], ["id:dshbrdLbl"], mini[0]);
      createnewElement(spanCount, divcol.newelement, "span", ["pull-right", "strong"], [],mini[1]);
      createnewElement(divProgress, divcol.newelement, "div", ["progress"], [], "");
      createnewElement(divProgbar, divProgress.newelement, "div", ["progress-bar", "bg-"+mini[3]], ["role:progressbar", "aria-valuenow:"+mini[2], "aria-valuemin:0", "ariavaluemax:100", "id:progressbar"+i], mini[2]+"%");
      divProgbar.newelement.style.width = mini[2]+"%";
    }
  });

  // Pie Chart
  // createnewElement(divcol2, divrow.newelement, "div", ["col", "col-md-6"], [], "");
  // createnewElement(h4pie, divcol2.newelement, "h4", [], [], "End Task Percentage Rate");
  // createnewElement(hrDshbrd1, divcol2.newelement, "hr", [], ["id:hr"], "");
  //
  // createnewElement(div, divcol2.newelement, "div", [], ["id:colPieChart"], "");
  // createnewElement(canvas, div.newelement, "canvas", ["flot-base"], ["width: 1589","height: 250", "id:pieChart"], "");

  // var divrow2 = [], divcol3 = [], divColcard5 = [], editH5 = [], divcolHeader = [], divcolHeader1 = [], btnShow =[], divTable = [], tbl = [], tblHeader = [];

  // Edit History
  // createnewElement(divrow2, divclass.newelement, "div", ["row"], [], "");
  // createnewElement(divcol3, divrow2.newelement, "div", ["col", "col-md-6"], ["id:dshbrdCards"], "");
  // createnewElement(divColcard5, divcol3.newelement,"div", ["card", "mb-4"], ["id:dshbrdEdit"], "");
  // createnewElement(editH5, divColcard5.newelement, "h5", ["card-header", "with-elements"], [], "");
  // createnewElement(divcolHeader, editH5.newelement, "div", ["card-header-title"], [], "Last Edit History");
  // createnewElement(divcolHeader1, editH5.newelement, "div", ["card-header-elements", "ml-auto"], [], "");
  // createnewElement(btnShow, divcolHeader1.newelement, "button", ["btn", "btn-default", "btn-xs", "md-btn-flat"], ["type:button", "id:btnShowMore"], "Show more");
  //
  // createnewElement(divTable, divColcard5.newelement, "div", ["table-responsive"], [], "");
  // createnewElement(tbl, divTable.newelement, "table", ["table", "card-table"], [], "");
  // createnewElement(tblHeader, tbl.newelement, "thead", [], [], "");

}
