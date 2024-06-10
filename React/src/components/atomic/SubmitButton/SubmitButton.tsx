import "./SubmitButton.css";

const SubmitButton = ({ isLoading, text }) => {
    return (
        <button type="submit" className={`submit-btn ${isLoading ? 'disabled' : ''}`}>
            {isLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
                text
            )}
        </button>
    );
};

export default SubmitButton;