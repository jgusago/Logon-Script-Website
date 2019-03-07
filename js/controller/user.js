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
  createSelection(select, subrdiv.newelement, [], ["id:CMPLISTdtlsremarks","onChange:CMPLISTdtlsremarksupdate(\""+remarks+"\",\"CMPLISTdtlsremarks\")"], ["Active:Active","On Leave:On Leave", "Vacant:Vacant", "Resigned:Resigned","Transferred:Transferred","Old PC name:Old PC name"]);
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
// function DSHBRDContentTbls(parent, path, tablehead, tablefoot, tablebody, id, linkid){
// $.post(path, {parent:parent,linkid:linkid}, function(data){

//     data = data.split("#");
//     datalength = data.length;

//     thfdata = data[0].split("|");
//     var tbheader = [], tbfooter = [];
//     createTableContent([], tablehead, [], [], "th", thfdata);
//     createTableContent([], tablefoot, [], [], "th", thfdata);

//     for (var i = 1; i < datalength;i++){
//         newdata = data[i].split("|");
//         createTableContent([], tablebody, [],[], "td", newdata);

//         }
// });
// if (path == "php/functions/accounts/accounts.view.php")
// {
//   document.getElementById("dtitle").innerHTML = "Profile & Accounts";
//   document.getElementById("dtitle2").innerHTML = "Account Management";
// }
// else
// {
//   if(path == "php/functions/reports/computer.list.php")
//   {
//     document.getElementById("dtitle").innerHTML = "Reports";
//     document.getElementById("dtitle2").innerHTML = "Computer List";
//   }
//   else if(path == "php/functions/reports/computer.logs.php")
//   {
//     document.getElementById("dtitle").innerHTML = "Reports";
//     document.getElementById("dtitle2").innerHTML = "Computer Logs";
//   }
//   else if(path == "php/functions/reports/computer.logs.history.php")
//   {
//     document.getElementById("dtitle").innerHTML = "REports";
//     document.getElementById("dtitle2").innerHTML = "Computer Logs History";
//   }
//   else if(path == "php/functions/reports/computer.edit.history.php")
//   {
//     document.getElementById("dtitle").innerHTML = "Reports";
//     document.getElementById("dtitle2").innerHTML = "Edit History";
//   }
//   pagination(id);
// }
// }

function DSHBRDContentBranchSettings(){
var contentview = document.getElementById("ContentCardBody");
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

function NAVBARNotification()
{
  getNotification();
  setInterval(function()
  {
    getNotification();
  }, 30000);
}

function getNotification()
{
  content = document.getElementById("NAVBARNotifContent");
  mbcount = document.getElementById("NOTIFmbcount");
  dtcount = document.getElementById("NOTIFdtcount");
  mbcount.innerHTML = "";
  dtcount.innerHTML = "";
  content.innerHTML = "";
    $.post("php/functions/notification/notification.endtask.count.php",function(data){
      var notif = document.createElement("div");
      data = data.split("`");
      if(data[0] != '0'){
        for(var i = 0; i < data.length; i++){
          newdata = data[i].split("|");
          var newdiv = document.createElement("div");
          var a = [], span =[], strong = [], span2=[], div=[];
          createnewElement(a, newdiv, "a",["dropdown-item"],["onClick:"+newdata[0]+"()", "href:#"],"");
          createnewElement(span, a.newelement, "span", [newdata[1]], [], "");
          createnewElement(strong, span.newelement, "Strong", [], [], newdata[2]);
          createnewElement(span2, a.newelement,"span", ["small","float-right","text-muted"],[],newdata[3]);
          createnewElement(div, a.newelement,"div",["dropdown-message","small"],[],newdata[4]);


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

function NOTIFallshow()
{
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
        window.location.assign("/.admin.html");
        break;
      case "STAFF":
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

//

/* Background */
/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/*
Functions Abbriviations
DSHBRD - dashboard
LNK - link
CNTVW - Contentview

*/
