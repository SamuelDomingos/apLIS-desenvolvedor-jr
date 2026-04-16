const db = require("../../database/index");

const listarTodos = async () => {
  const [rows] = await db.query(
    "SELECT id, nome, dataNascimento, carteirinha, cpf FROM pacientes ORDER BY id",
  );
  return rows;
};

const criar = async ({ nome, dataNascimento, carteirinha, cpf }) => {
  await db.query(
    "INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)",
    [nome.trim(), dataNascimento || null, carteirinha.trim(), cpf.trim()],
  );
};

const atualizar = async (id, { nome, dataNascimento, carteirinha, cpf }) => {
  const [result] = await db.query(
    'UPDATE pacientes SET nome = ?, dataNascimento = ?, carteirinha = ?, cpf = ? WHERE id = ?',
    [nome.trim(), dataNascimento || null, carteirinha.trim(), cpf.trim(), id]
  );
  return result.affectedRows;
};

const deletar = async (id) => {
  const [result] = await db.query(
    'DELETE FROM pacientes WHERE id = ?',
    [id]
  );
  return result.affectedRows;
};

module.exports = { listarTodos, criar, atualizar, deletar };
