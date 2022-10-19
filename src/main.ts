import ControlPoint from './ControlPoint'

const CP_DISPLAY_SIZE = 7
const CP_LT_SHIFT = Math.floor(CP_DISPLAY_SIZE / 2)

const imageInput: HTMLInputElement = document.querySelector('#input-image-file')!
const csvInput: HTMLInputElement = document.querySelector('#input-ctrl-pts-file')!
const canvas: HTMLCanvasElement = document.querySelector('#draw-area')!
const coordText: HTMLPreElement = document.querySelector('#cursor-coordinates')!
// const cpDisplay: HTMLPreElement = document.querySelector('#cp-display')!
const cpDisplayTable: HTMLDivElement = document.querySelector('#cp-display')!

const canvasContext = canvas.getContext('2d')!

const image: HTMLImageElement = new Image()
const controlPoints: ControlPoint[] = []
let ctrlPtsMap: {[key: string]: ControlPoint[]} = {}

const displayCtrlPtData = (cps: ControlPoint[] | undefined) => {
    if (!cps) {
        cpDisplayTable.innerHTML = ''
    }
    else {
        cpDisplayTable.innerHTML = ''
        for (const cp of cps) {
            const preElement = document.createElement('pre')
            preElement.innerText = `#${cp.consecutiveNumber}\n${cp.score}\nat (${cp.x}, ${cp.y})\nis_corner: ${cp.isCorner}\nshould_split: ${cp.shouldSplit}`
            cpDisplayTable.appendChild(preElement)
        }
    }
}

const getMouseCoorOnCanvas = (mouseMoveEvent: MouseEvent) => {
    const canvasRect = canvas.getBoundingClientRect()
    const x = mouseMoveEvent.clientX - canvasRect.left
    const y = mouseMoveEvent.clientY - canvasRect.top
    return [Math.floor(x), Math.floor(y)]
}

const redrawCanvas = () => {
    canvas.width = image.width
    canvas.height = image.height
    canvasContext.drawImage(image, 0, 0)

    for (const cp of controlPoints) {
        if (cp.isCorner) {
            canvasContext.fillStyle = 'green'
        }
        else if (cp.shouldSplit) {
            canvasContext.fillStyle = 'blue'
        }
        else {
            canvasContext.fillStyle = 'red'
        }

        canvasContext.fillRect(
            cp.x - CP_LT_SHIFT,
            cp.y - CP_LT_SHIFT,
            5,
            5
        )
    }
}

canvas.onmousemove = (event) => {
    const [x, y] = getMouseCoorOnCanvas(event)
    // const cp = ctrlPtsMap[`${x},${y}`]
    const cps = Array.from({length: CP_DISPLAY_SIZE}, (_, k) =>
        Array.from({length: CP_DISPLAY_SIZE}, (_, l) =>
            ctrlPtsMap[`${x-CP_LT_SHIFT+k},${y-CP_LT_SHIFT+l}`]
        ).reduce((prev, current, _idx, _arr) => prev ? prev : current)
    ).reduce((prev, current, _idx, _arr) => prev ? prev : current)
    
    coordText.textContent = `mouse: (${x}, ${y})`
    displayCtrlPtData(cps)
}

imageInput.oninput = async () => {
    if (imageInput.files) {
        const file = imageInput.files[0]
        const brobURL = window.URL.createObjectURL(file)
        image.src = brobURL
        image.onload = redrawCanvas
    }
}

csvInput.oninput = async () => {
    // 古い制御点群を消去
    controlPoints.length = 0
    ctrlPtsMap = {}

    if (csvInput.files) {
        const file = csvInput.files[0]
        const lines = (await file.text()).split('\n')
        for (const line of lines) {
            const [n, score, x, y, isCorner, shouldSplit, ..._] = line.split(',')
            const cp = new ControlPoint(
                parseInt(n),
                parseFloat(score),
                parseInt(x),
                parseInt(y),
                parseInt(isCorner) == 0 ? false : true,
                parseInt(shouldSplit) == 0 ? false : true)
            controlPoints.push(cp)
            // ctrlPtsMap[`${x},${y}`] = cp
            if (!ctrlPtsMap[`${x},${y}`]) {
                ctrlPtsMap[`${x},${y}`] = []
            }
            ctrlPtsMap[`${x},${y}`].push(cp)
        }

        redrawCanvas()
    }
}
