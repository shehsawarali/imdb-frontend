import "../assets/css/Button.css";

export default function Button({ label }) {
  return (
    <button data-testid={"button"} className={"button-style"}>
      {label}
    </button>
  );
}
