/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */
function load(){
    SESSIONConfirm();

    var branchview = document.getElementById("contentview");
    var loading = document.getElementById("processingbar");

    DSHBRDNavBarBtns();
    NAVBARNotification();
    Departmentlist("department");
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
        // var reports = document.getElementById("Reports");
        // reports.classList.add("active");
      break;
      case "DSHBRDRecordsHistory":
        path = "";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDEditHistory":
        path = "php/functions/reports/computer.edit.history.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDLogsHistory":
        path = "php/functions/reports/computer.logs.history.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDAccountsAccMgnt":
        path = "php/functions/accounts/accounts.view.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
        createnewElement([], card.head, "button", ["btn","btn-default"],["data-toggle:modal", "data-target:#AddUser", "href:#AddUser"],"Add User");
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
  divfooter = [], button = [], divbody6 =[], label6 =[];

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
  //positioin
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
  createnewElement(inputpwd, divbody6.newelement, "input", ["form-control"], ["type:password", "id:passwordupdate", "required:true"], "");
  //update button
  createnewElement(divfooter, cf, "div", [], [], "");
  createnewElement(button, divfooter.newelement, "input", ["btn", "btn-success"], ["value:Update", "type:submit", "name:btnUpdate", "id:UserAccountupdate", "onclick:UserAccountupdate(\""+userid+"\")"], "");
}

function AgentUpdate(hostname)
{
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var divvalue = [], leftdiv = [], value = [], subrdiv =[], rightsidevalue =[], span =[];

  createnewElement(divvalue, ch, "div", ["row"], [], "");
  //leftside div
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-6"], [], "");
    //leftside contents
  createnewElement(value, leftdiv.newelement, "h4", [], [],"");


  createnewElement(divvalue, ch, "div", ["row"], [], "");
  divvalue.newelement.style.width = "600px";
  createnewElement(leftdiv, divvalue.newelement, "div", ["col-sm-12","col-md-8"], [], "");
  createnewElement(value, leftdiv.newelement, "h4", [], [],"" );

  createnewElement(subrdiv, divvalue.newelement, "div", ["d-flex","flex-row-reverse", "col-md-4"], [], "");
  createnewElement(rightsidevalue, subrdiv.newelement, "button", ["close", "btn", "btn-default"], ["data-dismiss:modal","aria-label:Close", "type:button", "onclick:OVERLAYdisable()"], "");
  createnewElement(span, rightsidevalue.newelement, "span", [], ["aria-hidden:true"], "");
  span.newelement.innerHTML = "&times;";

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

  var updatebutton = [], footerdiv = [];
  var footerclass = ["d-flex","flex-row-reverse"];
  createnewElement(footerdiv, cf, "div", footerclass, [], "" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-default","ml-1"], ["onClick:OVERLAYdisable()"], "Cancel" );
  createnewElement(updatebutton, footerdiv.newelement, "button", ["btn", "btn-primary","disabled","ml-1"], ["id:AgentUpdate","onclick:AgentUpdate()"], "Update" );

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
  else if(path == "php/functions/accounts/accounts.view.php"){

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
    else if(path == "php/functions/reports/computer.edit.history.php")
    {
      document.getElementById("dtitle").innerHTML = "Reports";
      document.getElementById("dtitle2").innerHTML = "Edit History";
    }
    pagination(id);
  }
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
  createnewElement([],card.head,"div",[],[],"Branch Setting");

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
      var td = [], link = [], i = [], newdata = [];
      createnewElement(td, tr.newelement, "td",[],["rowspan:"+currentdata[1]],currentdata[0]);
      createnewElement(newdata, td.newelement, "i",["label", "label-default"],[],"");
      createLink(link, td.newelement, "", [], ["role:button", "href:#"]);
      createnewElement(i, link.link, "span", ["fa","fas","fa-fw","fa-lg","fa-edit"],[],"");
    }
  });

var toolbar = [];
createnewElement(toolbar,card.foot,"div",["btn-toolbar","mr-3"],[],"");
var ig = [];
createnewElement(ig,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
createnewElement([], ig.newelement, "button", ["btn","btn-primary"], ["type:button","onclick:addbranch()"], "Add Branch");
createnewElement([], ig.newelement, "button", ["btn","btn-primary"], ["type:button","onclick:adddepartment()"], "Add Department");
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
  createnewElement(headerdiv1, headerrow.newelement,"div",["col-sm-10","col-md-10"],[],"Add Branch/Deparetment");
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
    createnewElement(headerdiv1, headerrow.newelement,"div",["col-sm-10","col-md-10"],[],"Add Deparetment");
    var rightsidevalue = [], span = [], headerdiv2 = [];
    createnewElement(headerdiv2, headerrow.newelement, "div", ["col-sm-2","col-md-2"],[],"");
    createnewElement(rightsidevalue, headerdiv2.newelement, "a", ["nav-link"], ["aria-expanded:false","href:#", "onclick:OVERLAYdisable()"], "");
    createnewElement(span, rightsidevalue.newelement, "i", ["fa","fa-lg","fa-fw","fa-times"], [], "");



    //form
    var form = [], fg = [], lbl = [], ip = [], dvd = [];
    createnewElement(form, cb, "form", [] ,[], "");

    var fg4 =[], label2 = [], select =[], option = [];
    createnewElement(fg4, form.newelement, "div", ["form-group"], [], "");
    createnewElement(label2, fg4.newelement, "label", [],[],"Select Branch");
    var branchid = idgenerator();
    createnewElement(select, fg4.newelement, "select", ["form-control"], ["name:department", "required:true", "id:"+branchid, "onchange:BRNCHVWupdatepath("+branchid+")"], "");
    Departmentlist(branchid);
    createnewElement(option, select.newelement, "option", [],["value:Select Department","hidden:true","selected:selected"], "Select Department");
    createnewElement(dvd,  fg4.newelement, "div", ["dropdown-divider"],[],"");

    //Path
    var fg5 = [], lbl5 = [], slt2 = [], optn2 = [];
    createnewElement(fg5, form.newelement, "div", ["form-group"], [], "");
    createnewElement(lbl5, fg5.newelement, "label", [],[],"Select Path");
    createnewElement(slt2, fg5.newelement, "select", ["form-control"], ["name:path", "required:true", "id:122348323945"], "");
    createnewElement(optn2, slt2.newelement, "option", [],["value:Select Department","hidden:true","selected:selected"], "Select Path");
    createnewElement(dvd,  fg5.newelement, "div", ["dropdown-divider"],[],"");
    //1st row
    createnewElement(fg, form.newelement, "div", ["form-group"],[],"");
      var lblid = idgenerator();
      createnewElement(lbl, fg.newelement, "label", [], ["for:"+lblid], "Department Name:");
      createnewElement(ip, fg.newelement, "input", ["form-control"], ["id:"+lblid,"placeholder:Department Name","required:true"], "");
    var form2 = [], fg2 = [], lbl2 = [], ip2 = [];
    //1st row
    createnewElement(dvd,  form.newelement, "div", ["dropdown-divider"],[],"");
    createnewElement(fg2, form.newelement, "div", ["form-group"],[],"");
    var lblid2 = idgenerator();
    createnewElement(lbl2, fg2.newelement, "label", [], ["for:"+lblid2], "Department Filter:");
    createnewElement(ip2, fg2.newelement, "input", ["form-control"], ["id:"+lblid2,"placeholder:Department Filter","required:true"], "");

  //footer
    var button = [], fg3 = [];
    createnewElement(dvd,  form.newelement, "div", ["dropdown-divider"],[],"");
    createnewElement(fg3, form.newelement,"div", ["form-group"], [],"");
    createnewElement(button, fg3.newelement, "button", ["btn","btn-primary"],["type:submit"],"Add Department");

}
/*End of Branch View*/

function BRNCHVWupdatepath(branchid){

  var branch = document.getElementById(branchid).value;
  

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

  $.post("php/functions/reports/computer.list.details.update.php",{remarks:remarks,agentversion:agentversion,hostname:hostname,update:update},function(data){
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
//

/* Background */
/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/*
Functions Abbriviations
DSHBRD - dashboard
LNK - link
CNTVW - Contentview

*/
