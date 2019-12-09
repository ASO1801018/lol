$(function () {
    $("#btnsend").click(
        function () {
            $("#span1").text("データ取得中です");

            data = {
                post_sentence: $("#main_text").val()
            };
            json_data = JSON.stringify(data);


            fetch('https://i3se9zbaie.execute-api.us-east-1.amazonaws.com/default/ProofreadingZIP', {
                method: 'POST',
                body: json_data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    return response.text();
                })
                .then(function (data) {
                    obj = JSON.parse(data);
                    json_obj = JSON.stringify(obj);
                    document.getElementById('text_input').textContent = obj['inputSentence'];

                    text_checked1 = obj['checkedSentence'].replace(/\s+/g, "").replace(/<{2}/g,'<span style="color:#ff0000;">');
                    text_checked2 = text_checked1.replace(/>{2}/g,'</span>');
                    // document.getElementById('text_proofreading').textContent = text_checked2;
                    var greet = document.getElementById('text_proofreading');
                    greet.innerHTML = text_checked2;
                    console.log(text_checked2);
                    console.log(data);
                    console.log(obj['checkedSentence']);
                    $("#span1").text("データを取得しました");
                })
                .catch(function (error) {
                    // document.getElementById('result').textContent = error;
                    $("#span1").text("データを取得できませんでした");
                })

        });
});