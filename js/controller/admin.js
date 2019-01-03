/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */
function load()
{
    SESSIONConfirm();
    DSHBRDbtnsCompList();
    DSHBRDbtnsCompLogs();
    NAVBARNotification();
    Departmentlist("department");
    Dashboard();
    PieChart();
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
      break;
      case "DSHBRDRecordsComplogs":
        path = "php/functions/reports/computer.logs.php";
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

    }, 1000)
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
  divvalue.newelement.style.width = "600px";
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, leftdiv.newelement, "h5", [], ["id:editHeader"],"Edit User Information" );

  createnewElement(subrdiv, divvalue.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  createnewElement(rightsidevalue, subrdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, rightsidevalue.newelement, "span", [], ["aria-hidden:true", "id:span"], "");
  span.newelement.innerHTML = "&times;";

  //userid
  createnewElement(divbody, cb, "form", ["md-form", "mb-3"], [], "");
  createnewElement(label, divbody.newelement, "label", [],["id:editLbl"],"User ID");
  createnewElement(inputuid, divbody.newelement, "input", ["form-control"], ["type:text", "id:useridupdate", "disabled:true", "value:"+userid, "onkeyup:ACCeditvalidate(\""+ name+"\",\""+ department+"\",\""+ position+"\",\""+ role+"\",\""+ status+"\")"], "");
  //name
  createnewElement(divbody1, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label1, divbody1.newelement, "label", [],["id:editLbl"],"Name");
  createnewElement(inputname, divbody1.newelement, "input", ["form-control"], ["type:text", "id:nameupdate", "required:true", "value:"+name, "onkeyup:ACCeditvalidate(\""+ name+"\",\""+ department+"\",\""+ position+"\",\""+ role+"\",\""+ status+"\")"], "");
  //department
  createnewElement(divbody2, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label2, divbody2.newelement, "label", [],["id:editLbl"],"Department");
  createnewElement(select, divbody2.newelement, "select", ["form-control"], ["name:department", "required:true", "id:departmentupdate", "onChange:ACCeditvalidate(\""+ name+"\",\""+ department+"\",\""+ position+"\",\""+ role+"\",\""+ status+"\")"], "");
  Departmentlist("departmentupdate");
  createnewElement(option, select.newelement, "option", [],["value:"+department,"hidden:true","selected:selected"], department);
  //position
  createnewElement(divbody3, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label3, divbody3.newelement, "label", [],["id:editLbl"],"Position");
  createnewElement(select1, divbody3.newelement, "input", ["form-control"], ["name:position", "id:positionupdate", "disabled:true", "value:"+position, "onkeyup:ACCeditvalidate(\""+ name+"\",\""+ department+"\",\""+ position+"\",\""+ role+"\",\""+ status+"\")"], "");
  //role
  createnewElement(divbody4, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label4, divbody4.newelement, "label", [],["id:editLbl"],"Role");
  createnewElement(select1, divbody4.newelement, "select", ["form-control"], ["name:role", "id:roleupdate", "required:true", "value:"+role, "onChange:ACCeditvalidate(\""+ name+"\",\""+ department+"\",\""+ position+"\",\""+ role+"\",\""+ status+"\")"], "");
  createnewElement(option1, select1.newelement, "option", [],["value:"+role,"hidden:true","selected:selected"], role);
  createnewElement(option2, select1.newelement, "option", [],["value:ADMINISTRATOR"],"Administrator" );
  createnewElement(option3, select1.newelement, "option", [],["value:STAFF"],"Staff" );
  //status
  createnewElement(divbody5, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label5, divbody5.newelement, "label", [],["id:editLbl"],"Status");
  createnewElement(select2, divbody5.newelement, "select", ["form-control"], ["name:status", "id:statusupdate", "required:true", "value:"+status, "onChange:ACCeditvalidate(\""+ name+"\",\""+ department+"\",\""+ position+"\",\""+ role+"\",\""+ status+"\")"], "");
  createnewElement(options1, select2.newelement, "option", [],["value:"+status,"hidden:true","selected:selected"], status);
  createnewElement(options2, select2.newelement, "option", [],["value:Active"],"Active" );
  createnewElement(options3, select2.newelement, "option", [],["value:Inactive"],"Inactive" );
  //password
  createnewElement(divbody6, cb, "div", ["md-form", "mb-3"], [], "");
  createnewElement(label6, divbody6.newelement, "label", [],["id:editLbl"],"Password");
  createnewElement(inputpwd, divbody6.newelement, "input", ["form-control"], ["type:text", "id:passwordupdate", "disabled:true"], "");

  createnewElement(inputpwd, divbody6.newelement, "input", ["form-control"], ["type:text", "hidden:true", "id:password2", "value:Aa123456"], "");

  createnewElement(divbody7, cb, "div", ["md-form", "mb-3"], ["id:resetpw"], "");
  createnewElement(label7, divbody7.newelement, "label", [],[],"");
  createnewElement(resetpwd, label7.newelement, "input", [], ["type:checkbox", "id:resetPass", "onclick:resetPass(),mirrorFunction()"], "");
  resetpwd.newelement.innerHTML = "Reset password";
  //update button
  createnewElement(divfooter, cf, "div", [], [], "");
  createnewElement(button, divfooter.newelement, "input", ["btn", "btn-primary"], ["disabled:true","value:Update", "type:submit", "name:btnUpdate", "id:UserAccountupdate", "onclick:UserAccountupdate(\""+userid+"\")"], "");
}

function ACCeditvalidate(name, department, position, role, status){

var currname, currdepartment, currposs, currrole, currstat;
currname = document.getElementById("nameupdate").value;
//
var e = document.getElementById("departmentupdate");
var i = e.selectedIndex;
//
currdepartment = e.options[i].text;
//
currposs = document.getElementById("positionupdate").value;
e = document.getElementById("roleupdate");
i = e.selectedIndex;
currrole = e.options[i].text;
//
e = document.getElementById("statusupdate");
i = e.selectedIndex;
currstat = e.options[i].text;
//
var btn = document.getElementById("UserAccountupdate");
//
if(name !== currname || department !== currdepartment || position !== currposs || role !== currrole|| status !== currstat){
  btn.removeAttribute("disabled");
}
else{
  btn.setAttribute("disabled","true");
}


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
      pagination(id);

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
  }
}

function Dashboard()
{
  var contentview = document.getElementById("contentview");
  contentview.innerHTML = "";

  var divfluid = [], divclass = [], divrow = [], divcol = [], h4 = [], hrDshbrd = [], divDate =[], divCol = [], divdates = [], small = [],
  divrow1 = [], divColcard = [], divcard1 = [], divcardBody = [], divItems = [], divIcon = [], divml = [], divText = [], divcount = [],
  divColcard2 = [], divcard2 = [], divcardBody2 = [], divItems2 = [], divIcon2 = [], divml2 = [], divText2 = [], divcount2 = [],
  divColcard3 = [], divcard3 = [], divcardBody3 = [], divItems3 = [], divIcon3 = [], divml3 = [], divText3 = [], divcount3 = [],
  divColcard4 = [], divcard4 = [], divcardBody4 = [], divItems4 = [], divIcon4 = [], divml4 = [], divText4 = [], divcount4 = [],
  txtdept = [], spanCount = [], divProgress = [], divProgbar = [],
  txtdept1 = [], spanCount1 = [], divProgress1 = [], divProgbar1 =[],
  txtdept2 = [], spanCount2 = [], divProgress2 = [], divProgbar2 = [],
  txtdept3 = [], spanCount3 = [], divProgress3 = [], divProgbar3 =[],
  txtdept4 = [], spanCount4 = [], divProgress4 = [], divProgbar4 = [],
  txtdept5 = [], spanCount5 = [], divProgress5 = [], divProgbar5 =[]

  divcol2 = [], h4pie = [], hrDshbrd1 =[], div = [], canvas = [];

  document.getElementById("dtitle").innerHTML = "Dashboard";
  document.getElementById("dtitle2").innerHTML = "My Dashboard";

  createnewElement(divfluid, contentview, "div", ["container-fluid"], [], "");
  createnewElement(divclass, divfluid.newelement, "div", ["col", "col-md-12"], [], "");

  // Date
  createnewElement(divDate, divclass.newelement, "div", ["row"], [], "");
  createnewElement(divCol, divDate.newelement, "div", ["col", "col-md-12"], [], "");
  createnewElement(divdates, divCol.newelement,"div", ["text-muted", "text-tiny", "mt-1"], ["id:dshbrdDate"], "");
  createnewElement(small, divdates.newelement, "small", ["font-weight-normal"], [], "Today is Tuesday, 25 December 2018");

  // Cards
  createnewElement(divrow1, divclass.newelement, "div", ["row"], [], "");
  createnewElement(divColcard, divrow1.newelement, "div", ["col-sm-6", "col-xl-3"], ["id:dshbrdCards"], "");
  createnewElement(divcard1, divColcard.newelement, "div", ["card", "mb-4"], [], "");
  createnewElement(divcardBody, divcard1.newelement, "div", ["card-body"], [], "");
  createnewElement(divItems, divcardBody.newelement, "div", ["d-flex", "align-items-center"], [], "");
  createnewElement(divIcon, divItems.newelement, "div", ["fa", "fa-exclamation", "display-4", "text-danger", "aria-hidden:true"], [], "");
  createnewElement(divml, divItems.newelement, "div", ["ml-3"], [], "");
  createnewElement(divText, divml.newelement, "div", ["text-muted"], [], "End Task Units");
  createnewElement(divcount, divml.newelement, "div", [], ["id:dshbrdCounts"], "6");

  createnewElement(divColcard2, divrow1.newelement, "div", ["col-sm-6", "col-xl-3"], ["id:dshbrdCards"], "");
  createnewElement(divcard2, divColcard2.newelement, "div", ["card", "mb-4"], [], "");
  createnewElement(divcardBody2, divcard2.newelement, "div", ["card-body"], [], "");
  createnewElement(divItems2, divcardBody2.newelement, "div", ["d-flex", "align-items-center"], [], "");
  createnewElement(divIcon2, divItems2.newelement, "div", ["fa", "fa-upload", "display-4", "text-warning", "aria-hidden:true"], [], "");
  createnewElement(divml2, divItems2.newelement, "div", ["ml-3"], [], "");
  createnewElement(divText2, divml2.newelement, "div", ["text-muted"], [], "Old Agent Verison");
  createnewElement(divcount2, divml2.newelement, "div", [], ["id:dshbrdCounts"], "143");

  createnewElement(divColcard3, divrow1.newelement, "div", ["col-sm-6", "col-xl-3"], ["id:dshbrdCards"], "");
  createnewElement(divcard3, divColcard3.newelement, "div", ["card", "mb-4"], [], "");
  createnewElement(divcardBody3, divcard3.newelement, "div", ["card-body"], [], "");
  createnewElement(divItems3, divcardBody3.newelement, "div", ["d-flex", "align-items-center"], [], "");
  createnewElement(divIcon3, divItems3.newelement, "div", ["fa", "fa-desktop", "display-4", "text-primary", "aria-hidden:true"], [], "");
  createnewElement(divml3, divItems3.newelement, "div", ["ml-3"], [], "");
  createnewElement(divText3, divml3.newelement, "div", ["text-muted"], [], "Logonscript ");
  createnewElement(divcount3, divml3.newelement, "div", [], ["id:dshbrdCounts"], "217");

  createnewElement(divColcard4, divrow1.newelement, "div", ["col-sm-6", "col-xl-3"], ["id:dshbrdCards"], "");
  createnewElement(divcard4, divColcard4.newelement, "div", ["card", "mb-4"], [], "");
  createnewElement(divcardBody4, divcard4.newelement, "div", ["card-body"], [], "");
  createnewElement(divItems4, divcardBody4.newelement, "div", ["d-flex", "align-items-center"], [], "");
  createnewElement(divIcon4, divItems4.newelement, "div", ["fa", "fa-users", "display-4", "text-default", "aria-hidden:true"], [], "");
  createnewElement(divml4, divItems4.newelement, "div", ["ml-3"], [], "");
  createnewElement(divText4, divml4.newelement, "div", ["text-muted"], [], "Users");
  createnewElement(divcount4, divml4.newelement, "div", [], ["id:dshbrdCounts"], "13");


  // Progress bar
  createnewElement(divrow, divclass.newelement, "div", ["row"], ["id:dshbrdFluid"], "");
  createnewElement(divcol, divrow.newelement, "div", ["col", "col-md-6"], [], "");
  createnewElement(h4, divcol.newelement, "h4", [], [], "Logonscript Installation Success Rate");
  createnewElement(hrDshbrd, divcol.newelement, "hr", [], ["id:hr"], "");

  createnewElement(txtdept, divcol.newelement, "label", [], ["id:dshbrdLbl"], "Marvin(IT)");
  createnewElement(spanCount, divcol.newelement, "span", ["pull-right", "strong"], [], "62");
  createnewElement(divProgress, divcol.newelement, "div", ["progress"], [], "");
  createnewElement(divProgbar, divProgress.newelement, "div", ["progress-bar", "bg-warning"], ["role:progressbar", "aria-valuenow:40", "aria-valuemin:0", "ariavaluemax:100", "id:dept1"], "40%");

  createnewElement(txtdept1, divcol.newelement, "label", [], ["id:dshbrdLbl"], "Marvin(MAIN)");
  createnewElement(spanCount1, divcol.newelement, "span", ["pull-right", "strong"], [], "157");
  createnewElement(divProgress1, divcol.newelement, "div", ["progress"], [], "");
  createnewElement(divProgbar1, divProgress1.newelement, "div", ["progress-bar", "bg-success"], ["role:progressbar", "aria-valuenow:70", "aria-valuemin:0", "ariavaluemax:100", "id:dept2"], "70%");

  createnewElement(txtdept2, divcol.newelement, "label", [], ["id:dshbrdLbl"], "Pacifica(QY)");
  createnewElement(spanCount2, divcol.newelement, "span", ["pull-right", "strong"], [], "3");
  createnewElement(divProgress2, divcol.newelement, "div", ["progress"], [], "");
  createnewElement(divProgbar2, divProgress2.newelement, "div", ["progress-bar", "bg-danger"], ["role:progressbar", "aria-valuenow:3", "aria-valuemin:0", "ariavaluemax:100", "id:dept3"], "1%");

  createnewElement(txtdept3, divcol.newelement, "label", [], ["id:dshbrdLbl"], "Pacifica(LH)");
  createnewElement(spanCount3, divcol.newelement, "span", ["pull-right", "strong"], [], "0");
  createnewElement(divProgress3, divcol.newelement, "div", ["progress"], [], "");
  createnewElement(divProgbar3, divProgress3.newelement, "div", ["progress-bar", "bg-danger"], ["role:progressbar", "aria-valuenow:70", "aria-valuemin:0", "ariavaluemax:100", "id:dept4"], "0%");

  createnewElement(txtdept4, divcol.newelement, "label", [], ["id:dshbrdLbl"], "6789(AE)");
  createnewElement(spanCount4, divcol.newelement, "span", ["pull-right", "strong"], [], "3");
  createnewElement(divProgress4, divcol.newelement, "div", ["progress"], [], "");
  createnewElement(divProgbar4, divProgress4.newelement, "div", ["progress-bar", "bg-danger"], ["role:progressbar", "aria-valuenow:3", "aria-valuemin:0", "ariavaluemax:100", "id:dept5"], "1%");

  createnewElement(txtdept5, divcol.newelement, "label", [], ["id:dshbrdLbl"], "6789(L8)");
  createnewElement(spanCount5, divcol.newelement, "span", ["pull-right", "strong"], [], "0");
  createnewElement(divProgress5, divcol.newelement, "div", ["progress"], [], "");
  createnewElement(divProgbar5, divProgress5.newelement, "div", ["progress-bar", "bg-danger"], ["role:progressbar", "aria-valuenow:70", "aria-valuemin:0", "ariavaluemax:100", "id:dept6"], "0%");

  // Pie Chart
  createnewElement(divcol2, divrow.newelement, "div", ["col", "col-md-6"], [], "");
  createnewElement(h4pie, divcol2.newelement, "h4", [], [], "End Task Percentage Rate");
  createnewElement(hrDshbrd1, divcol2.newelement, "hr", [], ["id:hr"], "");

  createnewElement(div, divcol2.newelement, "div", [], ["id:colPieChart"], "");
  createnewElement(canvas, div.newelement, "canvas", ["flot-base"], ["width: 1589","height: 250", "id:pieChart"], "");

  var divrow2 = [], divcol3 = [], divColcard5 = [], editH5 = [], divcolHeader = [], divcolHeader1 = [], btnShow =[], divTable = [], tbl = [], tblHeader = [];

  // Edit History
  // createnewElement(divrow2, divclass.newelement, "div", ["row"], [], "");
  // createnewElement(divcol3, divrow2.newelement, "div", ["col", "col-md-6"], ["id:dshbrdCards"], "");
  // createnewElement(divColcard5, divcol3.newelement,"div", ["card", "mb-4"], ["id:dshbrdEdit"], "");
  // createnewElement(editH5, divColcard5.newelement, "h5", ["card-header", "with-elements"], [], "");
  // createnewElement(divcolHeader, editH5.newelement, "div", ["card-header-title"], [], "Last Edit History");
  // createnewElement(divcolHeader1, editH5.newelement, "div", ["card-header-elements", "ml-auto"], [], "");
  // createnewElement(btnShow, divcolHeader1.newelement, "button", ["btn", "btn-default", "btn-xs", "md-btn-flat"], ["type:button", "id:btnShowMore"], "Show more");

  // createnewElement(divTable, divColcard5.newelement, "div", ["table-responsive"], [], "");
  // createnewElement(tbl, divTable.newelement, "table", ["table", "card-table"], [], "");
  // createnewElement(tblHeader, tbl.newelement, "thead", [], [], "");

}

function PieChart()
{
  var ctx = document.getElementById("pieChart").getContext('2d');
  var pieChart = new Chart(ctx ,
    {
      type: 'pie',
      data:
      {
        labels:["Marvin(IT)", "Marvin(MAIN)", "Pacifica(QY)", "Pacifica(LH)", "6789(L8)", "Pacifica(AE)"],
        datasets: [{backgroundColor: ["#2ecc71", "#e74c3c", "#34495e", "#e74c3c","#34495e"],
        data:[32,70,3,0,3,0]
        }]
      }
    });
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

function UserAccountupdate(id){

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

  $.post("php/functions/accounts/user.account.update.php",{name:name,department:department,position:position,role:role,status:status,password:password,id:id},function(data){
    if(data == "true"){
    var updname = document.getElementById(id+"-2").innerHTML = name;
    var updept = document.getElementById(id+"-3").innerHTML = department;
    var uppos = document.getElementById(id+"-4").innerHTML = position;
    var uprole = document.getElementById(id+"-5").innerHTML = role;
    var upstat = document.getElementById(id+"-6").innerHTML = status;
    var btn = document.getElementById(id+"-7");
    btn.removeAttribute("onClick");
    btn.setAttribute("onClick","ACCTedit(\""+id+"\",\""+name+"\",\""+department+"\",\""+position+"\",\""+role+"\",\""+status+"\")");
    OVERLAYdisable();
    ALERTcall("success","Account have been updated");
    }
    else{
      ALERTcall("danger",data);
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
    createnewElement(button, card.foot, "button", ["btn","btn-default"],[],"Update Profile");
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
  createnewElement(rightsidevalue, subrdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, rightsidevalue.newelement, "span", [], ["aria-hidden:true", "id:span"], "");
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
  createnewElement(input, col.newelement, "input", ["form-control"], ["type:text","id:insertemployeel1","required:true"], "");
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

  var value = [], divvalue = [], leftdiv = [], subrdiv = [], rightsidevalue = [], span = [],
  divbody = [], divcol = [] , lblCurPass = [], divcol1 = [], inputCurPass =[], spanCurPass = [],
  divbody2 = [], divcol2 = [], lblNewPass = [], divcols2 = [], inputNewPass = [], spanNewPass = [],
  divbody3 = [], divcol3 = [], lblConfirmPass = [], divcols3 = [], inputConfirmPass = [], spanConfirmPass = [],
  divbody4 = [], divcol4 = [], lblButton = [], divcols4 = [], btnUpdatePass = [], btnCancel = [];


  createnewElement(divvalue, ch, "div", ["row"], [], "");
  divvalue.newelement.style.width = "600px";
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, leftdiv.newelement, "h6", [], ["id:PassLbl"],"Change Password" );

  createnewElement(subrdiv, divvalue.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  createnewElement(rightsidevalue, subrdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, rightsidevalue.newelement, "span", [], ["aria-hidden:true", "id:span"], "");
  span.newelement.innerHTML = "&times;";

  createnewElement(divbody, cb, "div", ["row"], ["id:changeRow"], "");
  createnewElement(divcol, divbody.newelement, "div", ["col-sm-4" ,"col-md-4", "col-5"], [], "");
  createnewElement(lblCurPass, divcol.newelement, "label", [], ["id:lblEid"], "Current Password");
  createnewElement(divcol1, divbody.newelement, "div", ["col-md-8", "col-6"], [], "");
  createnewElement(inputCurPass, divcol1.newelement, "input", ["form-control"], ["id:lblPass", "type:password", "maxlength:16"], "onkeyup:ShowPass()");
  createnewElement(spanCurPass, divcol1.newelement, "span", ["glyphicon", "glyphicon-eye-open"], ["id:glyphicon"], "");

  createnewElement(divbody2, cb, "div", ["row"], ["id:changeRow"], "");
  createnewElement(divcol2, divbody2.newelement, "div", ["col-sm-4" ,"col-md-4", "col-5"], [], "");
  createnewElement(lblNewPass, divcol2.newelement, "label", [], ["id:lblEid"], "New Password");
  createnewElement(divcols2, divbody2.newelement, "div", ["col-md-8", "col-6"], [], "");
  createnewElement(inputNewPass, divcols2.newelement, "input", ["form-control"], ["id:lblPass", "type:password", "maxlength:16"], "");
  createnewElement(spanNewPass, divcol1.newelement, "span", ["glyphicon", "glyphicon-eye-open"], ["id:glyphicon"], "");

  createnewElement(divbody3, cb, "div", ["row"], ["id:changeRow"], "");
  createnewElement(divcol3, divbody3.newelement, "div", ["col-sm-4" ,"col-md-4", "col-5"], [], "");
  createnewElement(lblConfirmPass, divcol3.newelement, "label", [], ["id:lblEid"], "Confirm New Password");
  createnewElement(divcols3, divbody3.newelement, "div", ["col-md-8", "col-6"], [], "");
  createnewElement(inputConfirmPass, divcols3.newelement, "input", ["form-control"], ["id:lblPass", "type:password", "maxlength:16"], "");
  createnewElement(spanConfirmPass, divcol1.newelement, "span", ["glyphicon", "glyphicon-eye-open"], ["id:glyphicon"], "");

  createnewElement(divbody4, cb, "div", ["row"], ["id:changeRow"], "");
  createnewElement(divcol4, divbody4.newelement, "div", ["col-sm-4" ,"col-md-4", "col-5"], [], "");
  createnewElement(lblButton, divcol4.newelement, "label", [], ["id:lblEid"], "");
  createnewElement(divcols4, divbody4.newelement, "div", ["col-md-8", "col-6"], [], "");
  createnewElement(btnUpdatePass, divcols4.newelement, "button", ["btn", "btn-warning"], ["id:Pass"], "Save Changes");
  createnewElement(btnCancel, divcols4.newelement, "button", ["btn", "btn-default"], ["id:Pass"], "Cancel");

}

function EmployeeList(){
    var contentview = document.getElementById("contentview");
    contentview.innerHTML = "";

    document.getElementById("dtitle").innerHTML = "Profile And Accounts";
    document.getElementById("dtitle2").innerHTML = "Employee List";

    tableid = idgenerator();
    var card = [];
    createCard(card, contentview, [], []);
    createnewElement([],card.head,"div",[],["id:ContentCardHead"],"");

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
      createnewElement(buttons, card.foot, "button", ["btn","btn-primary"],["type:button", "id:btnAddEmp", "onclick:AddEmployee()"],"Add Employee");
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
  createnewElement(form, cb, "form", [], ["onsubmit:return branchedit(\""+tree_id+"\",\""+tree_name+"\",\""+tree_filter+"\",\""+id+"\")"], "");
  //formgroup
  createnewElement(formgroup, form.newelement,"div",["form-group"],[],"");
  //treename
  createnewElement(namelbl, formgroup.newelement, "label", [], ["for:tree_name"], "Change Tree Name");
  createnewElement(nameval, formgroup.newelement, "input", ["form-control"], ["value:"+tree_name,"data:"+tree_name, "id:tree_name", "onkeyup:BRNCHVWeditconfirm(\""+tree_name+"\",\""+tree_filter+"\")"], "");
  createnewElement(brk, form.newelement, "br", [], [],"");
  //formgroup
  createnewElement(formgroup2, form.newelement,"div",["form-group"],[],"");
  //treename
  createnewElement(namelbl2, formgroup2.newelement, "label", [], ["for:tree_filter"], "Change Tree Filter");
  createnewElement(nameval2, formgroup2.newelement, "input", ["form-control"], ["value:"+tree_filter,"data:"+tree_filter, "id:tree_filter", "onkeyup:BRNCHVWeditconfirm(\""+tree_name+"\",\""+tree_filter+"\")"], "");

  createnewElement(brk, form.newelement, "br", [], [], "");
  createnewElement(btn, form.newelement, "button", ["btn","btn-primary","btn-block"], ["type:submit","id:editsubmit","disabled:true"], "Edit");

  createnewElement(brk, form.newelement, "br", [], [], "");

}

function branchedit(id, name, filter, h5id){

  newname = document.getElementById("tree_name").value;
  newfilter = document.getElementById("tree_filter").value;
  newtd = document.getElementById(h5id);
  $.post("php/functions/sttngs/settings.branch.view.edit.php",{newname:newname,newfilter:newfilter,id:id},function(data){
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

function BRNCHVWeditconfirm(name,filter){

  newname = document.getElementById("tree_name").value;
  newfilter = document.getElementById("tree_filter").value;
  editsubmit = document.getElementById("editsubmit");

  if(newname !== name || newfilter !== filter){
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

function addemployeesubmit(){

  var cb = document.getElementById("mncb");

  empid = document.getElementById("insertemployeeid").value;
  name = document.getElementById("insertemployeename").value;
  l1 = document.getElementById("insertemployeel1").value;
  l2 = document.getElementById("insertemployeel2").value;
  dept = document.getElementById("insertemployeedept").value;
  subdept = document.getElementById("insertemployeesubdept").value;

  $.post("php/functions/employee/employee.add.php",{empid:empid,name:name,l1:l1,l2:l2,dept:dept,subdept:subdept}, function(data){

    if(data == "success"){
      ALERTcall("success","Employee have been registered!!");
      EmployeeList();
      OVERLAYdisable();
    }
    else{
      ALERTcall("danger",data);
    }

  });
  return false;

}

function resetPass(){
  var x = document.getElementById("resetpw");
	if (x.type === "password")
	{
    x.type = "text";
                  
  }
	else
  var x = document.getElementById("passwordupdate");
	if (x.type === "password")
	{
		x.type = "text";
										}
	else
	{
		x.type = "text";
		}
}

function mirrorFunction()
	{
		document.getElementById('passwordupdate').value = document.getElementById('password2').value;
	}

function DSHBRDAgentVersion(){


    var contentview = document.getElementById("contentview");
    contentview.innerHTML = "";

    document.getElementById("dtitle").innerHTML = "Settings";
    document.getElementById("dtitle2").innerHTML = "Agent Version";

    tableid = idgenerator();
    var card = [];
    createCard(card, contentview, [], []);
    createnewElement([],card.head,"div",[],[],"");

    card.head.innerHTML = "Agent Version";

    var table = [];
    var classes = ["table","table-bordered"];
    var attributes = ["width:100%","cellspacing:0","id:"+tableid];
    createTable(table, card.body, classes, attributes);

    $.post("php/functions/sttngs/settings.agent.version.php",function(data){

      data = data.split("#");
      datalength = data.length;

      thfdata = data[0].split("|");
      var tbheader = [], tbfooter = [];
      createTableContent([], table.head, [], [], "th", thfdata);
      createTableContent([], table.foot, [], [], "th", thfdata);

      for (var i = 1; i < datalength;i++){
          newdata = data[i].split("|");
          createTableContent([], table.body, [],[], "td", newdata);

          }

    });

  var toolbar = [];
  createnewElement(toolbar,card.foot,"div",["btn-toolbar","mr-3"],[],"");
  var ig = [];
  createnewElement(ig,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
  createnewElement([], ig.newelement, "button", ["btn","btn-primary"], ["type:button","onclick:addagentversion()"], "Add new Version");

  createnewElement(ig,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
  createnewElement([], ig.newelement, "button", ["btn","btn-primary"], ["type:button","onclick:deleteagentversion()"], "Delete Version");

}

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
      createnewElement(inp, fg.newelement, "button", ["btn","btn-primary","btn-block"], [], "Submit");
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
