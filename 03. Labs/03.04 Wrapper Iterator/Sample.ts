class Vector<T> implements Iterable<T> {
    private arr: T[];
    private length: number = 0;
    private get capacity() { return this.arr.length; }

    constructor(capacity = 0) {
        this.arr = new Array(capacity);
    }

    public resize(length: number) {
        // two cases: length <= capacity, or length > capacity
        if (length > this.capacity)
            this.reserve(length);

        this.length = length;
    }

    public reserve(capacity: number) {
        if (this.capacity >= capacity) return;
        const copy = new Array(capacity * 2);
        for (let i = 0; i < this.length; i++)
            copy[i] = this.arr[i];
        delete this.arr; // optional
        this.arr = copy;
    }

    public get(index: number): T {
        if (index < 0) throw new Error("index must be positive");
        if (index >= this.length) return undefined;
        return this.arr[index];
    }

    public set(index: number, value: T) {
        if (index < 0) throw new Error("index must be positive");
        if (index >= this.length) throw new Error("index exceeds length");
        this.arr[index] = value;
    }

    public* [Symbol.iterator]() {
        for (let i = 0; i < this.length; i++)
            yield this.arr[i];
    }
}

const vec = new Vector<number>();
vec.resize(5);
vec.set(0, 10);
vec.set(1, 20);

output_list(vec);

function output_list(list: Iterable<any>) {
    // output each item in the list
    for (let elem of list)
        console.log(elem);
}