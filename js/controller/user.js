function load(){
    
    DSHBRDNavBarBtnsSub();
    SESSIONConfirm();
}

/* Buttons */

function DSHBRDNavBarBtnsSub(){
  /* Get All Elements with generatebutton Class */
  var btnclass = "generatebutton";
  parent = document.getElementsByClassName(btnclass);

  $.post("php/functions/load/department_fetch.php",{branch:"root"},function(data){

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

    switch (linkdata) {
      case "DSHBRDRecordsComplist":
        path = "php/functions/reports/computer.list.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);

      break;
      case "DSHBRDRecordsComplogs":
        path = "php/functions/reports/computer.logs.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDDepartmentCompList":
        path = "php/functions/load/comp_list_fetch.php";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      case "DSHBRDBranchView":
        path = "";
        DSHBRDContentTbls(parent, path, table.head, table.foot, table.body, tableid, linkid);
      break;
      default:

    }
    
}
function SESSIONConfirm()
{
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

function NAVBARNotification()
{
  getNotification();
  setInterval(function(){
    getNotification();
  }, 30000);
}

function getNotification()
{
  content = document.getElementById("NAVBARNotifContent");
  content.innerHTML = "";
    $.post("php/functions/notification/notification.endtask.count.php",function(data){
      var notif = document.createElement("div");
      data = data.split("`");
      if(data[0] !== '0'){
        for(var i = 0; i < data.length; i++){
          var newdiv = document.createElement("div");
          newdiv.innerHTML = data[i];
          if(i !== 0){
            breaker = document.createElement("div");
            breaker.classList.add("dropdown-divider");
            content.appendChild(breaker);
          }
          content.appendChild(newdiv);
        }
      }
      else{
        var newdiv = document.createElement("div");
        newdiv.innerHTML = data[1];
        content.appendChild(newdiv);
      }
    
    });
}


