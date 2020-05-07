//Sorularımız (resimli, sesli, videolu) 10 tane ve bazıları 4 şıktan oluşuyor bazıları da 2 şıktan.
// Şık miktarında tekrar değişiklikler yapılabilir
var questions = [
  {
  question: "Aşağıdakilerin hangisi Barış Manço'ya ait bir bestedir?",
  answers: [
    { answer: "O sen olsan bari!", value: false },
    { answer: "Gül pembe", value: true },
    { answer: "Acayip hayvanlara benziyirsen", value: false },
    { answer: "Erik dalı gevrektir.", value: false }
  ]
},
{
  question: "Aşagıda görmekte olduğunuz yemek şıklardan hangisinde olabilir ?",
  imageURL:"img/etlekmek.jpg",
  answers: [
    { answer: "Mumbar Dolması ", value: false },
    { answer: "Madımak Yemeği", value: false },
    { answer: "Etlekmek", value: true },
    { answer: "Peskutan Çorbası", value: false }
  ]
},
{
  question: "Dinlediğiniz “We Are The Champions” adlı şarkıyı seslendiren “Queen” grubunun solisti kimdir?",
  soundURL:"sound/queen.mp3",
  answers: [
    { answer: "Freddie Mercury", value: true },
    { answer: "David Gilmour", value: false },
    { answer: "Michael Jackson", value: false },
    { answer: "Elvis Presley", value: false }
  ]
},
{
  question: "Aşağıda izlemekte olduğunuz yöresel oyun hangisidir?",
  videoURL:"sound/kafkas.mp4",
  answers: [
    { answer: "Teke Zortlatması", value: false },
    { answer: "Kafkas", value: true },
    { answer: "Horon", value: false },
    { answer: "Zeybek", value: false }
  ]
},
{
  question: "Aşağıdakilerden hangisi bir Yozgat türküsüdür?",
  answers: [
    { answer: "Üryan geldim, üryan giderim", value: false },
    { answer: "sultan süleymana kalmayan dünya", value: false },
    { answer: " Gide gide bir söğüde dayandım", value: false },
    { answer: "Hastane önünde incir ağacı", value: true }
  ]
},
{
  question: "Guardiola, José Mourinho, Jürgen Klopp 'Futbol' spor dalında şampiyonluk kazanmış isimlerdir. Bu bilgi doğru mudur?",
  answers: [
    { answer: "DOĞRU", value: true },
    { answer: "YANLIŞ", value: false },

  ]
},
{
  question: "Şu Çılgın Türkler kitanının yazarı kimdir?",
  answers: [
    { answer: "Kemal Tahir", value: false },
    { answer: "Turgut Özakman", value: true },
    { answer: "Mustafa Kemal Atatürk", value: false },
    { answer: "İskender Pala", value: false } 
  ]
},
{
  question: "Türkiye'nin ilk milli parkı neresidir?",
  answers: [
    { answer: "Çamlık Milli Parkı / YOZGAT", value: true },
    { answer: "Kuş Cenneti Milli Parkı / BALIKESİR", value: false },
    { answer: "Soğuksu Milli Parkı /ANKARA", value: false },
    { answer: "Karatepe-Aslantaş Milli Parkı", value: false }
  ]
},
{
  question: "Ders anlatan öğretmenler bir konuyu bitirdikten sonra öğrencilere genellikle ne sorarlar??",
  answers: [
    { answer: "Tuvaleti olan var mı?", value: false },
    { answer: "0,7 ucu olan var mı?", value: false },
    { answer: "Sorusu olan var mı?", value: true },
    { answer: "İtirazı olan var mı?", value: false }
    
  ]
},
{
  question: "Aşağıdakilerden hangisi bir programlama dili değildir?",
  answers: [
    { answer: "PYTHON", value: false },
    { answer: "HTML / CSS", value: true },
    { answer: "PHP", value: false },
    { answer: "JAVASCRIPT", value: false }
  ]
}
];

var game;
var counter = 0;
var clock;
var timer = 20;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function() {

$('.answers').css('visibility', 'hidden');
$('body').on('click', '.start-btn', function(event) {
  event.preventDefault();
  startGame();
  $('.answers').css('visibility', 'visible');
});

$('body').on('click', '.answer', function(event) {
  
  chosenAnswer = $(this).text();
  var answers = questions[counter].answers;

  // Bu kısımda verdiğimiz cevap yanlış olduğu zaman hangi cevap doğru ise onun yeşil olması sağladı.
  var answer = $('.answer');
  for (var i = 0; i < answers.length; i++) {
    if (chosenAnswer === answers[i].answer && answers[i].value === true) {
      clearInterval(clock);
      var right = $(this).attr('class', 'right-answer answer');
      rightAnswer();
    } else if (chosenAnswer === answers[i].answer && answers[i].value === false) {

      clearInterval(clock);
      $(this).attr('class', 'wrong-answer answer');

      for(let j = 0 ; j < answers.length ; j++ ){
        if(answers[j].value==true){

          $($(this).parent().children()[j]).css('background-color', 'hsl(120, 58%, 40%)');
          $($(this).parent().children()[j]).css('color', 'white');
        }
      }
      wrongAnswer();
    } 
  }  
});

$('body').on('click', '.reset-button', function(event) {
  event.preventDefault();
  resetGame();
});
});

//Doğru verilen cevaplar için
function rightAnswer() {
correctCounter++;
$('.time').html(timer);
$('.right').html('<p>Doğru Cevap: ' + correctCounter + '</p><br>');
setTimeout(questionCounter, 2000);
}

//Yanlış cevaplar için
function wrongAnswer() {
incorrectCounter++;
$('.time').html(timer);
$('.wrong').html('<p>Yanlış Cevap:  ' + incorrectCounter + '</p>');
setTimeout(questionCounter, 2000);
}

//Oyun başladığında
function startGame() {
$('.start-page').css('display', 'none');
$('.questions-page').css('visibility', 'visible');
$('.timer').html('<p>Kronometre : <span class="time">20</span></p>');

let currentQuestion = questions[counter];
$('.question').html('<p>'+currentQuestion.question+'</p>');

//bu kısımda sorulara resim ekleyebilmemiz sağlandı
if(currentQuestion.hasOwnProperty('imageURL')){
  $('.question').append('<img class="imageQuestion" src="'+currentQuestion.imageURL+'"/>');
}
//bu kısımda sorulara ses ekleyebilmemiz sağlandı
if(currentQuestion.hasOwnProperty('soundURL')){
  $('.question').append('<audio controls autoplay><source src="'+currentQuestion.soundURL+'" type="audio/mpeg"></audio>');
}
//bu kısımda sorulara video ekleyebilmemiz sağland
if(currentQuestion.hasOwnProperty('videoURL')){
  $('.question').append('<video class="imageQuestion" controls autoplay><source src="'+currentQuestion.videoURL+'" type="audio/mpeg"></video>');
}
var showingAnswers = '';
for(let i=0;i<questions[counter].answers.length;i++){
  showingAnswers+='<p class="answer">'+questions[counter].answers[i].answer+'</p>';
}
$('.answers').html(showingAnswers);

timerHolder();
}

//soru sayısı miktarı için
function questionCounter() {
if (counter < 9) {
  counter++;
  startGame();
  timer = 20;
  timerHolder();
} else {
  finishGame();
}
}

function timerHolder() {
clearInterval(clock);
clock = setInterval(seconds, 1000);
function seconds() {
  if (timer === 0) {
    clearInterval(clock);
    wrongAnswer();
  } else if (timer > 0) {
    timer--;
  }
  $('.time').html(timer);
}
}
//Oyun sonlandığı zaman ekranda yazacak 
function finishGame() {
var final = $('.main')
  .html("<p>OYUN BİTTİ! </p><br><br><p>Skorunuz aşağıdaki gibidir. <p><br><br><p>Tekrar oynamak için aşağıdaki butona tıklayın!</p><br><br>")
  .append('<p>Toplam Doğru Sayısı : ' + correctCounter + '</p><br>')
  .append('<p>Toplam Yanlış Sayısı : ' + incorrectCounter + '</p>');
$(final).attr('<div>');
$(final).attr('class', 'final');
$('.final').append('<input class="btn btn-primary btn-lg reset-button"  onclick="location.href=\'index.html\';" value="YENİDEN BAŞLAYIN!" />');
}
//oyun sıfırlandı
function resetGame() {
counter = 0;
correctCounter = 0;
incorrectCounter = 0;
unansweredCounter = 0;
timer = 20;
startGame();

}
