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

// Employee List
function EmployeeList(){
  var checktable = tablecheck("employee list", "Employee List");
  var a = document.getElementById("ContentCardHead");
  a.innerHTML = "";
  var foot = document.getElementById("ContentCardFoot");
  foot.innerHTML = "";

  var body = document.getElementById("ContentCardBody");

  document.getElementById("dtitle").innerHTML = "Profile And Accounts";
  document.getElementById("dtitle2").innerHTML = "Employee List";

  if (checktable == false)
  {
    var row = newElement(foot, "div", ["row"],"","");
    var btnAdd = newElement(row,  "button", ["btn","btn-default"],["id=btnAddEmp", "onclick= employee()"],"Add Employee");
    var btnDelete = newElement(row,  "button", ["btn","btn-default"],["id=btnImpEmp", "onclick= importemployee()"],"Import List");


    $('#datalist').DataTable(
      {
      dom: "<'row'<'col-sm-12 col-md-12 d-flex flex-row-reverse'B>>"+
        "<'row mt-2'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'r><'col-sm-12 col-md-4'f>>"+
        "<'row'<'col-sm-12'tr>>"+
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",//lBfrtip
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      buttons: ['copyHtml5','excelHtml5','pdfHtml5','csvHtml5'],
      columns: [
            { title: "Employee ID" },
            { title: "Name" },
            { title: "Login ID" },
            { title: "Department" },
            { title: "Sub Department" },
            { title: "Action",targets: 0 , orderable: false},
            { title: "<button id=\"empcheck_all'\" onClick=\"empcheck('all')\" class=\"btn btn-secondary\">Selecy All</button>",targets: 0 , orderable: false}
          ]
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
          $('#datalist').DataTable().row.add([
            "<span id=\""+myObj[x].emp_id+"_id\">"+myObj[x].emp_id+"</span>",
            "<span id=\""+myObj[x].emp_id+"_name\">"+myObj[x].emp_name+"</span>",
            "<span id=\""+myObj[x].emp_id+"_login\">"+myObj[x].emp_login+"</span>",
            "<span id=\""+myObj[x].emp_id+"_dept\">"+myObj[x].dept+"</span>",
            "<span id=\""+myObj[x].emp_id+"_subdept\">"+myObj[x].sub_dept+"</span>",
            "<button class=\"btn btn-primary\"onClick=\"employee('"+myObj[x].emp_id+"')\">Edit</button>",
            "<div class=\"btn-group-toggle\" data-toggle=\"buttons\"><label class=\"btn btn-secondary\"><input class=\"form-check-label checkemployee\" type=\"checkbox\" id=\""+myObj[x].emp_id+"_chk\" onchange=\"empcheck('"+myObj[x].emp_id+"_chk')\" default-value=\""+myObj[x].emp_id+"\">Select</label></div>"
          ]).draw(false);
        }//for close
        Loading(false);
    }//if close
  }//function close
    xmlhttp.open("POST", "php/functions/employee/employee.list.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
  }
  else
  {
    //do nothing
  }
}

//Select ALL
function empcheck(id){
  if(id == "all"){
    var classname = document.getElementsByClassName("checkemployee");
    var checkedall = true;
    for(var x = 0; x < classname.length; x++){
        checkedall = checkedall * classname[x].checked;
      }
    if(checkedall == true){
      for(var x = 0; x < classname.length; x++){
        var tr = classname[x].parentElement.parentElement.parentElement.parentElement;
        if(classname[x].checked == true){
          classname[x].checked = false;
          tr.style.backgroundColor = "";
          tr.style.fontWeight = "normal";
        }
      }
    }
    else{
      for(var x = 0; x < classname.length; x++){
         var tr = classname[x].parentElement.parentElement.parentElement.parentElement;
          if(classname[x].checked == false){
              classname[x].checked = true;
              tr.style.backgroundColor = "#CECECE";
              tr.style.fontWeight = "bold";
          }
        }
    }
  }//end of if id=all
  else{
    var checkbox = document.getElementById(id).checked;
    var tr = document.getElementById(id).parentElement.parentElement.parentElement.parentElement;
    var checked = [];
    var chklist = document.getElementsByClassName("checkemployee");
    if(checkbox == true){
      tr.style.backgroundColor = "#CECECE";
      tr.style.fontWeight = "bold";
    }
    else{
      tr.style.backgroundColor = "";
      tr.style.fontWeight = "normal";
    }
    for(var i = 0; i < chklist.length; i++){
      if(chklist[i].checked){
        checked.push(chklist[i]);
      }
    }
  }// end of else if = all
}//End of emp check

//Edit Empoyee
function employee(id)
{
  OVERLAYenable();

  var ch = document.getElementById("mnch");
  var cb = document.getElementById("mncb");
  var cf = document.getElementById("mncf");

  var header = newElement(ch, "h6", "", "","Edit Employee Info");

  var chk = document.getElementsByClassName("checkemployee");
  var count = 0;
  for(var x = 0; x < chk.length; x++){
    if(chk[x].checked == true){
	   count++;
    }
  }

  var thischk = document.getElementById(id+"_chk");


      if(id !== undefined){
        var id = document.getElementById(id+"_id").innerText;
        var name = document.getElementById(id+"_name").innerText;
        var log = document.getElementById(id+"_login").innerText;
        var dept = document.getElementById(id+"_dept").innerText;
        var subd = document.getElementById(id+"_subdept").innerText;
        var placeholder = "Update";
        var add = false;
      }
      else{
        var id = "", name = "", log = "", dept = "Select a Department", subd = "", placeholder = "Add";
        var add = true;
      }

  var mainrow, leftcol, rightcol, upper, lower, form, formrow, col, label, input, select, option, br;

  mainrow = newElement(cb, "div", ["row"], ["style=height: 100%;"], "");
    leftcol = newElement(mainrow, "div", ["col","border", "border-dark","rounded", "col"],["style=background-color: lightblue; width: 600px;"], "");
      form = newElement(leftcol, "form", "", ["onsubmit=return addemployeesubmit("+add+")"], "");

        formrow = newElement(form, "div", ["form-row"], [] , "");

          col = newElement(formrow, "div", ["col", "form-group"], [], "");
            label = newElement(col, "label", [], ["for=employee_id"], "Employee ID");
            input = newElement(col, "input", ["form-control"], ["type=text","id=employee_id","required=true","value="+id,"default-value="+id], "");

          col = newElement(formrow, "div", ["col", "form-group"], [], "");
            label = newElement(col, "label", [], ["for=employee_name"], "Employee Name");
            input = newElement(col, "input", ["form-control"], ["type=text","id=employee_name","required=true","value="+name], "");

        formrow = newElement(form, "div", ["form-row"], [] , "");

          col = newElement(formrow, "div", ["col", "form-group"], [], "");
            label = newElement(col, "label", [], ["for=employee_login"], "Login");
            input = newElement(col, "input", ["form-control"], ["type=text","id=employee_login","required=true","value="+log], "");

          col = newElement(formrow, "div", ["col", "form-group"], [], "");
            label = newElement(col, "label", [], ["for=employee_second_login"], "Second Login");
            input = newElement(col, "input", ["form-control"], ["type=text","id=employee_second_login"], "");

        formrow = newElement(form, "div", ["form-row"], [] , "");

          col = newElement(formrow, "div", ["col", "form-group"], [], "");
            label = newElement(col, "label", [], ["for=employee_dept"], "Department");
            select = newElement(col, "select", ["form-control"], ["id=employee_dept","onChange=Subdepartmentlist(\"employee_dept\",\"employee_sub_dept\")"], "");
            Departmentlist("employee_dept");
            option = newElement(select, "option", "", ["value="+dept, "selected=selected", "hidden=true"], dept);

          col = newElement(formrow, "div", ["col", "form-group"], [], "");
            label = newElement(col, "label", [], ["for=employee_sub_dept"], "Sub Department");
            select = newElement(col, "select", ["form-control"], ["id=employee_sub_dept","disabled=true"], "");
            Subdepartmentlist("employee_dept","employee_sub_dept");
            option = newElement(select, "option", "", ["value="+subd, "selected=selected", "hidden=true"], subd);

        br = newElement(form, "br", "", "", "");
        formrow = newElement(form, "div", ["form-row"], [] , "");

          col = newElement(formrow, "div", ["col", "form-group"], [], "");
            input = newElement(col, "button", ["form-control", "btn", "btn-primary"], ["type:submit", "value="+placeholder], placeholder);

    if(add == false){
        br = newElement(form, "br", "", "", "");
        formrow = newElement(form, "div", ["form-row"], [] , "");
          col = newElement(formrow, "div", ["col", "form-group"], [], "");
            input = newElement(col, "button", ["form-control", "btn", "btn-danger"], ["type=button","onClick=deleteemployee(true)"], "Delete");
    }

    br = newElement(leftcol, "br", "", "", "");

    if(count > 1){

      rightcol = newElement(mainrow, "div", ["col", "col-5", "col-sm-5"],[], "");

        upper = newElement(rightcol, "div", ["col","border", "border-dark","rounded"], [], "");
          form = newElement(upper, "form", "", ["onsubmit=return groupupdate()"], "");

            formrow = newElement(form, "div", ["form-row"], [] , "");

              col = newElement(formrow, "div", ["col", "form-group"], [], "");
                label = newElement(col, "label", [], ["for=groupupdate_dept"], "Department");
                select = newElement(col, "select", ["form-control"], ["id=groupupdate_dept","onChange=Subdepartmentlist(\"groupupdate_dept\",\"groupupdate_sub\")"], "");
                Departmentlist("groupupdate_dept");

              col = newElement(formrow, "div", ["col", "form-group"], [], "");
                label = newElement(col, "label", [], ["for=groupupdate_sub"], "Sub Department");
                select = newElement(col, "select", ["form-control"], ["id=groupupdate_sub","disabled=true"], "");

            br = newElement(form, "br", "", "", "");
            formrow = newElement(form, "div", ["form-row"], [] , "");

              col = newElement(formrow, "div", ["col", "form-group"], [], "");
                input = newElement(col, "button", ["form-control", "btn", "btn-primary"], ["type=submit"], "Group Update");

          br = newElement(form, "br", "", "", "");

        br = newElement(rightcol, "div", "w-100", "", "");
        br = newElement(rightcol, "br", "", "", "");

        lower = newElement(rightcol, "div", ["col","border", "border-dark","rounded"], [], "");

          form = newElement(lower, "form", "", ["onsubmit=return deleteemployee(false)"], "");

            formrow = newElement(form, "div", ["form-row"], [] , "");
            label = newElement(formrow, "label", [], ["for=groupupdate_sub"], "Deelete all Selected?");
            input = newElement(formrow, "button", ["form-control", "btn", "btn-danger"], ["type=submit"], "Group Delete");
            br = newElement(form, "br", "", "", "");
            formrow = newElement(form, "div", ["form-row"], [] , "");
            input = newElement(formrow, "button", ["form-control", "btn", "btn-primary"], ["type=button","onClick=OVERLAYdisable()"], "Cancel");
            br = newElement(form, "br", "", "", "");

    }//if close

    br = newElement(cb, "br", "", "", "");


}

function addemployeesubmit(addemployee) {
  var id = document.getElementById("employee_id");
  var name = document.getElementById("employee_name");
  var log1 = document.getElementById("employee_login");
  var log2 = document.getElementById("employee_second_login");
  var depp = document.getElementById("employee_dept");
  var dept = depp.options[depp.selectedIndex].text;
  var subp = document.getElementById("employee_sub_dept");

  var did = id.getAttribute("default-value");
  if(subp.disabled == false){
    var subd = subp.options[subp.selectedIndex].text;
  }
  else{
    var subd = "";
  }

  obj = {add:addemployee, id:id.value, did:did, name:name.value, log1:log1.value, log2:log2.value, dept:dept, subd:subd};
  dbParam = JSON.stringify(obj);

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      if(myObj.success == "success" && addemployee == true){
        $('#datalist').DataTable().row.add([
          "<span id=\""+id.value+"_id\">"+id.value+"</span>",
          "<span id=\""+name.value+"_name\">"+name.value+"</span>",
          "<span id=\""+log1.value+"_login\">"+log1.value+"</span>",
          "<span id=\""+dept+"_dept\">"+dept+"</span>",
          "<span id=\""+subd+"_subdept\">"+subd+"</span>",
          "<button class=\"btn btn-primary\"onClick=\"employee('"+id.value+"')\">Edit</button>",
          "<div class=\"btn-group-toggle\" data-toggle=\"buttons\"><label class=\"btn btn-secondary\"><input class=\"form-check-label checkemployee\" type=\"checkbox\" id=\""+id.value+"_chk\" onchange=\"empcheck('"+id.value+"_chk')\" default-value=\""+id.value+"\">Select</label></div>"
        ]).draw(false);
        ALERTcall("success","Added Successfully");
        OVERLAYdisable();
      }//for
      else if (myObj.success == "success" && addemployee == false) {
        var newid = document.getElementById(did+"_id").innerText = id.value;
        var newname = document.getElementById(did+"_name").innerText = name.value;
        var newlog = document.getElementById(did+"_login").innerText = log1.value;
        var newdpept = document.getElementById(did+"_dept").innerText = dept;
        var newsubd = document.getElementById(did+"_subdept").innerText = subd;
        var newchk = document.getElementById(did+"_chk");
        newchk.removeAttribute("onchange");
        newchk.removeAttribute("id");
        newchk.setAttribute("onchange","empcheck('"+did+"_chk')");
        newchk.setAttribute("id",did+"_chk");
        ALERTcall("success","Updated Successfully");
        OVERLAYdisable();
      }
      else{
        ALERTcall("danger","failed");
        OVERLAYdisable();
      }
    }//if
  };//xmlhttp function
  xmlhttp.open("POST", "php/functions/employee/employee.add.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);
}

function deleteemployee(solo) {
  var id = document.getElementById("employee_id");
  var did = id.getAttribute("default-value");
  var idlist = [], addid;
  if(solo == false){
    var chk = document.getElementsByClassName("checkemployee");
    for(var x = 0; x < chk.length; x++){
      if(chk[x].checked == true){
        addid = chk[x].getAttribute("default-value");
        idlist.push({id:addid});
      }
    }
  }
  else if (solo == true) {
    idlist.push({id:did});
  }
  else {
  }


  obj = idlist;
  dbParam = JSON.stringify(obj);
  console.log(obj);

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      if(myObj.success == true){
        var table = $('#datalist').DataTable();
        for (var x = 0; x < idlist.length; x++){
          table.row($("#"+idlist[x]["id"]+"_chk").parents('tr')).remove().draw(false);
        }
        ALERTcall("success","Success");
        console.log(true)
        OVERLAYdisable();
      }
      else{
        ALERTcall("danger", myObj.success);
        console.log(false);
      }
    }//if
  };//xmlhttp function
  xmlhttp.open("POST", "/php/functions/employee/employee.delete.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);

  return false;
}

function groupupdate(){
  var dept = document.getElementById("groupupdate_dept");
  var subd = document.getElementById("groupupdate_sub");
  var idlist = [];
  var department = dept.options[dept.selectedIndex].text;
  if(subd.disabled == false){
    var subdepartment = subd.options[subd.selectedIndex].text;
  }
  else{
    var subdepartment = "";
  }


  var chk = document.getElementsByClassName("checkemployee");
  for(var x = 0; x < chk.length; x++){
    if(chk[x].checked == true){
      addid = chk[x].getAttribute("default-value");
      idlist.push(addid);
    }
  }

  obj = {id:idlist,department:department, subdepertment:subdepartment};
  dbParam = JSON.stringify(obj);
  console.log(obj);

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      if(myObj.success == true){
        var d,s;
        for (var x = 0; x < idlist.length; x++){
          d = document.getElementById(idlist[x]+"_dept");
          d.innerText = department;
          s = document.getElementById(idlist[x]+"_subdept");
          s.innerText = subdepartment;
        }
        ALERTcall("success","Success");
        console.log(true)
        OVERLAYdisable();
      }
      else{
        ALERTcall("danger", myObj.success);
        console.log(false);
      }
    }//if
  };//xmlhttp function
  xmlhttp.open("POST", "php/functions/employee/employee.group.update.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);

  return false;
}

























//Sample
