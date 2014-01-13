

	<script data-main="/assets/js/main" src="/assets/js/require/require.js"></script>


	<?php
	$context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
	?>
	<script>
		var bootstrap = {
			//ADJUST THE URL
			todos: <?php echo file_get_contents("http://todo.app:8888/api/todos",false,$context) ;?>,
			categories: <?php echo file_get_contents("http://todo.app:8888/api/categories",false,$context) ;?>,
			test: {
				id: 1,
				name: "test",
				obj: {
					thing1: "thing1",
					thing2: "thing2"
				}
			}
		}
	</script>


</body>
</html>
