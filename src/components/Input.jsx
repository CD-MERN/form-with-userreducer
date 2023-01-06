import React, { useReducer } from 'react';

const initialState = {
    firstName: {
        value: '',
        error: ''
    },
    lastName: {
        value: '',
        error: ''
    },
    email: {
        value: '',
        error: ''
    }
};
    
function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.payload
    };
}


const Input = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        let error = '';
        if(type === 'text'){
            error = checkString(value)
        }

        if(!error.length && type === 'email'){
            error = checkEmail(value);
        }

        dispatch({
            type: name,
            payload: {value: value, error: error}
        });
    }

    const checkEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return '';
        }
        return 'Ingresar un correo electronico valido';
    }
    const checkString = (string) => {
        let message = '';
        if(string.length){
            if(string.length < 2 ){
                message = `El campo debe tener al menos 2 caracteres`;
            }
        }
        return message;
    }

    const getClass = (element) => {
        let className = '';
        if(element.value.length){
            if(element.error.length){
                className =  'is-invalid';
            }else{
                className = 'is-valid';
            }
        }
        return className;
    }
    
    return (
        <form className="mb-5">
            <div className="mb-3">
                <label className="form-label">First Name</label>
                <input 
                    type="text" 
                    className={`form-control ${getClass(state.firstName)}`}
                    name="firstName"
                    value={state.firstName.value}
                    onChange={handleChange}
                />
                {state.firstName.error.length > 0 &&
                    <small className='text-danger'>{state.firstName.error}</small>
                }
            </div>
            <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input 
                    type="text" 
                    className={`form-control ${getClass(state.lastName)}`}
                    name="lastName"
                    value={state.lastName.value}
                    onChange={handleChange}
                />
                {state.lastName.error.length > 0 &&
                    <small className='text-danger'>{state.lastName.error}</small>
                }
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                    type="email" 
                    className={`form-control ${getClass(state.email)}`}
                    name="email"
                    value={state.email.value}
                    onChange={handleChange}
                />
                {state.email.error.length > 0 &&
                    <small className='text-danger'>{state.email.error}</small>
                }
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
export default Input;