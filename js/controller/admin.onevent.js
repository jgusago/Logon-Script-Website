//onClick

//COMPLISTtables
function DSHBRDCompList(log_id, dept){

  var checktable = tablecheck("computer list", log_id);
  var a = document.getElementById("ContentCardHead").innerHTML = dept;
  var foot = document.getElementById("ContentCardFoot");
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

      if (this.readyState == 4 && this.status == 200) {

        myObj = JSON.parse(this.responseText);
        for (x in myObj) {
          var hostname = myObj[x].hostname;

          if (myObj[x].date_checked != null){
            var newdate = myObj[x].date_checked.split(",");
            var date = "", seperator = "";

            for(var i = 0; i < newdate.length; i++){
              thisdate = myDate("mmm dd, yyyy", newdate[i]);
              date = date+seperator+thisdate;
              seperator = ", ";
            }//close For loof
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

  label = newElement(form, "strong", [],["for=row"], "System Reference:");
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
    if(this.readyState == 4 && this.status == 200){
      myObj = JSON.parse(this.responseText);//get response
        // for (x in myObj) {
          var date = document.getElementById(hostname+"_date");
          var currdate = date.innerText.split(", ");
          var d = new Date();
          newdate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

          if(currdate.length > 1){
            var currdate = date.innerText.split(", ");
            var lastdate = currdate[0]+", "+currdate[1];
            var thisdate = myDate("mmm dd, yyyy", newdate);
            newdate = thisdate+", "+lastdate;
          }
          else{
            var thisdate = myDate("mmm dd, yyyy", newdate);
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

        // }//folr close
    }//ready state and status close
  };//xmlhttp onreadystatechange close

  xmlhttp.open("POST","php/functions/reports/computer.list.details.update.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);

return false;
}
