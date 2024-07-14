<script lang="ts">
  export let rating: number = 5
</script>

<div
	class="Stars"
	style="--rating: {rating};"
	aria-label="Rating of this product is 2.3 out of 5."
></div>

<style>
	:root {
		--star-size: 16px;
		--star-color: #fff;
		--star-background: #fc0;
	}
	.Stars {
		--percent: calc(var(--rating) / 5 * 100%);
		display: inline-block;
		font-size: var(--star-size);
		font-family: Times;
		line-height: 1;
	}
	.Stars::before {
		content: '★★★★★';
		letter-spacing: 3px;
		background: linear-gradient(
			90deg,
			var(--star-background) var(--percent),
			var(--star-color) var(--percent)
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
