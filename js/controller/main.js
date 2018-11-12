/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */
function load()
{
  var branchview = document.getElementById("contentview");
  var loading = document.getElementById("processingbar");

  var wdth = 0;

  DSHBRDNavBarBtns();

  NAVBARNotification();

}

function Notif()
{
  document.getElementById("dtitle").innerHTML = "Notifications";

  // var contentview = document.getElementById("contentview");

  // var divpanel = document.createElement("div");
  // divpanel.classList.add("card");

  // var panelhead = document.createElement("div");
  // panelhead.classList.add("card-header");

  // var panelbody = document.createElement("div");
  // panelbody.classList.add("card-body");

  // var divtable = document.createElement("div");
  // divtable.classList.add("table-responsive");

  // var table = document.createElement("table");
  // table.classList.add("table");
  // table.classList.add("table-hover");

  // var thead = document.createElement("thead");
  // var tr = document.createElement("tr");
  // var th = document.createElement("th");
  // th.innerHTML = "Subject";
  // var th1 = document.createElement("th");
  // th1.innerHTML = "Details";

  // var tbody = document.createElement("tbody");

  // contentview.appendChild(divpanel);
  // table.appendChild(tbody);
  // tr.appendChild(th1);
  // tr.appendChild(th);
  // thead.appendChild(tr);
  // table.appendChild(thead);
  // divtable.appendChild(table);
  // panelbody.appendChild(divtable);
  // divpanel.appendChild(panelbody);
  // divpanel.appendChild(panelhead);
}

/* Buttons */

function DSHBRDNavBarBtns()
{
/* Get All Elements with generatebutton Class */
var btnclass = "generatebutton";
parent = document.getElementsByClassName(btnclass);

$.post("php/functions/load/dashboard.buttons.php",{branch:"root"},function(data){

  newdata = data.split("|");

  for (var i = 0; i < parent.length; i++){
    var link = [];
    var list = [];
    var onClick = [];
    //get parent id
    var grandparentid = document.getElementsByClassName(btnclass)[i].parentElement.getAttribute("id");
    //create link
    var value = document.getElementsByClassName(btnclass)[i].getAttribute("data");
    var parentid = document.getElementsByClassName(btnclass)[i].getAttribute("id");
    linkid = idgenerator();
    var linkclasses = ["nav-link", "nav-link-collapse","collapdatased"];
    var linkattrib = ["data-toggle:collapse","href:#"+linkid,"data-parent:#"+grandparentid];
    createLink(link, parent[i], value, linkclasses, linkattrib);

    //create list
    var listclasses = ["sidenav-third-level", "collapse"];
    var listattrib = ["id:"+linkid,"data-parent:#DSHBRDRecords"];
    createList(list, parent[i], "ul", newdata.length, listclasses, listattrib);
    //create list value
    var ListLink = [];
    for (var j = 0; j < newdata.length; j++){
      var newid = idgenerator();
      createLink(ListLink, list.li[j], newdata[j], [], ["data:"+parentid,"onClick:DSHBRDContent('"+newdata[j]+"','"+newid+"')", "id:"+newid]);
    }
  }

});

}

/* Buttons */
/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/* OnClick */

function DSHBRDContent(parent, linkid)
{
    var view = document.getElementById("contentview");
    var linkdata = document.getElementById(linkid).getAttribute("data");
    view.innerHTML = "";

    tableid = idgenerator();

    var card = [];
    createCard(card, view, [], []);

    var table = [];
    var classes = ["table","table-bordered"];
    var attributes = ["width:100%","cellspacing:0","id:"+tableid];
    createTable(table, card.body, classes, attributes);

    switch (linkdata) {
      case "DSHBRDRecordsComplist":
        path = "php/functions/reports/computer.list.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);

      break;
      case "DSHBRDRecordsComplogs":
        path = "php/functions/reports/computer.logs.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDRecodesBrnchvw":
        path = "";
      break;
      case "DSHBRDAccountsAccMgnt":
        path = "php/functions/accounts/accounts.view.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDProfile":
        path = "";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDBranchView":
        path = "";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      default:

    }
}


// function ACCTedit()
// {
//   OVERLAYenable();

//   //get mini window ID;

//   var miniwindow = document.getElementById("miniwindow");
//   var ch = document.getElementById("mnch");
//   var cb = document.getElementById("mncb");
//   var cf = document.getElementById("mncf");

//   miniwindow.appendChild(ch);
//   miniwindow.appendChild(cb);
//   miniwindow.appendChild(cf);
// }



//computerlist Update OnClick

function COMPLISTupdate(hostname, user, remarks, tabledata, grandparent, linkid)
{
OVERLAYenable();

//get mini window ID;
var ch = document.getElementById("mnch");
var cb = document.getElementById("mncb");
var cf = document.getElementById("mncf");

var value = [], divvalue = [], leftdiv = [], rightdiv = [], rightsidevalue = [], select = [], subrdiv = [], option = [];
//whole div
createnewElement(divvalue, ch, "div", ["row"], [], "");
//leftside div
createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-6"], [], "");
  //leftside contents
  createnewElement(value, leftdiv.newelement, "h4", [], [], hostname+" | "+user);

//rightside DiV
createnewElement(rightdiv, divvalue.newelement, "div", ["col-sm-12","col-md-6","d-flex","flex-row-reverse"], [], "");
  createnewElement(subrdiv, rightdiv.newelement, "div", [], [], "");
  createnewElement(rightsidevalue, subrdiv.newelement, "strong", ["text-right"], [], "Remarks: ");
  //create Select element
  createSelection(select, subrdiv.newelement, [], ["id:CMPLISTdtlsremarks","onChange:CMPLISTdtlsremarksupdate(\""+remarks+"\",\"CMPLISTdtlsremarks\")"], ["Active:Active","Resigned:Resigned","Transfered:Transfered"," Old PC name:Old PC name"]);
  //add value
  createnewElement(option, select.select, "option", [], ["hidden:true","selected:true","disabled:true","name:"+remarks], remarks);

$.post("php/functions/reports/computer.list.details.php",{hostname:hostname},function(newdata){

  newdata = newdata.split("!!");

  for(var d = 0; d < newdata.length; d++){

  var table = [];
  var tableid = idgenerator();
  var classes = ["table","table-bordered"];
  var attributes = ["width:100%","cellspacing:0","id:"+tableid];
  createTable(table, cb, classes, attributes);
  data = newdata[d].split("#");
  datalength = data.length;

  thfdata = data[0].split("|");
  var tbheader = [], tbfooter = [];
  createTableContent([], table.head, [], [], "th", thfdata);

  for (var i = 1; i < datalength;i++){
      contentdata = data[i].split("|");
      createTableContent([], table.body, [],[], "td", contentdata);

      }

  }//newdata for close
});

//footer
var updatebutton = [], footerdiv = [];
var footerclass = ["d-flex","flex-row-reverse"];
createnewElement(footerdiv, cf, "div", footerclass, [], "" );
createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-default","ml-1"], ["onClick:OVERLAYdisable()"], "Cancel" );
createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-primary","disabled","ml-1"], ["id:CMPLISTdtlsupdate","onclick:CMPLISTdtlsupdate(\""+hostname+"\",\""+tabledata+"\",\""+grandparent+"\",\""+linkid+"\")"], "update" );
}

/* Table Call Path with PHP*/
function DSHBRDContentTbls(parent, path, tablehead, tablefoot, tablebody, id, linkid)
{
  $.post(path, {parent:parent,linkid:linkid}, function(data){

      data = data.split("#");
      datalength = data.length;

      thfdata = data[0].split("|");
      var tbheader = [], tbfooter = [];
      createTableContent([], tablehead, [], [], "th", thfdata);
      createTableContent([], tablefoot, [], [], "th", thfdata);

      for (var i = 1; i < datalength;i++){
          newdata = data[i].split("|");
          createTableContent([], tablebody, [],[], "td", newdata);

          }
  });
  if (path == "php/functions/accounts/accounts.view.php")
  {
    document.getElementById("dtitle").innerHTML = "Notifications";
  }
  else
  {
  pagination(id);
  }
}

/* OnClick */


/* Background */

function LNKbrdcmps(data)
{
  var address = document.getElementById('address');
  address.innerHTML = "";

}

function OVERLAYenable()
{
document.getElementById("overlay").style.display = "block";
document.getElementById("miniwindow").style.display = "block";
}

function OVERLAYdisable()
{

  document.getElementById("overlay").style.display = "none";
  document.getElementById("loaderdiv").style.display = "none";
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
function CMPLISTdtlsremarksupdate(defaultvalue, id){

var value = document.getElementById(id).value;
var button = document.getElementById("CMPLISTdtlsupdate");

if (value != defaultvalue){
  button.classList.remove("disabled");
}
else {
  button.classList.add("disabled");
}

}

function CMPLISTdtlsupdate(hostname, update, grandparent, linkid){

var remarks = document.getElementById("CMPLISTdtlsremarks").value;
var agentversion = document.getElementById("CMPLISTdtlsagentversion").value;

$.post("php/functions/reports/computer.list.details.update.php",{remarks:remarks,agentversion:agentversion,hostname:hostname,update:update},function(data){});
CMPLISTdtlstableupdate(grandparent,linkid);
//DSHBRDRecordsComplist
//CMPLISTdtlsupdate(linkid);
OVERLAYdisable();
}

function CMPLISTdtlstableupdate(parent, linkid)
{
  var view = document.getElementById("contentview");
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

function NAVBARNotification()
{
  SetInterval(function(){
  
});
}

//

/* Background */
/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/*
Functions Abbriviations
DSHBRD - dashboard
LNK - link
CNTVW - Contentview

*/
