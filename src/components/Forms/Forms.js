import React from 'react'

const forms = (props)=>{
    return <form onSubmit={props.onSubmit}>
        <div className="form-group">
        <label>First Name</label>
        <input 
            type="text" 
            className="form-control"
            name="first_name"
            value={props.first_name}
            onChange={props.onChange}></input>
        </div>

        <div className="form-group">
        <label>Last Name</label>
        <input 
            type="text" 
            className="form-control"
            name="last_name"
            value={props.last_name}
            onChange={props.onChange}></input>
        </div>

        <button 
        type="submit" 
        className="btn btn-primary"
        disabled={props.buttonDisabled}>Submit</button>
    </form>
}

export default forms;