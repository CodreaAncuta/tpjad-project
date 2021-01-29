import React from 'react'
import logo from '../commons/images/patient-logo.png';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'black',
    textDecoration: 'none'
};

const NavBarPatient = () => (
    <div>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/patient">
                <img src={logo} width={"50"} height={"35"}/>
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >

                        <DropdownItem>
                            <NavLink href="/patient/info">Account INFO</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/patient/medication-plans">Medication Plans</NavLink>
                        </DropdownItem>
                        
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Navbar>
    </div>
);

export default NavBarPatient;
