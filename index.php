<?php
    include('class/url.php');
    if($url->segment(1))
        $page = '';
    else
        $page = $url -> segment(1);

    switch($page){
        case '';
            require 'pages/index.html';
            break;

        case 'index':
            require 'pages/index.html';
            break;

        
        //Administrator Pages
        case 'admin_dashboard'
            require 'pages/admin_dashboard.html';
            break;
        case 'admin_viewing'
            require 'pages/admin_viewing.html';
    }
?>