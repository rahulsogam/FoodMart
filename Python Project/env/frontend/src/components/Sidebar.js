import React,{useState} from 'react'
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    
  const[style,setStyle]= useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const changeStyle= () =>{
        if(style=='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'){
          setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled')
        }else{
           setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion')
        }
      }
  return (
    <div>
        {/* <!-- Sidebar --> */}
        <ul class={style} id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href='#' >
                {/* <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div> */}
                <div class="sidebar-brand-text mx-3">FoodMart</div>
                {/* <!-- Sidebar Toggler (Sidebar) --> */}
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
            </div>
            </a>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider my-0"/>

            {/* <!-- Nav Item - Dashboard --> */}
            <li class="nav-item active">
                <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider"/>

            {/* <!-- Heading --> */}
            <div class="sidebar-heading">
                Interface
            </div>

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            {/* <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Components</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Components:</h6>
                        <a class="collapse-item" href="buttons.html">Buttons</a>
                        <a class="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div>
            </li> */}

            {/* <!-- Nav Item - Utilities Collapse Menu --> */}
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span>Inventory</span>
                </a>
                <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Utilities:</h6>
                        <Link to="/prodcuts"><a class="collapse-item" >View Products</a></Link> 
                        <Link to="/Addprodcut"><a class="collapse-item">Add Product</a></Link>
                        {/* <a class="collapse-item" href="utilities-animation.html">Animations</a>
                        <a class="collapse-item" href="utilities-other.html">Other</a> */}
                    </div>
                </div>
            </li>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider"/>

            {/* <!-- Heading --> */}
            {/* <div class="sidebar-heading">
                Addons
            </div> */}

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i class="fas fa-fw fa-folder"></i>
                    <span>Orders</span>
                </a>
                <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                    <Link to="/orders"><a class="collapse-item" >View Orders</a></Link> 
                    </div>
                </div>
            </li>

            {/* <!-- Nav Item - Charts --> */}
            <li class="nav-item">
            <Link to="/Users">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Users</span></a>
            </Link>
            </li>

            {/* <!-- Nav Item - Tables --> */}
            <li class="nav-item">
                {/* <a class="nav-link" href="tables.html">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Tables</span></a> */}
            </li>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider d-none d-md-block"/>

            

            {/* <!-- Sidebar Message --> */}
            <div class="sidebar-card d-none d-lg-flex">
                <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."/>
                <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
            </div>

        </ul>
    </div>
  )
}
