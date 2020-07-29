import React from "react"
import { Col, Container, Row, Footer } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 


function Footerpc(){

    return(


  <Footer className="footer-pc">
                <Container className="text-left">
                    <Row>
                        <Col md="6">
                            <h5 className="text mb-4 mt-3 font-weight-bold">Power Builds</h5>
                            <p>Power Builds is for all pc enthusiasts who love creating new builds and sharing their experience with the rest of pc build fans..</p>
                        </Col>
                        <hr className="clearfix w-100 d-md-none" />
                        <Col md="2">
                            <h5 className="text mb-4 mt-3 font-weight-bold">Navigation</h5>
                            <ul className="list-unstyled">
                                <li><a href="#!">Home</a></li>
                                <li><a href="#!">All Builds</a></li>
                                <li><a href="#!">Forum</a></li>
                                <li><a href="#!">Latest News</a></li>
                                <li><a href="#!">About Us</a></li>
                            </ul>
                        </Col>
                        <hr className="clearfix w-100 d-md-none" />
                        <Col md="2">
                            <h5 className="text mb-4 mt-3 font-weight-bold">Company</h5>
                            <ul className="list-unstyled">
                                <li><a href="#!">Privacy Policy</a></li>
                                <li><a href="#!">Terms of Service</a></li>
                                <li><a href="#!">Affiliate Disclosure</a></li>
                                <li><a href="#!">Contact</a></li>
                            </ul>
                        </Col>
                        <hr className="clearfix w-100 d-md-none"></hr>
                        <Col md="2">
                            <h5 className="text mb-4 mt-3 font-weight-bold">Registration</h5>
                            <ul className="list-unstyled">
                                <li><a href="#!">Sign Up</a></li>
                                <li><a href="#!">Log In</a></li>
                                <li><a href="#!">Forgot Password</a></li>
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
                        &copy; {(new Date().getFullYear())}<a href="#"> Power Builds </a>
                    </Container>
                </div>
            </Footer>
            
    )
}

export default Footerpc;