const PacienteService = require("./pacientes.service");

const get = async (req, res) => {
  try {
    const pacientes = await PacienteService.listarTodos();
    return res.status(200).json(pacientes);
  } catch (err) {
    console.error("[GET /pacientes]", err);
    return res.status(500).json({ error_code: "ERR_FETCH_FAILED" });
  }
};

const post = async (req, res) => {
  try {
    const { nome, dataNascimento, carteirinha, cpf } = req.body;

    if (!nome || !cpf || !carteirinha) {
      return res.status(422).json({
        error_code: "ERR_REQUIRED_FIELDS",
      });
    }

    await PacienteService.criar({ nome, dataNascimento, carteirinha, cpf });
    return res.status(201).json({ message_code: "SUCCESS_CREATED" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error_code: "ERR_DUP_ENTRY" });
    }
    console.error("[POST /pacientes]", err);
    return res.status(500).json({ error_code: "ERR_CREATE_FAILED" });
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, dataNascimento, carteirinha, cpf } = req.body;

    if (!nome || !cpf || !carteirinha) {
      return res.status(422).json({
        error_code: 'ERR_REQUIRED_FIELDS',
      });
    }

    const affectedRows = await PacienteService.atualizar(id, { nome, dataNascimento, carteirinha, cpf });

    if (affectedRows === 0) {
      return res.status(404).json({ error_code: 'ERR_NOT_FOUND' });
    }

    return res.status(200).json({ message_code: 'SUCCESS_UPDATED' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error_code: 'ERR_DUP_ENTRY' });
    }
    console.error('[PUT /pacientes/:id]', err);
    return res.status(500).json({ error_code: 'ERR_UPDATE_FAILED' });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await PacienteService.deletar(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error_code: 'ERR_NOT_FOUND' });
    }

    return res.status(200).json({ message_code: 'SUCCESS_DELETED' });
  } catch (err) {
    console.error('[DELETE /pacientes/:id]', err);
    return res.status(500).json({ error_code: 'ERR_DELETE_FAILED' });
  }
};

module.exports = { get, post, put, destroy };
