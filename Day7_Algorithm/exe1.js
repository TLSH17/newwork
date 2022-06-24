function createListNode(value) {
    return {
        value,
        next: null,
    };
}



function createSinglyLinkedList() {
    /**
     * @type {ListNode|null}
     */
    let head = null;

    return Object.freeze({
        addNewNode: () => {
            console.log("add a new node");
        },
        displayAllNodeValues: () => {
            console.log("display all the node values");
        },
        displayMiddleNodeValue: () => {
            console.log("display the middle node value");
        },
    });
}

let sing = createSinglyLinkedList(10);

console.log(sing)


/**
 * @param {number} value
 */
 addNewNode: (value) => {
    const newNode = createListNode(value);
    if (head === null) {
        head = newNode;
        return;
    }

    let current = head;
    while (current.next !== null) {
        current = current.next;
    }

    // current now is the last node of the list !!
    current.next = newNode;
};

displayAllNodeValues: () => {
    if (head === null) {
        console.log("the list is empty!!!");
        return;
    }

    let current = head;
    do {
        console.log(current.value);
        current = current.next;
    } while (current !== null);
};
