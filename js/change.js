
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		var stars = [];

		function Star(x, y, size, speed) {
			this.x = x;
			this.y = y;
			this.size = size;
			this.speed = speed;

			this.draw = function() {
				ctx.beginPath();
				ctx.moveTo(this.x, this.y - this.size);
				for (var i = 0; i < 10; i++) {
					var angle = i * 36;
					var radius = i % 2 == 0 ? this.size : this.size / 2;
					var x = this.x + radius * Math.sin(angle * Math.PI / 180);
					var y = this.y - radius * Math.cos(angle * Math.PI / 180);
					ctx.lineTo(x, y);
				}
				ctx.closePath();
				ctx.fillStyle = "rgba(241,144,100,0.6)";
				ctx.fill();
			}

			this.update = function() {
				this.y += this.speed;
				if (this.y > canvas.height + this.size) {
					this.y = -this.size;
					this.x = Math.random() * canvas.width;
				}
			}
		}

		for (var i = 0; i < 100; i++) {
			var x = Math.random() * canvas.width;
			var y = Math.random() * canvas.height;
			var size = Math.random() * 3 + 1;
			var speed = Math.random() * 5 + 1;
			var star = new Star(x, y, size, speed);
			stars.push(star);
		}

		function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (var i = 0; i < stars.length; i++) {
				stars[i].draw();
				stars[i].update();
			}
			requestAnimationFrame(animate);
		}

		animate();
      window.addEventListener('scroll', function() {
        let offset = window.pageYOffset;
        let parallax = document.querySelectorAll('.section');
        parallax.forEach(function(prllx, i) {
          prllx.style.backgroundPositionY = (offset - prllx.offsetTop) * 0.6+ 12 + "px";
        });
      });