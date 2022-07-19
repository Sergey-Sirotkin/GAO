// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

function stepForm() {
    const steps = document.querySelectorAll('.form__step');
    const prevBtn = document.querySelector('.back');
    const nextBtn = document.querySelector('.next');
    const finishBtn = document.querySelector('.finish-btn');
    const form = document.querySelector('.steps__form');
    const stepNumbers = document.querySelectorAll('.step__number');
    const progress = document.querySelector('.progress__success');
    const finishBlock = document.querySelector(".finish");

    form.addEventListener('submit', (e) => e.preventDefault());

    let formStep = 0;

    prevBtn.addEventListener('click', () => {
        formStep--;
        stepNumbers[formStep + 1].classList.remove('active__number');
        updateFormSteps();
    });

    nextBtn.addEventListener('click', () => {
        if (formStep < steps.length - 1) {
            formStep++;
            updateFormSteps();
        };
    });

    function updateFormSteps() {
        steps.forEach(step => {
            step.classList.contains('active') && step.classList.remove('active');
        });
        steps[formStep].classList.add('active');
        stepNumbers[formStep].classList.add('active__number');

        if (formStep === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inherit';
        }

        if (formStep === steps.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'inherit';

            finishBtn.addEventListener('click', () => {
                form.style.display = 'none';
                finishBlock.style.display = 'block';
            });
        } else {
            finishBtn.style.display = 'none';
            nextBtn.style.display = 'inherit';
        };

        const actives = document.querySelectorAll('.active__number');
        const percent = (actives.length - 1) / (stepNumbers.length - 1) * 100 + '%';
        progress.style.width = percent;
    };
    updateFormSteps();
};


if (document.querySelector('.form__step')) {
    stepForm();

    function handleFileSelect(evt) {
        var file = evt.target.files;
        var f = file[0];

        if (!f.type.match('image.*')) {
            alert("Image only please....");
        }
        var reader = new FileReader();

        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var bodyPrev = document.querySelector('.profile-uploader__body');
                bodyPrev.innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
            };
        })(f);

        reader.readAsDataURL(f);
    }
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
};