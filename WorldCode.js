//By timofeycacti on Github!
let RBlocks=[]; 

function bget(x,y,z){ //simplifying the function
  return api.getBlock(x,y,z);
}

function Light(x,y,z){
  let DRA = [[x,y,z]]; // Dynamic Redstone Array
  let RBlocks=[];
  while (DRA.length > 0) {
    let [xx,yy,zz] = DRA.shift();
	let matrix=[[-1,0],[0,-1],[0,1],[1,0]]	//Relative cords, show the program, where to check the blocks
	for (let b of matrix){
    if (bget(xx+b[0],yy,zz+b[1]) == "Maple Leaves") {
      DRA.push([xx+b[0],yy,zz+b[1]]);
      RBlocks.push([xx+b[0],yy,zz+b[1]]);
	  api.setBlock([xx+b[0],yy,zz+b[1]],"Fruity Maple Leaves")
    } else if (bget(xx+b[0],yy,zz+b[1]) == "Dirt") {
      api.setBlock(xx+b[0],yy,zz+b[1],"Grass Block");
    } else if (bget(xx+b[0],yy,zz+b[1]) == "Grass Block") {
      api.setBlock(xx+b[0],yy,zz+b[1],"Dirt");
	}
  }
}

for (let i of RBlocks){
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
api.sendMessage(id,"Welcome to the Leafstone Beta by cvetochekcactus!\n P.S. Activate the lever by RMBing it!")
}
