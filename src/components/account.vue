<template>
  <div id="ac" class="account" style="font-size: 1.5rem">
    <p style="margin-bottom: 3%">アカウント管理</p>
    <div style="text-align: left; margin-left: 2rem;">
      <p>名前:{{name}}</p>
      <p>性別:{{sex}}</p>
      <p>年齢:{{age}}</p>
      <p>所属1:{{belong1}}</p>
      <p>所属2:{{belong2}}</p>
    </div>
      <a href="#/accountchange" class="button1">変更</a>
      <a href="#" class="button2">戻る</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sex: 'hoge',
      age: 'hoge',
      belong1: 'hoge',
      belong2: 'hoge'
    }
  },
  beforeMount () {
    this.name = 'geagweg'
    // ここにデータベースから取ってきたデータを入れる処理
  }
}
</script>
<style>
  .button1 {
    width:200px;
    font-size:1rem;
    text-decoration:none;
    display:block;
    text-align:center;
    padding:8px 0 10px;
    border:1px solid #333;
    color:#fff;
    background-color:#49a9d4;
    border-radius: 25px;
    margin-top: 13rem;
    margin-left: auto;
    margin-right: auto;
  }
  .button2 {
    width:200px;
    font-size:1rem;
    text-decoration:none;
    display:block;
    text-align:center;
    padding:8px 0 10px;
    border:1px solid #333;
    border-radius: 25px;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    bottom: 2rem;
  }
</style>
