<template>
    <div id="fice">
        <div>
            <video ref="video" id="video" width="500" height="500" autoplay></video>
            <div>
                <button color="info" id="snap" v-on:click="capture()">Snap Photo</button>
            </div>
            <canvas ref="canvas" id="canvas" width="500" height="500"></canvas>
            <ul>
                <li class="capture" v-for="c in captures" v-bind:key="c.d">
                    <img v-bind:src="c" height="50" />
                    <p id="opResult"></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const AWS = require('aws-sdk')
AWS.Config({
  accessKeyId: 'AKIARNMK4HDSMJG4Z5FQ',
  secretAccessKey: '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',
  region: 'us-east-1'
})

function DetectFaces (imageData) {
  AWS.region = 'us-east-1'
  let rekognition = new AWS.Rekognition()
  let params = {
    Image: {
      Bytes: imageData
    },
    Attributes: [
      'ALL'
    ]
  }
  rekognition.detectFaces(params, function (err, data) {
    if (err) console.log(err, err.stack) // an error occurred
    else {
      let table = '<table><tr><th>Low</th><th>High</th></tr>'
      // show each face and build out estimated age table
      for (let i = 0; i < data.FaceDetails.length; i++) {
        table += '<tr><td>' + data.FaceDetails[i].AgeRange.Low +
                    '</td><td>' + data.FaceDetails[i].AgeRange.High + '</td></tr>'
      }
      table += '</table>'
      document.getElementById('opResult').innerHTML = table
      console.log(table)
    }
  })
}
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
        this.video.srcObject = stream
        this.video.play()
      })
    }
  },
  methods: {
    capture () {
      this.canvas = this.$refs.canvas
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, 500, 500)
      this.captures.push(this.canvas.toDataURL('image/png'))
      console.log(this.captures)
      DetectFaces(this.captures[0])
    }
  }
}
</script>
<style>
    #canvas {
    }
    .capture {
        /* display: inline; */
        padding: 5px;
    }
</style>
