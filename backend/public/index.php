<?php

// Permitir de qualquer origem
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Define que a origem é permitida
    // Se deseja limitar a uma origem
    // Altere {$_SERVER['HTTP_ORIGIN'] para sua preferencia
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache por 1 dia
}

// Cabeçalhos de controle de acesso são recebidos durante solicitações OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
    // Tambem podem ser solicitações GET, POST, DELETE, OPTIONS
    // Altere conforme necessidade
        header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
//Define que retornos serão em formato JSON
header('Content-Type: application/json');
// Recebe dados somente em formato JSON
header('Accept: application/json');

require_once '../vendor/autoload.php';

// URL é separada e atravez dos indices e atravez das posições é extraido as informações
//  0 = api
//  1 = Modulo (Controller)
//  2 = Ação (Função)
//  3 = ID
//

if (isset($_GET['url'])) {
    //Separa a url por / e transforma em Array
    $url = explode('/', $_GET['url']);
    // Verifica a primeira posição é API
    if ($url[0] === 'api') {
        //Configurada a rota com a segunda posição do array
        $controller = 'App\Controllers\\' . ucfirst($url[1]) . 'Controller';
        $acao = $url[2];
        $id = $url[3] ?? null;
        try {
            //Monta a função com os dados informados a cima
            $response = call_user_func_array(array(new $controller, strtolower($acao)), [$id]);
            // Se não houve erro
            // Monta uma resposta com Status 200
            http_response_code(200);
            //Verifica se o responde é um grupo de valores ou apenas texto
            if (is_array($response)) {
                echo json_encode(array('status' => 'success', 'data' => $response));
            } else {
                echo json_encode(array('status' => 'success', 'message' => $response));
            }
            exit;
        } catch (\Exception $e) {
            // Se houve erro durante a requisição
            // Retorna Status 404            
            http_response_code(404);
            // E um JSON com informações obtidas
            echo json_encode(array('status' => 'error', 'data' => $e->getMessage()), JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
}
