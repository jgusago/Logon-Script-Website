/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */
function load(){
    SESSIONConfirm();
    DSHBRDbtnsCompList();
    DSHBRDbtnsCompLogs();
    NAVBARNotification();
    Departmentlist("department");
    ALERTshow();
}

/* Buttons */
function DSHBRDbtnsCompList(){
    complistul = document.getElementById("COMPLISTlist");

    $.post("php/functions/load/dashboard.buttons.php",function(data){
      cldata = data.split("|");
      for(var  i = 0; i < cldata.length; i++){
        child = cldata[i].split("`");
        var li = [], a = [];
        var id = idgenerator();
        createnewElement(li, complistul, "li", ["nav-item"], ["data-toggle:tooltip","data-placement:right"], "");
        createnewElement(a, li.newelement, "a", [], ["onClick:DSHBRDContentCompList(\""+child[1]+"\",\""+id+"\")","id:"+id],child[0]);

        DSHBRDbtnsCompListChld(li.newelement, a.newelement, child[1], "COMPLISTlist");
      }
    });
}

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
function DSHBRDbtnsCompLogs(){
complogsul = document.getElementById("COMPLOGSlist");

$.post("php/functions/load/dashboard.buttons.php",function(data){
  cldata = data.split("|");
  for(var  i = 0; i < cldata.length; i++){
    var li = [], a = [];
    var id = idgenerator();
    var newdata32 = cldata[i].split("`");
    createnewElement(li, complogsul, "li", ["nav-item"], ["data-toggle:tooltip"], "");
    createnewElement(a, li.newelement, "a", [], ["onClick:DSHBRDContent(\""+newdata32[1]+"\",\""+id+"\")","data:DSHBRDRecordsComplogs","id:"+id],newdata32[0]); //"onClick:DSHBRDContent(\""+cldata[i]+"\",\""+id+"\")",
  }
});
}

function DSHBRDContentCompList(parent, linkid){

  var view = document.getElementById("contentview");
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
          createTableContent([], tablebody, [],[], "td", newdata);

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

    switch (linkdata)
    {
      case "DSHBRDRecordsComplist":
        path = "php/functions/reports/computer.list.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
        // var reports = document.getElementById("Reports");
        // reports.classList.add("active");
      break;
      case "DSHBRDRecordsComplogs":
        path = "php/functions/reports/computer.logs.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDRecordsHistory":
        path = "";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDLogsHistory":
        path = "php/functions/reports/computer.logs.history.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDAccountsAccMgnt":
        path = "php/functions/accounts/accounts.view.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
        createnewElement([], card.head, "button", ["btn","btn-default"],["data-toggle:modal", "data-target:#AddUser", "href:#AddUser", "id:btnAddUser"],"Add User");
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

//User Account Update OnClick
function ACCTedit(userid, name, department, position, role, status, tabledata, grandparent, linkid)
{
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var value = [], divvalue = [], leftdiv = [], subrdiv = [], rightsidevalue = [], span = [], divbody = [], label = [], inputuid = [], divbody1 = [], inputname = [], label1 = [], divbody2= [], label2 = [], select = [], option = [],
  divbody3 = [], label3 = [], select1 = [], option1= [], option2 = [], option3 = [], divbody4 = [], label4 = [], select2 =[], options1 = [], options2=[], options3 = [], divbody5=[], label5 = [], inputpwd = [],
  divfooter = [], button = [], divbody6 =[], label6 =[]

  divbody7 = [], label7 = [], resetpwd = [];

  //whole div
  createnewElement(divvalue, ch, "div", ["row"], [], "");
  //leftside div
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-6"], [], "");
    //leftside contents
    createnewElement(value, leftdiv.newelement, "h4", [], [],"");


  createnewElement(divvalue, ch, "div", ["row"], [], "");
  divvalue.newelement.style.width = "600px";
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, leftdiv.newelement, "h4", [], [],"Edit User Information" );

  createnewElement(subrdiv, divvalue.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  createnewElement(rightsidevalue, subrdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, rightsidevalue.newelement, "span", [], ["aria-hidden:true"], "");
  span.newelement.innerHTML = "&times;";

  //userid
  createnewElement(divbody, cb, "form", ["md-form", "mb-3"], [], "");
  createnewElement(label, divbody.newelement, "label", [],[],"User ID");
  createnewElement(inputuid, divbody.newelement, "input", ["form-control"], ["type:text", "id:useridupdate", "disabled:true", "value:"+userid], "");
  //name
  createnewElement(divbody1, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label1, divbody1.newelement, "label", [],[],"Name");
  createnewElement(inputname, divbody1.newelement, "input", ["form-control"], ["type:text", "id:nameupdate", "required:true", "value:"+name], "");
  //department
  createnewElement(divbody2, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label2, divbody2.newelement, "label", [],[],"Department");
  createnewElement(select, divbody2.newelement, "select", ["form-control"], ["name:department", "required:true", "id:departmentupdate"], "");
  Departmentlist("departmentupdate");
  createnewElement(option, select.newelement, "option", [],["value:"+department,"hidden:true","selected:selected"], department);
  //position
  createnewElement(divbody3, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label3, divbody3.newelement, "label", [],[],"Position");
  createnewElement(select1, divbody3.newelement, "input", ["form-control"], ["name:position", "id:positionupdate", "disabled:true", "value:"+position], "");
  //role
  createnewElement(divbody4, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label4, divbody4.newelement, "label", [],[],"Role");
  createnewElement(select1, divbody4.newelement, "select", ["form-control"], ["name:role", "id:roleupdate", "required:true", "value:"+role], "");
  createnewElement(option1, select1.newelement, "option", [],["value:"+role,"hidden:true","selected:selected"], role);
  createnewElement(option2, select1.newelement, "option", [],["value:ADMINISTRATOR"],"Administrator" );
  createnewElement(option3, select1.newelement, "option", [],["value:STAFF"],"Staff" );
  //status
  createnewElement(divbody5, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label5, divbody5.newelement, "label", [],[],"Status");
  createnewElement(select2, divbody5.newelement, "select", ["form-control"], ["name:status", "id:statusupdate", "required:true", "value:"+status], "");
  createnewElement(options1, select2.newelement, "option", [],["value:"+status,"hidden:true","selected:selected"], status);
  createnewElement(options2, select2.newelement, "option", [],["value:Active"],"Active" );
  createnewElement(options3, select2.newelement, "option", [],["value:Inactive"],"Inactive" );
  //password
  createnewElement(divbody6, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label6, divbody6.newelement, "label", [],[],"Password");
  createnewElement(inputpwd, divbody6.newelement, "input", ["form-control"], ["type:password", "id:passwordupdate", "disabled:true"], "");

  createnewElement(divbody7, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label7, divbody7.newelement, "label", [],[],"");
  createnewElement(resetpwd, label7.newelement, "input", [], ["type:checkbox", "onclick:resetPass()", "id:resetPass"], "Reset password");
  resetpwd.innerHTML = "Reset passsword";
  //update button
  createnewElement(divfooter, cf, "div", [], [], "");
  createnewElement(button, divfooter.newelement, "input", ["btn", "btn-success"], ["value:Update", "type:submit", "name:btnUpdate", "id:UserAccountupdate", "onclick:UserAccountupdate(\""+userid+"\")"], "");
}

function AgentUpdate(hostname,tabledata,grandparent,linkid)
{
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var divvalue = [], leftdiv = [], value = [], subrdiv =[], rightsidevalue =[], span =[];

  createnewElement(divvalue, ch, "div", ["row"], [], "");
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, leftdiv.newelement, "h4", [], [],"" );

  createnewElement(subrdiv, divvalue.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  createnewElement(rightsidevalue, subrdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, rightsidevalue.newelement, "span", [], ["aria-hidden:true"], "");
  span.newelement.innerHTML = "&times;";

  $.post("php/functions/notification/notification.agent.update.php",{hostname:hostname},function(newdata){

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

  var updatebutton = [], footerdiv = [];
  var footerclass = ["d-flex","flex-row-reverse"];
  createnewElement(footerdiv, cf, "div", footerclass, [], "" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-default","ml-1"], ["onClick:OVERLAYdisable()"], "Cancel" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-primary","enabled","ml-1"], ["id:AgentUpdated","onclick:AgentUpdated(\""+hostname+"\,\""+tabledata+"\",\""+grandparent+"\",\""+linkid+"\)"], "Update" );
}

function AgentUpdated(hostname, update, grandparent, linkid){

  var e = document.getElementById("CMPLISTdtlsremarks");
  var i = e.selectedIndex;
  var remarks = e.options[i].text;

  var agentversion = document.getElementById("CMPLISTdtlsagentversion").value;

  $.post("php/functions/notification/computer.list.details.update.php",{remarks:remarks,agentversion:agentversion,hostname:hostname,update:update},function(data){
  //var view = document.getElementById("contentview");
  //view.innerHTML = data;
  });
  CMPLISTdtlstableupdate(grandparent,linkid);
  //DSHBRDRecordsComplist
  //CMPLISTdtlsupdate(linkid);
  OVERLAYdisable();
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
    createnewElement(option, select.select, "option", [], ["hidden:true","selected:selected","value:"+remarks], remarks);

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
  var updatebutton = [], footerdiv = [], checkedbutton = [];
  var footerclass = ["d-flex","flex-row-reverse"];
  createnewElement(footerdiv, cf, "div", footerclass, [], "" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-default","ml-1"], ["onClick:OVERLAYdisable()"], "Cancel" );
  createnewElement(checkedbutton, footerdiv.newelement, "button", ["btn", "btn-success","disabled","ml-1"], ["id:CMPLISTdtlschecked","onclick:CMPLISTdtlschecked(\""+hostname+"\",\""+tabledata+"\",\""+grandparent+"\",\""+linkid+"\")"], "Checked" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-primary","disabled","ml-1"], ["id:CMPLISTdtlsupdate","onclick:CMPLISTdtlsupdate(\""+hostname+"\",\""+tabledata+"\",\""+grandparent+"\",\""+linkid+"\")"], "Update" );
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
  else if(path == "php/functions/employee/employee.list.php")
  {
    document.getElementById("dtitle").innerHTML = "Profile & Accounts";
    document.getElementById("dtitle2").innerHTML = "Profile Settings";
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
      document.getElementById("dtitle").innerHTML = "Reports";
      document.getElementById("dtitle2").innerHTML = "Computer Logs History";
    }
    pagination(id);
  }
}

function DSHBRDLogsHistory()
{
  document.getElementById("dtitle").innerHTML = "Reports";
  document.getElementById("dtitle2").innerHTML = "Computer Logs History ";
}

function DSHBRDContentBranchSettings()
{
  var contentview = document.getElementById("contentview");
  contentview.innerHTML = "";

  document.getElementById("dtitle").innerHTML = "Settings";
  document.getElementById("dtitle2").innerHTML = "Branch View";

  tableid = idgenerator();
  var card = [];
  createCard(card, contentview, [], []);
  createnewElement([],card.head,"div",[],[],"");

  var table = [];
  var classes = ["table","table-bordered"];
  var attributes = ["width:100%","cellspacing:0","id:"+tableid];
  createTable(table, card.body, classes, attributes);
  $.post("php/functions/sttngs/settings.branch.view.php",function(data){
    data = data.split("||");
    for(var arraccount = 0; arraccount < data.length; arraccount++){
      var currentdata = data[arraccount].split(";");

      if (currentdata[2] == "tr"){
        var tr = [];
        createnewElement(tr,table.body,"tr",[],[],"");
      }
      var td = [], link = [], i = [], newdata = [], label = [], link2 = [], i2=[];
      var id = idgenerator();
      createnewElement(td, tr.newelement, "td",[],["rowspan:"+currentdata[1]],"");
      createnewElement(label, td.newelement, "h5", [], ["id:"+id, "tree_id:"+currentdata[4], "tree_filter:"+currentdata[5], "tree_name:"+currentdata[0]], currentdata[0])
      createLink(link, label.newelement  , "", ["btn","btn-default","btn-sm"], ["role:button", "href:#", "onClick:BRNCHVWedit(\""+id+"\")"]);
      createnewElement(i, link.link, "i", ["fa","fas","fa-fw","fa-lg","fa-edit"],[],"");
      createLink(link2, label.newelement  , "", ["btn","btn-default","btn-sm"], ["role:button", "href:#", "onClick:BRNCHVWdelete(\""+id+"\")"]);
      createnewElement(i2, link2.link, "i", ["fa","fas","fa-fw","fa-lg","fa-trash"],[],"");
    }
  });

var toolbar = [];
createnewElement(toolbar,card.foot,"div",["btn-toolbar","mr-3"],[],"");
var ig = [];
createnewElement(ig,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
createnewElement([], ig.newelement, "button", ["btn","btn-primary"], ["type:button","onclick:adddepartment()"], "Add Department or Branch");
// var ig2 = [];
// createnewElement(ig2,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
// createnewElement([], ig2.newelement,"button", ["btn","btn-primary"], ["type:button","onclick:editbranch()"],"Update a Branch");
}

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
    //form
    createnewElement(form, cb, "form", [] ,["onsubmit:return BRNCHVWadddepartment(\""+branchid+"\",\""+pathid+"\",\""+lblid+"\",\""+lblid2+"\")"], "");

    var fg4 =[], label2 = [], select =[], option = [];
    createnewElement(fg4, form.newelement, "div", ["form-group"], [], "");
    createnewElement(label2, fg4.newelement, "label", [],[],"Select Branch or Add Department");
    createnewElement(select, fg4.newelement, "select", ["form-control"], ["name:department", "required:true", "id:"+branchid, "onchange:BRNCHVWupdatepath(\""+branchid+"\",\""+pathid+"\")"], "");
    Departmentlist(branchid);
    createnewElement(option, select.newelement, "option", [],["value:Select Department","hidden:true","selected:selected"], "Select Department");
    createnewElement(option, select.newelement, "option", [],["value:root"], "New Branch");
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

  //footer
    var button = [], fg3 = [];
    createnewElement(dvd,  form.newelement, "div", ["dropdown-divider"],[],"");
    createnewElement(fg3, form.newelement,"div", ["form-group"], [],"");
    createnewElement(button, fg3.newelement, "button", ["btn","btn-primary"],["type:submit"],"Add Department");

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

function BRNCHVWadddepartment(branchid, pathid, deptid, filterid)
{

  var branch = document.getElementById(branchid).value;
  var path = document.getElementById(pathid).value;
  var dept = document.getElementById(deptid).value;
  var filter = document.getElementById(filterid).value;
  $.post("php/functions/sttngs/settings.branch.view.add.department.php",{branch:branch, path:path, dept:dept, filter:filter},function(data){
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
  createnewElement(div, alertwindow, "div", ["alert","alert-"+value,"alert-dismissible","fade","show"],["role:alert"],"");
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

  var e = document.getElementById("CMPLISTdtlsremarks");
  var i = e.selectedIndex;
  var remarks = e.options[i].text;

  var agentversion = document.getElementById("CMPLISTdtlsagentversion").value;

  $.post("php/functions/notification/notification.agent.updated.php",{remarks:remarks,agentversion:agentversion,hostname:hostname,update:update},function(data){
  //var view = document.getElementById("contentview");
  //view.innerHTML = data;
  });
  CMPLISTdtlstableupdate(grandparent,linkid);
  //DSHBRDRecordsComplist
  //CMPLISTdtlsupdate(linkid);
  OVERLAYdisable();
}

/*User Account Update*/

function UserAccountupdate(userid){

  name = document.getElementById("nameupdate").value;
  department = document.getElementById("departmentupdate").value;
  position = document.getElementById("positionupdate").value;
  role = document.getElementById("roleupdate").value;
  status = document.getElementById("statusupdate").value;
  password = document.getElementById("passwordupdate").value;

  //var e = document.getElementById("CMPLISTdtlsremarks");
  //var i = e.selectedIndex;
  //var remarks = e.options[i].text;

  //var agentversion = document.getElementById("CMPLISTdtlsagentversion").value;

  $.post("php/functions/accounts/user.account.update.php",{name:name,department:department,position:position,role:role,status:status,password:password,userid:userid},function(data){
    if(data == "true"){
    DSHBRDContent('','DSHBRDAccountsAccMgnt')
    OVERLAYdisable();
    }
    else{
      var body = document.getElementById("mncb");
      var footer = document.getElementById("mncf");
      body.innerHTML = "Error have been acquired!!<br>"+data;
      footer.innerHTML = "<button onclick='OVERLAYdisable'>Close</button>";
    }
  });
  //DSHBRDRecordsComplist
  //CMPLISTdtlsupdate(linkid);
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
  var view = document.getElementById("contentview");
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
  var view = document.getElementById("contentview");
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
  var view = document.getElementById("contentview");
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

function Departmentlist(ID){
  var select = document.getElementById(ID);
  select.innerHTML = "";


  $.post("php/functions/load/add.user.list.php",function(data){
    data = data.split("|");
    for (var i = 0; i < data.length; i++){
      var option = [];
      createnewElement(option, select, "option", [], ["value:"+data[i]],data[i]);
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

function Profiles()
{
    var contentview = document.getElementById("contentview");
    contentview.innerHTML = "";

    document.getElementById("dtitle").innerHTML = "Profile And Accounts";
    document.getElementById("dtitle2").innerHTML = "Profile Settings";

    tableid = idgenerator();

    var card = [], cbd = [], div =[], ul =[], li =[], a =[],

    divv =[], divvv = []
    divs = [], divsUid = [], divslbl = [], divsUids = [], hrUid =[],

    divs2 = [], divsUname =[], divslbl2 = [], divsUnames = [], hrUname = [],
    divs3 = [], divsDept =[], divslbl3 = [], divsDepts = [], hrDept = [],
    divs4 = [], divsPosition =[], divslbl4 = [], divsPositions = [], inputPosition =[],  hrPosition = [],
    divs5 = [], divsRole = [], divslbl5 = [], divsRoles = [], hrRole = [],
    divs6 = [], divsPass = [], divslbl6 = [], hrPass = [];

    createCard(card, contentview, [], []);
    createnewElement([],card.head,"div",[],["id:chLabel"],"ACCOUNT INFORMATION");

    createnewElement(cbd, card.body,"div", ["row"], [], "");
    createnewElement(div, cbd.newelement, "div", ["col-12"],[],"");
    createnewElement(ul, div.newelement, "ul", ["nav", "nav-tabs", "mb-4"],["id:myTab", "role:tablist"],"");
    createnewElement(li, ul.newelement, "li", ["nav-item"], [], "");
    createnewElement(a, li.newelement, "a", ["nav-link", "active"], ["id:basicInfo-tab", "data-toggle:tab", "href:#basicInfo", "role:tab", "aria-controls:basicInfo", "aria-selected:true"], "Basic Info");

    createnewElement(divv, div.newelement, "div", ["tab-content", "ml-1"], ["id:myTabContent"], "");
    createnewElement(divvv, divv.newelement, "div", ["tab-pane", "fade", "show", "active"], ["id:basicInfo", "role:tabpanel", "aria-labelledby:basicInfo-tab"], "");

    createnewElement(divs, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsUid, divs.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl, divsUid.newelement, "label", [], ["id:lblEid"], "Employee Id: ");
    createnewElement(divsUids, divs.newelement, "div", ["col-md-8", "col-6"], ["id:lblEids"], "1040359")
    createnewElement(hrUid, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs2, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsUname, divs2.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl2, divsUname.newelement, "label", [], ["id:lblEid"], "Name: ");
    createnewElement(divsUnames, divs2.newelement, "div", ["col-md-8", "col-6"], ["id:lblEids"], "Camille Kate")
    createnewElement(hrUname, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs3, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsDept, divs3.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl3, divsDept.newelement, "label", [], ["id:lblEid"], "Department: ");
    createnewElement(divsDepts, divs3.newelement, "div", ["col-md-8", "col-6"], ["id:lblEids"], "Marvin(IT)")
    createnewElement(hrDept, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs4, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsPosition, divs4.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl4, divsPosition.newelement, "label", [], ["id:lblEid"], "Position: ");
    createnewElement(divsPositions, divs4.newelement, "div", ["col-md-8", "col-6"], [], "")
    createnewElement(inputPosition, divsPositions.newelement, "input", ["form-control"], ["id:lblPositions", "type:text"], "");
    createnewElement(hrPosition, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs5, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsRole, divs5.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl5, divsRole.newelement, "label", [], ["id:lblEid"], "Role: ");
    createnewElement(divsRoles, divs5.newelement, "div", ["col-md-8", "col-6"], ["id:lblEids"], "Administrator")
    createnewElement(hrRole, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs6, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsPass, divs6.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl6, divsPass.newelement, "button", ["btn", "btn-default"], ["id:lblpass", "onclick:ChangePass()"], "Change Password");
    createnewElement(hrPass, divvv.newelement, "hr", [], ["id:hr"], "");

    var button = [];
    createnewElement(button, card.foot, "button", ["btn","btn-default"],["type:button"],"Update Profile");
}

function ChangePass()
{
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  
}

function EmployeeList(){
    var contentview = document.getElementById("contentview");
    contentview.innerHTML = "";

    document.getElementById("dtitle").innerHTML = "Profile And Accounts";
    document.getElementById("dtitle2").innerHTML = "Employee List";

    tableid = idgenerator();
    var card = [];
    createCard(card, contentview, [], []);
    createnewElement([],card.head,"div",[],["id:ContentCardHead"],"Employee List");

    var table = [];
    var classes = ["table","table-bordered"];
    var attributes = ["width:100%","cellspacing:0","id:"+tableid];
    createTable(table, card.body, classes, attributes);

    $.post("php/functions/employee/employee.list.php",function(data){
      data = data.split("#");
      datalength = data.length;

      thfdata = data[0].split("|");
      createTableContent([], table.head, [], [], "th", thfdata);
      createTableContent([], table.foot, [], [], "th", thfdata);

      for (var i = 1; i < datalength;i++){
          newdata = data[i].split("|");
          createTableContent([], table.body, [],[], "td", newdata);

      }

      pagination(tableid);
    });
      var button = [], buttons = [];
      // createnewElement(button, card.foot, "button", ["btn","btn-primary"],["type:button", "id:btnAddDept"],"Add Department");
      createnewElement(buttons, card.foot, "button", ["btn","btn-primary"],["type:button", "id:btnAddEmp"],"Add Employee");
      createnewElement(button, card.foot, "button", ["btn","btn-primary"],["type:button","onclick:importemployee()"],"Import List");
}

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

function BRNCHVWedit(id){
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");
  var tree_id = document.getElementById(id).getAttribute("tree_id");
  var tree_filter = document.getElementById(id).getAttribute("tree_filter");
  var tree_name = document.getElementById(id).getAttribute("tree_name");

  ch.innerHTML = "Edit Current Data";

  var form = [], formgroup = [], namelbl = [], nameval = [], formgroup2 = [], namelbl2 = [], nameval2 = [], brk = [], btn = [];
  //form
  createnewElement(form, cb, "form", [], ["onsubmit:return branchedit()"], "");
  //formgroup
  createnewElement(formgroup, form.newelement,"div",["form-group"],[],"");
  //treename
  createnewElement(namelbl, formgroup.newelement, "label", [], ["for:tree_name"], "Change Tree Name");
  createnewElement(nameval, formgroup.newelement, "input", ["form-control"], ["placeholder:"+tree_name,"data:"+tree_name, "id:tree_name"], "");
  createnewElement(brk, form.newelement, "br", [], [],"");
  //formgroup
  createnewElement(formgroup2, form.newelement,"div",["form-group"],[],"");
  //treename
  createnewElement(namelbl2, formgroup2.newelement, "label", [], ["for:tree_filter"], "Change Tree Filter");
  createnewElement(nameval2, formgroup2.newelement, "input", ["form-control"], ["placeholder:"+tree_filter,"data:"+tree_filter, "id:tree_filter"], "");

  createnewElement(brk, form.newelement, "br", [], [], "");
  createnewElement(btn, form.newelement, "button", ["btn","btn-primary","btn-block"], ["type:submit", "disabled:true"], "Edit")

  createnewElement(brk, form.newelement, "br", [], [], "");
  // $.post("php/functions/sttngs/settings.branch.view.edit.php",{value:value},function(data){
  //
  //
  // });
}
function BRNCHVWdelete(id){
  OVERLAYenable();
}
