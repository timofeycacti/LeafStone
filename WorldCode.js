//By timofeycacti in Github 
let RBlocks=[];
let lb=[] //litten up blocks
let cacti=[] //"Cactuses" is wrong, according to grammar


function bget(x,y,z){
  return api.getBlock(x,y,z);
}

mullis=0
function tick(){
if (lb.length>0){
	let [xx,yy,zz] = lb.shift();
	let matrix=[[-1,0],[0,-1],[0,1],[1,0]]	
	for (let b of matrix){
    if (bget(xx+b[0],yy,zz+b[1]) == "Dirt") {
      api.setBlock(xx+b[0],yy,zz+b[1],"Grass Block");
    } else if (bget(xx+b[0],yy,zz+b[1]) == "Grass Block") {
      api.setBlock(xx+b[0],yy,zz+b[1],"Dirt");
	}
	}
	api.setBlock(xx,yy,zz,"Maple Leaves")
}

if ((mullis%25)==0){ //Every 25 Ticks
for (let block of cacti){
Light(block[0],block[1],block[2]) //Light every Cactus block
}
}


mullis++
}

function Light(x,y,z){
  let DRA = [[x,y,z]]; // Dynamic Redstone Array
  let RBlocks=[];
  while (DRA.length > 0) {
    let [xx,yy,zz] = DRA.shift();
	let matrix=[[-1,0],[0,-1],[0,1],[1,0]]	
	for (let b of matrix){
    if (bget(xx+b[0],yy,zz+b[1]) == "Maple Leaves") {
      DRA.push([xx+b[0],yy,zz+b[1]]);
      RBlocks.push([xx+b[0],yy,zz+b[1]]);
	  api.setBlock([xx+b[0],yy,zz+b[1]],"Fruity Maple Leaves")
	  lb.push([xx+b[0],yy,zz+b[1]])
    } else if (bget(xx+b[0],yy,zz+b[1]) == "Dirt") {
      api.setBlock(xx+b[0],yy,zz+b[1],"Grass Block");
    } else if (bget(xx+b[0],yy,zz+b[1]) == "Grass Block") {
      api.setBlock(xx+b[0],yy,zz+b[1],"Dirt");
	}
  }
}

for (let i of RBlocks){
lb.pop(lb.indexOf(i))
api.setBlock(i,"Maple Leaves")
}


}


function onPlayerAltAction(id,x,y,z,block){
  if (block == "Maple Wood Planks") {
    Light(x,y,z);
  }
}

function onPlayerJoin(id){
api.clearInventory(id)
api.giveItem(id,"Maple Leaves",999,{customDisplayName:"Wire"})
api.giveItem(id,"Maple Wood Planks",999,{customDisplayName:"Lever"})
api.giveItem(id,"Dirt",999,{customDisplayName:"Lamp"})
api.giveItem(id,"Fat Cactus",999,{customDisplayName:"Impulse Cactus"})

api.sendMessage(id,"Welcome to the Leafstone Beta by cvetochekcactus!\n P.S. Activate the lever by RMBing it!")
}

function playerCommand(id,cmd){

if (cmd == "bugged"){ // a debug command to see all "bugged" blocks
api.log(lb)
}
api.log(cmd)
}

function onPlayerChangeBlock(id,x,y,z,from,to){
if (to=="Fat Cactus"){
cacti.push([x,y,z])
} else if (from.startsWith("Fat Cactus")){
cacti.pop(cacti.indexOf([x,y,z]))
}
}


