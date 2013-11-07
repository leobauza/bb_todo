	<footer class="site-footer container">
		a footer
	</footer>

	<script data-main="../assets/js/main" src="../assets/js/require/require.js"></script>
	
	<!-- jquery libs -->
	<!-- <script src="../assets/js/libs/jquery/jquery.js"></script>
	<script src="../assets/js/libs/jquery/jquery-migrate.js"></script>
	<script src="../assets/js/libs/jquery/jquery-ui.custom.js"></script> -->

	<!-- BACKBONE -->
	<!-- <script src="../assets/js/libs/underscore/underscore.js"></script>
	<script src="../assets/js/libs/mustache/mustache.js"></script>
	<script src="../assets/js/libs/backbone/backbone.js"></script> -->
	<!-- <script src="../assets/compiledCoffee/app.js"></script> -->
	<!-- <script src="../assets/compiledCoffee/test/test.js"></script> -->

	
	<?php
	$context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
	?>
	<script>
		var bootstrap = {
			todos: <?php echo file_get_contents("http://todo.app/api/todos",false,$context) ;?>
		}
	</script>

	<!-- <script type="text/template" id="todo-tpl"
	><li class="{{ status }}"> 
		<input data-id="{{ id }}" type="checkbox" {{#checkbox}}checked{{/checkbox}}/>
		<strong>id: {{ id }} | order: {{ordinal}}</strong>
		<span>{{description}}</span>
		<a class="btn btn-main" href="/todos/{{id}}">go to {{id}}</a>
		<a class="btn btn-main" href="/form/{{id}}">form for {{id}}</a>
	</li>
	</script>

	<script type="text/template" id="todo-form-tpl"
	><form>
		<label>description</label>
		<textarea name="description" value="{{description}}">{{description}}</textarea>
		<label>status</label>
		<input name="status" type="text" value="{{status}}"></input>
	</form>
	</script> -->

	<!-- <script src="../assets/js/REWRITEINTOCOFEE.js"></script> -->


</body>
</html>
