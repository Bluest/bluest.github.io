import { Vector2 } from './vector2.js';

let scrollableViewport = document.getElementById('scrollable-viewport');
let canvas = document.getElementById('background-canvas');
let context = canvas.getContext('2d');

updateViewportSize();

const dotGap = 20;
const dotColour = 102;
const backgroundColour = 68;
const radiusAffected = 10;

/** @type {Vector2} */
let previousPosition = null;

drawAllDots();

window.addEventListener('resize', (_) => {
    updateViewportSize();
    drawAllDots();
});

window.addEventListener('mousemove', (event) => {
    if (previousPosition) resetDotsAround(previousPosition);
    pushDotsAround(event);
    previousPosition = event;
});

function updateViewportSize() {
    scrollableViewport.style.width = `${window.innerWidth}px`;
    scrollableViewport.style.height = `${window.innerHeight}px`;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * @param {Vector2} position
 */
function drawDot(position) {
    context.beginPath();
    context.arc(
        position.x,
        position.y,
        3,
        0,
        2 * Math.PI,
        false
    );
    context.fill();
}

function drawAllDots() {
    const dotArrayRows = canvas.height / dotGap;
    const dotArrayColumns = canvas.width / dotGap;

    context.fillStyle = `rgb(${dotColour}, ${dotColour}, ${dotColour})`;
    for (let row = 0; row < dotArrayRows; ++row) {
        for (let column = 0; column < dotArrayColumns; ++column) {
            drawDot(new Vector2(column * dotGap + dotGap / 2, row * dotGap + dotGap / 2));
        }
    }
}

/**
 * @param {Vector2} position
 */
function resetDotsAround(position) {
    const topLeft = new Vector2(
        Math.floor(position.x / dotGap) * dotGap - radiusAffected * dotGap,
        Math.floor(position.y / dotGap) * dotGap - radiusAffected * dotGap
    );

    context.clearRect(
        topLeft.x,
        topLeft.y,
        (2 * radiusAffected + 1) * dotGap,
        (2 * radiusAffected + 1) * dotGap
    );

    context.fillStyle = `rgb(${dotColour}, ${dotColour}, ${dotColour})`;
    for (let row = 0; row < 2 * radiusAffected + 1; ++row) {
        for (let column = 0; column < 2 * radiusAffected + 1; ++column) {
            drawDot(new Vector2(
                topLeft.x + column * dotGap + dotGap / 2, 
                topLeft.y + row * dotGap + dotGap / 2
            ));
        }
    }
}

/**
 * @param {Vector2} position
 */
function pushDotsAround(position) {
    const topLeft = new Vector2(
        Math.floor(position.x / dotGap) * dotGap - radiusAffected * dotGap,
        Math.floor(position.y / dotGap) * dotGap - radiusAffected * dotGap
    );
    context.clearRect(
        topLeft.x,
        topLeft.y,
        (2 * radiusAffected + 1) * dotGap,
        (2 * radiusAffected + 1) * dotGap
    );

    for (let row = 0; row < 2 * radiusAffected + 1; ++row) {
        for (let column = 0; column < 2 * radiusAffected + 1; ++column) {
            const dotPosition = new Vector2(
                topLeft.x + column * dotGap + dotGap / 2,
                topLeft.y + row * dotGap + dotGap / 2
            );

            let offset = new Vector2();
            let fillColour = dotColour;

            const vectorFromCursor = Vector2.subtract(dotPosition, event)
            const sqrDistanceFromCursor = Vector2.sqrMagnitude(vectorFromCursor);

            if (sqrDistanceFromCursor === 0) fillColour = backgroundColour;
            else {
                const t = sqrDistanceFromCursor / (radiusAffected * dotGap) ** 2;
                if (t < 1) {
                    offset = Vector2.multiplyScalar(
                        Vector2.normalize(vectorFromCursor),
                        (1 - t) ** 5 * radiusAffected * dotGap * 0.2
                    );
                    fillColour = (1 - t / 5) * backgroundColour + t * 5 * dotColour;
                    if (fillColour > dotColour) fillColour = dotColour;
                }
            }

            context.fillStyle = `rgb(${fillColour}, ${fillColour}, ${fillColour})`;
            drawDot(Vector2.add(dotPosition, offset));
        }
    }
}
