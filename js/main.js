const coursesBtns = document.querySelectorAll('#courses button');
const moduleSelector = document.getElementById('module-selector');
const lessonSelector = document.getElementById('lesson-selector');
const message = document.getElementById('message');
const lessonTitle = document.getElementById('lesson-title');
const homework = document.getElementById('homework');
const applyBtn = document.getElementById('apply-selector');
const cpyBtn = document.getElementById('copyBtn');
let lessonsData,
    selectorCourse = 'PS1',
    selectorModule = '',
    selectorLesson = '';

fetch('js/lessonsData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки файла');
    }
    return response.json();
  })
  .then(jsonData => {
    lessonsData = jsonData;
    main();
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });

function main() {
    applyBtn.onclick = () => {
        selectorModule = moduleSelector.value;
        selectorLesson = lessonSelector.value;
        let data = lessonsData[selectorCourse][selectorModule][selectorLesson];
        lessonTitle.value = data.topic;
        homework.value = data.hw;
    }

    cpyBtn.onclick = () => {
      let hiddenTextarea = document.querySelector('#hiddenTextarea'),
          toCopy = `Добрый день! Сегодня на занятии мы прошли тему ${lessonTitle.value}.\nДомашнее задание: ${homework.value}`;
      hiddenTextarea.value = toCopy;
      hiddenTextarea.select();
      document.execCommand('copy');
    }
}

coursesBtns.forEach(btn => {
  btn.onclick = () => {
      selectorCourse = btn.innerHTML;
      coursesBtns.forEach(btn => btn.classList.remove('current'));
      btn.classList.add('current');
  }
})