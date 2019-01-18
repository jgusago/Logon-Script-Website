function load(){
    SESSIONConfirm();
    DSHBRDbtnsCompList();
    DSHBRDbtnsCompLogs();
    NAVBARNotification();
    Departmentlist("department");
    Dashboard();
    PieChart();
}

/* Buttons */
function DSHBRDbtnsCompList(){
    complistul = document.getElementById("COMPLISTlist");

    $.post("php/functions/z.revisions/dashboard.complistbuttons.php",function(data){
        var complstbtn = document.getElementById("DSHBRDRecordsComplist");
        complstbtn.innerHTML = data;

      });
}
