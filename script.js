<script>
	window.onload=function(){
		var c = document.getElementbyId(minesweeper);
		var canvas = c.getContext('2d');
		setInterval(drawBoard,1000/30); //updates 30 times per second
	}

	function drawBoard(){
		canvas.fillStyle = 'black';
		canvas.fillRect(0,0,c.width, c.height);
	}
</script>