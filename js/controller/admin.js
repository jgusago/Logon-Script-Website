/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */
function DSHBRDbtnsCompListChld(listparent, linkparent, dataparent, parentulid){
  $.post("php/functions/load/dashboard.buttons.child.php",{parentid:dataparent},function(data){
    var childdata = data.split("|");
    if(childdata.length > 0 && data != "false"){
      var ulid = idgenerator();
      var ul = [];
      linkparent.classList.add("nav-link");
      linkparent.classList.add("nav-link-collapse");
      linkparent.classList.add("collapdatased");
      linkparent.classList.add("collapsed");
      linkparent.setAttribute("data-toggle","collapse");
      linkparent.setAttribute("data-parent","#"+parentulid);
      linkparent.setAttribute("aria-expanded",false);
      linkparent.setAttribute("href","#"+ulid);
      createnewElement(ul, listparent, "ul", ["sidenav-third-level","collapse"], ["data-parent:#"+parentulid, "id:"+ulid ,"data-toggle:collapse","data:"+data], "");

      for(var i = 0; childdata.length > i; i++){

        child = childdata[i].split("`");
        var li = [], a = [];
        var linkid = idgenerator();
        createnewElement(li, ul.newelement, "li",[],[],"");
        createnewElement(a, li.newelement,"a", [], ["onClick:DSHBRDContentCompList(\""+child[1]+"\",\""+linkid+"\")","id:"+linkid, "data:"+dataparent] , child[0]);
        li.newelement.style.padding = "0px 0px 0px 20px";
        DSHBRDbtnsCompListChld(li.newelement, a.newelement, child[1], linkid);
      }
    }
  });
}

//COMPLOGS Buttons
// function DSHBRDbtnsCompLogs(){
// complogsul = document.getElementById("COMPLOGSlist");

// $.post("php/functions/load/dashboard.buttons.php",function(data){
//   cldata = data.split("|");
//   for(var  i = 0; i < cldata.length; i++){
//     var li = [], a = [];
//     var id = idgenerator();
//     var newdata32 = cldata[i].split("`");
//     createnewElement(li, complogsul, "li", ["nav-item"], ["data-toggle:tooltip"], "");
//     createnewElement(a, li.newelement, "a", [], ["onClick:DSHBRDContent(\""+newdata32[1]+"\",\""+id+"\")","data:DSHBRDRecordsComplogs","id:"+id],newdata32[0]); //"onClick:DSHBRDContent(\""+cldata[i]+"\",\""+id+"\")",
//   }
// });
// }

function DSHBRDContentCompList(parent, linkid){

  var view = document.getElementById("ContentCardBody");
  var linkdata = document.getElementById(linkid).getAttribute("data");
  //view.innerHTML = "";
  var existing = "", target = "nen";
  existing = document.getElementById("ContentCardHead");
  if(existing){
    target = existing.getAttribute("target");
  }

  if(target != linkid){
  view.innerHTML = "";
  tableid = idgenerator();

  var card = [];
  createCard(card, view, [], []);
  card.head.setAttribute("target",linkid);
  card.head.setAttribute("id","ContentCardHead");
  // card.head.innerHTML = "Computer List";
  var table = [];
  var classes = ["table","table-bordered"];
  var attributes = ["width:100%","cellspacing:0","id:"+tableid];
  createTable(table, card.body, classes, attributes);

  path = "php/functions/reports/computer.list.php";
  DSHBRDTblsCntnt(parent, path, table.head, table.foot, table.body, tableid, linkid);
  }
}


/* Buttons */
/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/* OnClick */

function DSHBRDTblsCntnt(parent, path, tablehead, tablefoot, tablebody, id, linkid){
  $.post(path, {parent:parent,linkid:linkid}, function(data){

      data = data.split("#");
      datalength = data.length;

      thfdata = data[0].split("|");
      var tbheader = [], tbfooter = [];
      createTableContent([], tablehead, [], [], "th", thfdata);
      createTableContent([], tablefoot, [], [], "th", thfdata);

      for (var i = 1; i < datalength;i++){
          newdata = data[i].split("|");
          createTableContent([], tablebody, [],["id:"+i], "td", newdata);

          }
  });

    if(path == "php/functions/reports/computer.list.php")
    {
      document.getElementById("dtitle").innerHTML = "Reports";
      document.getElementById("dtitle2").innerHTML = "Computer List";
    }
    pagination(id);
  }

function DSHBRDContent(parent, linkid)
{
    var view = document.getElementById("ContentCardBody");
    var linkdata = document.getElementById(linkid).getAttribute("data");
    view.innerHTML = "";

    tableid = idgenerator();

    var card = [];
    createCard(card, view, [], []);

    var table = [];
    var classes = ["table","table-bordered"];
    var attributes = ["width:100%","cellspacing:0","id:"+tableid];
    createTable(table, card.body, classes, attributes);

    switch (linkdata)
    {
      case "DSHBRDRecordsComplist":
        path = "php/functions/reports/computer.list.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDRecordsComplogs":
        path = "php/functions/reports/computer.logs.json.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDRecordsHistory":
        path = "php/functions/reports/transaction.history.logs.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDLogsHistory":
        path = "php/functions/reports/computer.logs.history.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      // case "DSHBRDAccountsAccMgnt":
      //   path = "php/functions/accounts/accounts.view.php";
      //   DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      //   createnewElement([], card.head, "button", ["btn","btn-default"],["data-toggle:modal", "data-target:#AddUser", "href:#AddUser", "id:btnAddUser"],"Add User");
      // break;
      default:

    }
}


function AgentUpdate(hostname,id)
{
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var divvalue = [], leftdiv = [], value = [], subrdiv =[], rightsidevalue =[], span =[];

  createnewElement(divvalue, ch, "div", ["row"], [], "");
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, leftdiv.newelement, "h4", [], [],hostname );

  createnewElement(subrdiv, divvalue.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  createnewElement(rightsidevalue, subrdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, rightsidevalue.newelement, "span", [], ["aria-hidden:true"], "");
  span.newelement.innerHTML = "&times;";

  $.post("php/functions/notification/notification.status.php",{hostname:hostname},function(newdata){

    newdata = newdata.split("#");
    var form = [], fg = [], label = [], input = [], select = [], option = [], div = [], br = [];;

    var newloop = newdata[0].split("|");

    createnewElement(form, cb, "form", [], ["onsubmit:return CMPLISTdtlsupdate(\""+hostname+"\",\""+id+"\")"], "");

    for(var i = 0; i < newloop.length; i++){
    createnewElement(fg, form.newelement, "div", ["form-group","row"], [], "");
      createnewElement(label, fg.newelement, "label", ["col-sm-4","col-form-label"], [], newloop[i]+":");
      for(var j = 1; j < newdata.length-1; j++){
        var cddata = newdata[j].split("|");
        var newelement = cddata[i].split("`");

        createnewElement(div, fg.newelement, "div", ["col-sm-8"], [], "");
        if(newelement.length > 1){
          var newvalue = [];
          neweclasses = newelement[1].split("~");
          neweattribs = newelement[2].split("~");
          createnewElement(newvalue, div.newelement, newelement[0], neweclasses, neweattribs, newelement[3]);
        }
        else{
          createnewElement(input, div.newelement, "p", ["form-control","font-weight-bold"], ["type:text","value:"+cddata[i]], cddata[i]);
        }
      }
    }
    createnewElement(br, form.newelement, "br", [], [], "");
    createnewElement(fg, form.newelement, "div", ["form-group","row"], [], "");
      createnewElement(label, fg.newelement, "label", ["col-sm-4","col-form-label"], [], "Remarks:");
        createnewElement(div, fg.newelement, "div", ["col-sm-8"], [], "");
        createSelection(select, div.newelement, ["form-control","font-weight-bold"], ["id:CMPLISTdtlsremarks","onChange:CMPLISTdtlsremarksupdate(\""+newdata[newdata.length - 1]+"\",\"CMPLISTdtlsremarks\")"], ["Active:Active","Resigned:Resigned","Transfered:Transferred"," Old PC name:Old PC name","On Leave:On Leave"]);
        createnewElement(option, select.select, "option", [], ["hidden:true","selected:selected","value:"+newdata[newdata.length-1] ], newdata[newdata.length-1]);
        createnewElement(br, form.newelement, "br", [], [], "");
  });

  var updatebutton = [], footerdiv = [];
  var footerclass = ["d-flex","flex-row-reverse"];
  createnewElement(footerdiv, cf, "div", footerclass, [], "" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-default","ml-1"], ["onClick:OVERLAYdisable()"], "Cancel" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-primary","disabled","ml-1"], ["id:CMPLISTdtlsupdate","onclick:AgentUpdated(\""+hostname+"\",\""+id+"\")"], "Update" );
}

function AgentUpdated(hostname, id){

  var e = document.getElementById("CMPLISTdtlsremarks");
  var i = e.selectedIndex;
  var remarks = e.options[i].text;

  var agentversion = document.getElementById("CMPLISTdtlsagentversion").value;

  $.post("php/functions/notification/notification.agent.updated.php",{remarks:remarks,agentversion:agentversion,hostname:hostname,id:id},function(data){


    var cb = document.getElementById("mncb");
    if(data == "success"){
      var td = document.getElementById(id+"-1").parentElement;
      var tr = td.parentElement;
      var tb = tr.parentElement;
      tb.removeChild(tr);
      ALERTcall("success","Details have been updated!");
      OVERLAYdisable();
    }
    else if (data == "invalid") {
      var td = document.getElementById(id+"-3");
      td.innerHTML = agentversion;
      td.classList.add("bg-warning");
      ALERTcall("warning","Details have been updated<br> But the iMonitor is still not updated");
      OVERLAYdisable();
    }
    else{

    }

  });
}

//computerlist Update OnClick
function COMPLISTupdate(hostname, user, remarks, id)
{
  OVERLAYenable();

  //get mini window ID;
  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var value = [], divvalue = [], leftdiv = [], subrdiv = [], rightsidevalue = [], span = [];

  createnewElement(divvalue, ch, "div", ["row"], [], "");
  divvalue.newelement.style.width = "600px";
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, leftdiv.newelement, "h6", [], ["id:PassLbl"],hostname+"|"+user);

  createnewElement(subrdiv, divvalue.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  createnewElement(rightsidevalue, subrdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, rightsidevalue.newelement, "span", [], ["aria-hidden:true", "id:span"], "");
  span.newelement.innerHTML = "&times;";

  $.post("php/functions/reports/computer.list.details.php",{hostname:hostname},function(newdata){

    newdata = newdata.split("#");
    var form = [], fg = [], label = [], input = [], select = [], option = [], div = [], br = [];;

    var newloop = newdata[0].split("|");

    createnewElement(form, cb, "form", [], ["onsubmit:return CMPLISTdtlsupdate(\""+hostname+"\",\""+id+"\")"], "");

    for(var i = 0; i < newloop.length; i++){
    createnewElement(fg, form.newelement, "div", ["form-group","row"], [], "");
      createnewElement(label, fg.newelement, "label", ["col-sm-4","col-form-label"], [], newloop[i]+":");
      for(var j = 1; j < newdata.length; j++){
        var cddata = newdata[j].split("|");
        var newelement = cddata[i].split("`");

        createnewElement(div, fg.newelement, "div", ["col-sm-8"], [], "");
        if(newelement.length > 1){
          var newvalue = [];
          neweclasses = newelement[1].split("~");
          neweattribs = newelement[2].split("~");
          createnewElement(newvalue, div.newelement, newelement[0], neweclasses, neweattribs, newelement[3]);
        }
        else{
          createnewElement(input, div.newelement, "p", ["form-control","font-weight-bold"], ["type:text","value:"+cddata[i]], cddata[i]);
        }
      }
    }
    createnewElement(br, form.newelement, "br", [], [], "");
    createnewElement(fg, form.newelement, "div", ["form-group","row"], [], "");
      createnewElement(label, fg.newelement, "label", ["col-sm-4","col-form-label"], [], "Remarks:");
      createnewElement(div, fg.newelement, "div", ["col-sm-8"], [], "");
        createSelection(select, div.newelement, ["form-control","font-weight-bold"], ["id:CMPLISTdtlsremarks","onChange:CMPLISTdtlsremarksupdate(\""+remarks+"\",\"CMPLISTdtlsremarks\")"], ["Active:Active","Resigned:Resigned","Transfered:Transferred"," Old PC name:Old PC name","On Leave:On Leave"]);
        createnewElement(option, select.select, "option", [], ["hidden:true","selected:selected","value:"+remarks], remarks);
    createnewElement(br, form.newelement, "br", [], [], "");
  });

  //footer
  var updatebutton = [], footerdiv = [], checkedbutton = [];
  var footerclass = ["d-flex","flex-row-reverse"];
  createnewElement(footerdiv, cf, "div", footerclass, [], "" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-default","ml-1"], ["onClick:OVERLAYdisable()"], "Cancel" );
  createnewElement(checkedbutton, footerdiv.newelement, "button", ["btn", "btn-success","ml-1"], ["id:CMPLISTdtlschecked","onclick:CMPLISTdtlschecked(\""+hostname+"\",\""+id+"\")"], "Checked" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-primary","disabled","ml-1"], ["id:CMPLISTdtlsupdate","onclick:CMPLISTdtlsupdate(\""+hostname+"\",\""+id+"\")"], "Update" );
}

function CMPLISTdtlschecked(hostname, id){


  var cb = document.getElementById("mncb");

  var version = document.getElementById("CMPLISTdtlsagentversion").value;
  var remarks = document.getElementById("CMPLISTdtlsremarks").value;


  $.post("php/functions/reports/computer.list.checked.php",{hostname:hostname,version:version,remarks:remarks},function(data){
    data = data.split("|");
    if(data[0] == "success"){
      var dc = document.getElementById(id+"-7");
      ALERTcall("success","Details have been checked");
      OVERLAYdisable();
      dc.innerHTML = data[1];
    }
    else{
      ALERTcall("danger",data);
    }
  });

}

/* Table Call Path with PHP*/
// function DSHBRDContentTbls(parent, path, tablehead, tablefoot, tablebody, id, linkid){
//   $.post(path, {parent:parent,linkid:linkid}, function(data){

//       data = data.split("#");
//       datalength = data.length;

//       thfdata = data[0].split("|");
//       var tbheader = [], tbfooter = [];
//       createTableContent([], tablehead, [], [], "th", thfdata);
//       createTableContent([], tablefoot, [], [], "th", thfdata);
//       pagination(id);

//       for (var i = 1; i < datalength;i++){
//           newdata = data[i].split("|");
//           createTableContent([], tablebody, [],[], "td", newdata);

//           }
//   });
//   if (path == "php/functions/accounts/accounts.view.php")
//   {
//     document.getElementById("dtitle").innerHTML = "Profile & Accounts";
//     document.getElementById("dtitle2").innerHTML = "User Accounts";
//   }
//   else if(path == "php/functions/employee/employee.list.php")
//   {
//     document.getElementById("dtitle").innerHTML = "Profile & Accounts";
//     document.getElementById("dtitle2").innerHTML = "Profile Settings";
//   }
//   else
//   {
//     if(path == "php/functions/reports/computer.list.php")
//     {
//       document.getElementById("dtitle").innerHTML = "Reports";
//       document.getElementById("dtitle2").innerHTML = "Computer List";
//     }
//     else if(path == "php/functions/reports/computer.logs.php")
//     {
//       document.getElementById("dtitle").innerHTML = "Reports";
//       document.getElementById("dtitle2").innerHTML = "Computer Logs";
//     }
//     else if(path == "php/functions/reports/computer.logs.history.php")
//     {
//       document.getElementById("dtitle").innerHTML = "Reports";
//       document.getElementById("dtitle2").innerHTML = "End Task Summary";
//     }
//   }
// }

function DSHBRDLogsHistory()
{
  document.getElementById("dtitle").innerHTML = "Reports";
  document.getElementById("dtitle2").innerHTML = "End Task Summary ";

  var view = document.getElementById("ContentCardBody");
  view.innerHTML = "";

  tableid = idgenerator();

  var card = [];
  createCard(card, view, [], []);

  var table = [];
  var classes = ["table","table-bordered"];
  var attributes = ["width:100%","cellspacing:0","id:"+tableid];
  createTable(table, card.body, classes, attributes);

  $.post("php/functions/reports/computer.logs.history.php",function(data){

        data = data.split("#");
        datalength = data.length;

        thfdata = data[0].split("|");
        var tbheader = [], tbfooter = [];
        createTableContent([], table.head, [], [], "th", thfdata);
        createTableContent([], table.foot, [], [], "th", thfdata);
        pagination(tableid);

        for (var i = 1; i < datalength;i++){
            newdata = data[i].split("|");
            createTableContent([], table.body, [],[], "td", newdata);

            }
  });





}

function Dashboard()
{
  var contentview = document.getElementById("ContentCardBody");
  contentview.innerHTML = "";

  var divfluid = [], divclass = [], divDate =[], divCol = [], divdates = [], small = [],
  divrow1 = [], divColcard = [], divcard1 = [], divcardBody = [], divItems = [], divIcon = [], divml = [], divText = [], divcount = [],
  divrow = [], divcol = [], h4 = [], hrDshbrd = [], txtdept = [], spanCount = [], divProgress = [], divProgbar = [];
  // divColcard2 = [], divcard2 = [], divcardBody2 = [], divItems2 = [], divIcon2 = [], divml2 = [], divText2 = [], divcount2 = [],
  // divColcard3 = [], divcard3 = [], divcardBody3 = [], divItems3 = [], divIcon3 = [], divml3 = [], divText3 = [], divcount3 = [],
  // divColcard4 = [], divcard4 = [], divcardBody4 = [], divItems4 = [], divIcon4 = [], divml4 = [], divText4 = [], divcount4 = [],
  // txtdept1 = [], spanCount1 = [], divProgress1 = [], divProgbar1 =[],
  // txtdept2 = [], spanCount2 = [], divProgress2 = [], divProgbar2 = [],
  // txtdept3 = [], spanCount3 = [], divProgress3 = [], divProgbar3 =[],
  // txtdept4 = [], spanCount4 = [], divProgress4 = [], divProgbar4 = [],
  // txtdept5 = [], spanCount5 = [], divProgress5 = [], divProgbar5 =[];

  // divcol2 = [], h4pie = [], hrDshbrd1 =[], div = [], canvas = [];

  document.getElementById("dtitle").innerHTML = "Dashboard";
  document.getElementById("dtitle2").innerHTML = "My Dashboard";

  createnewElement(divfluid, contentview, "div", ["container-fluid"], [], "");
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
  createnewElement(divcol2, divrow.newelement, "div", ["col", "col-md-6"], [], "");
  createnewElement(h4pie, divcol2.newelement, "h4", [], [], "End Task Percentage Rate");
  createnewElement(hrDshbrd1, divcol2.newelement, "hr", [], ["id:hr"], "");

  createnewElement(div, divcol2.newelement, "div", [], ["id:colPieChart"], "");
  createnewElement(canvas, div.newelement, "canvas", ["flot-base"], ["width: 1589","height: 250", "id:pieChart"], "");

  // var divrow2 = [], divcol3 = [], divColcard5 = [], editH5 = [], divcolHeader = [], divcolHeader1 = [], btnShow =[], divTable = [], tbl = [], tblHeader = [];

  // Edit History
  createnewElement(divrow2, divclass.newelement, "div", ["row"], [], "");
  createnewElement(divcol3, divrow2.newelement, "div", ["col", "col-md-6"], ["id:dshbrdCards"], "");
  createnewElement(divColcard5, divcol3.newelement,"div", ["card", "mb-4"], ["id:dshbrdEdit"], "");
  createnewElement(editH5, divColcard5.newelement, "h5", ["card-header", "with-elements"], [], "");
  createnewElement(divcolHeader, editH5.newelement, "div", ["card-header-title"], [], "Last Edit History");
  createnewElement(divcolHeader1, editH5.newelement, "div", ["card-header-elements", "ml-auto"], [], "");
  createnewElement(btnShow, divcolHeader1.newelement, "button", ["btn", "btn-default", "btn-xs", "md-btn-flat"], ["type:button", "id:btnShowMore"], "Show more");

  createnewElement(divTable, divColcard5.newelement, "div", ["table-responsive"], [], "");
  createnewElement(tbl, divTable.newelement, "table", ["table", "card-table"], [], "");
  createnewElement(tblHeader, tbl.newelement, "thead", [], [], "");

}

// function PieChart()
// {
//   var ctx = document.getElementById("pieChart").getContext('2d');
//   var pieChart = new Chart(ctx ,
//     {
//       type: 'pie',
//       data:
//       {
//         labels:["Marvin(IT)", "Marvin(MAIN)", "Pacifica(QY)", "Pacifica(LH)", "6789(L8)", "Pacifica(AE)"],
//         datasets: [{backgroundColor: ["#2ecc71", "#e74c3c", "#34495e", "#e74c3c","#34495e"],
//         data:[32,70,3,0,3,0]
//         }]
//       }
//     });
// }

// function DSHBRDContentBranchSettings()
// {
//   var contentview = document.getElementById("ContentCardBody");
//   contentview.innerHTML = "";

//   document.getElementById("dtitle").innerHTML = "Settings";
//   document.getElementById("dtitle2").innerHTML = "Branch View";

//   tableid = idgenerator();
//   var card = [];
//   createCard(card, contentview, [], []);
//   createnewElement([],card.head,"div",[],[],"");

//   var table = [];
//   var classes = ["table","table-bordered"];
//   var attributes = ["width:100%","cellspacing:0","id:"+tableid];
//   createTable(table, card.body, classes, attributes);
//   $.post("php/functions/sttngs/settings.branch.view.php",function(data){
//     data = data.split("||");
//     for(var arraccount = 0; arraccount < data.length; arraccount++){
//       var currentdata = data[arraccount].split(";");

//       if (currentdata[2] == "tr"){
//         var tr = [];
//         createnewElement(tr,table.body,"tr",[],[],"");
//       }
//       var td = [], link = [], i = [], newdata = [], label = [], link2 = [], i2=[];
//       var id = idgenerator();
//       createnewElement(td, tr.newelement, "td",[],["rowspan:"+currentdata[1]],"");
//       createnewElement(label, td.newelement, "h5", [], ["id:"+id, "tree_id:"+currentdata[4], "tree_filter:"+currentdata[5], "tree_name:"+currentdata[0],"computer_count:"+currentdata[6]], currentdata[0])
//       createLink(link, label.newelement  , "", ["btn","btn-default","btn-sm"], ["role:button", "href:#", "onClick:BRNCHVWedit(\""+id+"\")"]);
//       createnewElement(i, link.link, "i", ["fa","fas","fa-fw","fa-lg","fa-edit"],[],"");
//       createLink(link2, label.newelement  , "", ["btn","btn-default","btn-sm"], ["role:button", "href:#", "onClick:BRNCHVWdelete(\""+id+"\")"]);
//       createnewElement(i2, link2.link, "i", ["fa","fas","fa-fw","fa-lg","fa-trash"],[],"");
//     }
//   });

// var toolbar = [];
// createnewElement(toolbar,card.foot,"div",["btn-toolbar","mr-3"],[],"");
// var ig = [];
// createnewElement(ig,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
// createnewElement([], ig.newelement, "button", ["btn","btn-primary"], ["type:button","onclick:adddepartment()"], "Add Department or Branch");
// // var ig2 = [];
// // createnewElement(ig2,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
// // createnewElement([], ig2.newelement,"button", ["btn","btn-primary"], ["type:button","onclick:editbranch()"],"Update a Branch");
// }

function addbranch(){

  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var headercontainer = [], headerrow = [], headerdiv1 = [], headerdiv2 = [];
  createnewElement(headercontainer,ch, "div", ["container"], [], "");

  createnewElement(headerrow, headercontainer.newelement ,"div",["row"],[],"");
  createnewElement(headerdiv1, headerrow.newelement,"div",["col-sm-10","col-md-10"],["id:modalheader"],"Add Branch/Department");
  var rightsidevalue = [], span = [], headerdiv2 = [];
  createnewElement(headerdiv2, headerrow.newelement, "div", ["col-sm-2","col-md-2"],[],"");
  createnewElement(rightsidevalue, headerdiv2.newelement, "a", ["nav-link"], ["aria-expanded:false","href:#", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, rightsidevalue.newelement, "i", ["fa","fa-lg","fa-fw","fa-times"], [], "");

  //body
  //form
  var form = [], fg = [], lbl = [], ip = [];
  createnewElement(form, cb, "form", [] ,[], "");
  //1st row
    createnewElement(fg, form.newelement, "div", ["form-group"],[],"");
      var lblid = idgenerator();
      createnewElement(lbl, fg.newelement, "label", [], ["for:"+lblid], "Branch Name:");
      createnewElement(ip, fg.newelement, "input", ["form-control"], ["id:"+lblid,"placeholder:Branch Name","required:true"], "");
  var form2 = [], fg2 = [], lbl2 = [], ip2 = [];
  //1st row
  createnewElement([],form.newelement,"br",[],[],"");
    createnewElement(fg2, form.newelement, "div", ["form-group"],[],"");
      var lblid2 = idgenerator();
      createnewElement(lbl2, fg2.newelement, "label", [], ["for:"+lblid2], "Branch Branch Filter:");
      createnewElement(ip2, fg2.newelement, "input", ["form-control"], ["id:"+lblid2,"placeholder:Branch Filter","required:true"], "");

//footer
  var button = [], fg3 = [], dvd = [];
  createnewElement(dvd,  form.newelement, "div", ["dropdown-divider"],[],"");
  createnewElement(fg3, form.newelement,"div", ["form-group"], [],"");
  createnewElement(button, fg3.newelement, "button", ["btn","btn-primary"],["type:submit"],"Add Branch");
}
/*End of Branch View*/

function adddepartment(){
    OVERLAYenable();

    var ch = document.getElementById("mnch");
    var cb = document.getElementById("mncb");
    var cf = document.getElementById("mncf");

    var headercontainer = [], headerrow = [], headerdiv1 = [], headerdiv2 = [];
    createnewElement(headercontainer,ch, "div", ["container"], [], "");

    createnewElement(headerrow, headercontainer.newelement ,"div",["row"],[],"");
    createnewElement(headerdiv1, headerrow.newelement,"div",["col-sm-10","col-md-10"],[],"Add Department");
    var rightsidevalue = [], span = [], headerdiv2 = [];
    createnewElement(headerdiv2, headerrow.newelement, "div", ["col-sm-2","col-md-2"],[],"");
    createnewElement(rightsidevalue, headerdiv2.newelement, "a", ["nav-link"], ["aria-expanded:false","href:#", "onclick:OVERLAYdisable()"], "");
    createnewElement(span, rightsidevalue.newelement, "i", ["fa","fa-lg","fa-fw","fa-times"], [], "");



    //form
    var form = [], fg = [], lbl = [], ip = [], dvd = [];
    var branchid = idgenerator();
    var pathid = idgenerator();
    var lblid = idgenerator();
    var lblid2 = idgenerator();
    var lblid3 = idgenerator();
    //form
    createnewElement(form, cb, "form", [] ,["onsubmit:return BRNCHVWadddepartment(\""+branchid+"\",\""+pathid+"\",\""+lblid+"\",\""+lblid2+"\",\""+lblid3+"\")"], "");

    var fg4 =[], label2 = [], select =[], option = [], br = [];
    createnewElement(fg4, form.newelement, "div", ["form-group"], [], "");
    createnewElement(label2, fg4.newelement, "label", [],[],"Select Branch or Add Department");
    createnewElement(select, fg4.newelement, "select", ["form-control"], ["name:department", "required:true", "id:"+branchid, "onchange:BRNCHVWupdatepath(\""+branchid+"\",\""+pathid+"\")"], "");
    Departmentlist(branchid);
    createnewElement(option, select.newelement, "option", [],["value:root","selected:selected"], "New Branch");
    createnewElement(dvd,  fg4.newelement, "div", ["dropdown-divider"],[],"");

    //Path
    var fg5 = [], lbl5 = [], slt2 = [], optn2 = [];
    createnewElement(fg5, form.newelement, "div", ["form-group"], [], "");
    createnewElement(lbl5, fg5.newelement, "label", [],[],"Select Path");
    createnewElement(slt2, fg5.newelement, "select", ["form-control"], ["name:path", "required:true", "id:"+pathid, "disabled:true"], "");
    createnewElement(dvd,  fg5.newelement, "div", ["dropdown-divider"],[],"");
    //1st row
    createnewElement(fg, form.newelement, "div", ["form-group"],[],"");
      createnewElement(lbl, fg.newelement, "label", [], ["for:"+lblid], "Department Name:");
      createnewElement(ip, fg.newelement, "input", ["form-control"], ["id:"+lblid,"placeholder:Department Name","required:true"], "");
    var form2 = [], fg2 = [], lbl2 = [], ip2 = [];
    //1st row
    createnewElement(dvd,  form.newelement, "div", ["dropdown-divider"],[],"");
    createnewElement(fg2, form.newelement, "div", ["form-group"],[],"");
    createnewElement(lbl2, fg2.newelement, "label", [], ["for:"+lblid2], "Department Filter:");
    createnewElement(ip2, fg2.newelement, "input", ["form-control"], ["id:"+lblid2,"placeholder:Department Filter","required:true"], "");

    createnewElement(dvd,  form.newelement, "div", ["dropdown-divider"],[],"");
    createnewElement(fg2, form.newelement, "div", ["form-group"],[],"");
    createnewElement(lbl2, fg2.newelement, "label", [], ["for:"+lblid3], "Number of Computers");
    createnewElement(ip2, fg2.newelement, "input", ["form-control"], ["id:"+lblid3,"placeholder:Number of Computers","required:true","type:number"], "");
  //footer
    var button = [], fg3 = [];
    createnewElement(dvd,  form.newelement, "div", ["dropdown-divider"],[],"");
    createnewElement(fg3, form.newelement,"div", ["form-group"], [],"");
    createnewElement(button, fg3.newelement, "button", ["btn","btn-primary"],["type:submit"],"Add Department");
  //br
    createnewElement(br, form.newelement, "br",[],[],"");

}
/*End of Branch View*/

function BRNCHVWupdatepath(branchid, pathid)
{

  var branch = document.getElementById(branchid).value;
  var path = document.getElementById(pathid);
  path.innerHTML = "";
  if (branch == "root")
  {
    var option = [];
    createnewElement(option, path, "option", [], ["value:root"],"root");
    path.setAttribute("disabled","true");
  }
  else
  {
    $.post("php/functions/sttngs/settings.branch.view.path.selection.php",{branch:branch},function(data){
      data = data.split("<br>");
      path.innerHTML = data;
      for(var a = 0; a < data.length-1; a++){
        var option = [];
        createnewElement(option, path, "option", [], ["value:"+data[a]],data[a]);
      }
    });
    path.removeAttribute('disabled');
  }

}

function BRNCHVWadddepartment(branchid, pathid, deptid, filterid, compid)
{

  var branch = document.getElementById(branchid).value;
  var path = document.getElementById(pathid).value;
  var dept = document.getElementById(deptid).value;
  var filter = document.getElementById(filterid).value;
  var comp = document.getElementById(compid).value;
  $.post("php/functions/sttngs/settings.branch.view.add.department.php",{branch:branch, path:path, dept:dept, filter:filter, comp:comp},function(data){
    if(data=="true")
    {
      DSHBRDContentBranchSettings('','DSHBRDBranchView');
      ALERTcall("success","Success!! Data have been added");
    }
    else
    {
      ALERTcall("danger",data);
    }
    OVERLAYdisable();
    return false;
  });

  return false;
}


function logout(){
  $.post("php/functions/session/session.destroy.php",function(data){});
  window.location.assign("/index.html");
}

/* OnClick */

/* Background */

function LNKbrdcmps(data){
    var address = document.getElementById('address');
    address.innerHTML = "";

}

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
function ALERTshow(){
  document.getElementById("alertwindow").style.display = "block";
}
function ALERThide(){
  document.getElementById("alertwindow").style.display = "none";
}
function ALERTcall(value,data){

  ALERTshow();

  var alertwindow = document.getElementById("alertwindow");
  var div = [], content = [], buttondiv = [], button = [], span = [], i = [];
  createnewElement(div, alertwindow, "div", ["alert","alert-"+value,"alert-dismissible","fade","show","alert-content"],["role:alert"],"");
  createnewElement(content, div.newelement,"div",[],[],"");
  content.newelement.innerHTML = data;
  content.newelement.style.padding = "0px 50px 0px 0px";
  createnewElement(buttondiv, div.newelement, "div", [], [], "");
  createnewElement(button, buttondiv.newelement,"button",["close"],["type:button","data-dismiss:alert","aria-label:Close"],"");
  createnewElement(span, button.newelement,"span",[],["aria-hidden:true"],"");
  createnewElement(i, span.newelement, "i", ["fa","fa-times"],["aria-hidden:true"],"");

    setTimeout(function(){
      alertwindow.removeChild(div.newelement);
      ALERThide();
    }, 3000);

}
function CMPLISTdtlsremarksupdate(defaultvalue, id){

  var value = document.getElementById(id).value;
  var button = document.getElementById("CMPLISTdtlsupdate");

  if (value !== defaultvalue){
    button.classList.remove("disabled");
  }
  else {
    button.classList.add("disabled");
  }

}

function CMPLISTdtlsupdate(hostname, id){

  var e = document.getElementById("CMPLISTdtlsremarks");
  var i = e.selectedIndex;
  var remarks = e.options[i].text;
  var agentversion = document.getElementById("CMPLISTdtlsagentversion").value;

  $.post("php/functions/reports/computer.list.details.update.php",{remarks:remarks,agentversion:agentversion,hostname:hostname,id:id},function(data){
    //php/functions/reports/computer.list.details.update.php
    //php/functions/notification/notification.agent.updated.php
  if(data == "success"){
    newremarks = document.getElementById(id+"-5").innerHTML = remarks;
    newversion = document.getElementById(id+"-6").innerHTML = agentversion;
    OVERLAYdisable();
    ALERTcall("success","Data have been updated");
  }
  else{
    ALERTcall("danger",data);
  }
  });
  return false;
}

/*User Account Update*/



function CMPLISTdtlstableupdate(parent, linkid){
    var view = document.getElementById("ContentCardBody");
    view.innerHTML = "";

    tableid = idgenerator();

    var card = [];
    createCard(card, view, [], []);

    var table = [];
    var classes = ["table","table-bordered"];
    var attributes = ["width:100%","cellspacing:0","id:"+tableid];
    createTable(table, card.body, classes, attributes);
    path = "php/functions/reports/computer.list.php";
    setTimeout(function(){
       DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
     }, 100);
}


function NOTIFnotconnected(){
  var view = document.getElementById("ContentCardBody");
  view.innerHTML = "";

  document.getElementById("dtitle").innerHTML = "Notifications";
  document.getElementById("dtitle2").innerHTML = "Disconnected Imonitor Agent";

  tableid = idgenerator();

  var card = [];
  createCard(card, view, [], []);

  var table = [];
  var classes = ["table","table-hover"];
  var attributes = ["width:100%","cellspacing:0","id:"+tableid];
  createTable(table, card.body, classes, attributes);
  $.post("php/functions/notification/notification.notconnected.summary.php",function(data){
    data = data.split("#");
    datalength = data.length;

    thfdata = data[0].split("|");
    var tbheader = [], tbfooter = [];
    createTableContent([], table.head, [], [], "th", thfdata);
    // createTableContent([], table.foot, [], [], "th", thfdata);

    for (var i = 1; i < datalength;i++){
        newdata = data[i].split("|");
        createTableContent([], table.body, [],[], "td", newdata);

        }

  });
}

function NOTIFimonitorupdate(){
  var view = document.getElementById("ContentCardBody");
  view.innerHTML = "";

  document.getElementById("dtitle").innerHTML = "Notifications";
  document.getElementById("dtitle2").innerHTML = "Old Agent Version";

  tableid = idgenerator();

  var card = [];
  createCard(card, view, [], []);

  var table = [];
  var classes = ["table","table-hover"];
  var attributes = ["width:100%","cellspacing:0","id:"+tableid];
  createTable(table, card.body, classes, attributes);
  $.post("php/functions/notification/notification.notupdated.summary.php",function(data){
    data = data.split("#");
    datalength = data.length;

    thfdata = data[0].split("|");
    var tbheader = [], tbfooter = [];
    createTableContent([], table.head, [], [], "th", thfdata);
    // createTableContent([], table.foot, [], [], "th", thfdata);

    for (var i = 1; i < datalength;i++){
        newdata = data[i].split("|");
        createTableContent([], table.body, [],[], "td", newdata);

        }

  });
}

function NOTIFallshow(){
  var view = document.getElementById("ContentCardBody");
  view.innerHTML = "";

  document.getElementById("dtitle").innerHTML = "Notifications";

  tableid = idgenerator();

  var card = [];
  createCard(card, view, [], []);

  var table = [];
  var classes = ["table","table-hover"];
  var attributes = ["width:100%","cellspacing:0","id:"+tableid];
  createTable(table, card.body, classes, attributes);
  $.post("php/functions/notification/notification.showall.php",function(data){
    data = data.split("#");
    datalength = data.length;

    thfdata = data[0].split("|");
    var tbheader = [], tbfooter = [];
    createTableContent([], table.head, [], [], "th", thfdata);
    // createTableContent([], table.foot, [], [], "th", thfdata);

    for (var i = 1; i < datalength;i++){
        newdata = data[i].split("|");
        createTableContent([], table.body, [],[], "td", newdata);

        }

  });
}

function SESSIONConfirm(){
  $.post("php/functions/session/session.confirm.php",function(data){

    data = data.split(";");
    var name = document.getElementById("NAVBARusernameID");
    if(data[0] == "Active"){
      //redirect
      switch (data[1]) {
        case "SUPER ADMIN":
          window.location.assign("/.superadmin.html");
          break;
        case "ADMINISTRATOR":
          break;
        case "STAFF":
          window.location.assign("/.user.html");
          break;
        default:
        window.location.assign("/index.html");
      }
      //riderect
    }
    else{
      window.location.assign("/index.html");
    }

    var nametext = document.createTextNode(data[3]);
    name.appendChild(nametext);
  });
}

/*Numbers Only*/
function isNumberKey(evt)
{
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
    return true;
}

/*Letters Only*/
function LettersrOnly(e)
{
      var arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
      var code;
          if (window.event)
						  code = e.keyCode;
					else
              code = e.which;
      var char = keychar = String.fromCharCode(code);
          if (arr.indexOf(char) == -1)
          return false;
}

function accountinfoupdatebtn(value){
  var currentval = document.getElementById("lblPositions").value;
  var inputpost = document.getElementById("lblPositions");
  var btn = document.getElementById("accountinfoupdatebtn");
  if(value !== currentval && currentval !== ""){
  $.post("php/functions/profile/account.position.update.php",{currentval:currentval},function(data){
    if(data == "success"){
      inputpost.removeAttribute("value");
      inputpost.setAttribute("value",currentval);
      ALERTcall("success","Position have been updated");
      inputpost.removeAttribute("onkeyup");
      inputpost.setAttribute("onkeyup","accountpositionconfirm(\""+currentval+"\")");
      accountpositionconfirm(currentval);
      btn.removeAttribute("onClick");
      btn.setAttribute("onClick","accountinfoupdatebtn(\""+currentval+"\")");
    }

  });
}
else{
  ALERTcall("danger","Something went wrong, please try again");
}
}

function accountpositionconfirm(data){

var currentval = document.getElementById("lblPositions").value;
var updatebtn = document.getElementById("accountinfoupdatebtn");
if(data !== currentval && currentval !== ""){
  updatebtn.removeAttribute("disabled");
}
else{
  updatebtn.setAttribute("disabled","true");
}

}

 function AddEmployee()
 {
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var value = [], divvalue = [], leftdiv = [], subrdiv = [], rightsidevalue = [], span = [];

  createnewElement(divvalue, ch, "div", ["row"], [], "");
  divvalue.newelement.style.width = "600px";
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, leftdiv.newelement, "h6", [], ["id:PassLbl"],"Add New Employee" );

  createnewElement(subrdiv, divvalue.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  span.newelement.innerHTML = "&times;";


  var form = [], fg = [], col = [], label = [], input = [], br = [], select = [], option = [];

  createnewElement(form, cb, "form", [], ["onsubmit:return addemployeesubmit()"], "");
  createnewElement(fg, form.newelement, "div", ["form-group"], [] , "");
  createnewElement(label, fg.newelement, "label", [], ["for:insertemployeeid"], "Employee ID");
  createnewElement(input, fg.newelement, "input", ["form-control"], ["type:Numbers","id:insertemployeeid","required:true"], "");

  createnewElement(fg, form.newelement, "div", ["form-group"], [] , "");
  createnewElement(label, fg.newelement, "label", [], ["for:insertemployeel2"], "Employee Name");
  createnewElement(input, fg.newelement, "input", ["form-control"], ["type:text","id:insertemployeename","required:true"], "");

  createnewElement(fg, form.newelement, "div", ["form-row"], [] , "");
  createnewElement(col, fg.newelement, "div", ['col'], [], "");
  createnewElement(label, col.newelement, "label", [], ["for:insertemployeel1"], "Employee Login");
  createnewElement(input, col.newelement, "input", ["form-control"], ["type:text","id:insertemployeel1"], "");
  createnewElement(col, fg.newelement, "div", ['col'], [], "");
  createnewElement(label, col.newelement, "label", [], ["for:insertemployeel2"], "Employee Second Login");
  createnewElement(input, col.newelement, "input", ["form-control"], ["type:text","id:insertemployeel2"], "");

  createnewElement(fg, form.newelement, "div", ["form-row"], [] , "");
  createnewElement(col, fg.newelement, "div", ['col'], [], "");
  createnewElement(label, col.newelement, "label", [], ["for:insertemployeedept"], "Department");

  createnewElement(select, col.newelement, "select", ["form-control"], ["name:department", "required:true", "id:insertemployeedept"], "");
  Departmentlist("insertemployeedept");

  createnewElement(col, fg.newelement, "div", ['col'], [], "");
  createnewElement(label, col.newelement, "label", [], ["for:insertemployeesubdept"], "Sub Department");
  createnewElement(input, col.newelement, "input", ["form-control"], ["type:text","id:insertemployeesubdept"], "");

  createnewElement(br, form.newelement, "br", [], [], "");
  createnewElement(fg, form.newelement, "div", ["form-group"], [] , "");
  createnewElement(input, fg.newelement, "button", ["form-control", "btn", "btn-primary"], ["type:submit"], "Submit");

  createnewElement(br, form.newelement, "br", [], [], "");
 }

function ChangePass()
{
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var value = [], divvalue = [], leftdiv = [], subrdiv = [], rightsidevalue = [], span = []
  form = [], fg = [], label = [], input = [], btn = [], br = [];


  createnewElement(divvalue, ch, "div", ["row"], [], "");
  divvalue.newelement.style.width = "600px";
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, leftdiv.newelement, "h6", [], ["id:PassLbl"],"Change Password" );

  createnewElement(subrdiv, divvalue.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  // createnewElement(rightsidevalue, subrdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  // createnewElement(span, rightsidevalue.newelement, "span", [], ["aria-hidden:true", "id:span"], "");
  // span.newelement.innerHTML = "&times;";

  createnewElement(form, cb, "form", [], ["onsubmit:return AccInfChnPass();"], "");
  createnewElement(fg, form.newelement, "div", ["form-group"], [], "");
  createnewElement(label, fg.newelement, "label", [], ["for:AccInfCurrPAss"], "Current Password");
  createnewElement(input, fg.newelement, "input", ["form-control"], ["id:AccInfCurrPAss","type:password","pattern:(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", "required:true", "title:\"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters and no spaces\""], "");
  //
  createnewElement(fg, form.newelement, "div", ["form-group"], [], "");
  createnewElement(label, fg.newelement, "label", [], ["for:AccInfNewPAss"], "New Password");
  createnewElement(input, fg.newelement, "input", ["form-control"], ["id:AccInfNewPAss","type:password","pattern:(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", "required:true", "title:\"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters and no spaces\""], "");
  //
  createnewElement(fg, form.newelement, "div", ["form-group"], [], "");
  createnewElement(label, fg.newelement, "label", [], ["for:AccInfCompPAss"], "Confirm Password");
  createnewElement(input, fg.newelement, "input", ["form-control"], ["id:AccInfCompPAss","type:password","pattern:(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", "required:true"], "");
  //
  createnewElement(br, form.newelement, "br", [], [], "");
  //
  createnewElement(fg, form.newelement, "div", ["form-row"], [],"");
    createnewElement(label, fg.newelement, "div", ["form-group", "col-md-6"], [], "");
    createnewElement(input, label.newelement, "input", ["form-control","btn", "btn-info"], ["type:submit","value:Confirm"], "");
    createnewElement(label, fg.newelement, "div", ["form-group", "col-md-6"], [], "");
    createnewElement(input, label.newelement, "input", ["form-control","btn", "btn-warning"], ["type:button","onClick:OVERLAYdisable()","value:Cancel"], "");
  //
  createnewElement(br, form.newelement, "br", [], [], "");
}

function AccInfChnPass(){
  var password = document.getElementById("AccInfNewPAss");
  var confirm_password = document.getElementById("AccInfCompPAss");
  var old_password = document.getElementById("AccInfCurrPAss");

  if(password.value !== confirm_password.value) {
    confirm_password.setCustomValidity("Passwords doesn't match");
  } else {

    $.post("php/functions/profile/account.change.password.php",{oldpassword:old_password.value,newpassword:password.value,confpassword:confirm_password.value},function(data){
      if(data == "success"){
        ALERTcall("success","Password has been updated");
        OVERLAYdisable();
      }
      else{
        ALERTcall("danger",data);
      }
    });
  }

return false;
}

// function EmployeeList()
// {
//     var contentview = document.getElementById("ContentCardBody");
//     contentview.innerHTML = "";

//     document.getElementById("dtitle").innerHTML = "Profile And Accounts";
//     document.getElementById("dtitle2").innerHTML = "Employee List";

//     tableid = idgenerator();
//     var card = [];
//     createCard(card, contentview, [], []);
//     createnewElement([],card.head,"div",[],["id:ContentCardHead"],"");

//     var table = [];
//     var classes = ["table","table-bordered"];
//     var attributes = ["width:100%","cellspacing:0","id:"+tableid];
//     createTable(table, card.body, classes, attributes);

//     $.post("php/functions/employee/employee.list.php",function(data){
//       data = data.split("#");
//       datalength = data.length;

//       thfdata = data[0].split("|");
//       createTableContent([], table.head, [], [], "th", thfdata);
//       createTableContent([], table.foot, [], [], "th", thfdata);

//       for (var i = 1; i < datalength;i++){
//           newdata = data[i].split("|");
//           createTableContent([], table.body, [],[], "td", newdata);

//       }

//       pagination(tableid);
//     });
//       var button = [], buttons = [];
//       // createnewElement(button, card.foot, "button", ["btn","btn-primary"],["type:button", "id:btnAddDept"],"Add Department");
//       createnewElement(button, card.foot, "button", ["btn","btn-default"],["type:button", "id:btnAddEmp", "onclick:AddEmployee()"],"Add Employee");
//       createnewElement(button, card.foot, "button", ["btn","btn-default"],["type:button", "id:btnImpEmp", "onclick:importemployee()"],"Import List");
//       createnewElement(button, card.foot, "button", ["btn","btn-danger"],["type:button","onclick:deleteemployees()","disabled:true","id:deleteemployees"],"Delete");
// }

function importemployee()
{
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  ch.innerHTML = "Import List From Excel file"
  var iframe = [], input1 = [], input2 = [];

  createnewElement(iframe, cb, "iframe",[],["src:php/functions/import/index.php","width:500px", "height:250px"],"");

}

function deleteemployees() {

  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var checked = [];
  var checkedindex = [];
  var checkbox  = document.getElementsByClassName("checkemployee");
  for(var i = 0; i < checkbox.length; i++){
    if(checkbox[i].checked){
      checked.push(checkbox[i]);
      checkedindex.push(i);
    }
  }

  cb.innerHTML = "You are about to delete "+checked.length+" item(s),<br> Are you sure about this?<br>";


  cf.innerHTML = "<input class=\"btn btn-danger\" type=\"button\" value=\"Delete\" onClick=\"deleteemployeesconfirm(["+checkedindex+"])\"></input>";
}

function deleteemployeesconfirm(id){
  var element = [];
  for(var i = 0; i < id.length; i++){
    element.push(document.getElementsByClassName("checkemployee")[id[i]].id);
  }
  $.post("php/functions/employee/employee.delete.php",{element:element},function(data){

    if(data = "success"){
      var tableid = $('#'+element[0]).closest('table').attr('id');
      var table = $("#"+tableid).DataTable();
        for(var j = 0; j < id.length; j++){
          table
            .row($("#"+element[j]).parents('tr'))
            .remove()
            .draw();
        }
      ALERTcall("success","Deletion have been successful!");
      OVERLAYdisable();

    }
    else{
      ALERTcall("danger","Error hav been encountered:<br>"+data);
    }
  });


}




function BRNCHVWedit(id){
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");
  var tree_id = document.getElementById(id).getAttribute("tree_id");
  var tree_filter = document.getElementById(id).getAttribute("tree_filter");
  var tree_name = document.getElementById(id).getAttribute("tree_name");
  var comp_count = document.getElementById(id).getAttribute("computer_count");

  ch.innerHTML = "Edit Current Data";

  var form = [], formgroup = [], namelbl = [], nameval = [], formgroup2 = [], namelbl2 = [], nameval2 = [], brk = [], btn = [];
  //form
  createnewElement(form, cb, "form", [], ["onsubmit:return branchedit(\""+tree_id+"\",\""+tree_name+"\",\""+tree_filter+"\",\""+id+"\")"], "");
  //formgroup
  createnewElement(formgroup, form.newelement,"div",["form-group"],[],"");
  //treename
  createnewElement(namelbl, formgroup.newelement, "label", [], ["for:tree_name"], "Change Tree Name");
  createnewElement(nameval, formgroup.newelement, "input", ["form-control"], ["required:true","value:"+tree_name,"data:"+tree_name, "id:tree_name", "onkeyup:BRNCHVWeditconfirm(\""+tree_name+"\",\""+tree_filter+"\",\""+comp_count+"\")"], "");
  createnewElement(brk, form.newelement, "br", [], [],"");
  //formgroup
  createnewElement(formgroup2, form.newelement,"div",["form-group"],[],"");
  //treename
  createnewElement(namelbl2, formgroup2.newelement, "label", [], ["for:tree_filter"], "Change Tree Filter");
  createnewElement(nameval2, formgroup2.newelement, "input", ["form-control"], ["required:true","value:"+tree_filter,"data:"+tree_filter, "id:tree_filter", "onkeyup:BRNCHVWeditconfirm(\""+tree_name+"\",\""+tree_filter+"\",\""+comp_count+"\")"], "");
  //formgroup
  createnewElement(formgroup2, form.newelement,"div",["form-group"],[],"");
  //count
  createnewElement(namelbl2, formgroup2.newelement, "label", [], ["for:pc_count"], "No of Computers");
  createnewElement(nameval2, formgroup2.newelement, "input", ["form-control"], ["required:true","type:number","value:"+comp_count,"data:"+comp_count, "id:pc_count", "onkeyup:BRNCHVWeditconfirm(\""+tree_name+"\",\""+tree_filter+"\",\""+comp_count+"\")"], "");

  createnewElement(brk, form.newelement, "br", [], [], "");
  createnewElement(btn, form.newelement, "button", ["btn","btn-primary","btn-block"], ["type:submit","id:editsubmit","disabled:true"], "Edit");

  createnewElement(brk, form.newelement, "br", [], [], "");

}

function branchedit(id, name, filter, h5id){

  newname = document.getElementById("tree_name").value;
  newfilter = document.getElementById("tree_filter").value;
  newpcno = document.getElementById("pc_count").value;
  newtd = document.getElementById(h5id);
  $.post("php/functions/sttngs/settings.branch.view.edit.php",{newname:newname,newfilter:newfilter,newpcno:newpcno,id:id},function(data){
    if (data == "true"){
      ALERTcall("success","Data have beed updated");
      newtd.removeAttribute("tree_name");
      newtd.removeAttribute("tree_filter");
      newtd.setAttribute("tree_name",newname);
      newtd.setAttribute("tree_filter", newfilter);
      newtd.innerHTML = newname;
      var link = [], i =[], link2 = [], i2 = [];
      createLink(link, newtd  , "", ["btn","btn-default","btn-sm"], ["role:button", "href:#", "onClick:BRNCHVWedit(\""+h5id+"\")"]);
      createnewElement(i, link.link, "i", ["fa","fas","fa-fw","fa-lg","fa-edit"],[],"");
      createLink(link2, newtd  , "", ["btn","btn-default","btn-sm"], ["role:button", "href:#", "onClick:BRNCHVWdelete(\""+h5id+"\")"]);
      createnewElement(i2, link2.link, "i", ["fa","fas","fa-fw","fa-lg","fa-trash"],[],"");
      OVERLAYdisable();
    }
    else{
      ALERTcall("danger", "Update Failed Error: "+data);
      OVERLAYdisable();
    }
  });
  return false;
}

function BRNCHVWeditconfirm(name,filter,count){

  newname = document.getElementById("tree_name").value;
  newfilter = document.getElementById("tree_filter").value;
  comp_count = document.getElementById("pc_count").value;
  editsubmit = document.getElementById("editsubmit");

  if(newname !== name || newfilter !== filter || comp_count !== count){
    editsubmit.removeAttribute('disabled');
  }
  else{
    editsubmit.setAttribute("disabled","true");
  }
}

function BRNCHVWdelete(id)
{
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  ch.innerHTML = "Delete Branch";

  var warning = [], warningtxtbld = [], warningtxt = [], yesbtn = [], nobtn = [], br = [];

  createnewElement(warning, cb, "div", ["alert","alert-danger"], [], "");
  createnewElement(warningtxtbld, warning.newelement, "h5", [], [], "Please be reminded!!");
  createnewElement(warningtxt, warning.newelement, "p", [], [], "The sub department under this branch/department will also be deleted. Do you wish to continue?");

  var divp = [], divrw = [], divl = [], divr = [], cancel = [], deletebtn = [];

  createnewElement(divp, cf, "div", ["container"], [], "");
  createnewElement(divrw, divp.newelement, "div", ["row"], [],"");

  createnewElement(divl, divrw.newelement, "div", ["col-sm"], [], "");
    createnewElement(deletebtn, divl.newelement, "button", ["btn","btn-danger", "btn-block"], ["onClick:branchdelete(\""+id+"\")"], "delete");

  createnewElement(divr, divrw.newelement, "div", ["col-sm"], [], "");
    createnewElement(cancel, divr.newelement, "button", ["btn","btn-secondary", "btn-block"], ["onClick:OVERLAYdisable()"], "cancel");
}

function branchdelete(id){

  var tree_id = document.getElementById(id).getAttribute("tree_id");

  $.post("php/functions/sttngs/settings.branch.view.delete.php",{tree_id:tree_id},function(data){
    if (data == "success"){
      ALERTcall("success","Successfully Deleted");
      OVERLAYdisable();
      DSHBRDContentBranchSettings('','DSHBRDBranchView');
    }

  });
}

function resetPass(){
  var x = document.getElementById("passwordupdate");
	if (x.type === "password")
	{
    x.type = "text";
  }
	else
	{
		x.type = "password";
	}
}

// function DSHBRDAgentVersion(){


//     var contentview = document.getElementById("ContentCardBody");
//     contentview.innerHTML = "";

//     document.getElementById("dtitle").innerHTML = "Settings";
//     document.getElementById("dtitle2").innerHTML = "Agent Version";

//     tableid = idgenerator();
//     var card = [];
//     createCard(card, contentview, [], []);
//     createnewElement([],card.head,"div",[],[],"");

//     // card.head.innerHTML = "Agent Version";

//     var table = [];
//     var classes = ["table","table-bordered"];
//     var attributes = ["width:100%","cellspacing:0","id:"+tableid];
//     createTable(table, card.body, classes, attributes);

//     $.post("php/functions/sttngs/settings.agent.version.php",function(data){

//       data = data.split("#");
//       datalength = data.length;

//       thfdata = data[0].split("|");
//       var tbheader = [], tbfooter = [];
//       createTableContent([], table.head, [], [], "th", thfdata);
//       createTableContent([], table.foot, [], [], "th", thfdata);

//       for (var i = 1; i < datalength;i++){
//           newdata = data[i].split("|");
//           createTableContent([], table.body, [],[], "td", newdata);

//           }

//     });

//   var toolbar = [];
//   createnewElement(toolbar,card.foot,"div",["btn-toolbar","mr-3"],[],"");
//   var ig = [];
//   createnewElement(ig,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
//   createnewElement([], ig.newelement, "button", ["btn","btn-default"], ["type:button","onclick:addagentversion()"], "Add new Version");

//   createnewElement(ig,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
//   createnewElement([], ig.newelement, "button", ["btn","btn-danger"], ["type:button","onclick:deleteagentversion()"], "Delete ");

// }

function addagentversion(){
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var div = [], subdiv = [], value = [], span = [];

  createnewElement(div, ch, "div", ["row"], [], "");
  div.newelement.style.width = "600px";
  createnewElement(subdiv, div.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, subdiv.newelement, "h5", [], ["id:editHeader"],"Add new Version" );

  createnewElement(subdiv, div.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  createnewElement(value, subdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, value.newelement, "span", [], ["aria-hidden:true", "id:span"], "");
  span.newelement.innerHTML = "&times;";

  var form = [], fg = [], lbl = [], inp = [], br = [], select = [], opt = [];

  createnewElement(form, cb, "form", [], ["onsubmit:return commitaddagentversion()"], "");
    createnewElement(fg, form.newelement, "div", ["form-group"], [], "");
      createnewElement(lbl, fg.newelement, "label", [], ["for:agentversion"], "Agent Version");
      createnewElement(inp, fg.newelement, "input", ["form-control"], ["id:agentversion","placeholder:X.XXX","required:true"], "");
    createnewElement(fg, form.newelement, "div", ["form-group"], [], "");
      createnewElement(lbl, fg.newelement, "label", [], ["for:validation"], "Validation");
      createnewElement(select, fg.newelement, "select", ["form-control"], ["id:validation"], "");
        createnewElement(opt, select.newelement, "option", [], ["selected:selected", "value:valid"], "valid");
        createnewElement(opt, select.newelement, "option", [], ["value:invalid"], "invalid");
        createnewElement(br, form.newelement, "br", [], [], "");
    createnewElement(fg, form.newelement,"div", ["form-group"], [], "");
      createnewElement(inp, fg.newelement, "button", ["btn","btn-info","btn-block"], [], "Submit");
    createnewElement(br, form.newelement, "br", [], [], "");

}
function commitaddagentversion(){
  var version = document.getElementById("agentversion").value;
  var validation = document.getElementById("validation").value;
    $.post("php/functions/sttngs/settings.agent.version.add.php",{version:version,validation,validation}, function(data){

      if(data == "success"){
        ALERTcall("success","Version have been added");
        OVERLAYdisable();
        DSHBRDAgentVersion();
      }
      else{
        ALERTcall("danger",data);
      }
    });

  return false;
}

function deleteagentversion(){
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var div = [], subdiv = [], value = [], span = [];

  createnewElement(div, ch, "div", ["row"], [], "");
  div.newelement.style.width = "600px";
  createnewElement(subdiv, div.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, subdiv.newelement, "h5", [], ["id:editHeader"],"Add new Version" );

  createnewElement(subdiv, div.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  createnewElement(value, subdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, value.newelement, "span", [], ["aria-hidden:true", "id:span"], "");
  span.newelement.innerHTML = "&times;";

  var form = [], label = [], select = [], option = [], input = [];

  createnewElement(form, cb, "form", [] ,["onsubmit:return deletecommitagentversion()"], "");
    createnewElement(div, form.newelement, "div", ["form-group"], [], "");
    createnewElement(label, div.newelement, "label", [], [], "Select the Version you want to delete");
    createnewElement(select, div.newelement, "select", ["form-control"], ["id:deleteagentversiondata"], "");
    createnewElement(input, div.newelement, "br", [], [], "");

    createnewElement(div, form.newelement, "div", ["form-group"], [], "");
    createnewElement(input, div.newelement, "input", ["btn","btn-primary", "btn-block"], ["type:submit"], "Submit");
    createnewElement(input, div.newelement, "br", [], [], "");


  $.post("php/functions/sttngs/settings.agent.version.php", function(data){
    data = data.split("#");
    for(var i = 1; i < data.length; i++){
      value = data[i].split("|");
      createnewElement(option, select.newelement, "option", [], ["value:"+value[1]], value[1]);
    }
  });

}

function deletecommitagentversion(){

  var version = document.getElementById("deleteagentversiondata").value;

  $.post("php/functions/sttngs/settings.agent.version.delete.php",{version:version},function(data){

    if(data == "success"){
      ALERTcall("success","Version have been added");
      OVERLAYdisable();
      DSHBRDAgentVersion();
    }
    else{
      ALERTcall("danger",data);
    }

  });


  return false;
}
