<?php

Class Url{
    var $site_path;
    function __construct($site_path){
        $this->site_path = $this -> removeslash($site_path);
    }
    function __toString(){
        return $this->site_path;
    }
    private function removeslash($string){
        if($string[strlen($string) - 1] == '/')
            $string = rtrim($string, '/');
        return $string;
    }
    function segment($segment){
        $url = str_replace($this->site_path, '', $_SERVER['REQUEST_URI']);
        $url = explode('/',$url);
        if(isset($url[$segment]))
            return $url[$segment];
        else
            return false;
    }
}

?>