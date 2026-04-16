<?php
declare(strict_types=1);

    class Database
    {
        private static ?PDO $instance = null;

        private static function loadEnv(): array
        {
            $possiblePaths = [
                __DIR__ . '/../.env',
                dirname(__DIR__, 2) . '/.env',
            ];

            foreach ($possiblePaths as $path) {
                if (file_exists($path)) {
                    $envs = [];
                    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                    foreach ($lines as $line) {
                        if (strpos(trim($line), '#') === 0) continue;
                        if (strpos($line, '=') !== false) {
                            list($name, $value) = explode('=', $line, 2);
                            $envs[trim($name)] = trim($value);
                        }
                    }
                    return $envs;
                }
            }

            return [];
        }

        public static function getConnection(): PDO
        {
            if (self::$instance === null) {
                $env = self::loadEnv();

                if (empty($env)) {
                    die("ERRO: Arquivo .env não encontrado nos caminhos testados. Verifique se o arquivo existe em backendphp/.env");
                }

                $host = $env['DB_HOST'];
                $name = $env['DB_NAME'];
                $user = $env['DB_USER'];
                $pass = $env['DB_PASS'];

                $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";

                try {
                    self::$instance = new PDO($dsn, $user, $pass, [
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                    ]);
                } catch (PDOException $e) {
                    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
                }
            }

            return self::$instance;
        }
    }
