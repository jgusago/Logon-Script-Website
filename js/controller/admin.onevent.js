//onClick

//COMPLISTtables
function DSHBRDCompList(log_id, dept)
{

  var checktable = tablecheck("computer list", log_id);
  var a = document.getElementById("ContentCardHead").innerHTML = dept;
  var foot = document.getElementById("ContentCardFoot");

  document.getElementById("dtitle").innerHTML = "Reports";
  document.getElementById("dtitle2").innerHTML = "Computer List";

  if (checktable == false){

    $('#datalist').DataTable( {
      dom: "<'row'<'col-sm-12 col-md-12 d-flex flex-row-reverse'B>>"+
           "<'row mt-2'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'r><'col-sm-12 col-md-4'f>>"+
           "<'row'<'col-sm-12'tr>>"+
           "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",//lBfrtip
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      buttons: ['copyHtml5','excelHtml5','pdfHtml5','csvHtml5'],
      columns: [
            { title: "Hostname" },
            { title: "User" },
            { title: "IP Address" },
            { title: "Server & Services" },
            { title: "Status"},
            { title: "Remarks" },
            { title: "Agent Version" },
            { title: "Date Checked" },
            { title: "Action" }
          ]
    });

    //obj -> any variable
    obj = {log_id:log_id};
    dbParam = JSON.stringify(obj);

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      Loading(true);
      if (this.readyState == 4 && this.status == 200) {

        myObj = JSON.parse(this.responseText);
        for (x in myObj) {
          var hostname = myObj[x].hostname;

          if (myObj[x].date_checked != null){
            var newdate = myObj[x].date_checked.split(",");
            var date = "";

            if(newdate.length == 1){
              date = myDate("mmm dd, yyyy", newdate[0]);
            }
            else{
                date = myDate("mmm dd, yyyy", newdate[0])+", "+myDate("mmm dd, yyyy", newdate[1]);
            }
          }//Close datre_Checked != null
          else{
            date = "";
          }

          $('#datalist').DataTable().row.add([
                hostname,
                myObj[x].user,
                myObj[x].ip_address,
                myObj[x].services,
                myObj[x].status,
                "<span id=\""+hostname+"_remarks\">"+myObj[x].remarks+"</span>",
                "<span id=\""+hostname+"_agent\">"+myObj[x].agent_version+"</span>",
                "<span id=\""+hostname+"_date\">"+date+"</span>",
                "<button class=\"btn btn-primary\" onClick=\"complistdetails('"+hostname+"')\">Details</button>"
              ]).draw(false);
        }//for
        Loading(false);
      }//if
    };//xmlhttp function
    xmlhttp.open("POST", "php/functions/reports/computer.list.json.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);

  }
  else{
  }
  var txt;

}


//computer list detalis
function complistdetails(hostname){
  OVERLAYenable();

  //get mini window ID;
  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");
  var form, label, div, input, button, br, row, option,
  processor, hdd, mac, man, model, remarks, agent, os, sys;
  ch.innerHTML = hostname;

  form = newElement(cb, "form", [], ["onsubmit=return ComputerListUpdate(true, \""+hostname+"\")"], "");

  div = newElement(form, "div", ["form-group"],[],"");
  label = newElement(div, "strong", [],["for=processor"], "Processor:");
  processor = newElement(div, "input", ["form-control"], ["id=processor","disabled=true"], "");

  br = newElement(form,"div",["dropdown-divider"],[],"");

  label = newElement(form, "strong", "",["for=row"], "System Reference:");
  row = newElement(form, "div", ["row"], ["id=row"],"");
  div = newElement(row, "div", ["col"],[],"");
  label = newElement(div, "label", [],["for=hdd"], "HDD/SSD Serial:");
  hdd = newElement(div, "input", ["form-control"], ["id=hdd","disabled=true"], "");
  div = newElement(row, "div", ["col"],[],"");
  label = newElement(div, "label", [],["for=mac"], "MAC Address:");
  mac = newElement(div, "input", ["form-control"], ["id=mac","disabled=true"], "");

  br = newElement(form,"div",["dropdown-divider"],[],"");

  label = newElement(form, "strong", [],["for=row"], "Motherboard:");
  row = newElement(form, "div", ["row"], ["id=row"],"");
  div = newElement(row, "div", ["col"],[],"");
  label = newElement(div, "label", [],["for=man"], "Manufacturer:");
  man = newElement(div, "input", ["form-control"], ["id=man","disabled=true"], "");
  div = newElement(row, "div", ["col"],[],"");
  label = newElement(div, "label", [],["for=model"], "Model:");
  model = newElement(div, "input", ["form-control"], ["id=model","disabled=true"], "");

  br = newElement(form,"div",["dropdown-divider"],[],"");

  label = newElement(form, "strong", [],["for=row"], "System:");
  row = newElement(form, "div", ["row"], ["id=row"],"");
  div = newElement(row, "div", ["col"],[],"");
  label = newElement(div, "label", [],["for=os"], "OS:");
  os = newElement(div, "input", ["form-control"], ["id=os","disabled=true"], "");
  div = newElement(row, "div", ["col"],[],"");
  label = newElement(div, "label", [],["for=sys"], "Type:");
  sys = newElement(div, "input", ["form-control"], ["id=sys","disabled=true"], "");

  br = newElement(form,"div",["dropdown-divider"],[],"");

  div = newElement(form, "div", ["form-group"],[],"");
  label = newElement(div, "strong", [],["for=remarks"], "Remarks:");
  remarks = newElement(div, "select", ["form-control"], ["id=remarks"], "");
  option = newElement(remarks, "option", [], ["value=Active"], "Active");
  option = newElement(remarks, "option", [], ["value=On Leave"], "On Leave");
  option = newElement(remarks, "option", [], ["value=Pulled Out"], "Pulled Out");
  option = newElement(remarks, "option", [], ["value=Renamed"], "Renamed");
  option = newElement(remarks, "option", [], ["value=Transfered"], "Transferred");
  option = newElement(remarks, "option", [], ["value=Vacant"], "Vacant");
  br = newElement(form,"div",["dropdown-divider"],[],"");

  div = newElement(form, "div", ["form-group"],[],"");
  label = newElement(div, "strong", [],["for=agent"], "Agent Version:");
  agent = newElement(div, "input", ["form-control"], ["id=agent"], "");

  br = newElement(form,"br",[],[],"");
  row = newElement(form, "div", ["row"], ["id=row"],"");
  div = newElement(row, "div", ["col"],[],"");
  button = newElement(div, "button", ["btn","btn-block","btn-primary", "form-control"],["type=submit","id=submitbtn","disabled=true"], "Update");
  div = newElement(row, "div", ["col"],[],"");
  button = newElement(div, "button", ["btn","btn-block","btn-success", "form-control"],["type=button","onClick=ComputerListUpdate(false, \""+hostname+"\")"], "Checked");
  br = newElement(form,"br",[],[],"");

  obj = {hostname:hostname};
  dbParam = JSON.stringify(obj);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    Loading(true);
    if(this.readyState == 4 && this.status == 200){
      myObj = JSON.parse(this.responseText);
      for (x in myObj) {

        processor.value = myObj[x].processor;
        hdd.value = myObj[x].HDD_Serial;
        mac.value = myObj[x].MAC_Address;
        man.value = myObj[x].mb_manufacturer;
        model.value = myObj[x].mb_product;
        agent.value = myObj[x].agent_version;
        os.value = myObj[x].OS;
        sys.value = myObj[x].System_type;
        option = newElement(remarks, "option", [], ["hidden=true","selected=selected","value="+myObj[x].remarks], myObj[x].remarks);
        remarks.setAttribute("onChange","onChangeCheck([\"remarks\",\"agent\"])");
        agent.setAttribute("onkeyup","onChangeCheck([\"remarks\",\"agent\"])");
        remarks.setAttribute("default",myObj[x].remarks);
        agent.setAttribute("default",myObj[x].agent_version);

      }
      Loading(false);
    }//server request close
  };//XMLHttpRequest close
  xmlhttp.open("POST","php/functions/reports/computer.list.details.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);

}

function ComputerListUpdate(changed, hostname){
  var obj;
    var selected = document.getElementById("remarks");
    var index = selected.selectedIndex;
    var remarks = selected.options[index].text;
    var agent = document.getElementById("agent").value;
    obj = {changed:changed, remarks:remarks, agent:agent, hostname:hostname};

  dbParam = JSON.stringify(obj);
  xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function(){
    Loading(true);
    if(this.readyState == 4 && this.status == 200){
      myObj = JSON.parse(this.responseText);//get response
        // for (x in myObj) {
          var date = document.getElementById(hostname+"_date");
          var currdate = date.innerText.split(", ");
          var thisdate = myDate("mmm dd, yyyy", "");
          if(currdate.length > 1){
            var currdate = date.innerText.split(", ");
            var lastdate = currdate[0]+", "+currdate[1];
            newdate = thisdate+", "+lastdate;
          }
          else{
            newdate = thisdate;
          }

          if(myObj.changed == true && myObj.update == true && myObj.history == true && myObj.encoded == true){
            var tdremarks = document.getElementById(hostname+"_remarks");
            var tdagent = document.getElementById(hostname+"_agent");
            tdremarks.innerHTML = remarks;
            tdagent.innerHTML = agent;
            date.innerHTML = newdate;
            ALERTcall("success","Data have been updated");
            OVERLAYdisable();
          }
          else if(myObj.changed == false && myObj.update == false && myObj.history == true && myObj.encoded == true){
            date.innerHTML = newdate;
            ALERTcall("success","Data have been checked");
            OVERLAYdisable();
          }
          else{
            ALERTcall("warning","Error Aquired:"+myObj);
          }
          Loading(false);

        // }//folr close
    }//ready state and status close
  };//xmlhttp onreadystatechange close

  xmlhttp.open("POST","php/functions/reports/computer.list.details.update.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);

return false;
}

function DSHBRDCompLogs(log_id, dept){

  var checktable = tablecheck("computer logs", log_id);
  var a = document.getElementById("ContentCardHead").innerHTML = dept;
  var foot = document.getElementById("ContentCardFoot");

  document.getElementById("dtitle").innerHTML = "Reports";
  document.getElementById("dtitle2").innerHTML = "Computer Logs";

  if (checktable == false){

    $('#datalist').DataTable( {
      dom: "<'row'<'col-sm-12 col-md-12 d-flex flex-row-reverse'B>>"+
           "<'row mt-2'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'r><'col-sm-12 col-md-4'f>>"+
           "<'row'<'col-sm-12'tr>>"+
           "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",//lBfrtip
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      buttons: ['copyHtml5','excelHtml5','pdfHtml5','csvHtml5'],
      columns: [
            { title: "Hostname" },
            { title: "User" },
            { title: "Domain"},
            { title: "IP Address" },
            { title: "Software Status" },
            { title: "Connection Status"},
            { title: "Scan Time" }
          ]
    });

    obj = {log_id:log_id};
    dbParam = JSON.stringify(obj);

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      Loading(true);
      if (this.readyState == 4 && this.status == 200) {

        myObj = JSON.parse(this.responseText);
        for (x in myObj) {

          thisdate = myDate("mmm dd, yyyy hh", myObj[x].scan_time);
          $('#datalist').DataTable().row.add([
            myObj[x].hostname,
            myObj[x].user,
            myObj[x].domain,
            myObj[x].ip_address,
            myObj[x].software_status,
            myObj[x].connection_status,
            thisdate
          ]).draw(false);
    }//for
    Loading(false);
  }//if
};//xmlhttp function
xmlhttp.open("POST", "php/functions/reports/computer.logs.json.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + dbParam);


  }
  else{
    //do nothing
  }

}


function DSHBRDTransacHistory()
{
  var checktable = tablecheck("computer logs", "Transaction History");
  var a = document.getElementById("ContentCardHead").innerHTML = "Transaction History";
  var foot = document.getElementById("ContentCardFoot");

  document.getElementById("dtitle").innerHTML = "Reports";
  document.getElementById("dtitle2").innerHTML = "History";

  if (checktable == false){

  $('#datalist').DataTable( {
    dom: "<'row'<'col-sm-12 col-md-12 d-flex flex-row-reverse'>>"+
         "<'row mt-2'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'r><'col-sm-12 col-md-4'f>>"+
         "<'row'<'col-sm-12'tr>>"+
         "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",//lBfrtip
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    columns: [
          { title: "Date" },
          { title: "Name" },
          { title: "Details"},
          { title: "User" }
        ],
    "order": [[ 0, "desc" ]]
  });

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    Loading(true);
    if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
      for (x in myObj) {
        if(myObj[x].user_name == null){
          var user = myObj[x].user_id;
        }
        else{
          var user = myObj[x].user_id+" - "+myObj[x].user_name;
        }
        $('#datalist').DataTable().row.add([
          myObj[x].transact_date,
          myObj[x].transact_name,
          myObj[x].transact_details,
          user
        ]).draw(false);

      }//for close
      Loading(false);
  }//if close
}//function close
  xmlhttp.open("POST", "php/functions/reports/transaction.history.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send();
}
else{
  //do nothing
}
}

function DSHBRDTransactionHistory(){
  var checktable = tablecheck("disconnection logs", "Disconnection History");
  var a = document.getElementById("ContentCardHead").innerHTML = "";
  var foot = document.getElementById("ContentCardFoot");

  if (checktable == false){

  $('#datalist').DataTable( {
    dom: "<'row'<'col-sm-12 col-md-12 d-flex flex-row-reverse'B>>"+
         "<'row mt-2'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'r><'col-sm-12 col-md-4'f>>"+
         "<'row'<'col-sm-12'tr>>"+
         "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",//lBfrtip
    buttons: ['copyHtml5','excelHtml5','pdfHtml5','csvHtml5'],
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    columns: [
          { title: "Detected Time" },
          { title: "End Time" },
          { title: "Hostname"},
          { title: "User" },
          { title: "IP Address"},
          { title: "Services"},
          { title: "Department"}
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
          myObj[x].detectiontime,
          myObj[x].endtime,
          myObj[x].hostname,
          user,
          myObj[x].ip_address,
          myObj[x].services,
          myObj[x].branch,
        ]).draw(false);
      }//for close
      Loading(false);
  }//if close
}//function close
  xmlhttp.open("POST", "php/functions/reports/disconnection.logs.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send();
}
else{
  //do nothing
}
}

function NOTIFOpen(id){
  var checktable = tablecheck("notification-"+id, "Notifications");

  if (checktable == false){
    var a = document.getElementById("ContentCardHead").innerHTML = "Notifications";
    var foot = document.getElementById("ContentCardFoot");
    foot.innerHTML = "";
    obj = {id:id};
    dbParam = JSON.stringify(obj);

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      Loading(true);
      if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        if(myObj.length > 0){
            var arrname = [];
            for (var i = 0; i < myObj.length-1; i++) {
              arrname.push({title: myObj[i]});
            }

            $('#datalist').DataTable( {
              dom: "<'row'<'col-sm-12 col-md-12 d-flex flex-row-reverse'B>>"+
                   "<'row mt-2'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'r><'col-sm-12 col-md-4'f>>"+
                   "<'row'<'col-sm-12'tr>>"+
                   "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",//lBfrtip
              buttons: ['copyHtml5','excelHtml5','pdfHtml5','csvHtml5'],
              "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
              columns: arrname
            });

            var row = [], cell = [];
            var limit = myObj.length - 1;
            for(var rw = 0; rw < myObj[limit].length; rw++){
                $('#datalist').DataTable().row.add(myObj[limit][rw]).draw(false);
            }
        }
        Loading(false);
      }//if
    };//xmlhttp function
    xmlhttp.open("POST", "php/functions/notification/notification.table.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);
  }

}

function DSHBRDAccountsAccMgnt()
{
    var checktable = tablecheck("user accounts", "User Accounts");
    var header = document.getElementById("ContentCardHead");
    var foot = document.getElementById("ContentCardFoot");

    header.innerHTML = "";
    document.getElementById("dtitle").innerHTML = "Profile And Accounts";
    document.getElementById("dtitle2").innerHTML = "User Accounts";

    if (checktable == false)
    {

    var row = newElement(header, "div", ["row"],"","");
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
            "<span id=\""+myObj[x].userid+"_name\">"+myObj[x].name+"</span>",
            "<span id=\""+myObj[x].userid+"_department\">"+myObj[x].department+"</span>",
            "<span id=\""+myObj[x].userid+"_position\">"+myObj[x].position+"</span>",
            "<span id=\""+myObj[x].userid+"_role\">"+myObj[x].role+"</span>",
            "<span id=\""+myObj[x].userid+"_status\">"+myObj[x].status+"</span>",
            "<div class=\"btn-group\"><button class=\"btn btn-primary\" onClick=\"ACCTedit('"+myObj[x].userid+"')\">Details</button><button class=\"btn btn-danger\" onClick=\"ACCTpass('"+myObj[x].userid+"')\">Reset Password</button></div>"
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

//User Account Update OnClick
function ACCTedit(userid){
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

    var name = document.getElementById(userid+"_name").innerText;
    var department = document.getElementById(userid+"_department").innerText;
    var position = document.getElementById(userid+"_position").innerText;
    var role = document.getElementById(userid+"_role").innerText;
    var status = document.getElementById(userid+"_status").innerText;

  //header
  var header = newElement(ch, "div",["row"],"","");
  header.style.width = "400px";
  var header_h5 = newElement(header, "h5", "", ["id:editHeader"], "Edit User Information");

  //userid
  var form = newElement(cb, "form", "", "", "");
  var formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], "", "");
  var label = newElement(formgroup, "label", "", ["for=ae_userid"], "Login ID");
  var input = newElement(formgroup, "input", ["form-control"],["type=text","id=ae_userid", "disabled=true","value="+userid,"default-value="+userid],"");
  //name
  formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], "", "");
  label = newElement(formgroup, "label", "", ["for=ae_name"], "Name");
  input = newElement(formgroup, "input", ["form-control"],["type=text","id=ae_name","required=true", "value="+name,"default-value="+name,"onkeyup=ACCeditvalidate()"],"");
  //department
  formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], "", "");
  label = newElement(formgroup, "label", "", ["for=ae_department"], "Department");
  var select = newElement(formgroup, "select", ["form-control"],["required=true","id=ae_department","default-value="+department,"onChange=ACCeditvalidate()"], "");
  Departmentlist("ae_department");
  var option = newElement(select, "option", "", ["value="+department,"hidden=true","selected=selected"],department);
  //position
  formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], "", "");
  label = newElement(formgroup, "label", "", ["for=ae_position"], "Position");
  input = newElement(formgroup, "input", ["form-control"],["type=text","id=ae_position","required=true", "value="+position,"default-value="+position,"onkeyup=ACCeditvalidate()"],"");
  //role
  formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], "", "");
  label = newElement(formgroup, "label", "", ["for=ae_role"], "Role");
  select = newElement(formgroup, "select", ["form-control"],["required=true","id=ae_role","default-value="+role,"onChange=ACCeditvalidate()"], "");
  option = newElement(select, "option", "", ["value=ADMINISTRATOR"],"Administrator");
  option = newElement(select, "option", "", ["value=STAFF"],"Staff");
  option = newElement(select, "option", "", ["value="+role,"hidden=true","selected=selected"],role);
  //status
  formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], "", "");
  label = newElement(formgroup, "label", "", ["for=ae_status"], "Status");
  select = newElement(formgroup, "select", ["form-control"],["required=true","id=ae_status","default-value="+status,"onChange=ACCeditvalidate()"], "");
  option = newElement(select, "option", "", ["value=Active"],"Active");
  option = newElement(select, "option", "", ["value=Inactive"],"Inactive");
  option = newElement(select, "option", "", ["value="+status,"hidden=true","selected=selected"],status);

  var footer = newElement(cf, "div", "", "", "");
  var button = newElement(footer, "button", ["btn", "btn-primary"],["disabled=true","value=update","id=UserAccountupdate","onClick=UserAccountupdate(\""+userid+"\")"],"Update")
}

//Update User Information
function UserAccountupdate(id){

  var name = document.getElementById("ae_name");
  var dept = document.getElementById("ae_department");
  var post = document.getElementById("ae_position");
  var role = document.getElementById("ae_role");
  var stat = document.getElementById("ae_status");

  var n_name = name.value;
  var n_dept = dept.options[dept.selectedIndex].value;
  var n_post = post.value;
  var n_role = role.options[role.selectedIndex].value;
  var n_stat = stat.options[stat.selectedIndex].value;

  var d_name = document.getElementById(id+"_name");
  var d_dept = document.getElementById(id+"_department");
  var d_post = document.getElementById(id+"_position");
  var d_role = document.getElementById(id+"_role");
  var d_stat = document.getElementById(id+"_status");

  obj = {id:id,
        name: n_name,
        dept: n_dept,
        post: n_post,
        role: n_role,
        stat: n_stat};
  dbParam = JSON.stringify(obj);

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
          if(myObj.insertion == "success"){
            d_name.innerHTML = n_name;
            d_dept.innerHTML = n_dept;
            d_post.innerHTML = n_post;
            d_role.innerHTML = n_role;
            d_stat.innerHTML = n_stat;

            ALERTcall("success","success");
            OVERLAYdisable();
          }
          else{
            ALERTcall("danger","Update Failed<br>"+myObj.insertion);
            OVERLAYdisable();
          }
    }//if
  };//xmlhttp function
  xmlhttp.open("POST", "php/functions/accounts/user.account.update.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);
}

function ACCTpass(id){
  OVERLAYenable();
  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");
  var header = newElement(ch, "div","","","Change User Password");
  header.style.width = "400px";

  var form = newElement(cb, "form", "", ["onsubmit=return UserAccountpassword(\""+id+"\")"], "");
  var formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], ["id=newpasscon","style=display: none;"], "");
  var label = newElement(formgroup, "div",["alert", "alert-danger", "md-form", "mb-3"],[],"Need atleast one Caps and small letter, a number and atleast 8 characters");
  var formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"],["id=conpasscon","style=display: none;"], "");
  var label = newElement(formgroup, "div",["alert", "alert-danger", "md-form", "mb-3"],[],"Password is empty or Does not Match");
  var formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], "", "");
  var newpass = newElement(formgroup, "input",["form-control"], ["type=password","id=newpass", "required=true", "placeholder=New Password"], "");
  var formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], "", "");
  var conpass = newElement(formgroup, "input",["form-control"], ["type=password","id=conpass", "required=true", "placeholder=Confirm Password"],"");
  var formgroup = newElement(form, "div", ["form-group","md-form", "mb-3"], "", "");
  var submit = newElement(formgroup, "input", ["btn","btn-success","btn-block"], ["type=submit"], "Change Password");
}

function UserAccountpassword(id){
  var newpass = document.getElementById("newpass");
  var conpass = document.getElementById("conpass");
  var newpasscon = document.getElementById("newpasscon");
  var conpasscon = document.getElementById("conpasscon");
  var npass = false;
  var cpass = false;

  var re =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if(!re.test(newpass.value)){
    newpasscon.style.display = "block";
    npass = false;
  }
  else{
    newpasscon.style.display = "none";
    npass = true;
  }

  if(newpass.value !== conpass.value && newpass.value !== ""){
    conpasscon.style.display = "block";
    cpass = false;
  }
  else{
    conpasscon.style.display = "none";
    cpass = true;
  }

  if(npass == true && cpass == true){
    obj = {id:id,
          newpass: newpass.value,
          conpass: conpass.value};
    dbParam = JSON.stringify(obj);

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = this.responseText;
        if(response == "success"){
          ALERTcall("success","Password have been Changed");
          OVERLAYdisable();
        }
        else{
            ALERTcall("danger","Failed");
            OVERLAYdisable();
        }
      }//if
    };//xmlhttp function
    xmlhttp.open("POST", "php/functions/accounts/accounts.change.password.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);
  }
  return false;
}
