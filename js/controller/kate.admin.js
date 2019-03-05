
function Profiles()
{
    var checktable = tablecheck("user profile", "Profile Settings");
    var a = document.getElementById("ContentCardHead");
    a.innerHTML = "Account Information";
    var foot = document.getElementById("ContentCardFoot");
    foot.innerHTML = "";

    var body = document.getElementById("ContentCardBody");

    document.getElementById("dtitle").innerHTML = "Profile And Accounts";
    document.getElementById("dtitle2").innerHTML = "Profile Settings";

    var div1, div2, ul1, li1, a1,
    div3, div4, div5, div6, label1, div7, hr1,
    div8, div9, label2, div10, hr2,
    div11, div12, label3, div13, hr3,
    div14, div15, label4, div16, input1, hr4,
    div17, div18, label5, div19, hr5,
    div20, div21, button1, hr6;

    $.post("php/functions/session/session.confirm.php",function(data){
    data = data.split(";");

    div1 = newElement(body, "div", ["row"], [], "");
    div2 = newElement(div1, "div", ["col-12"],[],"");
    ul1 = newElement(div2,  "ul", ["nav", "nav-tabs", "mb-4"], ["id=myTab", "role=tablist"],"");
    li1 = newElement(ul1, "li", ["nav-item"], [], "");
    a1 = newElement(li1, "a", ["nav-link", "active"], ["id=basicInfo-tab", "data-toggle=tab", "href=#basicInfo", "role=tab", "aria-controls=basicInfo", "aria-selected=true"], "Basic Info");

    div3 = newElement(div2, "div", ["tab-content", "ml-1"], ["id=myTabContent"], "");
    div4 = newElement(div3, "div", ["tab-pane", "fade", "show", "active"], ["id=basicInfo", "role=tabpanel", "aria-labelledby=basicInfo-tab"], "");

    div5 = newElement(div4, "div", ["row"], [], "");
    div6 = newElement(div5, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    label1 = newElement(div6, "label", [], ["id=lblEid"], "Employee Id: ");
    div7 = newElement(div5, "div", ["col-md-8", "col-6"], ["id=lblEids"], data[4])
    hr1 = newElement(div4, "hr", [], ["id=hr"], "");

    div8 = newElement(div4, "div", ["row"], [], "");
    div9 = newElement(div8, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    label2 = newElement(div9, "label", [], ["id=lblEid"], "Name: ");
    div10 = newElement(div8, "div", ["col-md-8", "col-6"], ["id=lblEids"], data[3])
    hr2 = newElement(div4, "hr", [], ["id=hr"], "");

    div11 = newElement(div4, "div", ["row"], [], "");
    div12 = newElement(div11, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    label3 = newElement(div12, "label", [], ["id=lblEid"], "Department: ");
    div13 = newElement(div11, "div", ["col-md-8", "col-6"], ["id=lblEids"], data[2])
    hr3 = newElement(div4, "hr", [], ["id=hr"], "");

    div14 = newElement(div4, "div", ["row"], [], "");
    div15 = newElement(div14, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    label4 = newElement(div15, "label", [], ["id=lblEid"], "Position: ");
    div16 = newElement(div14, "div", ["col-md-8", "col-6"], [], "")
    input1 = newElement(div16, "input", ["form-control"], ["id=lblPositions", "type=text", "onkeyup=accountpositionconfirm(\""+data[5]+"\")", "value="+data[5]], data[5]);
    hr4 = newElement(div4, "hr", [], ["id:hr"], "");

    div17 = newElement(div4, "div", ["row"], [], "");
    div18 = newElement(div17, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    label5 = newElement(div18, "label", [], ["id=lblEid"], "Role: ");
    div19 = newElement(div17, "div", ["col-md-8", "col-6"], ["id=lblEids"], data[1])
    hr5 = newElement(div4, "hr", [], ["id=hr"], "");

    div20 = newElement(div4, "div", ["row"], [], "");
    div21 = newElement(div20, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    button1 = newElement(div21, "button", ["btn", "btn-default"], ["id=lblpass", "onclick=ChangePass()"], "Change Password");
    hr6 = newElement(div4, "hr", [], ["id=hr"], "");

    div22 = newElement(div4, "div", ["row"], [], "");
    div23 = newElement(div22, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    button2 = newElement(div23, "button", ["btn","btn-primary"],["id=accountinfoupdatebtn","disabled=true","onClick=accountinfoupdatebtn(\""+data[5]+"\")"],"Save Changes");

        });
}


function DSHBRDAgentVersion()
{
  var checktable = tablecheck("agent version", "Agent Version");
  var a = document.getElementById("ContentCardHead");
  a.innerHTML = "";
  var foot = document.getElementById("ContentCardFoot");
  foot.innerHTML = "";

  var body = document.getElementById("ContentCardBody");
  foot.innerHTML = "";

  document.getElementById("dtitle").innerHTML = "Settings";
  document.getElementById("dtitle2").innerHTML = "Agent Version";

  if (checktable == false)
  {
    var row = newElement(foot, "div", ["row"],"","");
    var btnAdd = newElement(row,  "button", ["btn","btn-primary"],["id=agentAdd", "onclick=addagentversion()"],"Add New Version");
    var btnDelete = newElement(row,  "button", ["btn","btn-danger"],["id=agentDelete", "onclick=deleteagentversion()"],"Delete");

    $('#datalist').DataTable(
      {
      dom: "<'row mt-2'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'r><'col-sm-12 col-md-4'f>>"+
        "<'row'<'col-sm-12'tr>>"+
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",//lBfrtip
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      columns: [
            { title: "Validation" },
            { title: "Version" }
          ],
      "order": [[ 0, "desc" ]]
    });

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
    {
      Loading(true);
      if (this.readyState == 4 && this.status == 200)
      {
        myObj = JSON.parse(this.responseText);
        for (x in myObj)
        {
          // if(myObj[x].type == null)
          // {
          //   var user = myObj[x].userid;
          // }
          $('#datalist').DataTable().row.add([
            myObj[x].version,
            myObj[x].type
          ]).draw(false);
        }//for close
        Loading(false);
    }//if close
  }//function close
    xmlhttp.open("POST", "php/functions/sttngs/settings.agent.version.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
  }
  else{
    //do nothing
  }
}

function DSHBRDContentBranchSettings()
{
  var checktable = tablecheck("branch settings", "Branch Settings");
  var a = document.getElementById("ContentCardHead");
  a.innerHTML = "";
  var foot = document.getElementById("ContentCardFoot");
  foot.innerHTML = "";

  var body = document.getElementById("ContentCardBody");

  document.getElementById("dtitle").innerHTML = "Settings";
  document.getElementById("dtitle2").innerHTML = "Branch View Settings";

  var div1 = newElement(body, "div", ["container"], [], "");
  var div2 = newElement(div1, "div", ["row"], [], "");
  var div3 = newElement(div2, "div", ["col-md-12"], [], "");
  var div4 = newElement(div3, "div", ["menu"], [], "");

  var div5 = newElement(div4, "div", ["accordion"], [], "");
  var div6 =  newElement(div5, "div", ["accordion-group"], [], "" );
  var div7 = newElement(div6, "i", ["accordion-heading", "area"], [], "")
  var a = newElement(div7, "a", ["accordion-toggle"], ["data-toggle=collapse", "href=#branch"], "Marvin (IT)");

  var div8 = newElement(div6, "div", ["accordion-body", "collapse"], ["id=branch"], "");
  var div9 = newElement(div8, "div", ["accordion-inner"], [], "");
  var div10 = newElement(div9, "div", ["accordion"], ["id=subdept"], "");

  var div11 = newElement(div10, "div", ["accordion-group"], [], "");
  var div12 = newElement(div11, "div", ["accordion-heading", "equipamento"], [], "");
  var a2 = newElement(div12, "a", ["accordion-toggle"], ["data-parent=#subdept-1", "data-toggle=collapse", "href=#subdept1-1"], "IT-HR");

  var div13 = newElement(div11, "div", ["accordion-heading", "equipamento"], [], "");
  var a3 = newElement(div13, "a", ["accordion-toggle"], ["data-parent=#subdept-2", "data-toggle=collapse", "href=#subdept1-2"], "IT-DEV");

  var div14 = newElement(div10, "div", ["accordion-body", "collapse"], ["id=subdept1-2"], "");
  var div15 = newElement(div14, "div", ["accordion-inner"], [], "");
  var div16 = newElement(div15, "div", ["accordion"], ["id=servico1"], "");
  var div17 = newElement(div16, "div", ["accordion-group"], [], "");
  var div18 = newElement(div17, "div", ["accordion-heading", "ponto"], [], "");
  var a4 = newElement(div18, "a", ["accordion-toggle"], ["data-parent=#servico1-1", "data-toggle=collapse", "href=#servico1-1"], "DEV-JA");

  // NEW ACCORDION

  var div19 = newElement(div4, "div", ["accordion"], [], "");
  var div20 =  newElement(div19, "div", ["accordion-group"], [], "" );
  var div21 = newElement(div20, "i", ["accordion-heading", "area"], [], "")
  var a5 = newElement(div21, "a", ["accordion-toggle"], ["data-toggle=collapse", "href=#branch1"], "Marvin (MAIN)");

  var div22 = newElement(div20, "div", ["accordion-body", "collapse"], ["id=branch1"], "");
  var div23 = newElement(div22, "div", ["accordion-inner"], [], "");
  var div24 = newElement(div23, "div", ["accordion"], ["id=subdept2"], "");

  var div25 = newElement(div24, "div", ["accordion-group"], [], "");
  var div26 = newElement(div25, "div", ["accordion-heading", "equipamento"], [], "");
  var a6 = newElement(div26, "a", ["accordion-toggle"], ["data-parent=#subdept2-1", "data-toggle=collapse", "href=#subdept2-1"], "HR");

  var div27 = newElement(div25, "div", ["accordion-heading", "equipamento"], [], "");
  var a7 = newElement(div27, "a", ["accordion-toggle"], ["data-parent=#subdept2-2", "data-toggle=collapse", "href=#subdept2-2"], "QF");

  var div28 = newElement(div25, "div", ["accordion-body", "collapse"], ["id=subdept2-2"], "");
  var div29 = newElement(div28, "div", ["accordion-inner"], [], "");
  var div30 = newElement(div29, "div", ["accordion"], ["id=servico2"], "");
  var div31 = newElement(div30, "div", ["accordion-group"], [], "");
  var div32 = newElement(div31, "div", ["accordion-heading", "ponto"], [], "");
  var a8 = newElement(div32, "a", ["accordion-toggle"], ["data-parent=#servico2-1", "data-toggle=collapse", "href=#servico2-1"], "CS");
  




  // var table = [];
  // var classes = ["table","table-bordered"];
  // var attributes = ["width:100%","cellspacing:0","id:"];
  // createTable(table, body, classes, attributes);
  // $.post("php/functions/sttngs/settings.branch.view.php",function(data){
  //   data = data.split("||");
  //   for(var arraccount = 0; arraccount < data.length; arraccount++){
  //     var currentdata = data[arraccount].split(";");

  //     if (currentdata[2] == "tr"){
  //       var tr = [];
  //       createnewElement(tr,table.body,"tr",[],[],"");
  //     }
  //     var td = [], link = [], i = [], newdata = [], label = [], link2 = [], i2=[];
  //     var id = idgenerator();
  //     createnewElement(td, tr.newelement, "td",[],["rowspan:"+currentdata[1]],"");
  //     createnewElement(label, td.newelement, "h5", [], ["id:"+id, "tree_id:"+currentdata[4], "tree_filter:"+currentdata[5], "tree_name:"+currentdata[0],"computer_count:"+currentdata[6]], currentdata[0])

  //     createLink(link2, label.newelement  , "", ["btn","btn-default","btn-sm"], ["role:button", "href:#", "id:branchDelete","onClick:BRNCHVWdelete(\""+id+"\")"]);
  //     createnewElement(i2, link2.link, "i", ["fa","fas","fa-fw","fa-lg","fa-trash"],[],"");

  //     createLink(link, label.newelement  , "", ["btn","btn-default","btn-sm"], ["role:button", "href:#", "id:branchEdit", "onClick:BRNCHVWedit(\""+id+"\")"]);
  //     createnewElement(i, link.link, "i", ["fa","fas","fa-fw","fa-lg","fa-edit"],[],"");
  //   }
  // });

// var toolbar = [];
// createnewElement(toolbar, foot,"div",["btn-toolbar","mr-3"],[],"");
// var ig = [];
// createnewElement(ig,toolbar.newelement,"div",["btn-group","mr-2"],[],"");
// createnewElement([], ig.newelement, "button", ["btn","btn-primary"], ["type:button","onclick:adddepartment()"], "Add Department or Branch");
}
