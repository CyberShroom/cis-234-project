import { Container } from "react-bootstrap";

export default function Custom404() {
  return (
    <Container className="text-center mt-5">
      <h2>404</h2>
      <h1>Oops! Page not found.</h1>
      <p>It looks like this page doesn’t exist.</p>
    </Container>
  );
}