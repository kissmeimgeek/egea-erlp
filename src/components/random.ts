export function randomInt(n:number) {
    return Math.floor(Math.random() * n)
}

export function randomFloat(n:number, what?:boolean) {
    return Math.random() * n
}

export function range(start:number, end:number, useFloat:boolean = false) {
    // case where there is no range
    if (end === start) {
        return end
    }

    if (useFloat) {
        return randomFloat(end - start, true) + start
    } else {
        let range
        if (start < 0 && end > 0) {
            range = -start + end + 1
        } else if (start === 0 && end > 0) {
            range = end + 1
        } else if (start < 0 && end === 0) {
            range = start - 1
            start = 1
        } else if (start < 0 && end < 0) {
            range = end - start - 1
        } else {
            range = end - start + 1
        }
        return randomInt(range) + start
    }
}