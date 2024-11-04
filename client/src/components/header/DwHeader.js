import React from "react";
import {
    Container,
    Nav,
    Navbar,
} from "react-bootstrap";
import "./DwHeader.scss";
import {useNavigate} from "react-router-dom";

export const DwHeader = (props) => {
    const { navigation, children } = props;
    const navigate = useNavigate();

    const onNavItemSelect = (link) => {
        navigate({pathname: link});
    };

    const navigationItems = () => {
        return navigation.map((item, idx) => {
           return (
               <Nav.Link key={idx} eventKey={item.link}>{item.label}</Nav.Link>
           )
        });
    }

    const getChildren = (type) => {
        if (children && children.props) {
            return children.props.id === type ? children.props.children : [];
        }

        return children ? children.filter(child => child.props.id === type) : []
    }

    return (
        <div className='dw-header'>
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/"> {getChildren('logo')} </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            onSelect={onNavItemSelect}
                            className="me-auto my-2 my-lg-0"
                            navbarScroll
                        >
                            {navigationItems('extras')}
                        </Nav>
                        {getChildren('extras')}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
