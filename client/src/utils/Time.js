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

  console.log(minutes % 60);
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

class TimeNode {
  constructor(startTime, endTime) {
    this.st = startTime;
    this.et = endTime;
    this.offset = 0;
    this.next = null;
    this.down = null;
  }
}


class TimeTree {
  constructor() {
    this.root = null;
  }

  navigateTimeNode = (curNode, newNode) => {
    if (!curNode) {

    }

    while (curNode.next) {
      if (curNode.st <= newNode.st && curNode.et >= newNode.et) {

      }

      curNode = curNode.next;
    }

    if (curNode) {
      curNode.next = newNode;
    }
  }
  insertTimeNode = (st, et) => {
    let newNode = new TimeNode(st, et);

    if (!this.root) {
      newNode.offset = 0;
    } else {
      let tempNode = this.root;

      this.navigateTimeNode(tempNode, newNode);
    }
  }
}

