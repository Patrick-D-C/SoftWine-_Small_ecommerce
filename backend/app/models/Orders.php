<?php

namespace App\Models;

use App\Core\Database;
use PDO;

class Orders {

    // Tabela orders
    // Campos: id, price, distance, created_at
    //  Vinculada com order_itens
    //


    public static function insert(array $data) {
        $conn = new Database();

        $result = $conn->executeQuery(
                "INSERT INTO orders (id, price, distance) VALUES ( :id, :pr, :di)",
                array(
                    ':id' => $data['id'],
                    ':pr' => $data['price'],
                    ':di' => $data['distance']
                )
        );
        if ($result->rowCount()) {
            foreach ($data['cart'] as $item) {
                $resultItem = $conn->executeQuery(
                        "INSERT INTO order_item (id_order, id_item, quantity) VALUES ( :idOr, :idIt, :q)",
                        array(
                            ':idOr' => $data['id'],
                            ':idIt' => $item['product']['id'],
                            ':q' => $item['quantity']
                        )
                );
                if (!$resultItem->rowCount()) {
                    throw new \Exception('Falha ao registrar item do pedido');
                }
            }

            return true;
        } else {
            return false;
        }
    }

    public static function destroy($id) {

        $conn = new Database();

        $result = $conn->executeQuery("DELETE FROM orders WHERE id = :id", array(':id' => $id));
        if ($result->rowCount()) {
            return 'Pedido excluido com sucesso.';
        } else {
            throw new \Exception('Pedido não existe.');
        }
    }

    /**
     * Este método busca um vinho especifico armazenado no BD pelo ID 
     * 
     * @param    int $id   Identificador único do vinho
     *
     * @return   array
     */
    public static function find(int $id) {
        $conn = new Database();
        $resultOrders = $conn->executeQuery(
                "SELECT * FROM orders WHERE id = :ID LIMIT 1",
                array(
                    ':ID' => $id
                )
        );

        if ($resultOrders->rowCount()) {
            $order = $resultOrders->fetch(PDO::FETCH_ASSOC);

            $resultItens = $conn->executeQuery(
                    "SELECT w.id AS id_wine,w.name, w.price, w.type, w.weight, oi.quantity FROM orders AS o "
                    . "JOIN order_item AS oi ON oi.id_order = o.id "
                    . "JOIN wine AS w ON w.id = oi.id_item "
                    . "WHERE o.id = :ID "
                    . "GROUP BY id_wine",
                    array(
                        ':ID' => $id
                    )
            );
            $teste = $resultItens->errorInfo();
            if ($resultOrders->rowCount()) {
                $order['itens'] = $resultItens->fetchAll(PDO::FETCH_ASSOC);
                return $order;
            }
        }
        throw new \Exception('Ordem não encontrada.');
    }

    /**
     * Este método busca todos os vinhos armazenados no BD
     *
     * @return   array
     */
    public static function findAll() {
        $conn = new Database();

        $result = $conn->executeQuery("SELECT * FROM orders");

        $listOrders = $result->fetchAll(PDO::FETCH_ASSOC);

        foreach ($listOrders as $order) {
            $resultItens = $conn->executeQuery(
                    "SELECT w.id AS id_wine,w.name, w.price, w.type, w.weight, oi.quantity, FROM orders AS o "
                    . "JOIN order_item AS oi ON oi.id_order = o.id "
                    . "JOIN wine AS w ON w.id = oi.id_item "
                    . "WHERE o.id = :ID "
                    . "GROUP BY id_wine",
                    array(
                        ':ID' => $order['id']
                    )
            );
            $order['itens'] = $resultItens->fetchAll(PDO::FETCH_ASSOC);
        }


        return $listOrders;
    }

}
