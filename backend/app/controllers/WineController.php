<?php

namespace App\Controllers;

use App\Models\Wine;
use Exception;

class WineController {

    public function search($id) {
        if ($id) {
            return Wine::find($id);
        }
        throw new Exception("Requisição invalida!");
    }

    public function list() {
        return Wine::findAll();
    }

    public function add() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['name']) && isset($data['type']) && isset($data['weight']) && isset($data['price'])) {
            return Wine::insert([
                        'name' => $data['name'],
                        'price' => $data['price'],
                        'type' => $data['type'],
                        'weight' => $data['weight'],
            ]);
        } else {
            throw new Exception("Todos os dados são obrigatorios!");
        }
    }

    public function update($id) {
        if ($id) {
            $data = json_decode(file_get_contents('php://input'), true);
            return Wine::update([
                        'name' => $data['name'],
                        'price' => $data['price'],
                        'type' => $data['type'],
                        'weight' => $data['weight'],
                            ], $id);
        }
        throw new Exception("Requisição invalida!");
    }

    public function delete($id = null) {
        if ($id) {
            return Wine::destroy($id);
        }
        throw new Exception("Codigo não informado!");
    }

}
