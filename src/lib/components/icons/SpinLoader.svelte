
<span class="w-4 h-4 rounded-full bg-transparent border-2 border-font border-l-transparent border-r-transparent spin-loader"></span>

<style>
	.spin-loader {
		animation: spinLoader 0.3s infinite linear;
	}
	@keyframes spinLoader {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
