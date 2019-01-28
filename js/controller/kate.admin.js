function DSHBRDAccountsAccMgnt()
{
    var checktable = tablecheck("user accounts", "User Accounts");
    var header = document.getElementById("ContentCardHead");
    var foot = document.getElementById("ContentCardFoot");
    
    header.innerHTML = "";
    document.getElementById("dtitle").innerHTML = "Profile And Accounts";
    document.getElementById("dtitle2").innerHTML = "User Accounts";

    if (checktable == false){

    var row = newElement(header, "div", ["row"],"","");
    // var text = newElement(row, "div", ["col-md-6","col-sm-6"], "", "User Accounts");
    // var btndiv = newElement(row, "div", ["d-flex","d-flex-row-reverse","col-md-6","col-sm-6"], "", "");
    var btnAdd = newElement(row,  "button", ["btn","btn-default"],["data-toggle=modal", "data-target=#AddUser", "href=#AddUser", "id=btnAddUser"],"Add User");


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
    var checktable = tablecheck("user profile", "Profile Settings");
    var a = document.getElementById("ContentCardHead");
    a.innerHTML = "Account Information";
    var foot = document.getElementById("ContentCardFoot");

    var body = document.getElementById("ContentCardBody");

    document.getElementById("dtitle").innerHTML = "Profile And Accounts";
    document.getElementById("dtitle2").innerHTML = "Profile Settings";

    // tableid = idgenerator();

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
