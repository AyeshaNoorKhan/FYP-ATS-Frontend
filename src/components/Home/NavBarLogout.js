import React from "react";

export default function NavBarLogout() {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        style={{ backgroundColor: "white" }}
      >
        {/* <Container> */}
        <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
          <Navbar.Brand href="#">
            {" "}
            <img src={Euronetlogo} alt="Euronetlogo" />
          </Navbar.Brand>
        </Link>
        {/* </Container> */}
      </Navbar>
    </div>
  );
}
