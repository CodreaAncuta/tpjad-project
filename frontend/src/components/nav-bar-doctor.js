import React from 'react'
import logo from '../commons/images/doctorlogo.png';

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

const NavBarDoctor = () => (
    <div>
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/doctor">
                <img src={logo} width={"50"} height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >

                        <DropdownItem>
                            <NavLink href="/doctor/caregivers">Caregivers</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/doctor/patients">Patients</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/doctor/medication">Medication</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/doctor/medication-plan">Medication Plan</NavLink>
                        </DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Navbar>
    </div>
);

export default NavBarDoctor
