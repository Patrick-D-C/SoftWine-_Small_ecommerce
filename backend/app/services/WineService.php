<?php

namespace App\Services;

use App\Core\Database;
use PDO;


class WineService {


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
