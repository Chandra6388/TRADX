import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { ListCollapse, Users, BadgeDollarSign, Pyramid, MessageCircleReply, BookUser, Webhook, BadgePlus } from 'lucide-react';

const Sidebar = () => {
    const role = localStorage.getItem("Role");
    const [isActive, setIsActive] = useState(true);
    const [activeItem, setActiveItem] = useState('');
    const sidebarRef = useRef(null);
    const fevicon = localStorage.getItem("fevicon");
    const header_img1 = localStorage.getItem("header_img1");
    const header_img2 = localStorage.getItem("header_img2");
    const logo = localStorage.getItem("logo");
    const pannel_name = localStorage.getItem("pannel_name");

    const setImages = async () => {
        $(".header_img1").attr('src', header_img1);
        $(".header_img2").attr('src', header_img2);
        $(".title_name").text(pannel_name);
        $(".set_Favicon")
        let favicon = $("link[rel='icon']").length
            ? $("link[rel='icon']")
            : $("<link rel='icon' type='image/x-icon' />");
        favicon.attr('href', fevicon && fevicon);
        $('head').append(favicon);
    }
    useEffect(() => {
        setImages();
    }, []);


    const closeSidebarOnSmallScreen = () => {
        if (window.innerWidth <= 991) {
            document.body.classList.remove('sidebar-main');
        }
    };


    useEffect(() => {
        const sidebar = sidebarRef.current;
        const handleAnchorClick = (event) => {
            closeSidebarOnSmallScreen();
        };

        const anchors = sidebar.querySelectorAll('a');
        anchors.forEach((anchor) => {
            anchor.addEventListener('click', handleAnchorClick);
        });

        return () => {
            anchors.forEach((anchor) => {
                anchor.removeEventListener('click', handleAnchorClick);
            });
        };

    }, [isActive]);
    useEffect(() => {
        document.body.classList.toggle('sidebar-main', isActive);
    }, [isActive]);

    const handleClick = () => setIsActive(prevState => !prevState);

    const handleSidebarClick = (event, item) => {

        setActiveItem(item);
    };

    useEffect(() => {
        const sidebar = sidebarRef.current;
        const handleSidebarItemClick = (event) => {
            const li = event.currentTarget;
            const submenu = li.querySelector('.iq-submenu');

            if (submenu) {
                submenu.style.display = li.classList.toggle('menu-open') ? 'block' : 'none';
            }
        };

        const sidebarItems = sidebar?.querySelectorAll('.iq-sidebar-menu li') || [];
        sidebarItems.forEach(item => item.addEventListener('click', handleSidebarItemClick));

        return () => {
            sidebarItems.forEach(item => item.removeEventListener('click', handleSidebarItemClick));
        };
    }, []);


    useEffect(() => {
        const sidebar = sidebarRef.current;

        const handleSidebarItemClick = (event) => {
            const li = event.currentTarget;
            const submenu = li.querySelector('.iq-submenu');

            if (li.classList.contains('menu-open')) {
                if (submenu) {
                    submenu.style.display = 'none';
                }
                li.classList.remove('menu-open');
                const openItems = li.querySelectorAll('.menu-open');
                openItems.forEach((item) => {
                    item.classList.remove('menu-open');
                });
            } else if (submenu) {
                submenu.style.display = 'block';
                li.classList.add('menu-open');
                submenu.classList.add('menu-open');
            }
        };

        const activeItems = sidebar.querySelectorAll('.iq-sidebar-menu .active');
        activeItems.forEach((item) => {
            const submenu = item.querySelector('.iq-submenu');
            if (submenu) {
                item.classList.add('menu-open');
                submenu.classList.add('menu-open');
            }
        });

        const sidebarItems = sidebar.querySelectorAll('.iq-sidebar-menu li');
        sidebarItems.forEach((item) => {
            item.addEventListener('click', handleSidebarItemClick);
        });

        return () => {
            sidebarItems.forEach((item) => {
                item.removeEventListener('click', handleSidebarItemClick);
            });
        };
    }, []);

    return (
        <div className="iq-sidebar">
            <div className="iq-sidebar-logo d-flex justify-content-between">
                <a href="#">
                    <img className="header_img1" alt="Logo" id="header_img1" />
                    <span><img className="header_img2" alt="Logo" id='header_img2' /></span>
                </a>
                <div className="iq-menu-bt-sidebar">
                    <div className="iq-menu-bt align-self-center">
                        <div onClick={handleClick} className={`wrapper-menu ${isActive ? 'open' : ''}`}>
                            <div className="main-circle">
                                <i className="ri-more-fill" />
                            </div>
                            <div className="hover-circle">
                                <i className="ri-more-2-fill" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="sidebar-scrollbar"
                data-scrollbar="true"
                tabIndex={-1}
                style={{ overflow: 'hidden', outline: 'none' }}
            >
                <div className="scroll-content">
                    <nav ref={sidebarRef} className="iq-sidebar-menu">
                        <ul className="iq-menu">
                            {role === 'Admin' ? (
                                <>
                                    <li className={activeItem === 'dashboard' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'dashboard')}>
                                        <Link to="/admin/dashboard" className="iq-waves-effect">
                                            <i className="ri-home-fill" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>

                                    <li className={activeItem === 'strategygroup' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'strategygroup')}>
                                        <Link to="/admin/strategygroup" className="iq-waves-effect">
                                            <i className="la la-sellsy" />
                                            <span>Strategy Group</span>
                                        </Link>
                                    </li>


                                    <li className={activeItem === 'clientservice' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'clientservice')}>
                                        <Link to="/admin/clientservice" className="iq-waves-effect">
                                            <i className="ri-group-fill" />
                                            <span>Client Service</span>
                                        </Link>
                                    </li>
                                    <li className={activeItem === 'allSubadmin' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'allSubadmin')}>
                                        <Link to="/admin/allSubadmin" className="iq-waves-effect">
                                            <i className="ri-group-fill" />
                                            <span>SubAdmin</span>
                                        </Link>
                                    </li>

                                    <li className={activeItem === 'allplan' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'allplan')}>
                                        <Link to="/admin/allplan" className="iq-waves-effect">
                                            <i className={activeItem === 'allplan' ? 'la la-sellsy active-icon' : 'la la-sellsy'} />
                                            <span>Plan</span>
                                        </Link>
                                    </li>

                                    <li className={activeItem === 'allscript' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'allscript')}>
                                        <Link to="/admin/allscript" className="iq-waves-effect">
                                            <i className="ri-home-8-fill" />
                                            <span>Add Script</span>
                                        </Link>
                                    </li>


                                    <li className={activeItem === 'userlogs' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'userlogs')}>
                                        <Link to="/admin/userlogs" className="iq-waves-effect">
                                            <i className="la la-envelope-open" />
                                            <span>User Panel Log</span>
                                        </Link>
                                    </li>
                                    <li className={activeItem === 'servicereport' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'servicereport')}>
                                        <Link to="/admin/servicreport" className="iq-waves-effect">
                                            <i className="la la-cog" />
                                            <span>Service Report</span>
                                        </Link>
                                    </li>

                                    <li className={activeItem === 'tradehistory' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'tradehistory')}>
                                        <Link to="/admin/tradehistory" className="iq-waves-effect">
                                            <i className="las la-history"></i>
                                            <span>Trade History</span>
                                        </Link>
                                    </li>
                                    <li className={activeItem === 'clientactivity' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'clientactivity')}>
                                        <Link to="/admin/clientactivity" className="iq-waves-effect">
                                            <i className="las la-radiation-alt" />
                                            <span>Client Activity</span>
                                        </Link>
                                    </li>
                                    <li className={activeItem === 'clientreport' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'clientreport')}>
                                        <Link to="/admin/clientreport" className="iq-waves-effect">
                                            <i className="la la-map-marker" />
                                            <span>Client Thread Report</span>
                                        </Link>
                                    </li>
                                    <li className={activeItem === 'smtp' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'smtp')}>
                                        <Link to="/admin/smtp" className="iq-waves-effect">
                                            <i className="la la-palette" />
                                            <span>SMTP Details</span>
                                        </Link>
                                    </li>
                                    <li className={activeItem === 'system' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'system')}>
                                        <Link to="/admin/system" className="iq-waves-effect">
                                            <i className="la la-cog" />
                                            <span>System</span>
                                        </Link>
                                    </li>
                                    <li className={activeItem === 'api-create-info' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'api-create-info')}>
                                        <Link to="/admin/api-create-info" className="iq-waves-effect">
                                            <i className="la la-cog" />
                                            <span>ApiCreateInfo</span>
                                        </Link>
                                    </li>
                                </>
                            ) : role === 'Superadmin' ?
                                (
                                    <>
                                        <li className={activeItem === '/superadmin/dashboard' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/superadmin/dashboard')}>
                                            <Link to="/superadmin/dashboard" className="iq-waves-effect">
                                                <i className="ri-home-fill" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>
                                        <li className={activeItem === '/superadmin/create-admin' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/superadmin/create-admin')}>
                                            <Link to='/superadmin/create-admin' className="iq-waves-effect">
                                                <Users />
                                                <span style={{ marginLeft: '8px' }}>Create Admin</span>
                                            </Link>
                                        </li>
                                        <li className={activeItem === '/superadmin/admin-details' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/superadmin/admin-details')}>
                                            <Link to='/superadmin/admin-details' className="iq-waves-effect">
                                                <ListCollapse />
                                                <span style={{ marginLeft: '8px' }}>Admin Details</span>
                                            </Link>
                                        </li>

                                        <li className={activeItem === '/superadmin/amount-details' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/superadmin/amount-details')}>
                                            <Link to='/superadmin/amount-details' className="iq-waves-effect">
                                                <BadgeDollarSign Volleyball />
                                                <span style={{ marginLeft: '8px' }}>Amount Details</span>
                                            </Link>
                                        </li>

                                        <li className={activeItem === '/superadmin/client-thread-report' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/superadmin/client-thread-report')}>
                                            <Link to='/superadmin/client-thread-report' className="iq-waves-effect">
                                                <Pyramid />
                                                <span style={{ marginLeft: '8px' }}>Client Thread Report</span>
                                            </Link>
                                        </li>

                                        <li className={activeItem === '/superadmin/client-trade-response' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/superadmin/client-trade-response')}>
                                            <Link to='/superadmin/client-trade-response' className="iq-waves-effect">
                                                <MessageCircleReply />
                                                <span style={{ marginLeft: '8px' }}>Client Trade Response</span>
                                            </Link>
                                        </li>
                                        <li className={activeItem === '/superadmin/update-client-details' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/superadmin/update-client-details')}>
                                            <Link to='/superadmin/update-client-details' className="iq-waves-effect">
                                                <BookUser />
                                                <span style={{ marginLeft: '8px' }}>Update Client Details</span>
                                            </Link>
                                        </li>
                                        <li className={activeItem === '/superadmin/api-create-info' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/superadmin/api-create-info')}>
                                            <Link to='/superadmin/api-create-info' className="iq-waves-effect">
                                                <Webhook />
                                                <span style={{ marginLeft: '8px' }}>ApiCreateInfo</span>
                                            </Link>
                                        </li>
                                        <li className={activeItem === '/superadmin/New-Update' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/superadmin/New-Update')}>
                                            <Link to='/superadmin/New-Update' className="iq-waves-effect">
                                                <BadgePlus />
                                                <span style={{ marginLeft: '8px' }}>New-Update</span>
                                            </Link>
                                        </li>

                                    </>
                                )
                                : role === 'Subadmin' ?
                                    (
                                        <>
                                            <li className={activeItem === '/subadmin/dashboard' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/subadmin/dashboard')}>
                                                <Link to="/subadmin/dashboard" className="iq-waves-effect">
                                                    <i className="ri-home-fill" />
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === '/subadmin/allclient' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/subadmin/allclient')}>
                                                <Link to='/subadmin/allclient' className="iq-waves-effect">
                                                    <i className="ri-home-fill" />
                                                    <span>All Clients</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === '/subadmin/groups' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/subadmin/groups')}>
                                                <Link to='/subadmin/groups' className="iq-waves-effect">
                                                    <i className="ri-home-fill" />
                                                    <span>Sub Admin Groups</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === '/subadmin/all-script' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/subadmin/all-script')}>
                                                <Link to='/subadmin/all-script' className="iq-waves-effect">
                                                    <i className="ri-home-fill" />
                                                    <span>Add Script</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === '/subadmin/signals' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/subadmin/signals')}>
                                                <Link to='/subadmin/signals' className="iq-waves-effect">
                                                    <i className="ri-home-fill" />
                                                    <span>Signals</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === '/subadmin/trade-history' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/subadmin/trade-history')}>
                                                <Link to='/subadmin/trade-history' className="iq-waves-effect">
                                                    <i className="ri-home-fill" />
                                                    <span>Trade History</span>
                                                </Link>
                                            </li>



                                        </>
                                    )
                                    : (
                                        <>
                                            <li className={activeItem === '/user/dashboard' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, '/user/dashboard')}>
                                                <Link to="/user/dashboard" className="iq-waves-effect">
                                                    <i className="ri-home-fill" />
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            <li>

                                            </li>
                                            <li className={activeItem === 'technical/pattern' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'technical/pattern')}>

                                                <Link to="technical/pattern" className="iq-waves-effect">
                                                    <i className="lab la-joget" />
                                                    <span>Technical Patterns</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === 'lastpattern' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'lastpattern')}>
                                                <Link to="lastpattern" className="iq-waves-effect">
                                                    <i className="lab la-ioxhost" />
                                                    <span>Last Patterns</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === 'allpaln' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'allpaln')}>
                                                <Link to="all/plan" className="iq-waves-effect">
                                                    <i className="lab la-ioxhost" />
                                                    <span>All Plans</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === 'tradereport' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'tradereport')}>
                                                <Link to="tradereport" className="iq-waves-effect">
                                                    <i className="la la-sellsy" />
                                                    <span>Trade Report</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === 'tradehistory' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'tradehistory')}>
                                                <Link to="tradehistory" className="iq-waves-effect">
                                                    <i className="la la-palette" />
                                                    <span>Trade History</span>
                                                </Link>

                                            </li>
                                            <li className={activeItem === 'traderesponse' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'traderesponse')}>
                                                <Link to="traderesponse" className="iq-waves-effect">
                                                    <i className="la la-sellsy" />
                                                    <span>Trade Response</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === 'profitandloss' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'profitandloss')}>
                                                <Link to="profitandloss" className="iq-waves-effect">
                                                    <i className="las la-universal-access" />
                                                    <span>Net P&L</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === 'pannel' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'pannel')}>
                                                <Link to="pannel" className="iq-waves-effect">
                                                    <i className="lab la-ello" />
                                                    <span>Panel Track</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === 'discription' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'discription')}>
                                                <Link to="discription" className="iq-waves-effect">
                                                    <i className="lab la-get-pocket" />
                                                    <span>Description</span>
                                                </Link>
                                            </li>
                                            <li className={activeItem === 'newStrategy' ? 'active' : ''} onClick={(e) => handleSidebarClick(e, 'newStrategy')}>
                                                <Link to="newStrategy" className="iq-waves-effect">
                                                    <i className="lab la-get-pocket" />
                                                    <span>New Strategy</span>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                        </ul>
                    </nav>
                    <div className="p-3" />
                </div>
                <div className="scrollbar-track scrollbar-track-x" style={{ display: 'none' }}>
                    <div
                        className="scrollbar-thumb scrollbar-thumb-x"
                        style={{ width: 80, transform: 'translate3d(0px, 0px, 0px)' }}
                    />
                </div>
                <div className="scrollbar-track scrollbar-track-y" style={{ display: 'block' }}>
                    <div
                        className="scrollbar-thumb scrollbar-thumb-y"
                        style={{
                            height: '84.5734px',
                            transform: 'translate3d(0px, 0px, 0px)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
