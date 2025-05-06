// src/components/Notification.js
export default function Notification({ type, message }) {
    return (
      <div className={`fixed top-18 right-4 z-50 w-72 ${
        type === "success" ? "bg-green-100 border-green-500 text-green-700" : 
        "bg-red-100 border-red-500 text-red-700"
      } px-4 py-3 rounded border-l-4 shadow-lg`}>
        <p className="font-bold">{type === "success" ? "Success" : "Error"}</p>
        <p>{message}</p>
      </div>
    );
  }