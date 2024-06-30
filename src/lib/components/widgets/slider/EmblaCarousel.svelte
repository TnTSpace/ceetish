<script lang="ts">
  import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'

	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
  import EmblaCarouselThumbsButton from './EmblaCarouselThumbsButton.svelte';
  // import "../../../../styles/embla.css"

	let emblaApi: EmblaCarouselType
	let options: EmblaOptionsType = {
    loop: true,
    dragFree: true,
    containScroll: "keepSnaps",
    watchDrag: true,
    align: 'start'
  };
	let plugins = [Autoplay()];

  $: selectedIndex = 0
  $: selected = false

	function onInit(event: CustomEvent) {
		emblaApi = event.detail;
		console.log(emblaApi.slideNodes()); // Access API
	}

  function onClick() {
    
  }

  const prevNextClick = (direction: "prev" | "next") => {
    console.log({ direction })
    switch (direction) {
      case "next": return emblaApi.scrollNext()
      case "prev": return emblaApi.scrollPrev()
    }
  }
  let nums = [0, 1, 2, 3, 4]
</script>

<div class="embla" use:emblaCarouselSvelte={{ options, plugins }} on:emblaInit={onInit}>
	<div class="embla__viewport">
		<div class="embla__container aspect-video max-h-[500px]">
      {#each nums as num, i}
			  <div class="embla__slide border-2 border-primary rounded-lg">Slide {num}</div>
      {/each}
			<!-- <div class="embla__slide">Slide 1</div>
			<div class="embla__slide">Slide 2</div>
			<div class="embla__slide">Slide 3</div> -->
		</div>
	</div>
  <button class="embla__prev" on:click={() => prevNextClick("prev")}>Prev</button>
  <button class="embla__next" on:click={() => prevNextClick("next")}>Next</button>
  <div class="embla-thumbs">
    <div class="embla-thumbs__viewport">
      <div class="embla-thumbs__container">
        {#each nums as index, i}
          <EmblaCarouselThumbsButton { index } onClick={() => onClick()} selected={ index === selectedIndex } class="border-2 border-primary rounded-lg" />
        {/each}
        <!-- {slides.map((index) => (
          <Thumb
            key={index}
            onClick={() => onThumbClick(index)}
            selected={index === selectedIndex}
            index={index}
          />
        ))} -->
      </div>
    </div>
  </div>
</div>
<style>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>