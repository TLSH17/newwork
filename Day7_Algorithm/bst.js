function createTreeNode(value){
    //do some checking
    if (value === null) {
        console.error('cannot create an empty tree')
    } else return{
        value,
        left: null,
        right: null,
    }
}

// create BST function using createTreeNode
// should provide the following methods
// get root of tree
// add element to tree
// remove element from tree
// list elements from tree in ascending order

function createBST(inputValue){
    let root = createTreeNode(inputValue);

    return{
        //get root of tree
        getRoot: function(){
            return root.value;
        },
        //insert element in tree
        insert: function(value){
            // step1 : traverse root/the next current node
            // step2 : check if the element is smaller/larger than root, and check if left/right child is occupied?
            // step3 : if occupied, go to left/right child and check again
            // step4 : on success find node with empty left/right child, insert node
            // 放新數字入去個Tree到


            let newElement = createTreeNode(value);

            if (root.value === null){
                console.log('this is an empty tree');
                return;
            }

            const findInsert = (treeNode) =>{
                // decide look direction
                // check that direction
                // if occupied, go deep node
                // until you found that empty child place
                const direction = treeNode.value > value ? "left" : "right"; //決定insert 數字方向，轉左定轉右

                if (treeNode[direction] === null){
                    treeNode[direction] = newElement;
                } else{
                    findInsert(treeNode[direction])
                }
            }

            findInsert(root);


        },
        //remove element from tree
        remove:()=>{
        
        },
        //list elements from tree in ascending order
        list:(treeNode)=>{
            // check root if empty or not
            if ( root === null){
                console.log('this is an empty tree, nothing to list');
                return;
            }

            const findNext = (treeNode) =>{


                if(treeNode === null){ // check下有無後代，跟住閃人
                    return;
                }
                // go look to left first
                findNext(treeNode.left)
                console.log(treeNode.value)
                // go look to right
                findNext(treeNode.right)            
            }
            

            findNext(root);
        }
    }
}

let A_tree = createBST(15); //樹頂個數字

console.log('check root of tree',A_tree.getRoot());

A_tree.insert(1);
A_tree.insert(12);
A_tree.insert(20);

console.log('check bst', A_tree.list())