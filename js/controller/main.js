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

    /* ----- Tables ----- */
    //load_activelist
    load_list("active");
    //load inactive list
    load_list("inactive");

    /* ----- Settings ----- */
    //settings_branchview();

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
}
/* Dashboard buttons */
//Load for the Branc View Buttons
function load_branchviewbtn(){

    var parent = "root";

    $.post("php/functions/grph.chrt/treeview/count.tree.view.child.php",{branch:parent},function(data){

        data = data.split("|");
        datalength = data.length;

        bvlist = document.getElementById("branchviewlist");

        if(data[0] != 0){

            bvbtn = document.createElement("a");
            bvbtn.setAttribute("id","branchviewbtn");
            //bvbtn.setAttribute("onclick","bvlistclick()");

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
        }
        else{
            bvbtn = document.createElement("a");
            bvbtn.setAttribute("id","branchviewbtn");
            bvbtn.setAttribute("onclick","dashboard_click_event(\"brancview\")");
            bvlist.appendChild(bvbtn);

            bvbtntxt = document.createTextNode("Branch View");
            bvbtn.appendChild(bvbtntxt);

        }

        for (loop = 0 ; loop < datalength; loop++){

            bvnewli = document.createElement("li");
            bvul.appendChild(bvnewli);

            bva = document.createElement("a");
            //bva.setAttribute("href","#"+data[loop]);
            bva.setAttribute("onclick","dashboard_click_event(\""+data[loop]+"\")");
            bvnewli.appendChild(bva);

            anode = document.createTextNode(data[loop]);
            bva.appendChild(anode);
        }

    });
}

/* Charts */
//Load Branch View
function load_branchview(parent, div, grandparent){

    var rowdiv = document.createElement("div");
    rowdiv.classList.add("row");
    rowdiv.classList.add("row-eq-height");
    rowdiv.classList.add("col-xs-4");
    rowdiv.classList.add("col-lg-12");
    rowdiv.setAttribute("id","branchview")
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
function load_branchbiew_data(list, parent){

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
                tablediv.setAttribute("id","dataTable");
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

                tdtxt = document.createTextNode(tddata[j]);
                td.appendChild(tdtxt);
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

/* Components */

/* Profile and Accounts */

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
        cardbody.classList("card-body");
        card.appendChild(cardbody);
            $.post("php/functions/sttngs/settings.branch.view.php",function(data){

                
            });

        cardfoot = document.createElement("div");
        cardfoot.classList.add("card-footer");
        card.appendChild(cardfoot);

}

/* --------------------------- END of LOADING FUNCTIONS -------------------------- */



/* ------------------------------- EVENT FUNCTIONS ------------------------------- */
// Hide All Div except Clicked DiV
function dashboard_click_event(div){
    thisdiv = document.getElementById(div);
    divclass = document.getElementsByClassName("contentdataview");
    divclassl = divclass.length;
    for(var loop = 0; loop < divclassl; loop ++){
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

    document.getElementById("mncb").innerHTML = "";

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
   
       //th.setAttribute("colspan","\""+datahdrl+"\"");
   
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

}
/* ---------------------------- END of EVENT FUNCTIONS --------------------------- */



/* ----------------------------- BACKGROUND FUNCTIONS ---------------------------- */
// Get Current Server IP
function serverip(){
    var svrip = location.hostname;
    return svrip;
}

/* ------------------------- END of BACKGROUND FUNCTIONS ------------------------- */