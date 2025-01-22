import { Link } from "react-router-dom";

export function UserError(){


    return(
        <div className="container-fluid align-items-center justify-content-center">
            <h3>Invalid Credintial Please Try Again</h3><br/>
            <Link to="/user-login" className="btn btn-danger mx-3">Return to login</Link>
            <Link to="/" className="btn btn-warning">Return To Home </Link>
        </div>
    )
}