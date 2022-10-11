const utilFunc = require ('./Utility');

class Graph {

    constructor(noOfVertices)
    {
        this.finalPath = {}
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
        this.count = 0;
        this.counter = {}
    }
 
 
    addVertex(v)
{
    // initialize adj list with null Array
    this.AdjList.set(v, []);
}
    // add edge to the graph
addEdge(v, w)
{
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.AdjList.get(v).push(w);
 
}
    // Prints the vertex and adjacency list
printGraph()
{
    // get all the vertices
    var get_keys = this.AdjList.keys();
 
    // iterate over the vertices
    for (var i of get_keys)
{
        var get_values = this.AdjList.get(i);
        var conc = "";
        for (var j of get_values)
            conc += j + " ";
        console.log(i + " -> " + conc);
    }
}

printfinalAndCount(){

    console.log(this.finalPath)
     console.log(this.count)
  
}

printAllPathsHelper( start,  end,  isVisited, tempPathList)
{
    if (start == end) {
        
        this.count++
        this.finalPath = Object.assign({},this.finalPath,{[`${this.count}`]: [...tempPathList]})
        //uncomment to see all the paths being generated from start to end
        // console.log(tempPathList)
        return 
    }

    isVisited[start] = true;

    let  get_values = this.AdjList.get(start);
    for (let i of get_values) {
        if (!isVisited[i]) {
            tempPathList.push(i);
            this.printAllPathsHelper(i, end, isVisited, tempPathList);
            // tempPathList.pop(i);//backtracking
            const index = tempPathList.indexOf(i);
            if (index > -1) { 
                tempPathList.splice(index, 1); // remove one item only
            }
        }
    }
    isVisited[start] = false;
}

 printAllPaths( source, dest)
{
    let  isVisited = [];
    let pathList = []
    pathList.push(source);
     this.printAllPathsHelper(source, dest, isVisited, pathList);
}

}

function main(){
    
    const x = 9; // row length
    const y = 25; // Cloumn length
    let source = '4,0'; // Start Point
    let  dest = '4,24'; // End Point
    let max = 0, min = 10 , maxKey = 0, minKey =0 // variables to find longest and shortest paths
    // let weightsObj = {key : {}}

    // create 2D array Data Model
    const result = utilFunc.twoDimensionArray(x, y);
    console.log(`\n`)
    console.log('2D Data Array')
    result.forEach(ele => {
        ele.forEach(e => {
         process.stdout.write(String(e));
         
         // process.stdout.write(e);
     })
     console.log('')
 })

// Find all reachable node from every node starting (4,0)- Starting point
let allpath = utilFunc.findNeighbourNodes(result, x, y)
let key = Object.keys(allpath)
  //Create Graph from the Node : Neighbouring Reachable Node 
let g = new Graph(key.length);
let vertices = [ ...Object.keys(allpath)];

// adding vertices
for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}
 
// adding edges
Object.entries(allpath).forEach(ele =>{
    const [val, valArr] = ele
    valArr.forEach(e => {
        g.addEdge(val,e)
    })
    
})

// Replace Node with char Value for Displaying to perform this above Graph would be served with Converted Keys Array

// const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD"];
// let mapping = {}

// key.forEach((ele,i) => {

//     mapping[ele] = alphabet[i]
// })
// let keyMap = {}
// Object.entries(allpath).forEach(ele=> {
//     const [k, valArr] = ele
//         let newArr = []
//       newArr = valArr.map(e => {
//         // console.log(mapping[e])
//           return mapping[e]
//      })
    
//      keyMap[mapping[k]] = newArr
// })

// Print Graph
console.log(`\n`)
console.log("Details of Neighbouring nodes beginning from 4,0 start point : ");
g.printGraph();
g.printAllPaths(source, dest)
// g.printfinalAndCount()



//finalPath contains list of all the possible paths from Start point to End

Object.entries(g.finalPath).forEach(ele => {
    
    const [key , Arr] = ele
    if(Arr.length > max)
     {max = Arr.length 
     maxKey = key}
     if(Arr.length < min)
    {
        min = Arr.length
        minKey = key
    }

    g.counter[Arr.length] = !g.counter[Arr.length]? 1 : g.counter[Arr.length]+1
})

//counter to track the no. of paths of different length
// console.log(g.counter) 
// console.log('max',max)
// console.log('maxKey',maxKey)
// console.log('min',min)
// console.log('minKey',minKey)
// console.log(min)
let maxPath = g.finalPath[maxKey]
let minPath = g.finalPath[minKey]

console.log(`\n`)
console.log('length : Count details for all the paths')
console.log(g.counter)
console.log(`\n`)
console.log('Longest Path from Start to End of length',max)
let w1 = utilFunc.valuesAndHoops(maxPath,result)
console.log(`\n`)
console.log('Smallest Path from Start to End of length',min)
let w2 = utilFunc.valuesAndHoops(minPath,result)


}

main() // Driver Function