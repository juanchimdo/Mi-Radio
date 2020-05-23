(function(){
	document.addEventListener("DOMContentLoaded", function() {

		//VERIABLES
		const audio = document.querySelector ('audio')
		const playPausa = document.querySelector('.playPausa')
		const atras = document.querySelector ('.atras')
		const siguiente = document.querySelector ('.siguiente')
		const duracion = document.querySelector ('.duracion')
		const artista = document.querySelector ('.artista')
		const canciones = document.getElementsByTagName('source')
		const shuffle = document.querySelector ('.shuffle')
		const mas = document.querySelector ('.mas')
		const menos = document.querySelector ('.menos')
		const mute = document.querySelector ('.mute')
		const volumen = document.querySelector ('.volumen')
		const listado = document.querySelector ('.listado')


		// FUNCIONES
		function back () {
			if (audio.currentTime <= 3) {
				let p = audio.children.length-1
				if (audio.currentSrc === audio.children[0].src) {
					audio.src = audio.children[p].src
					audio.play()
				} else { 
					for (var i = 0; i < audio.children.length; i++) {
						if (audio.currentSrc===audio.children[i].src) {
							let n =i-1
							audio.src = audio.children[n].src
							audio.play ()
						}
					}
				}
			} else {
				audio.load ()
				audio.play()
			}
		}
		function play () {
			let pausa = audio.paused
			if (pausa === true) {
				audio.play ()
			}
			if (pausa === false) {
				audio.pause ()
			}
		}
		function loop () {
			let p = audio.children.length-1
			if (audio.currentSrc === audio.children[p].src) {
				audio.src = audio.children[0].src
				audio.play()
			} else { 
				for (var i = 0; i < audio.children.length-1; i++) {
					if (audio.currentSrc===audio.children[i].src) {
						let n =i+1
						audio.src = audio.children[n].src
						audio.play ()
					}
				}
			}
		}
		function tiempo () {
			duracion.textContent = ''
			let t = Math.trunc (audio.duration)
			let m = Math.trunc (t/60)
			let s = t - m*60
			if (s<10) {
				s = '0' + s
			}
			let ct = Math.trunc (audio.currentTime)
			let cm = 0
			let cs = ct
			if (ct>=60) {
				cm = Math.trunc (ct/60)
				cs = ct - cm*60
			}
			if (cs<10) {
				cs = '0' + cs
			}
			duracion.textContent = cm + ':' + cs + ' / ' + m + ':' + s
		}
		function intervalo () {
			setInterval (tiempo, 1000)
		}
		function nombreArtista () {
			for (var i = 0; i < canciones.length; i++) {
				if (audio.currentSrc === canciones[i].src) {
					artista.textContent = canciones[i].title
				}
			}
		}
		function aleatorio () {
			let l = audio.children.length
			let i = Math.floor(Math.random()*l)
			audio.src = audio.children[i].src
			audio.load ()
			audio.play()
		}
		function volumenMas () {
			if (audio.volume <= 0.8) {
				audio.volume = audio.volume + 0.2
			}
			volumenBarra ()
		}
		function volumenMenos () {
			if (audio.volume >= 0.2) {
				audio.volume = audio.volume - 0.2
			}
			volumenBarra ()
		}
		function volumenMute () {
			if (audio.muted === false) {
				audio.muted = true
			} else {
				audio.muted =false
			}
			volumenBarra ()
		}
		function volumenBarra () {
			if (audio.volume > 0.8) {
				volumen.textContent = '|||||'
			} else if (audio.volume > 0.61) {
				volumen.textContent = '||||.'
			} else if (audio.volume > 0.41) {
				volumen.textContent = '|||..'
			} else if (audio.volume > 0.21) {
				volumen.textContent = '||...'
			} else if (audio.volume > 0.01) {
				volumen.textContent = '|....'
			} else {
				volumen.textContent = '.....'
			}
			if (audio.muted===true) {
				volumen.textContent = '.....'
			}
		}
		function lista () {
			for (var i = 0; i < audio.children.length; i++) {
				let cancionesN = document.createElement ('li')
				cancionesN.append (canciones[i].title)
				listado.appendChild (cancionesN)
			}
		}

		//SCRIPT
		lista ()
		playPausa.addEventListener('click', play)
		audio.addEventListener('ended', loop)
		siguiente.addEventListener('click', loop)
		atras.addEventListener('click', back)
		audio.addEventListener('playing', function(){
			playPausa.textContent = 'Pausa'
		})
		audio.addEventListener('pause', function (){
			playPausa.textContent = 'Play'
		})
		audio.addEventListener('loadeddata', intervalo)
		audio.addEventListener('loadeddata', nombreArtista)
		shuffle.addEventListener('click', aleatorio)
		mas.addEventListener ('click', volumenMas)
		menos.addEventListener ('click', volumenMenos)
		mute.addEventListener ('click', volumenMute)
			
	})
}())