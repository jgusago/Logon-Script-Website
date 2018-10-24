/* ------------------------------ LOADING FUNCTIONS ------------------------------ */
//Default Load
function load(){

    var branchview = document.getElementById("contentview");
    var loading = document.getElementById("processingbar");
    var loadtext = document.getElementById("loadingtext");
    var wdth = 0.5;
    
    /* ----- Dashboards ----- */
    //set Navbar and Hide the Divs
    load_branchviewbtn();

    /* ----- Charts ----- */
    //load Branch View
    load_branchview("root", branchview, "0");
    load_branchcomputerlist("root", branchview, "0","root");
    load_branchcomputerlogs("root", branchview, "0","root");
    // load_useraccount("root", branchview, "0","root");


    /* ----- Tables ----- */
    //load_activelist
    load_list("active");
    //load inactive list
    load_list("inactive");

    /* ----- Settings ----- */
    settings_branchview();

    /* ----- Account Settings ----- */
    accountmanagement();
    // loadtableuseraccount();

    // load_useracct();


    /* ----- Loading ----- */
    setInterval(function(){
        if(wdth <= 100){
        loading.style.width = wdth + "%";
        wdth = wdth+0.5;
        }
        else{
            $("#progressbardiv").hide();
        }
    },10);

    pagination();
}
/* Dashboard buttons */
//Load for the Branc View Buttons
function load_branchviewbtn(){

    var parent = "root";

    $.post("php/functions/grph.chrt/treeview/count.tree.view.child.php",{branch:parent},function(data){

        data = data.split("|");
        datalength = data.length;
        bvclist = document.getElementById("branchcomputerlist");
        bvcomlogs = document.getElementById("branchcomplogs");
        bvlist = document.getElementById("branchviewlist");

        if(data[0] != 0)
        {
            //Branch View List
            bvbtn = document.createElement("a");
            bvbtn.setAttribute("id","branchviewbtn");

            bvbtn.classList.add("nav-link-collapse");
            bvbtn.classList.add("collapdatased");

            bvbtn.setAttribute("data-toggle","collapse");
            bvbtn.setAttribute("href","#root");

            bvlist.appendChild(bvbtn);

                bvbtntxt = document.createTextNode("Branch View");
                bvbtn.appendChild(bvbtntxt);

            bvul = document.createElement("ul");
            bvul.classList.add("sidenav-third-level");
            bvul.classList.add("collapse");
            bvul.setAttribute("id","root");

            bvlist.appendChild(bvul);

            //Branch Computer List
            bvcbtn = document.createElement("a");
            bvcbtn.setAttribute("id","branchcomputerbtn");

            bvcbtn.classList.add("nav-link-collapse");
            bvcbtn.classList.add("collapdatased");

            bvcbtn.setAttribute("data-toggle","collapse");
            bvcbtn.setAttribute("href","#rootII");

            bvclist.appendChild(bvcbtn);

                bvcbtntxt = document.createTextNode("Computer List");
                bvcbtn.appendChild(bvcbtntxt);

            bvcul = document.createElement("ul");
            bvcul.classList.add("sidenav-third-level");
            bvcul.classList.add("collapse");
            bvcul.setAttribute("id","rootII");

            bvclist.appendChild(bvcul);

            //Branch Computer Logs
            bvcomlogbtn = document.createElement("a");
            bvcomlogbtn.setAttribute("id","branchcomputerlogsbtn");

            bvcomlogbtn.classList.add("nav-link-collapse");
            bvcomlogbtn.classList.add("collapdatased");

            bvcomlogbtn.setAttribute("data-toggle","collapse");
            bvcomlogbtn.setAttribute("href","#rootIII");

            bvcomlogs.appendChild(bvcomlogbtn);

                bvcomlogsbtntxt = document.createTextNode("Computer Logs");
                bvcomlogbtn.appendChild(bvcomlogsbtntxt);
            
            bvclog = document.createElement("ul");
            bvclog.classList.add("sidenav-third-level");
            bvclog.classList.add("collapse");
            bvclog.setAttribute("id","rootIII");
    
            bvcomlogs.appendChild(bvclog);

        }
        else
        {
            //Branch View
            bvbtn = document.createElement("a");
            bvbtn.setAttribute("id","branchviewbtn");
            bvbtn.setAttribute("onclick","dashboard_click_event(\"brancview\")");
            bvlist.appendChild(bvbtn);

            bvbtntxt = document.createTextNode("Branch View");
            bvbtn.appendChild(bvbtntxt);

            // Computer List
            bvcbtn = document.createElement("a");
            bvcbtn.setAttribute("id","branchcomputerbtn");
            bvcbtn.setAttribute("onclick","dashboard_click_event(\"branchcomputer\")");
            bvclist.appendChild(bvbtn);

            bvcbtntxt = document.createTextNode("Computer List");
            bvcbtn.appendChild(bvcbtntxt);

            // Computer Logs
            bvcomlogbtn = document.createElement("a");
            bvcomlogbtn.setAttribute("id","branchcomputerlogsbtn");
            bvcomlogbtn.setAttribute("onclick","dashboard_click_event(\"branchcomputerlogs\")");
            bvcomlogs.appendChild(bvcomlogbtn);

            bvcomlogsbtntxt = document.createTextNode("Computer Logs");
            bvcomlogbtn.appendChild(bvcomlogsbtntxt);


        }

        for (loop = 0 ; loop < datalength; loop++){
            //branch View
            bvnewli = document.createElement("li");
            bvul.appendChild(bvnewli);

            bva = document.createElement("a");
            //bva.setAttribute("href","#"+data[loop]);
            bva.setAttribute("onclick","dashboard_click_event(\""+data[loop]+"\")");
            bvnewli.appendChild(bva);

            anode = document.createTextNode(data[loop]);
            bva.appendChild(anode);

            //Branch Computer List
            bvcnewli = document.createElement("li");
            bvcul.appendChild(bvcnewli);

            bvca = document.createElement("a");
            //bva.setAttribute("href","#"+data[loop]);
            bvca.setAttribute("onclick","dashboard_click_event(\""+data[loop]+"-CL\")");
            bvcnewli.appendChild(bvca);

            anode = document.createTextNode(data[loop]);
            bvca.appendChild(anode);

            //Branch Computer Logs
            bvclogsnewli = document.createElement("li");
            bvclog.appendChild(bvclogsnewli);

            bvcologs = document.createElement("a");
            bvcologs.setAttribute("onclick","dashboard_click_event(\""+data[loop]+"-CLG\")");
            bvclogsnewli.appendChild(bvcologs);

            anode = document.createTextNode(data[loop]);
            bvcologs.appendChild(anode);

        }

    });
}

/* Charts */
//Load Branch View
function load_branchview(parent, div, grandparent)
{

    var rowdiv = document.createElement("div");
    rowdiv.classList.add("row");
    rowdiv.classList.add("row-eq-height");
    rowdiv.classList.add("col-xs-4");
    rowdiv.classList.add("col-lg-12");
    rowdiv.setAttribute("id","branchview");
    div.appendChild(rowdiv);
    $.post("php/functions/grph.chrt/treeview/count.tree.view.child.php",{branch:parent},function(data){

        if (data != 0){

        var data = data.split("|");
        var datalength = data.length;
        var loop = 0;
            while(data[loop]){

                load_branchview_content(data[loop], rowdiv, parent);

                loop++;
            }
        }
        //Else do nothing

    });

    $.post("php/functions/grph.chrt/treeview/count.tree.view.content.php",{branch:parent,grandparent:grandparent},function(data){

        if (data != 0){
        data = data.split("|");
        datalength = data.length;

            for (loop = 0 ; loop < datalength; loop++){
                load_branchbiew_data(data[loop], rowdiv);
            }
        }
        else{
            //emptycard();
        }
    });

}


//Branch Computer List
function load_branchcomputerlist(parent, div, grandparent, $parentid)
{
    
    var newdiv  = document.createElement("div");
    newdiv.classList.add("row");
    newdiv.classList.add("row-eq-height");
    newdiv.classList.add("col-xs-4");
    newdiv.classList.add("col-lg-12");
    newdiv.setAttribute("id","branchcomputer-CL");
    div.appendChild(newdiv);

    //Get Data
    $.post("php/functions/grph.chrt/treeview/count.tree.view.child.php",{branch:parent},function(data){

        if (data != 0){

            var newdata = data.split("|");
            var loop = 0;

            while(newdata[loop])
            {
                load_branchcomputerlist_content(newdata[loop],newdiv,parent);
                loop++;
            }
        }
        //Else do nothing

    });

}

//Load Branch View Data List
function load_branchcomputerlist_content(parent, div, grandparent){

    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("mb-3");
    card.setAttribute("id",parent+"-CL");

    if (grandparent == "root"){
        card.setAttribute("hidden","true");
        card.classList.add("contentdataview");
    }
    div.appendChild(card);

        //Create Card Header
        var cardhead = document.createElement("div");
        cardhead.classList.add("card-header");
        card.appendChild(cardhead);

            //Header text Node
            var textnode = document.createTextNode(parent);
            cardhead.appendChild(textnode);

        // Create Card Body
        var cardbody = document.createElement("div");
        cardbody.classList.add("card-body");
        card.appendChild(cardbody);

            load_branchcomputerlist_table(parent,cardbody);

        var cardfooter = document.createElement('div');
        cardfooter.classList.add("card-footer");
        card.appendChild(cardfooter);
}

function load_branchcomputerlist_table(parent, parentdiv)
{
    $.post("php/functions/grph.chrt/complst/complist.php", {parent:parent}, function(data){
        parentdiv.innerHTML = data;
    });

}

//Branch Computer Logs
function load_branchcomputerlogs(parent, div, grandparent, $parentid)
{

    var logsdiv  = document.createElement("div");
    logsdiv.classList.add("row");
    logsdiv.classList.add("row-eq-height");
    logsdiv.classList.add("col-xs-4");
    logsdiv.classList.add("col-lg-12");
    logsdiv.setAttribute("id","branchcomputer-CLG");
    div.appendChild(logsdiv);

    //Get Data
    $.post("php/functions/grph.chrt/treeview/count.tree.view.child.php",{branch:parent},function(data){

        if (data != 0){

            var datalogs = data.split("|");
            var loop = 0;

            while(datalogs[loop])
            {
                load_branchcomputerlogs_content(datalogs[loop],logsdiv,parent);
                loop++;
            }
        }
        //Else do nothing

    });

}

// Load Branch View Data Logs
function load_branchcomputerlogs_content(parent, div, grandparent){

    var cards = document.createElement("div");
    cards.classList.add("card");
    cards.classList.add("mb-3");
    cards.setAttribute("id",parent+"-CLG");

    if (grandparent == "root"){
        cards.setAttribute("hidden","true");
        cards.classList.add("contentdataview");
    }
    div.appendChild(cards);

        //Create Card Header
        var cardheads = document.createElement("div");
        cardheads.classList.add("card-header");
        cards.appendChild(cardheads);

            //Header text Node
            var textnodes = document.createTextNode(parent);
            cardheads.appendChild(textnodes);

        // Create Card Body
        var cardsbody = document.createElement("div");
        cardsbody.classList.add("card-body");
        cards.appendChild(cardsbody);

            load_branchcomputerlogs_table(parent,cardsbody);

        var cardsfooter = document.createElement('div');
        cardsfooter.classList.add("card-footer");
        cards.appendChild(cardsfooter);
}

function load_branchcomputerlogs_table(parent, parentdiv)
{
    $.post("php/functions/grph.chrt/complst/complogs.php", {parent:parent}, function(data){
        parentdiv.innerHTML = data;
    });

}


function load_user_account(parent, div, grandparent, $parentid)
{

    var logsdiv  = document.createElement("div");
    logsdiv.classList.add("row");
    logsdiv.classList.add("row-eq-height");
    logsdiv.classList.add("col-xs-4");
    logsdiv.classList.add("col-lg-12");
    logsdiv.setAttribute("id","branchcomputer-CLU");
    div.appendChild(logsdiv);

    //Get Data
    $.post("php/functions/grph.chrt/treeview/count.tree.view.child.php",{branch:parent},function(data){

        if (data != 0){

            var datalogs = data.split("|");
            var loop = 0;

            while(datalogs[loop])
            {
                load_account_content(datalogs[loop],logsdiv,parent);
                loop++;
            }
        }
        //Else do nothing

    });

}

function load_useraccount_content(parent, div, grandparent){

    var cards = document.createElement("div");
    cards.classList.add("card");
    cards.classList.add("mb-3");
    cards.setAttribute("id",parent+"-CLU");

    if (grandparent == "root"){
        cards.setAttribute("hidden","true");
        cards.classList.add("contentdataview");
    }
    div.appendChild(cards);

        //Create Card Header
        var cardheads = document.createElement("div");
        cardheads.classList.add("card-header");
        cards.appendChild(cardheads);

            //Header text Node
            var textnodes = document.createTextNode(parent);
            cardheads.appendChild(textnodes);

        // Create Card Body
        var cardsbody = document.createElement("div");
        cardsbody.classList.add("card-body");
        cards.appendChild(cardsbody);

            load_useraccount_table(parent,cardsbody);

        var cardsfooter = document.createElement('div');
        cardsfooter.classList.add("card-footer");
        cards.appendChild(cardsfooter);
}

function load_useraccount_table(parent, parentdiv)
{
    $.post("user_account_fetch.php", {parent:parent}, function(data){
        parentdiv.innerHTML = data;
    });

}

//Load Monitoring: User Accounts
 function loadtableuseraccount()
{

        document.getElementById("dtitle").innerHTML = "Profile & Accounts";
        document.getElementById("dtitle2").innerHTML = "Account Management";

        var ctnview = document.getElementById("contentview");
        var div = document.createElement("div");
        div.classList.add("panel");

        var div1 = document.createElement("div");
        div1.classList.add("panel");
        div1.classList.add("panel-heading");
        var h3= document.createElement("h3");
        h3.innerHTML = "User Accounts";

        var div2 = document.createElement("div");
        div2.classList.add("panel");
        div2.classList.add("panel-body");
        var divv2 =document.createElement("div");
        divv2.classList.add("table-responsive");
        var tbl = document.createElement("table");
        tbl.classList.add("table");
        tbl.classList.add("table-bordered");
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");


        var th = document.createElement("th")
        th.innerHTML = "No.";
        var th1 = document.createElement("th")
        th1.innerHTML = "ID Number";
        var th2 = document.createElement("th")
        th2.innerHTML = "Name";
        var th3 = document.createElement("th")
        th3.innerHTML = "Department";
        var th4 = document.createElement("th")
        th4.innerHTML = "Position";
        var th5 = document.createElement("th")
        th5.innerHTML = "Role";
        var th6 = document.createElement("th")
        th6.innerHTML = "Status";
        var th7 = document.createElement("th")
        th7.innerHTML = "Option";

        var div3 = document.createElement("div");
        div3.classList.add("panel-footer");
        var btnadd = document.createElement("button");
        btnadd.classList.add("btn");
        btnadd.classList.add("btn-primary");
        btnadd.createTextNode("Add user");

        div3.appendChild(btnadd);

        tr.appendChild(th);
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        tr.appendChild(th7);

        thead.appendChild(tr);
        tbl.appendChild(thead);
        divv2.appendChild(tbl);
        div2.appendChild(divv2);
        div1.appendChild(h3);
        div.appendChild(div1);
        ctnview.appendChild(div);
        div.appendChild(div2);
        div.appendChild(div3);

        div.style.background = "rgba(213, 213, 213, 0.3)";
        div.style.width = "-webkit-fill-available";
        div.style.height = "300px";

        h3.style.padding = "10px";

        divv2.style.width = "-webkit-fill-available";
        divv2.style.margin = "15px";

        th.style.paddingBottom = "15px";
        th1.style.paddingBottom = "15px";

        // load_user_account();
        // // load_useraccount_content();

        // var branchview = document.getElementById("contentview");
        // var newuseraccdiv = document.createElement("div");
        // newuseraccdiv.classList("panel");
        // branchview.appendChild(newuseraccdiv);

        //         $.post("user_account_fetch.php",function(data)
        //     {
        // });
}

//Load Branch View Content
function load_branchview_content(parent, div, grandparent){

    // Create for Mobile Display
    var mbdiv = document.createElement("div");
    mbdiv.classList.add("card");
    mbdiv.classList.add("mb-3");
    mbdiv.setAttribute("id",parent);

    if (grandparent == "root"){
        mbdiv.setAttribute("hidden","true");
        mbdiv.classList.add("contentdataview");
    }
    div.appendChild(mbdiv);

        // Create Header Div
        var headerdiv = document.createElement("div");
        headerdiv.classList.add("card-header");
        mbdiv.appendChild(headerdiv);

            //Header Node Text
            var headertxt = document.createTextNode(parent);
            headerdiv.appendChild(headertxt);

        // Create Body Div
        var bodydiv = document.createElement("div");
        bodydiv.classList.add("card-body");
        mbdiv.appendChild(bodydiv);

            //loop to getlevel
            load_branchview(parent, bodydiv, grandparent);

        // Footer Div
        var footerdiv = document.createElement("div");
        footerdiv.classList.add("card-footer");
        mbdiv.appendChild(footerdiv);

}

//Load Branch View Data
function load_branchbiew_data(list, parent)
{

    //column = document.createElement("div");
    //parent.appendChild(column);

    card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("bg-primary");
    card.classList.add("bvcard");
    //card.setAttribute("style","margin: 3px; width: 250px;");
    parent.appendChild(card);

        cbody = document.createElement("a");
        cbody.classList.add("card-body");
        cbody.classList.add("text-white");
        cbody.setAttribute("href","javascript:void(0)")
        cbody.setAttribute("onClick","miniwindow_computer_details(\""+ list + "\");")
        //cbody.setAttribute("style","heigth: 100px;");
        card.appendChild(cbody);

        spanl = document.createElement("span");
        spanl.classList.add("float-left");
        cbody.appendChild(spanl);

            link = document.createTextNode(list);
            spanl.appendChild(link);

        spanr = document.createElement("span");
        spanr.classList.add("float-right");
        cbody.appendChild(spanr);

            icon = document.createElement("i");
            icon.classList.add("fa");
            icon.classList.add("fa-angle-right");
            spanr.appendChild(icon);
}




/* Tables */
//Load Table List
function load_list(status){

    var contentview = document.getElementById("contentview");
    var card = document.createElement("div");
    var link = "";
    card.classList.add("card");
    card.classList.add("mb-3");
    card.classList.add("contentdataview");
    if(status == "active"){
    card.setAttribute("id","activelist");            
    }
    else if(status == "inactive"){
        card.setAttribute("id","inactivelist");
    }
    else{

    }

    card.setAttribute("hidden","true");
    contentview.appendChild(card);

        cardhead = document.createElement('div');
        cardhead.classList.add("card-header");
        cardhead.classList.add('row');
        card.appendChild(cardhead);

            hdiv = document.createElement("div");
            hdiv.classList.add("col-md-7");
            cardhead.appendChild(hdiv);

            cardheadi = document.createElement("i");
            cardheadi.classList.add("fa");
            cardheadi.classList.add("fa-table");
            hdiv.appendChild(cardheadi);

            eprtlink = document.createElement("a");

            if(status == "active"){

            cardheadtxt = document.createTextNode("       Active List of Computers With iMonitor");
            hdiv.appendChild(cardheadtxt);
            eprtlink.setAttribute("href", "http://172.16.39.241/php/functions/tbls/activelst/tbls.export.active.php");

            }

            else if (status == "inactive"){

                cardheadtxt = document.createTextNode("       Inactive List of Computers With With the span of one (1) month");
                hdiv.appendChild(cardheadtxt);
                eprtlink.setAttribute("href", "http://172.16.39.241/php/functions/tbls/inactivelst/tbls.export.inactive.php");
                }

            else{

                cardheadtxt = document.createTextNode("       Some Error Has Accured!!");
                hdiv.appendChild(cardheadtxt);
                eprtlink.setAttribute("href", "#");
            }

            ediv = document.createElement("div");
            ediv.classList.add("col-md-5");
            ediv.setAttribute("align","right");
            cardhead.appendChild(ediv);
                ediv.appendChild(eprtlink);

                    icn = document.createElement("i");
                    icn.classList.add("fa");
                    icn.classList.add("fa-download");
                    icn.setAttribute("aria-hidden","true");
                    eprtlink.appendChild(icn);

                    txtnode = document.createTextNode("     Export Table as Excel file");
                    eprtlink.appendChild(txtnode);

        cardbody = document.createElement("div");
        cardbody.classList.add("card-body")
        card.appendChild(cardbody);

            tblrspnsv = document.createElement("div");
            tblrspnsv.classList.add("table-responsive");
            cardbody.appendChild(tblrspnsv);

                tablediv = document.createElement("table");
                tablediv.classList.add("table");
                tablediv.classList.add("table-bordered");
                tablediv.classList.add("display");
                tablediv.setAttribute("width","100%");
                tablediv.setAttribute("cellspacing","0");
                tblrspnsv.appendChild(tablediv);

                    thead = document.createElement("thead");
                    thead.classList.add(status);
                    tablediv.appendChild(thead);

                    tfoot = document.createElement("tfoot");
                    tfoot.classList.add(status);
                    tablediv.appendChild(tfoot);

                    tbody = document.createElement("tbody");
                    tablediv.appendChild(tbody);

                    if(status == "active"){
                        loadtableactive(thead,tfoot,tbody);
                    }
                    else if(status == "inactive"){
                        loadtableinactive(thead,tfoot,tbody);
                    }
                    else{
                        erroraccured(thead,tfoot,tbody);
                    }

        cardfooter = document.createElement("div");
        cardfooter.classList.add("card-footer");
        cardfooter.classList.add("small");
        cardfooter.classList.add("text-muted");
        card.appendChild(cardfooter);
}
//Load Monitoring: Active list
function loadtableactive(athead, atfoot, atdata){

    athrw = document.createElement("tr");
    athead.appendChild(athrw);

    atfrw = document.createElement("tr");
    atfoot.appendChild(atfrw);

    $.post("php/functions/tbls/activelst/tbls.activelst.fetch.php",function(data){

        datarw = data.split("#");
        datarwlgth = datarw.length;
        thdata = datarw[0].split("|");
        thdatalgnth = thdata.length;

        for(var i = 0;i<thdatalgnth;i++){
            th = document.createElement("th");
            athrw.appendChild(th);

            thtxt = document.createTextNode(thdata[i]);
            th.appendChild(thtxt);
        }

        for(var i = 0;i<thdatalgnth;i++){
            th = document.createElement("th");
            atfrw.appendChild(th);

            thtxt = document.createTextNode(thdata[i]);
            th.appendChild(thtxt);
        }
        for(var i = 1; i < datarwlgth; i++){

            tr = document.createElement("tr");
            atdata.appendChild(tr);

            tddata = datarw[i].split("|");
            tddatalgth = tddata.length;

            for(var j = 0; j < tddatalgth; j++){
                td = document.createElement("td");
                tr.appendChild(td);

                tdmd = tddata[j].split("~");
                tdmdl = tdmd.length;

                for (var k = 0; k < tdmdl; k++){

                    tdtxtp = document.createElement("tr");
                    td.appendChild(tdtxtp);
                    tdtxt = document.createTextNode(tdmd[k]);
                    tdtxtp.appendChild(tdtxt);
                }

            }
        }
    });

    
}
//Load Monitoring: Inactivelist
function loadtableinactive(ithead, itfoot, tdata){

    ithrw = document.createElement("tr");
    ithead.appendChild(ithrw);

    itfrw = document.createElement("tr");
    itfoot.appendChild(itfrw);

    $.post("php/functions/tbls/inactivelst/tbls.inactivelst.fetch.php",function(data){ 

        datarw = data.split("#");
        datarwlgth = datarw.length;
        thdata = datarw[0].split("|");
        thdatalgnth = thdata.length;

        for(var i = 0;i<thdatalgnth;i++){
            th = document.createElement("th");
            ithrw.appendChild(th);

            thtxt = document.createTextNode(thdata[i]);
            th.appendChild(thtxt);
        }

        for(var i = 0;i<thdatalgnth;i++){
            th = document.createElement("th");
            itfrw.appendChild(th);

            thtxt = document.createTextNode(thdata[i]);
            th.appendChild(thtxt);
        }
        for(var i = 1; i < datarwlgth; i++){

            tr = document.createElement("tr");
            tdata.appendChild(tr);

            tddata = datarw[i].split("|");
            tddatalgth = tddata.length;

            for(var j = 0; j < tddatalgth; j++){
                td = document.createElement("td");
                tr.appendChild(td);

                tdtxt = document.createTextNode(tddata[j]);
                td.appendChild(tdtxt);
            }
        }
    });

}

/* Profile and Accounts */
// function loadtableuseraccount()
// {

//     document.getElementById("dtitle").innerHTML = "Profile & Accounts";
//     document.getElementById("dtitle2").innerHTML = "Account Management";


//     // newdivv.style.width = "inherit";
//     // newdivv.style.height = "auto";
//     newdivv.style.background = "#c9cac9";
//     // newdivv.style.color = "white";
//     // newdivv.innerHTML = "Hello";
//     // newdivv.style.margin = "margin: initial";
// }


// window.onload = function () 

// {

//     var chart = new CanvasJS.Chart("chartContainer", 
//     {
//         exportEnabled: true,
//         animationEnabled: true,
//         title:
//         {
//             text: "Number of Installed Imonitor Agent in Different Branches"
//         },
//         subtitles: 
//         [{
//             text: "Click Legend to Hide or Unhide Data Series"
//         }], 
//         axisX: 
//         {
//             title: "States"
//         },
//         axisY:
//         {
//             title: "Installed Agent",
//             titleFontColor: "#4F81BC",
//             lineColor: "#4F81BC",
//             labelFontColor: "#4F81BC",
//             tickColor: "#4F81BC"
//         },
//         axisY2: 
//         {
//             title: "Uninstalled Agent",
//             titleFontColor: "#C0504E",
//             lineColor: "#C0504E",
//             labelFontColor: "#C0504E",
//             tickColor: "#C0504E"
//         },
//         toolTip: 
//         {
//             shared: true
//         },
//         legend:
//         {
//             cursor: "pointer",
//             itemclick: toggleDataSeries
//         },
//         data: 
//         [{
//             type: "column",
//             name: "Oil Filter",
//             showInLegend: true,      
//             yValueFormatString: "#,##0.# Units",
//             dataPoints: [
//                 { label: "New Jersey",  y: 19034.5 },
//                 { label: "Texas", y: 20015 },
//                 { label: "Oregon", y: 25342 },
//                 { label: "Montana",  y: 20088 },
//                 { label: "Massachusetts",  y: 28234 }
//         ]},
//         {
//             type: "column",
//             name: "Clutch",
//             axisYType: "secondary",
//             showInLegend: true,
//             yValueFormatString: "#,##0.# Units",
//             dataPoints: [
//                 { label: "New Jersey", y: 210.5 },
//                 { label: "Texas", y: 135 },
//                 { label: "Oregon", y: 425 },
//                 { label: "Montana", y: 130 },
//                 { label: "Massachusetts", y: 528 }
//             ]
//         }]
//     });
//     chart.render();
    
//     function toggleDataSeries(e) {
//         if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//         } else {
//             e.dataSeries.visible = true;
//         }
//         e.chart.render();
//     }
    
//     }




function loadtableuserprofile()
{
    document.getElementById("dtitle").innerHTML = "Profile & Accounts";
    document.getElementById("dtitle2").innerHTML = "Profile Settings";
    document.getElementById("panelid").remove();

    var newdivv  = document.createElement("div");
    newdivv.classList.add("panel");
    newdivv.classList.add("row-eq-height");
    newdivv.classList.add("col-xs-4");
    newdivv.classList.add("col-lg-12");
    newdivv.setAttribute("id", "panelid2");

    newdivv.style.width = "inherit";
    newdivv.style.height = "auto";
    newdivv.style.background = "#c9cac9";
    newdivv.style.color = "white";
    newdivv.innerHTML = "Hello";
    newdivv.style.margin = "margin: initial";

    // var div = document.createElement("div");
    // div.style.width = "100px";
    // div.style.height = "100px";
    // div.style.background = "red";
    // div.style.color = "white";
    // div.innerHTML = "Hello";

    document.getElementById("contentview").appendChild(newdivv);
}

function loadreports()
{
    document.getElementById("dtitle").innerHTML = "Reports";
    // document.getElementById("dtitle2").innerHTML = "Account Management";
}

// document.body.onload = loadtableuseraccount();

// function loadtableuseraccount()
// {
//     var newDiv = document.createElement("div");
//     newDiv.classList("panel");

//     var currentDiv = document.getElementById("contentview");
//     document.body.insertBefore(newDiv, currentDiv);
// }











/* Settings */
//Load Branch View Settings
function settings_branchview(){
    var contentview = document.getElementById("contentview");
    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("mb-3");
    card.classList.add("contentdataview");
    card.setAttribute("id","branchviewsettings");
    card.setAttribute("hidden","true");
    contentview.appendChild(card);

        cardhead = document.createElement("div");
        cardhead.classList.add("card-header");
        card.appendChild(cardhead);
            cardheadtxt = document.createTextNode("Branch View Settings");
            cardhead.appendChild(cardheadtxt);

        cardbody = document.createElement("div");
        cardbody.classList.add("card-body");
        card.appendChild(cardbody);
            $.post("php/functions/sttngs/settings.branch.view.php",function(data){
                
                var newtable = document.createElement("table");
                newtable.classList.add("table");
                newtable.classList.add("table-bordered");
                cardbody.appendChild(newtable);

                data = data.split("||");
                datalength = data.length;

                for(var arraccount = 0; arraccount < datalength; arraccount++){

                    var currentdata = data[arraccount].split(";");
                    if (currentdata[2] == "tr"){
                        var newtr = document.createElement("tr");
                        newtable.appendChild(newtr);

                        var newtd = document.createElement("td");
                        if(currentdata[1] > 1){
                            newtd.setAttribute("rowspan",currentdata[1]);
                        }
                        newtr.appendChild(newtd);
                        var  newdatatext = document.createTextNode(currentdata[0]);
                        newtd.appendChild(newdatatext);

                    }
                    else{
                        var newtd = document.createElement("td");
                        if(currentdata[1] > 1){
                            newtd.setAttribute("rowspan",currentdata[1]);
                        }
                        newtr.appendChild(newtd);
                        var  newdatatext = document.createTextNode(currentdata[0]);
                        newtd.appendChild(newdatatext);
                    }

                }
                
            });

        cardfoot = document.createElement("div");
        cardfoot.classList.add("card-footer");
        card.appendChild(cardfoot);

        var toolbar = document.createElement("div");
        toolbar.classList.add("btn-toolbar");
        toolbar.classList.add("mb-3");
        toolbar.setAttribute("role","toolbar");
        cardfoot.appendChild(toolbar);

        var inputgroup = document.createElement("div");
        inputgroup.classList.add("btn-group");
        inputgroup.classList.add("mr-2");
        toolbar.appendChild(inputgroup);

        var btnadd = document.createElement("input");
        btnadd.setAttribute("type","button");
        btnadd.setAttribute("onclick","addbranch();");
        btnadd.classList.add("btn");
        btnadd.classList.add("btn-primary")
        btnadd.value = "Add Another Branch";
        inputgroup.appendChild(btnadd);

        var inputgroupII = document.createElement("div");
        inputgroupII.classList.add("btn-group");
        inputgroupII.classList.add("mr-2");
        toolbar.appendChild(inputgroupII);

        var btnadd = document.createElement("input");
        btnadd.setAttribute("type","button");
        btnadd.setAttribute("onclick","editbranch();");
        btnadd.classList.add("btn");
        btnadd.classList.add("btn-primary")
        btnadd.value = "Edit a Branch";
        inputgroupII.appendChild(btnadd);

}

function accountmanagement(){

    
}

/* --------------------------- END of LOADING FUNCTIONS -------------------------- */



/* ------------------------------- EVENT FUNCTIONS ------------------------------- */
// Hide All Div except Clicked DiV
function dashboard_click_event(div)
{
    thisdiv = document.getElementById(div);
    divclass = document.getElementsByClassName("contentdataview");
    divclassl = divclass.length;
    for(var loop = 0; loop < divclassl; loop ++)
    {
        rootchilddiv = document.getElementsByClassName("contentdataview")[loop].id;
        childdiv = document.getElementById(rootchilddiv);
        childdiv.setAttribute("hidden","true");
    }
    thisdiv.removeAttribute("hidden","true");
}


// Mini Window Show Computer Details
function miniwindow_computer_details(host){

    document.getElementById("overlay").style.display = "block";
    document.getElementById("loaderdiv").style.display = "block";
    document.getElementById("miniwindow").style.display = "block";
    //get mini window ID;
    var ch = document.getElementById("mnch");
    var cb = document.getElementById("mncb");
    var cf = document.getElementById("mncf");

    //Clear Previous Text
    ch.innerHTML = "";
    cb.innerHTML = "";
    cf.innerHTML = "";

    //Create ch textnode

    var chtn = document.createTextNode("Computer Details: "+host);
    ch.appendChild(chtn);

    //Create Table
    var table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-hover");
    table.classList.add("table-bordered");
    table.classList.add("display");
    cb.appendChild(table);

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    miniwindow_computer_details_data(tbody, host);
}
// Mini Window get Ciomputer Data
function miniwindow_computer_details_data(tbody, host){

    //tree.view.datails.php
    $.post("php/functions/grph.chrt/treeview/tree.view.datails.php",{host:host},function(data){
   
       data = data.split("#");
       var datal = data.length;
       var cftn = "Reference No:";
       var tr = [];
   
       rowl = data[0].split("|");
       rowlength = rowl.length;
   
       var multiArray = new Array(rowlength);
   
       for(ma = 0; ma < datal; ma++){
           multiArray[ma] = data[ma].split("|");
       }
   
       for(i = 0; i < (rowlength-1); i++){
   
           tr[i] = document.createElement("tr");
           tbody.appendChild(tr[i]);
   
           for (j = 0; j < datal; j++){
   
               if(j != 0){
                   td = document.createElement("td");
                   tr[i].appendChild(td);
               }
               else{
                   td = document.createElement("th");
                   td.setAttribute("scope","col")
                   tr[i].appendChild(td);
               }
   
               tdnode = document.createTextNode(multiArray[j][i]);
               td.appendChild(tdnode);
           }
       }
   });
   
   
   document.getElementById("loaderdiv").style.display = "none";
   
}
// Overlay Hide When Background is clicked
function overlay(){

    document.getElementById("overlay").style.display = "none";
    document.getElementById("loaderdiv").style.display = "none";
    document.getElementById("miniwindow").style.display = "none";

        //get mini window ID;
        var ch = document.getElementById("mnch");
        var cb = document.getElementById("mncb");
        var cf = document.getElementById("mncf");
    
        //Clear Previous Text
        ch.innerHTML = "";
        cb.innerHTML = "";
        cf.innerHTML = "";

}

function addbranch(){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("miniwindow").style.display = "block";

        //get mini window ID;
        var ch = document.getElementById("mnch");
        var cb = document.getElementById("mncb");
        var cf = document.getElementById("mncf");
    
        //Clear Previous Text
        ch.innerHTML = "";
        cb.innerHTML = "";
        cf.innerHTML = "";

        var form = document.createElement("form");
        form.setAttribute("onsubmit","return addnewchild()");
        cb.appendChild(form);

        var fg = document.createElement("div");
        fg.classList.add("alert");
        fg.setAttribute("id","addparentalert");
        fg.setAttribute("hidden","true");
        form.appendChild(fg);

        var fgi = document.createElement("div");
        fgi.classList.add("form-group");
        form.appendChild(fgi);


            var labeli = document.createElement("label");
            labeli.setAttribute("for","addparentname");
            fgi.appendChild(labeli);

                labeltxti = document.createTextNode("Select Parent Branch/Department");
                labeli.appendChild(labeltxti);

            var inputi = document.createElement("select");
            inputi.classList.add("form-control");
            inputi.setAttribute("id","addparentname");
            fgi.appendChild(inputi);

                $.post("php/functions/sttngs/settings.branch.view.add.php",function(data){
                    data = data.split("|");
                    var loop = 0;
                    var opt=[], opttxt=[];
                    while(data[loop]){
                        opt[loop] = document.createElement("option");
                        inputi.appendChild(opt[loop]);

                            opttxt[loop] = document.createTextNode(data[loop]);
                            opt[loop].appendChild(opttxt[loop]);
                        loop++;
                    }

                    var newoption = document.createElement("option");
                    inputi.appendChild(newoption);

                        var newoptxt = document.createTextNode("root");
                        newoption.appendChild(newoptxt);

                });

        var fgii = document.createElement("div");
        fgii.classList.add("from-group");
        form.appendChild(fgii);

            var labelii = document.createElement("label");
            labelii.setAttribute("for","addchildname");
            fgii.appendChild(labelii);

            labeltxtii = document.createTextNode("Branch/Department name");
            labelii.appendChild(labeltxtii);

            var inputii = document.createElement("input");
            inputii.classList.add("form-control");
            inputii.setAttribute("id","addchildname");
            inputii.setAttribute("type","text");
            inputii.setAttribute("required",true);
            fgii.appendChild(inputii);

        var fgiii = document.createElement("div");
        fgiii.classList.add("form-group");
        form.appendChild(fgiii);

            var labeliii = document.createElement("label");
            labeliii.setAttribute("for","addchildcondition");
            fgiii.appendChild(labeliii);

            labeltxtiii = document.createTextNode("Add Condition for Computer names (Optional)");
            labeliii.appendChild(labeltxtiii);

            var inputiii = document.createElement("input");
            inputiii.classList.add("form-control");
            inputiii.setAttribute("id","addchildcondition");
            inputiii.setAttribute("type","text");
            fgiii.appendChild(inputiii);

        var btn = document.createElement("button");
        btn.classList.add("btn");
        btn.classList.add("btn-primary");
        btn.classList.add("btn-block");
        form.appendChild(btn);

            var btntxt = document.createTextNode("Add");
            btn.appendChild(btntxt);
}

function editbranch(){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("miniwindow").style.display = "block";
}

function addnewchild(){

    var parent = document.getElementById("addparentname").value;
    var childname = document.getElementById("addchildname").value;
    var condition = document.getElementById("addchildcondition").value;
    var alert = document.getElementById("addparentalert");

    $.post("php/functions/sttngs/settings.branch.view.add.data.php",{parent:parent,childname:childname,condition:condition},function(data){

        if (data == "success"){
            alert.classList.remove("alert-danger");
            alert.innerHTML = "";
            alert.classList.add("alert-success");
            alert.removeAttribute("hidden");

                alertnode = document.createTextNode("Adding Success!!");
                alertnode2 = document.createTextNode("Please wait while the settings is updating");
                alert.appendChild(alertnode);
                alert.appendChild(alertnode2);

                var bcb = document.getElementById("branchcomputerlist");
                var bvb = document.getElementById("branchviewlist");
                var bvs = document.getElementById("branchviewsettings");
                var bcl = document.getElementById("branchcomputer");
                var bvl = document.getElementById("branchview");
                var branchview = document.getElementById("contentview");
                //Empty their content
                bcb.innerHTML = "";
                bvb.innerHTML = "";

                bvs.parentNode.removeChild(bvs);
                bcl.parentNode.removeChild(bcl);
                bvl.parentNode.removeChild(bvl);

                load_branchviewbtn();
                settings_branchview();
                load_branchview("root", branchview, "0");
                load_branchcomputerlist("root", branchview, "0","rootII");
                load_branchcomputerlogs("root", branchview, "0","rootIII");

                setTimeout(function(){
                    dashboard_click_event('branchviewsettings');
                    document.getElementById("overlay").style.display = "none";
                    document.getElementById("miniwindow").style.display = "none";
                },500);
        }
        else{
            alert.classList.remove("alert-success");
            alert.innerHTML = "";
            alert.classList.add("alert-danger");
            alert.removeAttribute("hidden");

                alertnode = document.createTextNode("Something went wrong");
                alertnode2 = document.createTextNode("Please Check if the NAME already existed"+data);
                alert.appendChild(alertnode);
                alert.appendChild(alertnode2);
        }
        return false;
    });

    return false;
}

function myFuction( elem)
{
    var a = document.getElementsByTagName('a');
    for(i=0; i< a.length; i++)
    {
        a[i].classList.remove('active')
    }
    elem.classList.add('active');
}
/* ---------------------------- END of EVENT FUNCTIONS --------------------------- */



/* ----------------------------- BACKGROUND FUNCTIONS ---------------------------- */
// Get Current Server IP
function serverip(){
    var svrip = location.hostname;
    return svrip;
}

function pagination(parent){

    var bodydiv = document.getElementById("scripts");

    var paginationscript = document.createElement("script");
    paginationscript.setAttribute("src","js/controller/main-admin-datatables.min.js");
    bodydiv.appendChild(paginationscript);

    
}


/* 


    <script src="design/datatables/jquery.dataTables.js"></script>
    <script src="design/datatables/dataTables.bootstrap4.js"></script>
------------------------- END of BACKGROUND FUNCTIONS ------------------------- */