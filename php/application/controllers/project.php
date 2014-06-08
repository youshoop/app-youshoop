<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Project extends CI_Controller {

	 
     public function show_projects(){
     	
     	$this->load->helper('url');	
     	$this->load->view('projects');
     	
     }
     
     public function formReady(){
     
     	$this->load->helper('url');
     	$this->load->view('formReady');
     
     }
     
     public function cupCofee(){
     	 
     	$this->load->helper('url');
     	$this->load->view('cup_cofee/index');

     	
     }
     
     public function youshoopblue(){
     	 
     	$this->load->helper('url');
     	$this->load->view('youshoopblue/index');
     
     
     }
     

     
	

}

