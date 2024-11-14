import React, { useState, useEffect, useRef } from "react";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import "./QuicktHeader.scss";

export const QuicktHeader = (props) => {
    const { navigation, children } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
                setIsHovering(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onNavItemSelect = (link) => {
        navigate({ pathname: link });
        setOpenDropdown(null);
    };

    const isActive = (item) => {
        if (item.link === location.pathname) return true;
        if (item.subItems) {
            return item.subItems.some(subItem => subItem.link === location.pathname);
        }
        return false;
    };

    const handleDropdownEnter = (idx) => {
        setOpenDropdown(idx);
        setIsHovering(true);
    };

    const handleDropdownLeave = () => {
        setTimeout(() => {
            if (!isHovering) {
                setOpenDropdown(null);
            }
        }, 100);
        setIsHovering(false);
    };

    const CustomDropdownTitle = ({ label }) => (
        <span className="d-flex align-items-center">
            {label}
            <IoIosArrowDown className={`ms-1 dropdown-arrow ${openDropdown !== null ? 'rotated' : ''}`} />
        </span>
    );

    const navigationItems = () => {
        return navigation.map((item, idx) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const active = isActive(item);

            if (hasSubItems) {
                return (
                    <NavDropdown
                        key={idx}
                        title={<CustomDropdownTitle label={item.label} />}
                        id={`nav-dropdown-${idx}`}
                        show={openDropdown === idx}
                        onMouseEnter={() => handleDropdownEnter(idx)}
                        onMouseLeave={handleDropdownLeave}
                        className={active ? 'active' : ''}
                        ref={dropdownRef}
                    >
                        {item.subItems.map((subItem, subIdx) => (
                            <NavDropdown.Item
                                key={subIdx}
                                onClick={() => onNavItemSelect(subItem.link)}
                                active={subItem.link === location.pathname}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                {subItem.label}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                );
            } else {
                return (
                    <Nav.Link
                        key={idx}
                        onClick={() => onNavItemSelect(item.link)}
                        className={active ? 'active' : ''}
                    >
                        {item.label}
                    </Nav.Link>
                );
            }
        });
    }

    const getChildren = (type) => {
        if (children && children.props) {
            return children.props.id === type ? children.props.children : [];
        }
        return children ? children.filter(child => child.props.id === type) : []
    }

    return (
        <div className='quickt__header'>
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand className='quickt__header__brand' href="/">
                        {getChildren('logo')}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto" navbarScroll>
                            {navigationItems()}
                        </Nav>
                        {getChildren('extras')}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};