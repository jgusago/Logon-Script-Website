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
      //create link
      var value = document.getElementsByClassName(btnclass)[i].getAttribute("data");
      var parentid = document.getElementsByClassName(btnclass)[i].getAttribute("id");
      linkid = idgenerator();
      var linkclasses = ["nav-link", "nav-link-collapse"];
      var linkattrib = ["data-toggle:collapse","href:#"+linkid];
      createLink(link, parent[i], value, linkclasses, linkattrib);

      //create list
      var listclasses = ["sidenav-third-level", "collapse"];
      var listattrib = ["id:"+linkid,"data-parent:#DSHBRDRecords"];
      createList(list, parent[i], "ul", newdata.length, listclasses, listattrib);
      //create Button onClick Function
      //create list value
      var ListLink = [];
      for (var j = 0; j < newdata.length; j++){
        createLink(ListLink, list.li[j], newdata[j], [], ["data:#"+parentid,"onClick:DSHBRDContent('"+newdata[j]+"')"]);
      }
    }

  });

}

/* Buttons */
/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/* OnClick */

function DSHBRDContent(parent){

    var view = document.getElementById("contentview");
    view.innerHTML = "";

    tableid = idgenerator();

    var card = [];
    createCard(card, view, [], []);

    var table = [];
    var classes = ["table","table-bordered"];
    var attributes = ["width:100%","cellspacing:0","id:"+tableid];
    createTable(table, card.body, classes, attributes);


    $.post("php/functions/reports/computer.logs.php", {parent:parent}, function(data){

        data = data.split("#");//split header and data
        datalength = data.length;

        thfdata = data[0].split("|");//split by value
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

/* For User Accounts */

function load_user_accounts(parent){

    var view = document.getElementById("accountmngmtlst");
    view.innerHTML = "";

    tableid = idgenerator();

    var card = {};
    createCard(card, view, [], []);

    var table = {};
    var classes = ["table","table-bordered"];
    var attributes = ["width:100%","cellspacing:0","id:"+tableid];
    createTable(table, card.body, classes, attributes);


    $.post("user_account_fetch.php", {parent:parent}, function(data){

        data = data.split("#");
        datalength = data.length;

        thfdata = data[0].split("|");
        var tbheader = {}, tbfooter = {};
        createTableContent([], table.head, [], [], "th", thfdata);
        createTableContent([], table.foot, [], [], "th", thfdata);

        for (var i = 1; i < datalength;i++){
            newdata = data[i].split("|");
            createTableContent([], table.body, [],[], "td", newdata);

            }
    });
    pagination(tableid);
}
/* End */
//
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
