import "./FormFileInput.css";

const FormFileInput = ({ label, id, register, errors }) => {
    return (
        <div className="input-wrapper">
            <input
                type="file"
                className="input-box"
                id={id}
                {...register(id, { required: true })}
            />
        <span className="underline"></span>
        {errors[id] && <span className="text-danger">This field is required</span>}
      </div>
    );
  };

export default FormFileInput;