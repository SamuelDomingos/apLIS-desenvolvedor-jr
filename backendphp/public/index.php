<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/MedicoController.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$basePath = '/backendphp/public';
if (strpos($uri, $basePath) === 0) {
    $uri = substr($uri, strlen($basePath));
}
$uri = rtrim($uri, '/');

if (preg_match('#^/api/v1/medicos/([0-9]+)$#', $uri, $matches)) {
    $id = (int)$matches[1];
    $controller = new MedicoController();

    if ($method === 'PUT') {
        $controller->update($id);
    } elseif ($method === 'DELETE') {
        $controller->destroy($id);
    } else {
        http_response_code(405);
        echo json_encode(['error_code' => 'ERR_METHOD_NOT_ALLOWED']);
    }
}

elseif ($uri === '/api/v1/medicos') {
    $controller = new MedicoController();

    if ($method === 'GET') {
        $controller->index();
    } elseif ($method === 'POST') {
        $controller->store();
    } else {
        http_response_code(405);
        echo json_encode(['error_code' => 'ERR_METHOD_NOT_ALLOWED']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error_code' => 'ERR_ROUTE_NOT_FOUND']);
}
