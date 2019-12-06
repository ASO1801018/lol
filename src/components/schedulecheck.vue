<template>
    <div class="check" style="color: gray;">
        <p style="font-size: large; margin: 10%">スケジュール確認</p>
        <div class="select">
        <img class="sankaku2" src="../assets/sankaku2.png" v-on:click="nextday">
        <a class="day" ref="day">{{day}}</a>
        <img class="sankaku1" src="../assets/sankaku1.png" v-on:click="yesterday">
        </div>
        <div align="center">
        <table>
            <thead>
            <tr>
                <th class="nittei">{{nittei}}</th>
                <th class="naiyou">{{naiyou}}</th>
            </tr>
            </thead>
            <tbody>
            <!-- [1] ここに <tr> で ToDo の要素を1行づつ繰り返し表示したい -->
            <tr v-for="item in datas" v-bind:key="item.id">
                <!-- 要素の情報 -->
                <td>{{ item.nittei }}</td>
                <td>{{ item.naiyou }}</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'schedulecheck',
  data () {
    return {
      eventdata: [],
      day: '日付',
      nittei: '日程',
      naiyou: '内容',
      datas: [],
      nowdata: [],
      dataid: '0',
      date: 0
    }
  },
  created () {
    let today = new Date()
    this.day = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    let schedule = this
    // ページ読み込み時に実行したい処理   今作りかけ
    fetch('http://ec2-18-177-93-10.ap-northeast-1.compute.amazonaws.com/assignDB/all_post.php')
      .then(function (response) {
        return response.text()
      })
      .then(function (data) {
        console.log(JSON.stringify(data))
        let obj = JSON.parse(data) // 全データ
        let rdata = obj['data']
        for (let i in rdata) {
          schedule.datas.push({
            id: i,
            nittei: rdata[i]['start_time'].slice(0, -3) + '〜' + rdata[i]['finish_time'].slice(0, -3),
            naiyou: rdata[i]['content'],
            hiduke: rdata[i]['event_date']
          })
        }
      })
  },
  methods: {
    nextday: function (e) {
      let today = new Date()
      this.date++
      today.setDate(today.getDate() + this.date)
      this.day = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      for (let i in this.datas) {
        console.log(this.datas[i]['nittei'])
      }
    },
    yesterday: function (e) {
      let today = new Date()
      this.date--
      today.setDate(today.getDate() + this.date)
      this.day = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    }
  }
}

</script>

<style>
 .select{
     position: relative;
 }
 .day{
     text-align: center;
     top: 50%;
     transform: translateY(-50%)
 }
 .sankaku2{position:absolute;
     left: 15%;
     top: 50%;
     transform: translateY(-50%)}
 .sankaku1{position:absolute;
     right: 15%;
     top: 50%;
     transform: translateY(-50%)
 }
 table, th, td {
     border-spacing: 0 10px;
     text-align: center;
 }
 td{border-top: solid 1px;border-bottom:solid 2px; width: 150px; padding: 15px; border-color: gray}
 td:first-child{border-radius: 15px 0px 0px 15px ; border-left:solid 1px; border-color: gray}
 td:last-child{border-radius: 0px 15px 15px 0px ;border-right: solid 1px; border-color: gray}
</style>
