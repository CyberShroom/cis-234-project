'use client'
import { Alert } from "react-bootstrap";

export default function Status(props)
{
    return(
        <Alert className="position-fixed bottom-0 start-50 translate-middle-x fade" show={props.status} variant={props.variant}>
            {props.message}
        </Alert>
    );
}