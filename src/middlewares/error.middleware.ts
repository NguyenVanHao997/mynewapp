import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);
  if (err.status && err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err?.message || "Internal server error" });
};

export default errorHandler;
