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
                myObj[x].remarks,
                myObj[x].agent_version,
                date,
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

  obj = {hostname:hostname};
  dbParam = JSON.stringify(obj);

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){
      myObj = JSON.parse(this.responseText);
      for (x in myObj) {

      }
    }//server request close
  };//XMLHttpRequest close
  xmlhttp.open("POST","php/functions/reports/computer.list.details.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);


}
