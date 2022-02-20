import React from "react";

function SignUpPage() {
    return (
        <div>            
            <div className="form-login">
                <h3 className="h3 mb-3">Furniture Insight</h3>
                <input className="mb-3 form-control" type="text" placeholder="First Name" />
                <input className="mb-3 form-control" type="text" placeholder="Last Name" />
                <input className="mb-3 form-control" type="email" placeholder="Email" />
                <input className="mb-3 form-control" type="password" placeholder="Password" />
                <button type="button" className="btn btn-outline-secondary">Sign Up</button>
            </div>
        </div>
    )
}
export default SignUpPage;