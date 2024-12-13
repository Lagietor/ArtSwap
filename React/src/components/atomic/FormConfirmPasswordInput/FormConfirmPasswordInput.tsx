import './FormConfirmPasswordInput.css';

const FormConfirmPasswordInput = ({ id, register, errors, password, placeholder }) => {
    return (
        <div className="input-wrapper">
            <input
                type="password"
                id={id}
                className="input-box"
                placeholder={placeholder}
                {...register(id, {
                    validate: (value) => value === password || "The passwords do not match"
                })}
            />
            <span className="underline"></span>
            {errors[id] && typeof errors[id] === "string" && (
                <span className="text-danger">{errors[id]}</span>
            )}
        </div>
    );
};

export default FormConfirmPasswordInput;