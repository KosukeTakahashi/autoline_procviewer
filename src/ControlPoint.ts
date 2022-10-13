export default class ControlPoint {
    private _consecutiveNumber : number;
    public get consecutiveNumber() : number {
        return this._consecutiveNumber;
    }
    public set consecutiveNumber(v : number) {
        this._consecutiveNumber = v;
    }
    
    private _score : number;
    public get score() : number {
        return this._score;
    }
    public set score(v : number) {
        this._score = v;
    }
    
    private _x : number;
    public get x() : number {
        return this._x;
    }
    public set x(v : number) {
        this._x = v;
    }
    
    private _y : number;
    public get y() : number {
        return this._y;
    }
    public set y(v : number) {
        this._y = v;
    }
    
    private _isCorner : boolean;
    public get isCorner() : boolean {
        return this._isCorner;
    }
    public set isCorner(v : boolean) {
        this._isCorner = v;
    }
    
    private _shouldSplit : boolean;
    public get shouldSplit() : boolean {
        return this._shouldSplit;
    }
    public set shouldSplit(v : boolean) {
        this._shouldSplit = v;
    }

    constructor(n: number, score: number, x: number, y: number, isCorner: boolean, shouldSplit: boolean) {
        this._consecutiveNumber = n
        this._score = score
        this._x = x
        this._y = y
        this._isCorner = isCorner
        this._shouldSplit = shouldSplit
    }
}
