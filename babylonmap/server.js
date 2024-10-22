const express = require("express");
const app = express();
const port = 3000;

// 정적 파일을 제공하는 미들웨어 설정
app.use(express.static("public"));

// 루트 URL ('/')에 대한 GET 요청 처리
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/start.html");
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행중입니다.`);
});
