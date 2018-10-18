/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */
function load(){
    var branchview = document.getElementById("contentview");
    var loading = document.getElementById("processingbar");

    var wdth = 0;

    load_branchviewbtn();

    setInterval(function(){
        if(wdth <= 100){
        loading.style.width = wdth + "%";
        wdth = wdth+1;
        }
        else{
            $("#progressbardiv").hide();
        }
    },10);
}

/* Buttons */

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
            bvbtn.setAttribute("data-parent","#collapseCharts")

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
            bvcul.setAttribute("data-parent","#collapseCharts")

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
            bvclog.setAttribute("data-parent","#collapseCharts")
    
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
            // bvcbtn.setAttribute("onclick","sidenav_click_event()");
            // document.getElementById("dtitle").innerHTML = "Reports";
            bvclist.appendChild(bvbtn);

            bvcbtntxt = document.createTextNode("Computer List");
            bvcbtn.appendChild(bvcbtntxt);

            // Computer Logs
            bvcomlogbtn = document.createElement("a");
            bvcomlogbtn.setAttribute("id","branchcomputerlogsbtn");
            bvcomlogbtn.setAttribute("onclick","DSHBRDCompLogs(\"root\")");
            bvcomlogs.appendChild(bvcomlogbtn);

            bvcomlogsbtntxt = document.createTextNode("Computer Logs");
            bvcomlogbtn.appendChild(bvcomlogsbtntxt);


        }

        for (loop = 0 ; loop < datalength; loop++){
            //branch View
            bvnewli = document.createElement("li");
            bvul.appendChild(bvnewli);

            bva = document.createElement("a");
            bva.setAttribute("onclick","dashboard_click_event(\""+data[loop]+"\")");
            bvnewli.appendChild(bva);

            anode = document.createTextNode(data[loop]);
            bva.appendChild(anode);

            //Branch Computer List
            bvcnewli = document.createElement("li");
            bvcul.appendChild(bvcnewli);

            bvca = document.createElement("a");
            bvca.setAttribute("onclick","dashboard_click_event(\""+data[loop]+"-CL\")");
            bvcnewli.appendChild(bvca);

            anode = document.createTextNode(data[loop]);
            bvca.appendChild(anode);

            //Branch Computer Logs
            bvclogsnewli = document.createElement("li");
            bvclog.appendChild(bvclogsnewli);

            bvcologs = document.createElement("a");
            bvcologs.setAttribute("onclick","DSHBRDCompLogs(\""+data[loop]+"\")");
            bvclogsnewli.appendChild(bvcologs);

            anode = document.createTextNode(data[loop]);
            bvcologs.appendChild(anode);

        }

    });
}

/* Buttons */
/* -------------------------------------------------------------------------- Loads ---------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- Events ---------------------------------------------------------------------------------- */
/* OnClick */

function DSHBRDCompLogs(parent){

    var view = document.getElementById("contentview");
    view.innerHTML = "";
    //Create Card
    var card = {};
    CNTVWcrtcrd(card);
    //Create Table
    var tbl = {};
    var clss = ["table","table-hover","display","pagination"];
    var atrb = ["width:100%","cellspacing:0"];
    CNTVWcrttbl(tbl, clss, atrb);

    view.appendChild(card.card);

    card.body.appendChild(tbl.table);
    

    $.post("php/functions/reports/computer.logs.php", {parent:parent}, function(data){

        data = data.split("#");
        datalength = data.length;

        thfdata = data[0].split("|");
        thflgth = thfdata.length;
        for (var k = 0; k < thflgth; k++){
            th = document.createElement("th");

        }

        for(var l = 1; l < datalength; l++){

        }
        sample = document.createTextNode(data);
        tbl.body.appendChild(sample);

    });
    
}
/* OnClick */

/* Background */

function LNKbrdcmps(data){
    var address = document.getElementById('address');
    address.innerHTML = "";

}
// CONTENT VIEW create card
function CNTVWcrtcrd(card){

    var crd = document.createElement("div");
    crd.classList.add("card");
    
    var crdheader = document.createElement("div");
    crdheader.classList.add("card-header");
    crd.appendChild(crdheader);

    var crdbody = document.createElement("div");
    crdbody.classList.add("card-body");
    crd.appendChild(crdbody);

    crdfooter = document.createElement("div");
    crdfooter.classList.add("card-footer");
    crdfooter.classList.add("small");
    crdfooter.classList.add("text-muted");
    crd.appendChild(crdfooter);

    card.card = crd;
    card.head = crdheader;
    card.body = crdbody;
    card.foot = crdfooter;
}

//CONTENTVIEW Create Table (Array return Value, Classes, Attributes)
function CNTVWcrttbl(tbl, clss, atrb){

    var table = document.createElement("table");
    clsslgth = clss.length;
    for (var i = 0; i < clsslgth; i++){
        table.classList.add(clss[i]);
    }
    atrblgth = atrb.length;
    for (var j = 0; j < atrblgth; j++){
        set = atrb[j].split(":");
        table.setAttribute(set[0],set[1]);
    }

    thead = document.createElement("thead");
    table.appendChild(thead);

    tbody = document.createElement("tbody");
    table.appendChild(tbody);

    tfoot = document.createElement("tfoot");
    table.appendChild(tfoot);

    tbl.table = table;
    tbl.head = thead;
    tbl.body = tbody;
    tbl.foot = tfoot;

}

function CNTVWcrttbltr(data){
    
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