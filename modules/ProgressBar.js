const clui = require('clui');
const clear = clui.Clear;

const Line = clui.Line;
const Progress = clui.Progress;

function ProgressBar(title, maxValue) {
  this.draw = (value) => {
    clear();

    const progressBar = new Progress(70);
    new Line()
      .column(title, 20)
      .column(progressBar.update(value, maxValue))
      .padding(4)
      .column(`${value}/${maxValue}`, 20)
      .fill()
      .output();
  }

  this.finish = () => clear();
};

module.exports = {
  ProgressBar
}

