import React from "react"
import {Link} from "react-router-dom"
import { Col, Container, Row, Footer } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

function Footerpc(){
return(
    <Footer className="footer-pc">
        <Container className="text-left">
            <Row>
                <Col md="6">
                    <h5 className="text mb-4 mt-3 font-weight-bold">FPS Builds</h5>
                    <p>FPS Builds is for all pc enthusiasts who love creating new builds and sharing their experience with the rest of pc build fans..</p>
                </Col>
                <hr className="clearfix w-100 d-md-none" />
                <Col md="2">
                    <h5 className="text mb-4 mt-3 font-weight-bold">Navigation</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/" style={{textDecoration: "none"}}>Home</Link></li>
                        <li><Link to="/allbuilds" style={{textDecoration: "none"}}>All Builds</Link></li>
                        <li><Link to="/discussions" style={{textDecoration: "none"}}>Forum</Link></li>
                        <li><Link to="/" style={{textDecoration: "none"}}>Latest News</Link></li>
                        <li><Link to="/" style={{textDecoration: "none"}}>About Us</Link></li>
                    </ul>
                </Col>
                <hr className="clearfix w-100 d-md-none" />
                <Col md="2">
                    <h5 className="text mb-4 mt-3 font-weight-bold">Company</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/" style={{textDecoration: "none"}}>Privacy Policy</Link></li>
                        <li><Link to="/" style={{textDecoration: "none"}}>Terms of Service</Link></li>
                        <li><Link to="/" style={{textDecoration: "none"}}>Affiliate Disclosure</Link></li>
                        <li><Link to="/" style={{textDecoration: "none"}}>Contact</Link></li>
                    </ul>
                </Col>
                <hr className="clearfix w-100 d-md-none"></hr>
                <Col md="2">
                    <h5 className="text mb-4 mt-3 font-weight-bold">Registration</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/register" style={{textDecoration: "none"}}>Sign Up</Link></li>
                        <li><Link to="/signin" style={{textDecoration: "none"}}>Log In</Link></li>
                        <li><Link to="/forgotPassword" style={{textDecoration: "none"}}>Forgot Password</Link></li>
                        {/* <li><a href="#!">Link 4</a></li> */}
                    </ul>
                </Col>
            </Row>
        </Container>
        <div className="text-center">
            <ul className="list-unstyled list-inline">
                <li className="list-inline-item"><a className="btn-floating btn-sm btn-fb mx-1"><i className="fab fa-facebook"> </i></a></li>
                <li className="list-inline-item"><a className="btn-floating btn-sm btn-tw mx-1"><i className="fab fa-twitter"> </i></a></li>
                <li className="list-inline-item"><a className="btn-floating btn-sm btn-gplus mx-1"><i className="fab fa-instagram"> </i></a></li>
            </ul>
        </div>
        <div className="footer-copyright text-center">
            <Container fluid>
                &copy; {(new Date().getFullYear())}<a href="#"> FPS Builds </a>
            </Container>
        </div>
    </Footer>
    )
}
export default Footerpc;