import './style.css';

class Blackboard {
	constructor(
		public el = document.querySelector<HTMLCanvasElement>('#canvas')!,
		private app = el.getContext('2d')!,
		private width: number = el.width,
		private height: number = el.height,
		private btns: HTMLDivElement = document.createElement('div'),
		private bgColor = '#000',
		private lineColor = '#fff'
	) {
		this.initCanvas();
		this.bindEvent();
	}
	private bindEvent() {
		const moveEvent = this.drawLine.bind(this);

		this.el.addEventListener('mousedown', () => {
			this.app.beginPath();
			this.app.strokeStyle = this.lineColor;
			this.el.addEventListener('mousemove', moveEvent);
		});
		document.addEventListener('mouseup', () => {
			this.el.removeEventListener('mousemove', moveEvent);
		});
	}

	private drawLine(e: MouseEvent) {
		this.app.lineTo(e.offsetX, e.offsetY);
		this.app.stroke();
	}

	private initCanvas() {
		this.app.fillStyle = this.bgColor;
		this.app.fillRect(0, 0, this.width, this.height);

		this.el.insertAdjacentElement('afterend', this.btns);
	}

	public clear() {
		const el = document.createElement('button');
		el.innerText = '清屏';
		this.btns.insertAdjacentElement('afterbegin', el);

		el.addEventListener('click', () => {
			this.app.fillStyle = this.bgColor;
			this.app.fillRect(0, 0, this.width, this.height);
		});

		return this;
	}

	public setBgColor(color: string) {
		this.bgColor = color;
		this.app.fillStyle = color;
		this.app.fillRect(0, 0, this.width, this.height);

		return this;
	}

	public setLineColor(color: string) {
		this.lineColor = color;
	}
}
const instance = new Blackboard();

instance.clear();
