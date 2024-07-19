<template>
  <svg
    :class="['edit-1', className]"
    fill="none"
    height="29"
    viewBox="0 0 19 29"
    width="19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g class="g" :clip-path="`url(#clip0_${Math.random()}_696)`">
      <path
        class="path"
        d="M2.36768 20.87V24.4167C2.36768 24.7433 2.5413 25 2.76228 25H5.1615C5.2641 25 5.3667 24.9417 5.43772 24.825L14.056 12.0967L11.0964 7.72165L2.48606 20.45C2.40714 20.5667 2.36768 20.7067 2.36768 20.87ZM16.3447 8.71332C16.6525 8.25832 16.6525 7.52332 16.3447 7.06832L14.4979 4.33832C14.1901 3.88332 13.6929 3.88332 13.3851 4.33832L11.9409 6.47332L14.9004 10.8483L16.3447 8.71332V8.71332Z"
        fill="#2D3748"
      />
    </g>
    <defs class="defs">
      <clipPath class="clip-path" :id="`clip0_${Math.random()}_696`">
        <rect class="rect" fill="white" height="28" :transform="`translate(0 0.5)`" width="18.9412" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "Edit1",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>
