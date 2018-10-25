/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */
function load(){
    var branchview = document.getElementById("contentview");
    var loading = document.getElementById("processingbar");

    var wdth = 0;

    DSHBRDNavBarBtns();

}

/* Buttons */

function DSHBRDNavBarBtns(){
  /* Get All Elements with generatebutton Class */
  var btnclass = "generatebutton";
  parent = document.getElementsByClassName(btnclass);

  $.post("php/functions/load/dashboard.buttons.php",{branch:"root"},function(data){

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

/* Buttons */
/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/* OnClick */

function DSHBRDContent(parent, linkid){
    var linkid = linkid;
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
        path = "php/functions/reports/computer.list.php"
      break;
      case "DSHBRDRecordsComplogs":
        path = "php/functions/reports/computer.logs.php";
      break;
      case "DSHBRDRecodesBrnchvw":
        path = "";
      break;
      case "DSHBRDAccountsAccMgnt":
        path = "user_account_fetch.php";
      break;
      default:

    }


    $.post(path, {parent:parent}, function(data){

        data = data.split("#");
        datalength = data.length;

        thfdata = data[0].split("|");
        var tbheader = [], tbfooter = [];
        createTableContent([], table.head, [], [], "th", thfdata);
        createTableContent([], table.foot, [], [], "th", thfdata);

        for (var i = 1; i < datalength;i++){
            newdata = data[i].split("|");
            createTableContent([], table.body, [],[], "td", newdata);

            }
    });
    pagination(tableid);
}
/* OnClick */

/* Background */

function LNKbrdcmps(data){
    var address = document.getElementById('address');
    address.innerHTML = "";

}

//

/* Background */
/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/*
Functions Abbriviations
DSHBRD - dashboard
LNK - link
CNTVW - Contentview

*/
