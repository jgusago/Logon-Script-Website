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
function DSHBRDbtnsCompLogs(){
    complistul = document.getElementById("COMPLISTlist");

    $.post("php/functions/load/dashboard.complogsbuttons.php",function(data){
        var complstbtn = document.getElementById("DSHBRDRecordsComplogs");
        complstbtn.innerHTML = data;

      });
}
