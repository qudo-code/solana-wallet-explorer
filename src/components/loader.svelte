<!-- We could do this with before/afters but I want to leave some flexibility for tweaking. -->
<div class="loader display-flex">
    <div class="dot" style="--size:{remSize}" ></div>
    <div class="dot" style="--size:{remSize}"></div>
    <div class="dot" style="--size:{remSize}"></div>
</div>

<script lang="ts">
    type Size = "small" | "medium" | "large";
    
    const sizes = {
        small: 0.4,
        medium: 0.6,
        large: 1,
    }

    export let size:Size = "medium";

    $: remSize = `${sizes[size]}rem`;
</script>

<style lang="scss">
@keyframes loader-animation {
    0% {
        opacity: .2;
        transform: scale(1, 1);
    }

    50% {
        opacity: 1;
        transform: scale(1.25);
    }

    100% {
        opacity: .2;
        transform: scale(1, 1);
    }
}

.loader {
    position: relative;
    --duration: 600;
}

.dot {
    content: "";

    --size: 0.5rem;
    border-radius: 100%;
    width: var(--size);
    height: var(--size);
    background-color: var(--color-text);
    animation: loader-animation 1000ms infinite ease-in-out;
    margin: 0 .2rem;

    &:nth-child(1) {
        animation-delay: 333ms;
    }

    &:nth-child(2) {
        animation-delay: 666ms;
    }
}
</style>