function DSHBRDAccountsAccMgnt(){
    var checktable = tablecheck("user accounts", "User Accounts");
    var a = document.getElementById("ContentCardHead").innerHTML = "User Accounts";
    // var btnAdd = newElement(a,  "button", ["btn","btn-default"],["data-toggl=modal", "data-target=#AddUser", "href=#AddUser", "id=btnAddUser"],"Add User");
    var foot = document.getElementById("ContentCardFoot");
  
    if (checktable == false){
  
    $('#datalist').DataTable( {
      dom: "<'row mt-2'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'r><'col-sm-12 col-md-4'f>>"+
        "<'row'<'col-sm-12'tr>>"+
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",//lBfrtip
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      columns: [
            { title: "User ID" },
            { title: "Name" },
            { title: "Department"},
            { title: "Job Position" },
            { title: "Role"},
            { title: "Status"},
            { title: "Action"}
          ],
      "order": [[ 0, "desc" ]]
    });
  
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      Loading(true);
      if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
        for (x in myObj) {
          if(myObj[x].name == null){
            var user = myObj[x].userid;
          }
          else{
            var user = myObj[x].userid+" - "+myObj[x].name;
          }
          $('#datalist').DataTable().row.add([
            myObj[x].userid,
            myObj[x].name,
            myObj[x].department,
            myObj[x].position,
            myObj[x].role,
            myObj[x].status,
            // "button`btn~btn-primary`id:$userid-7~onclick:ACCTedit(\"$userid\",\"$name\",\"$department\",\"$position\",\"$role\",\"$status\")`Edit`";
            "<button class=\"btn btn-primary\"onClick=\"ACCTedit()\">Details</button>"

          ]).draw(false);
        }//for close
        Loading(false);
    }//if close
  }//function close
    xmlhttp.open("POST", "php/functions/accounts/accounts.view.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
  }
  else{
    //do nothing
  }
}


function Profiles()
{
    var checktable = tablecheck("uuser profile", "Profile Settings");
    var a = document.getElementById("ContentCardHead");
    a.innerHTML = "Account Information";
    // var btnAdd = newElement(a,  "button", ["btn","btn-default"],["data-toggl=modal", "data-target=#AddUser", "href=#AddUser", "id=btnAddUser"],"Add User");
    var foot = document.getElementById("ContentCardFoot");

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

    $.post("php/functions/session/session.confirm.php",function(data){
    data = data.split(";");
    //$status.0;".$role.1";".$department.2";".$name.3";".$id.4";".$position.5;


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
    createnewElement(divsUids, divs.newelement, "div", ["col-md-8", "col-6"], ["id:lblEids"], data[4])
    createnewElement(hrUid, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs2, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsUname, divs2.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl2, divsUname.newelement, "label", [], ["id:lblEid"], "Name: ");
    createnewElement(divsUnames, divs2.newelement, "div", ["col-md-8", "col-6"], ["id:lblEids"], data[3])
    createnewElement(hrUname, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs3, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsDept, divs3.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl3, divsDept.newelement, "label", [], ["id:lblEid"], "Department: ");
    createnewElement(divsDepts, divs3.newelement, "div", ["col-md-8", "col-6"], ["id:lblEids"], data[2])
    createnewElement(hrDept, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs4, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsPosition, divs4.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl4, divsPosition.newelement, "label", [], ["id:lblEid"], "Position: ");
    createnewElement(divsPositions, divs4.newelement, "div", ["col-md-8", "col-6"], [], "")
    createnewElement(inputPosition, divsPositions.newelement, "input", ["form-control"], ["id:lblPositions", "type:text", "onkeyup:accountpositionconfirm(\""+data[5]+"\")", "value:"+data[5]], data[5]);
    createnewElement(hrPosition, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs5, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsRole, divs5.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl5, divsRole.newelement, "label", [], ["id:lblEid"], "Role: ");
    createnewElement(divsRoles, divs5.newelement, "div", ["col-md-8", "col-6"], ["id:lblEids"], data[1])
    createnewElement(hrRole, divvv.newelement, "hr", [], ["id:hr"], "");

    createnewElement(divs6, divvv.newelement, "div", ["row"], [], "");
    createnewElement(divsPass, divs6.newelement, "div", ["col-sm-3", "col-md-2", "col-5"], [], "");
    createnewElement(divslbl6, divsPass.newelement, "button", ["btn", "btn-default"], ["id:lblpass", "onclick:ChangePass()"], "Change Password");
    createnewElement(hrPass, divvv.newelement, "hr", [], ["id:hr"], "");

    var button = [];
    createnewElement(button, card.foot, "button", ["btn","btn-default"],["id:accountinfoupdatebtn","disabled:true","onClick:accountinfoupdatebtn(\""+data[5]+"\")"],"Update Profile");

        });
}