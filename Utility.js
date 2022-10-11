
function twoDimensionArray(a, b) {
    let hoopPos = {}
    let arr = new Array(a)
    let hoopsArr = [100,200,300]

    // creating two dimensional array
    for (let i = 0; i< a; i++) {
            arr[i] = new Array(b).fill(0)
        }

       i= parseInt(a/2)

// 1 denotes Node, X Blocked Area, 0 denotes empty area and is used to place Hoops

        for(let j = 0; j<b ; j=j+4)
       {
         arr[i][j]= 1
         arr[i+1][j]= 'X'
         arr[i-1][j]= 'X'

         if(j-2>0){
            arr[i+1][j-2]= 'X'
            arr[i-1][j-2]= 'X'
         }
        if(j+2<b)
        {   
            arr[i+2][j+2]= 1
            arr[i-2][j+2]= 1 

            arr[i+3][j+2]= 'X'
            arr[i-3][j+2]= 'X'

            if(j+4 < b-2)
            {arr[i+3][j+4]= 'X'
            arr[i-3][j+4]= 'X'}
            
        }
        if(j>=4 && j<b-4)
        {arr[i+4][j]= 1
        arr[i-4][j]= 1}
            
    }

    arr.forEach((ele, i) => {

       let pos1 = ele.includes(1)? ele.indexOf(1) : ele.indexOf('X')
       let pos2 = ele.includes(1)? ele.lastIndexOf(1) : ele.lastIndexOf('X')
       
    // distance betweeb two horizontal node is - 0 - like 1 - 0 - 1
        
        if(ele[pos1] == 1){
            for(let i=pos1 ; i<pos2 ; i= i+4)
            { 
                ele[i+1]= '-'
                ele[i+3]= '-'
            }
        }
        
        for(let i =0 ;i<pos1 ; i++)
        ele[i] = 'X'
        for(let i =pos2+1 ;i<b ; i++)
        ele[i] = 'X'

    })
   
    // code to randowmly place hoops along the paths

    let count =0
    while(count<10){
        let x = random(a)
        let y =  random(b)
        if(arr[x][y]==0){
            let hoopVal = random(3)
            hoopPos[x,y]= hoopsArr[hoopVal]
            arr[x][y] = hoopsArr[hoopVal]
            count++
        }
        
    }

    return arr;
}

// To generate random number
function random(a){
    return  Math.floor(Math.random()*a)
}
 
// Func to trigger findPar
function findNeighbourNodes( arr,m, n)
{
    let allpath = {}
    let  moves = [[-2,+2],[0,+4],[+2,+2]]
    findNeighbourNodeUtil(allpath,arr, m, n,4,0,moves); 
    // console.log(allpath)
    return allpath
    
}

function findNeighbourNodeUtil(allpath,arr, m, n, i, j,moves){

 let start = [i,j]
        allpath[start]=[]
        let temp = []

        if(j==n-1){
            return allpath
        }
        let x,y
        
        for(let k=0;k<moves.length;k++){
            x=i+moves[k][0]
            y=j+moves[k][1]
            if(x>=0 && x<=m-1 &&  y<=n-1 && arr[x][y]==1)
            temp.push([x,y])
            
            
        }
  
        temp.forEach(ele => {
            allpath[start].push(`${ele[0]},${ele[1]}`)
            findNeighbourNodeUtil(allpath,arr,m,n,ele[0],ele[1],moves)
        })
    }

function valuesAndHoops(path,result){
 
    let weights = []
    let weigh = [[-1,+1],[0,+2],[+1,+1]]
    let moves = [[-2,+2],[0,+4],[+2,+2]]
    let Total = 0
    for(let i =0 ;i<path.length-1 ; i++){

        // console.log(path[i])
       let pos1 =  String(path[i])
    //    [x1,y1]= pos1
       let pos2 =  String(path[i+1])

     let [x1,y1]= pos1.split(',')
    //  console.log(x1,y1)
     let [x2,y2]= pos2.split(',')
    //  console.log(x1+x2,y1+y2)
        moves.forEach((ele,k) => {
            // [m1,m2]=ele
            if(Number(x1)+ele[0] == Number(x2) && Number(y1)+ele[1] == Number(y2) )
                {
                    weights.push([Number(x1)+weigh[k][0],Number(y1)+weigh[k][1]])
                    Total = Total + result[Number(x1)+weigh[k][0]][Number(y1)+weigh[k][1]]
                }
            
        }) 
}
// weightsObj[key].Path = Arr
// weightsObj[key].Total = Total
console.log(`\n`)
console.log('Path from Start to End')
console.log(path)
console.log('Weights array and Total values of Hoops collected in the path')
console.log('Weights (Area crossed which may contain Hoops Positions)',weights)
console.log('Total',Total)
console.log(`\n`)
}

module.exports = {twoDimensionArray,findNeighbourNodes,findNeighbourNodeUtil,valuesAndHoops}