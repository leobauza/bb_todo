	<footer class="site-footer container">
		a footer
	</footer>

	<script data-main="../assets/js/main" src="../assets/js/require/require.js"></script>


	<?php
	$context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
	?>
	<script>
		var bootstrap = {
			//ADJUST THE URL
			todos: <?php echo file_get_contents("http://todo.app/api/todos",false,$context) ;?>,
			categories: <?php echo file_get_contents("http://todo.app/api/categories",false,$context) ;?>
		}
	</script>


</body>
</html>
