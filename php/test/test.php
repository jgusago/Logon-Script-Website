<?php
$db = new PDO('mysql:host=127.0.0.1;port=3306;dbname=logonscript', 'root', '');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

/*

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

*/

?>
