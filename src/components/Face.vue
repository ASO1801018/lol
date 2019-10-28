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
    }
  })
}
function AnonLog () {
  // Configure the credentials provider to use your identity pool
  AWS.config.region = 'us-east-1' // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: '294eb84a-c7f9-4635-8f09-1f4cfea89025'
  })
  // Make the call to obtain credentials
  AWS.config.credentials.get(function () {
    // Credentials will be available when this function is called.
    let accessKeyId = AWS.config.credentials.accessKeyId
    let secretAccessKey = AWS.config.credentials.secretAccessKey
    let sessionToken = AWS.config.credentials.sessionToken
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
