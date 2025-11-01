import { Router } from "express";
const router = Router();

// 데모용 메모리 DB
const todos = [{ id: 1, text: "첫 번째 할 일", done: false }];

// 핑
router.get("/ping", (_req, res) => {
  res.json({ message: "pong" });
});

// 목록
router.get("/todos", (_req, res) => {
  res.json(todos);
});

// 추가
router.post("/todos", (req, res) => {
  const { text } = req.body ?? {};
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "text(string) 필수" });
  }
  const id = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const todo = { id, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// 완료 토글
router.patch("/todos/:id/done", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: "Not Found" });
  todo.done = !todo.done;
  res.json(todo);
});

export default router;