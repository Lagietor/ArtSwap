import './FormPasswordInput.css';

const FormPasswordInput = ({ id, register, errors, placeholder, require = true, errorsEnabled = true}) => {
    return (
        <div className="input-wrapper">
            <input
                type="password"
                id={id}
                className="input-box"
                placeholder={placeholder}
                {...register(id, {
                    required: require,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/
                })}
            />
            <span className="underline"></span>
            {errorsEnabled && (
                <> 
                    {errors[id] && errors[id].type === "minLength" && (
                        <span className="text-danger">Password must be at least 6 characters long</span>
                    )}
                    {errors[id] && errors[id].type === "pattern" && (
                        <span className="text-danger">
                            Password must contain at least one number, one uppercase letter, and one special character
                        </span>
                    )}
                </>
            )}
        </div>
    );
};

export default FormPasswordInput;