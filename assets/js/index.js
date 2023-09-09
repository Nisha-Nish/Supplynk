$(document).ready(function () {
  getLanguage();
  // console.log(language);
  // set navbar
  createList(language.navbar, language.navbarPages);
  createFooterList(language.footerLi, language.footerAtag);
  if (document.querySelector('#hero')) {
    if (localStorage.getItem('AboutPageID'))
      localStorage.removeItem('AboutPageID');
    // set hero/header
    $('#hero div h1').html(`${language.pinchLine} <br> ${language.pinchLine1}`);
    $('#hero div h2').html(language.pinchLineShort);
    $('#hero div a').html(language.pinchLineBtn);
    // set about aboutCard
    $('#aboutCard').html(language.aboutCard);
    $('#about div:nth-child(2) h3').html(language.aboutHeading);
    $('#about div:nth-child(2) p').html(language.aboutContent);
    createAboutCard(language.aboutValuesHeading, language.aboutValuesContent);
    // $(
    //   '#features div:nth-child(1) div:nth-child(1) div:nth-child(1) div:nth-child(1) h3'
    // ).html(language.aboutValues[0]);
    // set feature cards
    $('#services h2').html(language.serviceHeading);
    $('#serviceHeading h3').html(language.serviceHeading);
    createFeatureCard(language.featureHeading, language.featureContent);
    // set how it work
    $('#workHeading h3').html(language.worksHeading);
    createWorkSteps(language.workSteps);
    // set partner
    $('#partner h3').html(language.partnerHeading);
    createPartner(language.partnerContent);
    // set benfits data
    $('#benefitsHead').html(language.benefitsHead);
    $('#benefitsHeading h3').html(language.benefitsHeading);
    createBenefits(language.benfitsContent);
    // set contact
    $('#contactUs').html(language.contactUs);
    $('#contactSection h3').html(language.contactHeading);
    $('#contactSection p').html(language.contactContent);

    moreInfo();
  } else if (document.querySelector('#h31')) {
    changeNav();
    setContent();
  } else if (document.querySelector('#priceH')) {
    changeNav();
    $('#priceH').html(language.pricingHeading);
    $('#priceP').html(language.pricingContent);
    createCard(language.card1, '#card1');
    createCard(language.card2, '#card2');
    createCard(language.card3, '#card3');

    document
      .querySelectorAll('.btn-buy')
      .forEach((el) => (el.innerHTML = language.priceBtnTxt));
    document
      .querySelectorAll('.card-type')
      .forEach((el, i) => (el.innerHTML = language.cardType[i]));
    document
      .querySelectorAll('.price-card')
      .forEach((el, i) => (el.innerHTML = language.pricing[i]));
  } else {
    changeNav();
  }
});

var language;
function getLanguage() {
  localStorage.getItem('language') == null ? setLanguage('en') : false;

  $.ajax({
    url: '/assets/language/' + localStorage.getItem('language') + '.json',
    dataType: 'json',
    async: false,
    dataType: 'json',
    success: function (lang) {
      language = lang;
    },
  });
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  getLanguage();
  location.reload();
}

function setContent() {
  let id = parseInt(localStorage.getItem('AboutPageID'));
  $('#h3').text(language.featureHeading[id]);
  $('#para').text(language.featureContent[id]);
  if (language.featureContent.length === id + 1) {
    console.log('work', id);
    $('#h31').text(language.featureHeading[0]);
    $('#para1').text(language.featureContent[0]);
  } else {
    $('#h31').text(language.featureHeading[id + 1]);
    $('#para1').text(language.featureContent[id + 1]);
  }
}

function changeNav() {
  $('#navbar #ul > li:nth-child(2) a').text('Home');
  $('#navbar #ul > li:nth-child(2) a').attr('href', 'index.html');
}

// NAVBAR
function createList(arr, navbarPages) {
  arr.forEach((el, i) => {
    let li = document.createElement('li');
    li.innerHTML = `<a href="${navbarPages[i]}">${el}</a>`;
    $('#navbar #ul').append(li);
  });
  $('#lang').css('order', '4');
  // $('#navbar #ul li:nth-child(2) a').addClass('active');
}

// ABOUT CARDS
function createAboutCard(arr, arr1) {
  arr.forEach((el, i) => {
    console.log(el);
    $(`#featureCard div:nth-child(${i + 1}) div h3`).html(el);
    $(`#featureCard div:nth-child(${i + 1}) div p`).html(arr1[i]);
  });
}

// FEATURES CARDS
function createFeatureCard(heading, content) {
  heading.forEach((el, i) => {
    let outerDiv = document.createElement('div');
    outerDiv.classList.add(
      'col-lg-4',
      'col-md-6',
      'd-flex',
      'align-items-stretch',
      'my-2'
    );
    let innerDiv = `<div class="course-item"><img src="assets/img/course-details.jpg" class="img-fluid" alt="" /><div class="course-content"><h3>${el}</h3>
    <span class="more-info moreInfo d-inline-block my-2">More Info</span></div></div>`;
    outerDiv.innerHTML = innerDiv;
    $('#services .container .row').append(outerDiv);
  });
}

// WORK STEPS
function createWorkSteps(arr) {
  arr.forEach((el, i) => {
    $(`#works div:nth-child(${i + 1}) h4`).html(el);
  });
}

// WORK BENEFITS
function createPartner(arr) {
  arr.forEach((el, i) => {
    let li = document.createElement('li');
    li.innerHTML = el;
    document.querySelector('#partnerUl').append(li);
  });
}

// WORK BENEFITS
function createBenefits(arr) {
  document.querySelectorAll('#benefits .card-text').forEach((el, i) => {
    el.innerHTML = arr[i];
  });
}

//  get more info
function moreInfo() {
  document.querySelectorAll('.moreInfo').forEach((el, i) => {
    el.onclick = () => {
      localStorage.setItem('AboutPageID', i);
      window.location.href = 'about.html';
    };
  });
}

// Footer
function createFooterList(arr, arr1) {
  arr.forEach((el, i) => {
    let li = document.createElement('li');
    li.innerHTML = `<a href="${arr1[i]}">${el}</a>`;
    $('#footer div ul').append(li);
  });
}

// pricing
function createCard(arr, parent) {
  arr.forEach((el, i) => {
    let li = document.createElement('li');
    li.innerHTML = el;
    $(parent).append(li);
  });
}
