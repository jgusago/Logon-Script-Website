//onClick
//COMPLISTtables
function DSHBRDCompList(log_id){

  var checktable = tablecheck("computer list", log_id);
  var a = document.getElementById("ContentCardHead").innerHTML = "Computer List";
  var foot = document.getElementById("ContentCardFoot");
  if (checktable == false){

    $('#datalist').DataTable( {
      columns: [
            { title: "Hostname" },
            { title: "User" },
            { title: "IP Address" },
            { title: "Service Status" },
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
          $('#datalist').DataTable().row.add([
                myObj[x].hostname,
                myObj[x].user,
                myObj[x].ip_address,
                myObj[x].services,
                myObj[x].remarks,
                myObj[x].agent_version,
                myObj[x].date_checked,
                "<button class=\"btn btn-primary\" onClick=\"complistdetails(\""+myObj[x].hostname+"\")\">Details</button>"
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
