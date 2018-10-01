<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="300">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- Our Custom CSS -->
    <!-- <link rel="stylesheet" href="viewing.css"> -->
    <link rel="stylesheet" href="style1.css">
    <!-- <link rel="stylesheet" href="styleIndex.css"> -->
</head>
<body style="margin-top:30px;">
    <div class="container1" style="width: 100%; padding-left: 25px; padding-right: 20px;">
        <div class="container2">
            <table class="tbl-view">
                <tr>
                    <td><h1 style="margin-bottom:30px; margin-right:1130px;">ITOMAU033022 | Camille</h1></td>
                    <td><h4 style="margin-right:20px;"><strong>Remarks:</strong></h4></td>
                    <td>
                        <select name="status" id="stats">
                            <option value="Active">Active</option>
                            <option value="Resigned">Resigned</option>
                            <option value="Transferred">Transferred</option>
                            <option value="Old PC name">Old PC name</option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>
        <div class="panel panel-default" style="width:100%;">
            <div class="panel-heading">
                <h4 style="font-size:20px;">Computer logs</h4>
            </div>
            <div class="panel-body" style="margin-left: -90px; padding-right: 115px;">
            <table class="table table-bordered" style="margin-left:90px;">
                <thead>
                    <tr style="padding:50px;">
                        <th style="padding-bottom:15px;">Domain</th>
                        <th style="padding-bottom:15px;">IP Address</th>
                        <th style="padding-bottom:15px;">IP Address Modified</th>
                        <th style="padding-bottom:15px;">Old IP Address</th>
                        <th style="padding-bottom:15px;">Old IP Address Modified</th>
                        <th style="padding-bottom:15px;">iMonitor Status</th>
                        <th style="padding-bottom:15px;">Services Not Found</th>
                        <th style="padding-bottom:15px;">SysSetting File</th>
                        <th style="padding-bottom:15px;">Connection Status</th>
                        <th style="padding-bottom:15px;">Branch</th>
                        <th style="padding-bottom:15px;">Scan Time</th>
                    </tr>
                </thead>
                <tbody id="viewingTable">
                    <tr>
                        <td style="padding-top:15px;">NN</td>
                        <td style="padding-top:15px;">172.16.33.22</td>
                        <td style="padding-top:15px;">Aug-08-2018 02:00</td>
                        <td style="padding-top:15px;"></td>
                        <td style="padding-top:15px;"></td>
                        <td style="padding-top:15px;">Running</td>
                        <td style="padding-top:15px;">Msysys.exe<br>Mskes.exe</td>
                        <td style="padding-top:15px;">Found</td>
                        <td style="padding-top:15px;">Established</td>
                        <td style="padding-top:15px;">Marvin(IT)</td>
                        <td style="padding-top:15px;">Aug-08-2018 02:00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 style="font-size:20px;">Computer Details</h4>
            </div>
            <div class="panel-body" style="margin-left: -90px; padding-right: 115px;">
            <table class="table table-bordered" style="margin-left:90px;">
                <thead>
                    <tr style="padding:50px;">
                        <th style="padding-bottom:15px;">Processor</th>
                        <th style="padding-bottom:15px;">HDD Serial</th>
                        <th style="padding-bottom:15px;">MAC Address</th>
                        <th style="padding-bottom:15px;">Motherboard Manufacturer</th>
                        <th style="padding-bottom:15px;">Motherboard Product</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding:15px;">Intel(R) Core(TM) i5-6400</td>
                        <td style="padding:15px;"></td>
                        <td style="padding:15px;">2C-FD-A1-74-0E-9C</td>
                        <td style="padding:15px;"></td>
                        <td style="padding:15px;"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div>
        <a href="admin_viewing.php"><button class="btn btn-default" style="float:right; width:130px;">Back</button></a>
        <a href=""><button class="btn btn-success" style="float:right; width:130px; margin-right:15px;">Update</button></a>
    </div>
</body>
</html>