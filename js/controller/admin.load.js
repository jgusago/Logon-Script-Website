function load(){
    SESSIONConfirm();
    DSHBRDbtnsCompList();
    DSHBRDbtnsCompLogs();
    NAVBARNotification();
    Departmentlist("department");
    Dashboard();
    PieChart();
}

/* Buttons Computer List*/
function DSHBRDbtnsCompList(){
    complistul = document.getElementById("COMPLISTlist");

    $.post("php/functions/load/dashboard.complistbuttons.php",function(data){
        var complstbtn = document.getElementById("DSHBRDRecordsComplist");
        complstbtn.innerHTML = data;

      });
}

/* Buttons Computer Details*/
function DSHBRDbtnsCompDetails(){
    complistul = document.getElementById("COMPLISTlist");

    $.post("php/functions/z.revisions/dashboard.complistbuttons.php",function(data){
        var complstbtn = document.getElementById("DSHBRDRecordsComplist");
        complstbtn.innerHTML = data;

      });
}
