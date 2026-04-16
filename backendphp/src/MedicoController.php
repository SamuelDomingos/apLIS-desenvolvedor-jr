<?php
declare(strict_types=1);

class MedicoController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    public function index(): void
    {
        try {
            $stmt    = $this->db->query('SELECT id, nome, CRM, UFCRM FROM medicos ORDER BY id');
            $medicos = $stmt->fetchAll();

            http_response_code(200);
            echo json_encode($medicos, JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error_code' => 'ERR_FETCH_FAILED']);
        }
    }

    public function store(): void
    {
        try {
            $body = json_decode(file_get_contents('php://input'), true);

            $nome  = trim($body['nome']  ?? '');
            $crm   = trim($body['CRM']   ?? '');
            $ufcrm = strtoupper(trim($body['UFCRM'] ?? ''));

            if (empty($nome) || empty($crm) || empty($ufcrm)) {
                http_response_code(422);
                echo json_encode(['error_code' => 'ERR_REQUIRED_FIELDS']);
                return;
            }

            $stmt = $this->db->prepare(
                'INSERT INTO medicos (nome, CRM, UFCRM) VALUES (:nome, :crm, :ufcrm)'
            );
            $stmt->execute([':nome' => $nome, ':crm' => $crm, ':ufcrm' => $ufcrm]);

            http_response_code(201);
            echo json_encode(['message_code' => 'SUCCESS_CREATED'], JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error_code' => 'ERR_CREATE_FAILED']);
        }
    }

    public function update(int $id): void
    {
        try {
            $body = json_decode(file_get_contents('php://input'), true);

            $nome  = trim($body['nome']  ?? '');
            $crm   = trim($body['CRM']   ?? '');
            $ufcrm = strtoupper(trim($body['UFCRM'] ?? ''));

            if (empty($nome) || empty($crm) || empty($ufcrm)) {
                http_response_code(422);
                echo json_encode(['error_code' => 'ERR_REQUIRED_FIELDS']);
                return;
            }

            $stmt = $this->db->prepare(
                'UPDATE medicos SET nome = :nome, CRM = :crm, UFCRM = :ufcrm WHERE id = :id'
            );
            $stmt->execute([':nome' => $nome, ':crm' => $crm, ':ufcrm' => $ufcrm, ':id' => $id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error_code' => 'ERR_NOT_FOUND']);
                return;
            }

            http_response_code(200);
            echo json_encode(['message_code' => 'SUCCESS_UPDATED'], JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error_code' => 'ERR_UPDATE_FAILED']);
        }
    }

    public function destroy(int $id): void
    {
        try {
            $stmt = $this->db->prepare('DELETE FROM medicos WHERE id = :id');
            $stmt->execute([':id' => $id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error_code' => 'ERR_NOT_FOUND']);
                return;
            }

            http_response_code(200);
            echo json_encode(['message_code' => 'SUCCESS_DELETED'], JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error_code' => 'ERR_DELETE_FAILED']);
        }
    }
}
