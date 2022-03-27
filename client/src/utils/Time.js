import { throws } from "assert";



/**
 * Minutes is number 0 <= m <= 1440 (minutes in a day). Return
 * string representation of that:
 * 
 * i.e. 660 => "11:00PM"
 *      0   => "12:00AM"
 * 
 * @param {number} minutes Minutes to convert
 */
export function minutesToTimeString(minutes) {
    let hour = '';
    let min = '';
    let period = "am";

    hour = Math.floor(minutes / 60);

    if (hour > 12) {
        hour -= 12;
        period = "pm";
    }

    min = (minutes % 60);

    return `${hour}${min == 0 ? "" : ":"}${min == 0 ? "" : min}${period}`
}

/**
 * Opposite of other functipon.
 * @param {string} timeString String to convert
 */
function timeStringToMinutes(timeString) {

}

export const TIME_INDEX_LOOKUP = {
    0: "12 AM",
    1: "1 AM",
    2: "2 AM",
    3: "3 AM",
    4: "4 AM",
    5: "5 AM",
    6: "6 AM",
    7: "7 AM",
    8: "8 AM",
    9: "9 AM",
    10: "10 AM",
    11: "11 AM",
    12: "12 PM",
    13: "1 PM",
    14: "2 PM",
    15: "3 PM",
    16: "4 PM",
    17: "5 PM",
    18: "6 PM",
    19: "7 PM",
    20: "8 PM",
    21: "9 PM",
    22: "10 PM",
    23: "11 PM"
}

export class TimeTree {
    constructor() {
        this.root = null;
    }

    bfs = (node, offset, items) => {

        if (node.next) {
            this.bfs(node.next, offset, items)
        }

        if (node.down) {
            this.bfs(node.down, offset + 1, items)
        }

        node.offset = offset;
        items.push(node);
    }

    getItems = () => {
        const items = [];

        this.bfs(this.root, 0, items);

        return items;
    }

    _fullOverlap = (a, b) => {
        return a.startTime <= b.startTime && a.endTime >= b.endTime;
    }



    insertTimeNode = (node) => {
        let newNode = { ...node, offset: 0, next: null, down: null, up: null, prev: null };
        // this.items.push(newNode);
        if (!this.root) {
            newNode.offset = 0;
            this.root = newNode;
        } else {
            let tempNode = this.root;

            console.log("INSERTING this node [%s, %s]...", 
                minutesToTimeString(node.startTime), 
                minutesToTimeString(node.endTime));
            while (tempNode) {
                /* They overlap entirely */
                if (this._fullOverlap(tempNode, newNode)) {
                    console.log("A CASE!");
                    if (!tempNode.down) {

                        tempNode.down = newNode;
                        newNode.up = tempNode;
                        break;
                    } else {
                        tempNode = tempNode.down;
                    }
                }
                /* The new node  overlap the existing node entirely*/
                else if (this._fullOverlap(newNode, tempNode)) {
                    console.log("B CASE!");
                    const isRoot = tempNode == this.root;

                    if (tempNode.up) {
                        tempNode.up.down = newNode;
                        newNode.up = tempNode.up;
                    }

                    if (tempNode.prev) {
                        tempNode.prev.next = newNode;
                        newNode.prev = tempNode.prev;
                    }

                    newNode.down = tempNode;
                    tempNode.up = newNode;

                    let nextNode = tempNode.next;
                    newNode.next = null;

                    if (tempNode.next) {
                        tempNode.next = null;
                    }

                    while (nextNode) {
                        this.insertTimeNode(nextNode);
                        nextNode = nextNode.next;
                    }


                    if (isRoot) {
                        this.root = newNode;
                    }

                    break;
                }
                /* New node overlaps existing node in the st of existing and et of new */
                else if (newNode.endTime > tempNode.startTime && newNode.startTime < tempNode.startTime) {
                    console.log("C CASE!");
                    if (!tempNode.down) {

                        tempNode.down = newNode;
                        newNode.up = tempNode;
                        break;
                    } else {
                        tempNode = tempNode.down;
                    }
                }
                else if (newNode.startTime > tempNode.endTime && newNode.endTime < tempNode.endTime) {
                    console.log("D CASE!");
                    if (!tempNode.down) {

                        tempNode.down = newNode;
                        newNode.up = tempNode;
                        break;
                    } else {
                        tempNode = tempNode.down;
                    }
                }
                else if (newNode.startTime < tempNode.endTime && newNode.endTime > tempNode.endTime) {
                    console.log("E CASE!");
                    if (!tempNode.down) {

                        tempNode.down = newNode;
                        newNode.up = tempNode;
                        break;
                    } else {
                        tempNode = tempNode.down;
                    }
                }
                /* They don't overlap at all */

                else {
                    console.log("F CASE!");
                    if (!tempNode.next) {

                        tempNode.next = newNode;
                        newNode.prev = tempNode;
                        break;
                    } else {
                        tempNode = tempNode.next;
                    }
                }
            }

            console.log("DONE with this node [%s, %s]...", 
                minutesToTimeString(node.startTime), 
                minutesToTimeString(node.endTime));
        }
    }
}


/**
 * { st: 600, et: 660 } -> { st: 720, et: 780 }
 * 
 * {st: 600, et: 840 }
 * 
 * {600, 840}
 *  |
 *  V
 * {600, 660} -> {720, 780}
 *                            {810, 900}
 *                    {740, 790}
 *                       
 */
