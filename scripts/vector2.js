export class Vector2 {
    x;
    y;

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Vector2[]} vectors
     */
    static add(...vectors) {
        return vectors.reduce((previousValue, currentValue) =>
            new Vector2(previousValue.x + currentValue.x, previousValue.y + currentValue.y)
        );
    }

    /**
     * @param {Vector2[]} vectors
     */
    static subtract(...vectors) {
        return vectors.reduce((previousValue, currentValue) =>
            new Vector2(previousValue.x - currentValue.x, previousValue.y - currentValue.y)
        );
    }

    /**
     * @param {Vector2} vector
     * @param {number} scalar
     */
    static multiplyScalar(vector, scalar) {
        return new Vector2(vector.x * scalar, vector.y * scalar);
    }

    /**
     * @param {Vector2} vector
     * @param {number} scalar
     */
    static divideScalar(vector, scalar) {
        return new Vector2(vector.x / scalar, vector.y / scalar);
    }

    /**
     * @param {Vector2} vector
     */
    static sqrMagnitude(vector) {
        return vector.x ** 2 + vector.y ** 2;
    }

    /**
     * @param {Vector2} vector
     */
    static magnitude(vector) {
        return Math.sqrt(Vector2.sqrMagnitude(vector));
    }

    /**
     * @param {Vector2} vector
     */
    static normalize(vector) {
        const magnitude = Vector2.magnitude(vector);
        return new Vector2(vector.x / magnitude, vector.y / magnitude);
    }
}
