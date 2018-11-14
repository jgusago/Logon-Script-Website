/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */
function load(){
    SESSIONConfirm();
  
    var branchview = document.getElementById("contentview");
    var loading = document.getElementById("processingbar");

    DSHBRDNavBarBtns();

    NAVBARNotification();
}

/* Buttons */

function DSHBRDNavBarBtns(){
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
      case "DSHBRDRecordsHistory":
      path = "";
      DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
    break;
      case "DSHBRDRecodesBrnchvw":
        path = "";
      break;
      case "DSHBRDAccountsAccMgnt":
        path = "php/functions/accounts/accounts.view.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
        createnewElement([], card.head, "button", ["btn","btn-default"],["data-toggle:modal", "data-target:#AddUser", "href:#AddUser"],"Add User");
      break;
      case "DSHBRDProfile":
        path = "";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDBranchView":
        path = "";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDLogsHistory":
        path = "php/functions/reports/computer.logs.history.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      default:

    }
    
    setTimeout(function()
    {
      var copy = document.getElementsByClassName("buttons-copy");
      copy[0].classList.remove("btn-secondary");
      copy[0].classList.add("btn-default");

      var excel = document.getElementsByClassName("buttons-excel");
      excel[0].classList.remove("btn-secondary");
      excel[0].classList.add("btn-success");

      var pdf = document.getElementsByClassName("buttons-pdf");
      pdf[0].classList.remove("btn-secondary");
      pdf[0].classList.add("btn-danger");

    }, 500)
}

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
    createSelection(select, subrdiv.newelement, [], ["id:CMPLISTdtlsremarks","onChange:CMPLISTdtlsremarksupdate(\""+remarks+"\",\"CMPLISTdtlsremarks\")"], ["Active:Active","Resigned:Resigned","Transfered:Transferred"," Old PC name:Old PC name","On Leave:On Leave"]);
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
function DSHBRDContentTbls(parent, path, tablehead, tablefoot, tablebody, id, linkid){
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
    document.getElementById("dtitle").innerHTML = "Profile & Accounts";
    document.getElementById("dtitle2").innerHTML = "Account Management";
  }
  else
  {
    if(path == "php/functions/reports/computer.list.php")
    {
      document.getElementById("dtitle").innerHTML = "Reports";
      document.getElementById("dtitle2").innerHTML = "Computer List";
    }
    else if(path == "php/functions/reports/computer.logs.php")
    {
      document.getElementById("dtitle").innerHTML = "Reports";
      document.getElementById("dtitle2").innerHTML = "Computer Logs";
    }
    else if(path == "php/functions/reports/computer.logs.history.php")
    {
      document.getElementById("dtitle").innerHTML = "REports";
      document.getElementById("dtitle2").innerHTML = "Computer Logs History";
    }
    else if(path == "php/functions/reports/computer.edit.history.php")
    {
      document.getElementById("dtitle").innerHTML = "Reports";
      document.getElementById("dtitle2").innerHTML = "Edit History";
    }
    pagination(id);
  }
}
function DSHBRDContentBranchSettings(){
  var contentview = document.getElementById("contentview");
  contentview.innerHTML = "";
  var card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("mb-3");
  card.classList.add("contentdataview");
  card.setAttribute("id","branchviewsettings");
  contentview.appendChild(card);
    cardhead = document.createElement("div");
  cardhead.classList.add("card-header");
  card.appendChild(cardhead);
  cardheadtxt = document.createTextNode("Branch View Settings");
  cardhead.appendChild(cardheadtxt);
  cardbody = document.createElement("div");
  cardbody.classList.add("card-body");
  card.appendChild(cardbody);
$.post("php/functions/sttngs/settings.branch.view.php",function(data){
  var newtable = document.createElement("table");
  newtable.classList.add("table");
  newtable.classList.add("table-bordered");
  cardbody.appendChild(newtable);
  data = data.split("||");
  datalength = data.length;
for(var arraccount = 0; arraccount < datalength; arraccount++){            
    var currentdata = data[arraccount].split(";");
    if (currentdata[2] == "tr"){
      var newtr = document.createElement("tr");
      newtable.appendChild(newtr);    
      var newtd = document.createElement("td");         
      if(currentdata[1] > 1){
        newtd.setAttribute("rowspan",currentdata[1]);
      }      
      newtr.appendChild(newtd);
      var  newdatatext = document.createTextNode(currentdata[0]);                    
      newtd.appendChild(newdatatext);                
    }                
    else{    
      var newtd = document.createElement("td");
      if(currentdata[1] > 1){       
        newtd.setAttribute("rowspan",currentdata[1]);
      }                  
      newtr.appendChild(newtd);
      var  newdatatext = document.createTextNode(currentdata[0]);
      newtd.appendChild(newdatatext);            
    }
  }          
});

cardfoot = document.createElement("div");
cardfoot.classList.add("card-footer");
card.appendChild(cardfoot);
var toolbar = [];
createnewElement(toolbar,cardfoot,"div",["btn-toolbar","mr-3"],[],"");
var ig = [];
createnewElement(ig,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
createnewElement([], ig.newelement, "button", ["btn","btn-primary"], ["type:button","onclick:addbranch()"], "Add Branch");
var ig2 = [];
createnewElement(ig2,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
createnewElement([], ig2.newelement,"button", ["btn","btn-primary"], ["type:button","onclick:editbranch()"],"Update a Branch");
}
/*End of Branch View*/
/*End of Branch View*/


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

function CMPLISTdtlstableupdate(parent, linkid){
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
  getNotification();
  setInterval(function(){
    getNotification();
  }, 30000);
}

function getNotification(){
  content = document.getElementById("NAVBARNotifContent");
  mbcount = document.getElementById("NOTIFmbcount");
  dtcount = document.getElementById("NOTIFdtcount");
  mbcount.innerHTML = "";
  dtcount.innerHTML = "";
  content.innerHTML = "";
    $.post("php/functions/notification/notification.endtask.count.php",function(data){
      var notif = document.createElement("div");
      data = data.split("`");
      if(data[0] !== '0'){
        for(var i = 0; i < data.length; i++){
          var newdiv = document.createElement("div");
          newdiv.innerHTML = data[i];
          if(i !== 0){
            breaker = document.createElement("div");
            breaker.classList.add("dropdown-divider");
            content.appendChild(breaker);
          }
          content.appendChild(newdiv);
        }

        mbcount.innerHTML = data.length+" new";
        dtcount.innerHTML = data.length+" new";

      }
      else{
        var newdiv = document.createElement("div");
        newdiv.innerHTML = data[1];
        content.appendChild(newdiv);
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

//

/* Background */
/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/*
Functions Abbriviations
DSHBRD - dashboard
LNK - link
CNTVW - Contentview

*/
