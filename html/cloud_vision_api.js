function fileget (imgfile) {
  if (!imgfile.files.length) return
  var file = imgfile.files[0]
  var fr = new FileReader()
  fr.onload = function (evt) {
    var base64_temp = evt.target.result.split(',')
    var base64_file = base64_temp[1]

    $('#span1').text('写真の読み込み中です')

    data = {
      'image_base64': base64_file
    }

    json_data = JSON.stringify(data)

    fetch('https://40u3qp7rhb.execute-api.us-east-1.amazonaws.com/default/nakaocr', {
      method: 'POST',
      body: json_data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        return response.text()
      })
      .then(function (data) {
        obj = JSON.parse(data)
        json_obj = JSON.stringify(obj)

        b_text = obj['responses'][0]['fullTextAnnotation']['text']
        r_text = b_text.replace(/\r?\n/g, '')
        document.getElementById('main_text').value = r_text
        $('#span1').text('写真の読み込み完了')
      })
      .catch(function (error) {
        // document.getElementById('result').textContent = error;
      })
  }
  fr.readAsDataURL(file)
}
