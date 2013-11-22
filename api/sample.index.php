<?php

require 'Slim/Slim.php';

$app = new Slim();


$app->get('/categories', 'getCats');
$app->get('/categories/:id/todos', 'getRels');
// $app->put('/categories/:category_id/todos/:todo_id', 'updateRels');
// $app->put('/todos/:todo_id/categories/:category_id', 'updateRels');

$app->get('/todos', 'getTodos');
$app->get('/todos/:id','getTodo');
// $app->get('/wines/search/:query', 'findByName');
$app->post('/todos', 'addTodo');
$app->put('/todos/:id', 'updateTodo');
$app->delete('/todos/:id','deleteTodo');

$app->run();

//get all categories
function getCats() {
	$sql = "select * FROM category ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$cats = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		//echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($cats);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

//get relationsships
function getRels($id) {
	$sql = "SELECT todo.id, description, status, todo_order FROM todo, relationship WHERE todo.id = relationship.todo_id AND category_id=:id ORDER BY todo_order";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$todo_ids = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		//echo print_r($todo_ids);
		echo json_encode($todo_ids);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

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
	$sql = "INSERT INTO todo (description, status) VALUES (:description, :status)";
	try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("description", $todo->description);
			$stmt->bindParam("status", $todo->status);
			$stmt->execute();
			$todo->id = $db->lastInsertId();
			$db = null;
			//echo json_encode($todo);
	} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$sql2 = "INSERT INTO relationship (category_id, todo_id, todo_order) VALUES (:category_id, :todo_id, :todo_order)";
	try {
			$db = getConnection();
			$stmt = $db->prepare($sql2);
			$stmt->bindParam("category_id", $todo->category_id);
			$stmt->bindParam("todo_id", $todo->id);
			$stmt->bindParam("todo_order", $todo->todo_order);
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
	$sql = "UPDATE todo SET description=:description, status=:status WHERE id=:id";
	try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("description", $todo->description);
			$stmt->bindParam("status", $todo->status);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
			//echo json_encode($todo);
	} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
	
	$sql2 = "UPDATE relationship SET todo_order=:todo_order WHERE category_id=:category_id AND todo_id=:todo_id";
	try {
			$db = getConnection();
			$stmt = $db->prepare($sql2);
			$stmt->bindParam("todo_order", $todo->todo_order);
			$stmt->bindParam("category_id", $todo->category_id);
			$stmt->bindParam("todo_id", $id);
			$stmt->execute();
			$db = null;
			//echo "got to rels";
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
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="root";
	$dbname="todo";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>