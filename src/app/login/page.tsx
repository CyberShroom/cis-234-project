'use client'
import { useState } from "react";
import supabase from '../../lib/supabase';
import Status from "../components/Status";
import { Form, Button, Row, Col } from "react-bootstrap";
import Auth from "../components/Auth";

export default function LoginPage() {
    //Login info
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //The message the alert box will display
    const [alertMessage, setAlertMessage] = useState('');
    //Whether the alert box should display
    const [showAlert, setShowAlert] = useState(false);
    //The variant for the alert box to use
    const [alertVariant, setAlertVariant] = useState("error")

    const handleSignup = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) sendAlert(error.message, 'danger');
        else sendAlert('Signup successful! Check your email for confirmation.', 'success');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        sendAlert(error ? error.message : 'Login successful!', error ? 'danger' : 'success');
    };

    const sendAlert = (message, variant) => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return( 
    <main>
        <div className="content">
            <Auth/>
            <Row>
                <Col>
                    <Form onSubmit={handleSignup} className="p-3">
                        <h3>Create Account</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter a password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit">Sign Up</Button>
                    </Form>
                </Col>
                <Col>
                    <Form onSubmit={handleLogin} className="p-3">
                        <h3>Already An Existing User? Login Here</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button type="submit">Login</Button>
                    </Form>
                </Col>
            </Row>
        </div>
        <Status 
            message={alertMessage}
            status={showAlert}
            variant={alertVariant}
        />
    </main>
    );
}