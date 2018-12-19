<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/import/vendor/php-excel-reader/excel_reader2.php";
require "{$_SERVER['DOCUMENT_ROOT']}/php/functions/import/vendor/SpreadsheetReader.php";

if (isset($_POST["import"]))
{


  $allowedFileType = ['application/vnd.ms-excel','text/xls','text/xlsx','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

  if(in_array($_FILES["file"]["type"],$allowedFileType)){
        $today = date("Ymdhis");
        $targetPath = '\\\\172.16.60.202/uploads/'.$_FILES['file']['name'];
        move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);

        $Reader = new SpreadsheetReader($targetPath);

        $sheetCount = count($Reader->sheets());
        for($i=0;$i<$sheetCount;$i++)
        {

            $Reader->ChangeSheet($i);

            foreach ($Reader as $Row)
            {

                $id = "";
                if(isset($Row[0])) {
                    $id = mysqli_real_escape_string($conn,$Row[0]);
                }

                $name = "";
                if(isset($Row[1])) {
                    $name = mysqli_real_escape_string($conn,$Row[1]);
                }

                $login = "";
                if(isset($Row[2])) {
                    $login = mysqli_real_escape_string($conn,$Row[2]);
                }

                $login2 = "";
                if(isset($Row[3])) {
                    $login2 = mysqli_real_escape_string($conn,$Row[3]);
                }

                $dept = "";
                if(isset($Row[4])) {
                    $dept = mysqli_real_escape_string($conn,$Row[4]);
                }

                $sub = "";
                if(isset($Row[5])) {
                    $sub = mysqli_real_escape_string($conn,$Row[5]);
                }

                if (!empty($id) || !empty($name)) {

                    if{
                      $query2 = "";
                    }
                    $query = "INSERT INTO tbl_employee(emp_id, emp_name, emp_login, emp_login2, dept, sub_dept) VALUES ($id,'$name','$login','$login2','$dept','$sub')";

                    if (mysqli_query($conn, $query)) {
                        $type = "success";
                        $message = "Excel Data Imported into the Database";
                    } else {
                        $type = "error";
                        $message = "Error: " . $query . "" . mysqli_error($conn);
                    }
                }
             }

         }
  }
  else
  {
        $type = "error";
        $message = "Invalid File Type. Upload Excel File.";
  }
}
?>

<!DOCTYPE html>
<html>
<head>
<style>
body {
	font-family: Arial;
	width: 400px;
}

.outer-container {
	background: #F0F0F0;
	border: #e0dfdf 1px solid;
	padding: 40px 20px;
	border-radius: 2px;
}

.btn-submit {
	background: #333;
	border: #1d1d1d 1px solid;
    border-radius: 2px;
	color: #f0f0f0;
	cursor: pointer;
    padding: 5px 20px;
    font-size:0.9em;
}

.tutorial-table {
    margin-top: 40px;
    font-size: 0.8em;
	border-collapse: collapse;
	width: 100%;
}

.tutorial-table th {
    background: #f0f0f0;
    border-bottom: 1px solid #dddddd;
	padding: 8px;
	text-align: left;
}

.tutorial-table td {
    background: #FFF;
	border-bottom: 1px solid #dddddd;
	padding: 8px;
	text-align: left;
}

#response {
    padding: 10px;
    margin-top: 10px;
    border-radius: 2px;
    display:none;
}

.success {
    background: #c7efd9;
    border: #bbe2cd 1px solid;
}

.error {
    background: #fbcfcf;
    border: #f3c6c7 1px solid;
}

div#response.display-block {
    display: block;
}
</style>
</head>

<body>
    <h2>Import Excel File for Employee list</h2>

    <div class="outer-container">
        <form action="" method="post"
            name="frmExcelImport" id="frmExcelImport" enctype="multipart/form-data">
            <div>
                <label>Choose Excel
                    File</label> <input type="file" name="file"
                    id="file" accept=".xls,.xlsx">
                <button type="submit" id="submit" name="import"
                    class="btn-submit">Import</button>

            </div>

        </form>

    </div>
    <div id="response" class="<?php if(!empty($type)) { echo $type . " display-block"; } ?>"><?php if(!empty($message)) { echo $message; } ?></div>


<?php
    $sqlSelect = "SELECT * FROM logonscript.tbl_employee";
    $result = mysqli_query($conn, $sqlSelect);

if (mysqli_num_rows($result) > 0)
{
?>

    <table class='tutorial-table'>
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>logn</th>
                <th>login2</th>
                <th>dept</th>
                <th>dept2</th>

            </tr>
        </thead>
<?php
    while ($row = mysqli_fetch_array($result)) {
?>
        <tbody>
        <tr>
            <td><?php  echo $row['emp_id']; ?></td>
            <td><?php  echo $row['emp_name']; ?></td>
            <td><?php  echo $row['emp_login']; ?></td>
            <td><?php  echo $row['emp_login2']; ?></td>
            <td><?php  echo $row['dept']; ?></td>
            <td><?php  echo $row['sub_dept']; ?></td>
        </tr>
<?php
    }
?>
        </tbody>
    </table>
<?php
}

mysqli_close($conn);
?>

</body>
</html>
