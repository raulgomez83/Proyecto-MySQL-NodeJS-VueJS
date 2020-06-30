<template>
  <iframe
    :width="width"
    :height="height"
    :src="source"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>
<script>
const VIDEO_SIZES = {
  small: {
    width: 400,
    height: 250,
  },
  large: {
    width: 1080,
    height: 720,
  },
};

export default {
  name: "videoPlayer",
  props: {
    videoSource: String,
    size: String,
  },
  data() {
    return {
      source: "",
      height: "",
      width: "",
    };
  },
  created() {
    const { width, height } = VIDEO_SIZES[this.size];
    this.width = width;
    this.height = height;
    const videoId = this.videoSource.replace("https://youtu.be/", "");
    this.source = `https://www.youtube.com/embed/${videoId}`;
  },
};
</script>

<style></style>
