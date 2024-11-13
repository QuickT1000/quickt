import React, { useState } from "react";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown
} from "react-bootstrap";
import "./QuicktHeader.scss";
import { useNavigate } from "react-router-dom";

export const QuicktHeader = (props) => {
    const { navigation, children } = props;
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState(null); // Zustand für das geöffnete Dropdown

    const onNavItemSelect = (link) => {
        navigate({ pathname: link });
    };

    const navigationItems = () => {
        return navigation.map((item, idx) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;

            if (hasSubItems) {
                // Wenn Subnavigation vorhanden ist
                return (
                    <NavDropdown
                        key={idx}
                        title={item.label}
                        id={`nav-dropdown-${idx}`}
                        show={openDropdown === idx}
                        onMouseEnter={() => setOpenDropdown(idx)}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        {item.subItems.map((subItem, subIdx) => (
                            <NavDropdown.Item
                                key={subIdx}
                                onClick={() => onNavItemSelect(subItem.link)}
                            >
                                {subItem.label}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                );
            } else {
                // Nur ein einfaches Nav.Link ohne Subnavigation
                return (
                    <Nav.Link
                        key={idx}
                        onClick={() => onNavItemSelect(item.link)}
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
                    <Navbar.Brand className='quickt__header__brand' href="/"> {getChildren('logo')} </Navbar.Brand>
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
