
import "./FormInput.css";

const FormInput = ({ id, register, errors, type = "text", placeholder, value = null, require = true}) => {
    return (
        <div className="input-wrapper">
            <input
                type={type}
                id={id}
                className="input-box"
                placeholder={placeholder}
                value={value}
                {...register(id, { required: require })}
            />
            <span className="underline"></span>
            {errors[id] && <span className="text-danger">This field is required</span>}
        </div>
    );
};

export default FormInput;