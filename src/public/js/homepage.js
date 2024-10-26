const multipleCardCarousel = document.querySelector('#carouselExample');

if (window.matchMedia('(min-width: 768px)').matches) {
    const carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false,
    });

    var carouselWidth = $('.carousel-inner')[0].scrollWidth;
    var cardWidth = $('.carousel-item').width();

    var scrollPosition = 0;

    $('.carousel-control-next').on('click', function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
            scrollPosition = scrollPosition + cardWidth;
            $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 600);
        }
    });

    $('.carousel-control-prev').on('click', function () {
        if (scrollPosition > 0) {
            scrollPosition = scrollPosition - cardWidth;
            $('.carousel-inner').animate({ scrollLeft: scrollPosition }, 600);
        }
    });
} else {
    $(multipleCardCarousel).addClass('slide');
}

function calculateAndShowBMI() {
    var height = parseFloat(document.getElementById('inpHeight').value) || 0;
    var weight = parseFloat(document.getElementById('inpWeight').value) || 0;

    const BMI = weight / (height / 100) ** 2;
    const bmi = BMI.toFixed(2);
    if (bmi < 18.5) {
        bmiType = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiType = 'Healthy';
    } else if (bmi >= 25 && bmi < 30) {
        bmiType = 'Overweight';
    } else {
        bmiType = 'Obese';
    }
    const weight_status = bmiType;

    document.getElementById('bmi').value = bmi;
    document.getElementById('weight_status').value = weight_status;
}

// Scroll to top to caculate BMI
function caculateBmi() {
    const currentUrl = window.location.href;
    console.log(currentUrl)
    if (currentUrl === 'https://happyminds.onrender.com/'){
        window.scrollTo({
            top: 200,
            behavior: "smooth"
        });
    }else window.location.href = '/';
};

function sendEmail() {
    var to = 'happymindspnv@gmail.com';
    var subject = '';
    var body = '';
    to = encodeURIComponent(to);
    subject = encodeURIComponent(subject);
    body = encodeURIComponent(body);
    var mailtoLink = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    window.location.href = mailtoLink;
}

function directed(){
    window.location.href = 'https://www.passerellesnumeriques.org/vi/'
}