<?php

namespace App\Controllers;

use App\Models\Orders;
use Exception;

class OrdersController {

    
    public function search($id){
        if ($id) {
            return Orders::find($id);
        }
        throw new Exception("Requisição invalida!");
    }
    
    public function list() {        
        return Orders::findAll();
    }

    public function add() {
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data)) {
            throw new Exception("Requisição invalida!");
        }
        $data['id'] = strtotime(date('Y-m-d H:i:s'));
        $retorno = Orders::insert($data);

        if ($retorno) {
            return [
                'id' => $data['id']
            ];
        }
        throw new Exception("Falha ao salvar ordem!");
    }

    public function delete($id = null) {

      if ($id) {
            return Orders::destroy($id);
        }
        throw new Exception("Codigo não informado!");
    }

}
