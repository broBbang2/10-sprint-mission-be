import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "../routes/index.js";

const app = express();

// 공통 미들웨어
app.use(cors());
app.use(express.json()); // JSON 바디 파서
app.use(morgan("dev"));

// 헬스체크
app.get("/health", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// 버전드 API
app.use("/api/v1", routes);

export default app;