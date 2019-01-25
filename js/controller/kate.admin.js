function DSHBRDAccountsAccMgnt(){
    var checktable = tablecheck("user accounts", "User Accounts");
    var header = document.getElementById("ContentCardHead");
    var foot = document.getElementById("ContentCardFoot");

    if (checktable == false){

    var row = newElement(header, "div", ["row"],"","");
    var text = newElement(row, "div", ["col-md-6","col-sm-6""], "", "User Accounts");
    var btndiv = newElement(row, "div", ["d-flex","d-flex-row-reverse","col-md-6","col-sm-6"], "", "");
    var btnAdd = newElement(btndiv,  "button", ["btn","btn-default"],["data-toggl=modal", "data-target=#AddUser", "href=#AddUser", "id=btnAddUser"],"Add User");


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
