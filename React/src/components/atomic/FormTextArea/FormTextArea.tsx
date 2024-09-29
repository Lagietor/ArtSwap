import "./FormTextArea.css";

const FormTextarea = ({ label, id, register, errors, value = null, placeholder }) => {
    return (
        <div className="input-wrapper">
            <textarea
                className="input-box"
                id={id}
                placeholder={placeholder}
                value={value}
                {...register(id, { required: true })}
            />
            {errors[id] && <span className="text-danger">This field is required</span>}
        </div>
    );
};

export default FormTextarea;