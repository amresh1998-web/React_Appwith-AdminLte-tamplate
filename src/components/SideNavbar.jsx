import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiService from '../ApiServices/ApiServices';


function SideNavbar() {
    const [menuData, setMenuData] = useState({ ParentMenuList: [], ChildMenuList: [] });
    const location = useLocation();
    const Rolecode = sessionStorage.getItem('RoleCode');
    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await apiService.get(`/Menu/GetAllMenu?Id=${Rolecode}`);
                setMenuData(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenuData();
    }, [Rolecode]);

    const toggleMenu = (menuId) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [menuId]: !prevState[menuId],
        }));
    };
    const employeeName = sessionStorage.getItem('EmployeeName');

    return (
        <aside className='main-sidebar sidebar-dark-primary elevation-4'>
            <a href='' className='brand-link'>
                <img src='AdminLte/dist/img/saillogo.png' alt='Admin Logo' className='brand-image img-circle elevation-3 bg-light' />
                <span className='brand-text font-weight-light'>{Rolecode == 2 ? 'Admin' : Rolecode == 1 ? 'Admin' : Rolecode == 3 ? 'Employee' : ''} </span>
            </a>
            <div className='sidebar'>
                <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
                    <div className='imeage'>
                        <img src='' alt='User Imeage' className='img-circle elevation-2' />
                    </div>

                </div>
                <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
                    <div className='info'>
                        <a href='#' className=''>{employeeName}</a>
                    </div>
                </div>

                <nav className='mt-2'>

                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className='nav-item menu-open pb-2 '>
                            <Link to='/Dashboard' className='nav-link active'>
                                <i className='nav-icon fas fa-tachometer-alt'></i>
                                <p>DashBoard</p>
                            </Link>
                        </li>
                        {menuData.ParentMenuList.map((parent) => {
                            const isOpen = openMenus[parent.MENUID] || false;
                            return (
                                <li key={parent.MENUID} className={`nav-item ${isOpen ? "menu-open" : ""}`}>
                                    <a href="#" className="nav-link" onClick={() => toggleMenu(parent.MENUID)}>
                                        <i className="nav-icon fas fa-th"></i>
                                        <p>
                                            {parent.MENUNAME}
                                            <i className={`right fas fa-angle-left ${isOpen ? "rotate-90" : ""}`}></i>
                                        </p>
                                    </a>
                                    {isOpen && (
                                        <ul className="nav nav-treeview">
                                            {menuData.ChildMenuList.filter((child) => child.PARENTCODE === parent.MENUID).map((child) => {
                                                const isActive = location.pathname === child.PAGEURL;
                                                return (
                                                    <li key={child.MENUID} className="nav-item">
                                                        <Link to={child.PAGEURL.split("/").pop()} className={`nav-link ${isActive ? "active" : ""}`}>
                                                            <i className="fas fa-th nav-icon"></i>
                                                            <p>{child.MENUNAME}</p>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};
export default SideNavbar;