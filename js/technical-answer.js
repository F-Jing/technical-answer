const questions = {
  data: {
    content: [
      {
        "title": "4%2 的值为",
        "options": [0, 1, 2, 4],
        "correct": 0,
      },
      {
        "title": "\"0\" == false 的值为",
        "options": ["true", "false"],
        "correct": 0,
      },
      {
        "title": "不设置cookie设置过期时间，cookie的默认时间长度为",
        "options": ["立刻过期", "永不过期", "cookie 无法设置", "在浏览器会话结束时过期"],
        "correct": 3,
      },
      {
        "title": "+new Array(042) 的值为",
        "options": ["43", "NaN", "42", "Error"],
        "correct": 1,
      },
      {
        "title": "数组的方法中，哪些方法不能改变自身数组？",
        "options": ["pop", "splice", "sort", "concat"],
        "correct": 3,
      },
      {
        "title": "Number(null); 的值为：",
        "options": ["null", 0, "undefined", 1],
        "correct": 1,
      },
    ],
    current: 0,
    totalTrue: 0,
    totalFalse: 0,
  },
  init: function () {
    this.render();
    this.bind();
  },
  bind: function () {
    let container = document.getElementsByClassName('container')[0];
    this.onEventListener(container, 'click', 'submit', this.submit)
  },
  onEventListener(parentNode, action, childClassName, callback) {
    parentNode.addEventListener(action, function (e) {
      e.target.className.indexOf(childClassName) >= 0 && callback(e)
    })
  },
  render: function () {
    let title = this.data.content.map(data => data.title);
    let optionsArr = this.data.content.map(data => data.options);
    let current = this.data.current;
    let container = document.getElementsByClassName('container')[0];
    let optionToggle = document.getElementsByClassName('option')
    for (let i = 0; i < optionsArr[current].length; i++) {
      let optionElement = optionsArr[current].map((option, i) => {
        return `<span class="option" data-index="${i}">${option}</span>`
      }).join('')
      container.innerHTML = `
        <p class="stem" data-index="${i}">${title[current]}</p>` + optionElement + `<span class="submit">下一题</span>`
    }
    for (let n = 0; n < optionsArr[current].length; n++) {
      optionToggle[n].onclick = function () {
        for (let j = 0; j < optionsArr[current].length; j++) {
          optionToggle[j].className = "option"
        }
        this.className = "option active"
      }
    }
  },
  submit: function () {
    let content = questions.data.content;
    let current = questions.data.current;
    let correct = questions.data.content.map(data => data.correct);
    let option = document.getElementsByClassName('option');
    let container = document.getElementsByClassName('container')[0];
    if (questions.data.current < content.length - 1) {
      questions.data.current += 1;
    }
    let optionCeil = Array.prototype.slice.call(option)
    function className(optionCeil) {
      return optionCeil.className == "option"
    }
    if (optionCeil.every(className)) {
      let rlt = confirm('are you sure')
      if (rlt == false) {
        return false;
      }
    }
    if (option[correct[current]].className == "option active") {
      option[correct[current]].style.backgroundColor = 'rgba(128, 255, 128, 0.5)'
      questions.data.totalTrue += 1
    } else if (option[correct[current]].className == "option") {
      option[correct[current]].style.backgroundColor = 'rgba(128, 255, 128, 0.5)'
      for (let i = 0; i < optionCeil.length; i++) {
        if (option[i].className == "option active") {
          option[i].style.backgroundColor = 'rgba(255, 128, 128, 0.5)'
          questions.data.totalFalse += 1;
        }
      }
    }
    if (current == content.length - 1) {
      container.innerText = `总答题：${content.length} 答对：${questions.data.totalTrue} 答错：${questions.data.totalFalse}`
      return
    }
    setTimeout(() => {
      questions.render();
    }, 1000);
  }
}
questions.init();