<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/todos', 'getTodos');
$app->get('/todos/:id',	'getTodo');
// $app->get('/wines/search/:query', 'findByName');
$app->post('/todos', 'addTodo');
$app->put('/todos/:id', 'updateTodo');
$app->delete('/todos/:id',	'deleteTodo');

$app->run();

//get all the todos
function getTodos() {
	$sql = "select * FROM todo ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$todos = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		//echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($todos);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
//get single todo
function getTodo($id) {
	$sql = "SELECT * FROM todo WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$todo = $stmt->fetchObject();
		$db = null;
		echo json_encode($todo);
	} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

//add a todo
function addTodo() {
	$request = Slim::getInstance()->request();
	$todo = json_decode($request->getBody());
	$sql = "INSERT INTO todo (description, status, ordinal) VALUES (:description, :status, :ordinal)";
	try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("description", $todo->description);
			$stmt->bindParam("status", $todo->status);
			$stmt->bindParam("ordinal", $todo->ordinal);
			$stmt->execute();
			$todo->id = $db->lastInsertId();
			$db = null;
			echo json_encode($todo);
	} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

//update a todo
function updateTodo($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$todo = json_decode($body);
	$sql = "UPDATE todo SET description=:description, status=:status, ordinal=:ordinal WHERE id=:id";
	try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("description", $todo->description);
			$stmt->bindParam("status", $todo->status);
			$stmt->bindParam("ordinal", $todo->ordinal);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
			echo json_encode($todo);
	} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

//delete a todo
function deleteTodo($id) {
	$sql = "DELETE FROM todo WHERE id=:id";
	try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
			echo '{}'; //need to have some response...so empty JSON string
	} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="root";
	$dbname="todo";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>