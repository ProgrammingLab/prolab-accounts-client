<template>
  <ul>
    <li>
      <dl>
        <dt>花火=f(x) —関数花火—</dt>
        <dd class="award">Hack U 2017 TOKYO 優秀賞</dd>
        <dd class="date">2017</dd>
        <dd>キミのオリジナル関数花火を夏の夜空に咲かせよう</dd>
      </dl>
      <img src="https://farm5.staticflickr.com/4374/36241356863_c1cd755cd1_k_d.jpg">
    </li>

    <li>
      <dl>
        <dt>和みなしゃれ</dt>
        <dd>Hack U 2016 FUKUOKA 最優秀賞</dd>
        <dd class="date">2016</dd>
        <p>気まずい空気も一発解決!</p>
      </dl>
      <img src="https://farm6.staticflickr.com/5828/30329987954_202dd24e0a_k_d.jpg">
    </li>

    <li>
      <dl>
        <dt>花火=f(x) —関数花火—</dt>
        <dd>Hack U 2017 TOKYO 優秀賞</dd>
        <dd class="date">2017</dd>
        <dd>キミのオリジナル関数花火を夏の夜空に咲かせよう</dd>
      </dl>
      <img src="https://farm5.staticflickr.com/4374/36241356863_c1cd755cd1_k_d.jpg">
    </li>

    <li>
      <dl>
        <dt>和みなしゃれ</dt>
        <dd>Hack U 2016 FUKUOKA 最優秀賞</dd>
        <dd class="date">2016</dd>
        <p>気まずい空気も一発解決!</p>
      </dl>
      <img src="https://farm6.staticflickr.com/5828/30329987954_202dd24e0a_k_d.jpg">
    </li>

    <li>
      <dl>
        <dt>花火=f(x) —関数花火—</dt>
        <dd class="award">Hack U 2017 TOKYO 優秀賞</dd>
        <dd class="date">2017</dd>
        <dd>キミのオリジナル関数花火を夏の夜空に咲かせよう</dd>
      </dl>
      <img src="https://farm5.staticflickr.com/4374/36241356863_c1cd755cd1_k_d.jpg">
    </li>

    <li>
      <dl>
        <dt>和みなしゃれ</dt>
        <dd>Hack U 2016 FUKUOKA 最優秀賞</dd>
        <dd class="date">2016</dd>
        <p>気まずい空気も一発解決!</p>
      </dl>
      <img src="https://farm6.staticflickr.com/5828/30329987954_202dd24e0a_k_d.jpg">
    </li>

    <li>
      <dl>
        <dt>花火=f(x) —関数花火—</dt>
        <dd>Hack U 2017 TOKYO 優秀賞</dd>
        <dd class="date">2017</dd>
        <dd>キミのオリジナル関数花火を夏の夜空に咲かせよう</dd>
      </dl>
      <img src="https://farm5.staticflickr.com/4374/36241356863_c1cd755cd1_k_d.jpg">
    </li>

    <li>
      <dl>
        <dt>和みなしゃれ</dt>
        <dd>Hack U 2016 FUKUOKA 最優秀賞</dd>
        <dd class="date">2016</dd>
        <p>気まずい空気も一発解決!</p>
      </dl>
      <img src="https://farm6.staticflickr.com/5828/30329987954_202dd24e0a_k_d.jpg">
    </li>
  </ul>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  margin-left: 60px;
  padding: 0;
  align-items: flex-start;
}
li {
  margin-bottom: 40px;
  border: 1px solid #666;
  list-style: none;
  width: 24%;
  position: relative;
}
li:hover {
  cursor: pointer;
}
li:hover {
  background-color: black;
  color: white;
  transition-duration: 0.2s;
}
dl {
  margin: 20px;
}
dt {
  font-size: 1.4rem;
}
dd, dt {
  width: 80%;
}
dd.date {
  width: 100%;
  text-align: right;
  position: absolute;
  right: 0;
  top: 6px;
  color: #ccc;
  font-size: 3.5rem;
  z-index: -1;
  transform: rotate(-90deg) translateY(-100%);
  transform-origin: right top;
  line-height: 1;
  font-family: 'Barlow';
}
p {
  text-overflow: ellipsis;
}
img {
  width: 100%;
}
</style>
