<?php

namespace App\Core;

use PDO;

class Database extends PDO
{

    private $DB_DRIVE = DBDRIVE;
    private $DB_HOST = DBHOST;
    private $DB_PORT = DBPORT;
    private $DB_NAME = DBNAME;
    private $DB_USER = DBUSER;
    private $DB_PASS = DBPASS;

    private $conn;

    public function __construct()
    {
        // Quando essa classe é instanciada, é atribuido a variável $conn a conexão com o db
        $this->conn = new PDO("$this->DB_DRIVE:host=$this->DB_HOST;dbname=$this->DB_NAME;port=$this->DB_PORT", $this->DB_USER, $this->DB_PASS);
    }



    /**
     * Este método recebe um objeto com a query 'preparada' e atribui as chaves da query
     * seus respectivos valores.
     * @param  PDOStatement  $stmt   Contém a query ja 'preparada'.
     * @param  string        $key    É a mesma chave informada na query.
     * @param  string        $value  Valor de uma determinada chave.
     */
    private function setParameters($stmt, $key, $value)
    {
        $stmt->bindParam($key, $value);
    }


    /**
     * A responsabilidade deste método é percorrer o array com os parâmetros
     * obtendo as chaves e os valores para fornecer tais dados para setParameters().
     * @param  PDOStatement  $stmt         Contém a query ja 'preparada'.
     * @param  array         $parameters   Array associativo contendo chave e valores para fornece a query
     */
    private function createQuery($stmt, $parameters)
    {
        foreach ($parameters as $key => $value) {
            $this->setParameters($stmt, $key, $value);
        }
    }


    /**
     * Este método é responsável por receber a query e os parametros, preparar a query
     * para receber os valores dos parametros informados, chamar o método mountQuery,
     * executar a query e retornar para os métodos tratarem o resultado.
     * @param  string   $query       Instrução SQL que será executada no banco de dados.
     * @param  array    $parameters  Array associativo contendo as chaves informada na query e seus respectivos valores
     *
     * @return PDOStatement
     */
    public function executeQuery(string $query, array $parameters = [])
    {
        $stmt = $this->conn->prepare($query);
        $this->createQuery($stmt, $parameters);
        $stmt->execute();
        return $stmt;
    }
}
