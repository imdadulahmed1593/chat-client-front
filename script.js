'use strict';

var quotes = [
  "I don't know the question, but sex is definitely the answer. - Woody Allen.",
  'Everything in the world is about sex except sex. Sex is about power. - Oscar Wilde',
  'Fighting for peace is like screwing for virginity. - George Carlin',
  'If you want to get laid, go to college. If you want an education, go to the library.',
  'The difference between sex and love is that sex relieves tension and love causes it. - Woody Allen',
  'The main reason Santa is so jolly is because he knows where all the bad girls live - George Carlin',
  'Sex without love is as hollow and ridiculous as love without sex. - Hunter S. Thompson',
  "Sex is the consolation you have when you can't have love. - Gabriel garcia Marquez",
  'No woman gets an orgasm from shining the kitchen floor - Betty Friedan',
  'Sex is kicking death in the ass while singing - Charles Bukowski',
  "Is sex dirty? Only when it's being done right - Woody Allen",
  'Sex is an emotion in motion - Mae West',
  'Sex is part of nature. I go with nature - Marilyn Monroe',
  'A liberated woman is one who had sex before marriage, and a job after - Gloria Steinem',
  "Sex without love is a meaningless experience, but as far as meaningless experiences go it's pretty damn good - Woody Allen",
  'In my sex fantasy, nobody ever loves me for my mind - Nora Ephron',
  "I'm a heroine addict. I need to have sex with women who have saved someone's life - Mitch Hedberg",
  'Sex is not the answer. Sex is the question. "Yes" is the answer - Swami X',
  'Physics is like sex: sure, it may give some practical results, but that is not why we do it - Richard Feynman',
  'Sex is the most fun you can have without laughing - Woody Allen',
  'Love is the answer, but while you are waiting for the answer, sex raises some pretty good questions - Woody Allen',
  'Dancing is a perpendicular expression of a horizontal desire - George Bernard Shaw',
  "Hate to sound sleazy, but tease me, I don't want it if it's that easy - Tupac Shakur",
  "Things you never hear: Please stop sucking my dick or I'll call the police! - George Carlin",
  'She was pleased to have him come and never sorry to see him go - Dorothy Parker',
  'Sometimes I get real lonely sleeping with you - Haruki Murakami',
  'You know that look that women get when they want to have sex? Me neither - Steve Martin',
  "I'm such a good lover because I practice a lot on my own - Woody Allen",
  'Women fake orgasms and men fake finances - Suze Orman',
  'Good girls go to heaven and bad girls go everywhere - Helen Gurley Brown',
  'Lift your hips for me, love - Tahereh Mafi',
  'jan was an excellent fuck...she had a tight pussy and she took it like it was a knife that was killing her - Charles Bukowski',
  'Don’t put off till tomorrow anyone you could be doing today - Emma Chase',
  "A woman can become a man's friend only in the following stages - first an acquantaince, next a mistress, and only then a friend. - Anton Checkov",
  'She was made for untidy rooms and rumpled beds - Alexander McCall Smith',
  'Sex: the thing that takes up the least amount of time and causes the most amount of trouble. - John Barrymore',
];

// Wrap function definitions in jQuery ready callback to avoid defining them globally
// (otherwise browser extensions may call them)
$(() => {
  class Message {
    constructor(content, authorId, timestamp) {
      this.content = content;
      this.authorId = authorId;
      this.timestamp = timestamp;
    }
  }

  function genRandomMs() {
    // Returns a random number between 0 and 3 seconds, in milliseconds
    return Math.floor(Math.random() * 0.3e4);
  }

  function prettifyDate(timestamp) {
    // Returns the date in hh:mm am/pm format
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(timestamp).toLocaleTimeString('en-US', options);
  }

  // REMOVE-START
  function getMessages() {
    $.get('/messages', (data) => {
      data.forEach((msg) => showMessage(msg));
    });
  }

  function postMessage(msg) {
    $.ajax({
      url: '/messages',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(msg),
    });
  }
  // REMOVE-END

  // function showMessage(msg) {
  //   const { content, authorId, timestamp } = msg;
  //   const $HtmlMsg = $(`
  //     <div class="message ${authorId ? 'right' : 'left'}">
  //       <div class="message-text">${content}</div>
  //       <div class="message-time">${prettifyDate(timestamp)}</div>
  //     </div>
  //   `);
  //   $('.messages-container').append($HtmlMsg);
  // }

  function showMessage(msg) {
    const { content, authorId, timestamp } = msg;
    const $HtmlMsg = $(`
      <div class="message ${authorId ? 'right' : 'left'}">
      ${
        !authorId
          ? '<div class="bot"><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z"></path></svg></div>'
          : '<div class="person"><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path></svg></div>'
      }
    
        <div class="message-content">
          <div class="message-text">${content}</div>
          <div class="message-time">${prettifyDate(timestamp)}</div>
        </div> 
      </div>
    `);
    $('.messages-container').append($HtmlMsg);
  }

  function simulateIncomingMessages() {
    setTimeout(() => {
      // $.get('https://api.quotable.io/random', (data) => {
      //   const msg = new Message(data.content, false, Date.now());
      //   // REMOVE-START
      //   postMessage(msg);
      // REMOVE-END
      const msg = new Message(
        quotes[Math.floor(Math.random() * quotes.length)],
        false,
        Date.now()
      );
      showMessage(msg);
      scrollToBottom();
      // });
    }, genRandomMs());
  }

  function scrollToBottom() {
    const $messages = $('.messages-container');
    $messages.animate({
      scrollTop: $messages[0].scrollHeight,
    });
  }

  // REMOVE-START
  // getMessages();
  scrollToBottom();
  // REMOVE-END
  $('#msg-form').on('submit', (e) => {
    e.preventDefault();
    const content = $('#text').val();
    if (content) {
      $('#text').val('');
      const msg = new Message(content, true, Date.now());
      // REMOVE-START
      // postMessage(msg);
      // REMOVE-END
      showMessage(msg);
      scrollToBottom();
      simulateIncomingMessages();
    }
  });
});
