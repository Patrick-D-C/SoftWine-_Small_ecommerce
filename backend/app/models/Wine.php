<?php

namespace App\Models;


use App\Core\Database;
use PDO;


class Wine
{

    // private $atribute = [
    //     'id', 'name', 'price', 'type', 'weight'
    // ];


    public static function insert(array $data)
    {
        $conn = new Database();
               
        $result = $conn->executeQuery(
            "INSERT INTO wine (name, price, type, weight) VALUES ( :na, :pr, :ty, :we)",
            array(
                ':na' => $data['name'],
                ':pr' => $data['price'],
                ':ty' => $data['type'],
                ':we' => $data['weight']                
            )
        );
        if ($result->rowCount()) {
            return 'Vinho cadastrado com sucesso.';
        } else {
            throw new \Exception('Falha ao inserir Vinho.');
        }
    }
    
    
    public static function update(array $data, $id)
    {
        $conn = new Database();
               
        $result = $conn->executeQuery(
            "UPDATE wine SET name= :na, price= :pr, type= :ty, weight= :we WHERE id = :id ",
            array(
                ':id' => $id,
                ':na' => $data['name'],
                ':pr' => $data['price'],   
                ':ty' => $data['type'],
                ':we' => $data['weight'],                         
            )
        );
        if ($result->rowCount()) {
            return 'Vinho alterado com sucesso.';
        } else {
            throw new \Exception('Falha ao atualizar Vinho.');
        }
    }
    
    
    public static function destroy($id){
        
        $conn = new Database();
        
        $result = $conn->executeQuery("DELETE FROM wine WHERE id = :id", array(':id' => $id));
        if ($result->rowCount()) {
            return 'Vinho excluido com sucesso.';
        } else {
            throw new \Exception('Registro do vinho não existe.');
        }
    }
    

    /**
     * Este método busca um vinho especifico armazenado no BD pelo ID 
     * 
     * @param    int $id   Identificador único do vinho
     *
     * @return   array
     */
    public static function find(int $id)
    {
        $conn = new Database();
        $result = $conn->executeQuery(
            "SELECT * FROM wine WHERE id = :ID LIMIT 1",
            array(
                ':ID' => $id
            )
        );

        if ($result->rowCount()) {
            return $result->fetch(PDO::FETCH_ASSOC);
        } else {
            throw new \Exception('Registro de vinho não encontrado.');
        }
        
    }

    /**
     * Este método busca todos os vinhos armazenados no BD
     *
     * @return   array
     */
    public static function findAll()
    {
        $conn = new Database();
        $result = $conn->executeQuery("SELECT * FROM wine");

        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
}
