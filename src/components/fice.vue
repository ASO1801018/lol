<template>
    <div id="app">
        <div>
            <video ref="video" id="video" width="500" height="500" autoplay></video>
            <div>
                <button color="info" id="snap" v-on:click="capture()">Snap Photo</button>
            </div>
            <canvas ref="canvas" id="canvas" width="500" height="500"></canvas>
            <ul>
                <li class="capture" v-for="c in captures" v-bind:key="c.d">
                    <img v-bind:src="c" height="50" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'face',
  data () {
    return {
      video: {},
      canvas: {},
      captures: []
    }
  },
  mounted () {
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.src = window.URL.createObjectURL(stream)
        this.video.play()
      })
    }
  },
  methods: {
    capture: function () {
      this.canvas = this.$refs.canvas
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, 500, 500)
      this.captures.push(this.canvas.toDataURL('image/png'))
      console.log(this.captures)
    }
  }
}
</script>
<style>
  body: {
    background-color: #F0F0F0;
  }
  #app {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  #video {
    background-color: #000000;
  }
  #canvas {
    display: none;
  }
  li {
    display: inline;
    padding: 5px;
  }
</style>
