export default function Input(props) {
  return (
    <div>
      <input {...props} className="form-control" />
      {props.errorMessage.error && props.errorMessage.touched && (
        <span style={{ color: "red", fontWeight: "bold", fontSize: 14 }}>
          {props.errorMessage.error}
        </span>
      )}
    </div>
  );
}
