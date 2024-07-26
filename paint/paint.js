

//reassign const variables to let if they are casuing issues











//Notes

//Should round it if it is a circle as it gives very precise results
//Each paint needs a specific coverage aswell, but maybe ask and implement that later?


const prompt = require('prompt-sync')();


//define the paint brand types

const CrownPaint = new Map([
    ["priceLitres_10_5_1", [55, 33, 12]],
    ["colours", ["Red", "Blue", "Green"]],
    ["litresPerM2PerCoat", 0.14]
  ]);


const DuluxPaint = new Map([
    ["priceLitres_10_5_1", [98, 64, 21]],
    ["colours", ["Red", "Blue", "Green"]],
    ["litresPerM2PerCoat", 0.08]
  ]);


  const ArmsteadPaint = new Map([
    ["priceLitres_10_5_1", [57, 30, 11]],
    ["colours", ["Red", "Blue", "Green"]],
    ["litresPerM2PerCoat", 0.14]
  ]);



//nest the the paint brand maps
const paintBrands = new Map([
    ["Crown", CrownPaint],
    ["Dulux", DuluxPaint],
    ["Armstead", ArmsteadPaint]
  ]);





  //Each paint needs a specific coverage aswell, but maybe ask and implement that later?



console.log(paintBrands)



//print introduction
console.log("\n\n\n\n\n\n\n\n\n\nWelcome to the paint shop\n\n")

//list brands and their prices
// console.log("Paint Price list (£ per liter for 10, 5 and 1 liter cans):\n")
// paintBrands.forEach((values, keys) => {
//     console.log(keys, values);
// });









//testing inputs
// exampleRoomDetails = [53, 78, 154]
// console.log(exampleRoomDetails)
eachPaint = ArmsteadPaint


function calculatePricesForPaints(propertyTotalPaintNeeded) {

    //I think a way that would work is:
    //add as many largest as you can before overkill, then store overkill price in separate variable
    //and then continue to recursive smaller ones untill you get to the end, storing overkill separately each time
    //then compare and decide which is most cost effective.


    let cheapestCombinationPrice = Infinity;
    let cheapestCombination = [0, 0, 0];


    //CHANGE TO FOR EACH PAINT


    for (let [key, value] of paintBrands) {
        //console.log(value);

        eachPaint = value

        //console.log(eachPaint)
        //console.log(eachPaint.get("litresPerM2PerCoat"))

        let eachPaintPrices = eachPaint.get("priceLitres_10_5_1") 

        let litresNeeded = Math.ceil(eachPaint.get("litresPerM2PerCoat") * propertyTotalPaintNeeded)

        console.log("\n\n")
        console.log(key)

        // console.log(`litres needed to paint the thing (rounded up): ${litresNeeded}`)


        // console.log(`Cans of 10 needed : ${litresNeeded / 10} `)
        // console.log(`Cans of 10 needed (rounded up): ${Math.ceil(litresNeeded / 10)} `)

        // console.log(`Cans of 10 needed price: ${(litresNeeded / 10) * eachPaintPrices[0]} `)
        // console.log(`Cans of 10 needed (rounded up) price: ${Math.ceil(litresNeeded / 10) * eachPaintPrices[0]} \n\n`)



        //set variables for tracking combination cost
        let thisCost;
        let thisCombination = [];


        //set most basic combination (only 10s) as cheapest
        thisCombination = [Math.ceil(litresNeeded / 10),0,0];
        //calculate cost of basic combination and set as benchmark
        thisCost = Math.ceil(litresNeeded / 10) * eachPaintPrices[0];
        cheapestCombinationPrice = thisCost;
        cheapestCombination = thisCombination;
        //console.log(`Cost to just use cans of 10: ${thisCost} `);



        

        //alter tracked combination to account for changes
        //console.log(thisCombination)
        thisCombination[0] = thisCombination[0] - 1
        
        //revert current tracked cost
        thisCost = thisCost - eachPaintPrices[0];

        //calculate capacity left to fill when removing oversurplus unit of 10
        let remainingAfterTens = litresNeeded - ((Math.ceil(litresNeeded / 10) - 1) * 10);
        //console.log(`additional Cost to just use tens - 1 then 5s: ${Math.ceil(remainingAfterTens / 5) * eachPaintPrices[1]} `);

        //set current combination to the amount of 5ves used and calculate cost
        thisCombination[1] = Math.ceil(remainingAfterTens / 5);
        thisCost += Math.ceil(remainingAfterTens / 5) * eachPaintPrices[1];

        //console.log(`Cost: ${thisCost} `);
        //console.log(remainingAfterTens);


        //if price better than cheapest then set combination and price
        if (thisCost < cheapestCombinationPrice) {
            cheapestCombinationPrice = thisCost;
            cheapestCombination = thisCombination;
        }


        //console.log(thisCombination)
        thisCombination[1] = thisCombination[1] - 1;
        thisCost = thisCost - eachPaintPrices[1];
        //console.log(thisCombination)

        let remainingAfterFives = remainingAfterTens - ((Math.ceil(remainingAfterTens / 5) - 1) * 5);
        //console.log(`additional Cost to just use tens - 1 then 5s - 1 then 1s: ${Math.ceil(remainingAfterFives) * eachPaintPrices[2]} `);
        thisCombination[2] = Math.ceil(remainingAfterFives)
        thisCost += Math.ceil(remainingAfterFives) * eachPaintPrices[2];

        //console.log(`Cost: ${thisCost} `);
        //console.log(remainingAfterFives);


        //if price better than cheapest then set combination and price
        if (thisCost < cheapestCombinationPrice) {
            cheapestCombinationPrice = thisCost;
            cheapestCombination = thisCombination;
        }


        //print final price and combination
        console.log(`\n\nPrice to paint using ${key}: £${thisCost}`);
        console.log(`10 Litre cans needed: ${thisCombination[0]}\n5 Litre cans needed: ${thisCombination[1]}\n1 Litre cans needed: ${thisCombination[2]}\n\n`);


    }   

    // let remainingAfterOnes = remainingAfterFives - ((Math.ceil(remainingAfterFives)))
    // console.log(remainingAfterOnes)

    // if (litresNeeded % 10 == 0) {
    //     console.log("l needed is mult of 10")
    // } else {
    //     let Placeholder = litresNeeded (Math.ceil(litresNeeded / 10) - 1) * 10

    // }

    //so store cans of 5 needed rounded up price (to fill gap)
    //then take 1 (5 can) away from cans of 5 needed rounded up quantity
    //then repeat with 1s to fill the gap

    // 1 for 5 l can price   Math.ceil(litresNeeded / 10) * eachPaintPrices[1]

    //so store cans of 1 needed rounded up price (to fill gap)

    // 2 for 1 l can price   Math.ceil(litresNeeded / 10) * eachPaintPrices[2]

    //Then compare all the prices together and tell the user which is best (or do for all paints aswell if needed etc)


    //console.log(`remaining: ${litresNeeded % 10} `)



    //if the number of liters needed is less than 5 then the answer will either be 5 or some amount of 1s


    return
}

//EXAMPLE CALL
// calculatePricesForPaints(188)

// calculatePricesForPaints(20)








function start() {

    //get the paintable areas of each room as an array
    const roomsDetails = getSurfaceAreaOfRooms()


    //add up the paint needed for each room
    console.log("Here are the total paintable areas for each of your rooms:\n");
    let propertyTotalPaintNeeded = 0
    for (const eachRoomIdx in roomsDetails) {
    console.log(`Room ${eachRoomIdx}. ${roomsDetails[eachRoomIdx]}m2`);
    propertyTotalPaintNeeded += roomsDetails[eachRoomIdx];
}

    //ask what colour of paint they want
    const colourOfPaint = parseFloat(prompt(`\nWhat colour of paint do you want?\n1. Red\n2. Green\n3. Blue\n`));


    //ask user for how many coats they plan to apply and recalculate area
    const coatsOfPaintNeeded = parseFloat(prompt(`\n\nHow many coats of paint do you need?`));
    propertyTotalPaintNeeded = propertyTotalPaintNeeded * coatsOfPaintNeeded
    console.log(`Total paintable area for your whole property: ${propertyTotalPaintNeeded}`)

    calculatePricesForPaints(propertyTotalPaintNeeded)
}
start()









function getSurfaceAreaOfRooms() {

    //get user input for number of rooms

    // try {
    // const numberOfRooms = 0;
    const numberOfRooms = +prompt('\nHow many rooms do you have?');

    // } catch (exception_let) {
    //     console.log("Please only enter numerical values.");
    // }


    //array to store area of each room
    let roomsArea = []
    console.log("\n" + numberOfRooms)

    //for each room ask for shape of each wall and get area
    for (let roomNum = 1; roomNum < +(numberOfRooms) + +(1); roomNum++) {
        console.log("\nRoom " + roomNum);

        let thisRoomTotalWallArea = 0
        for (let wallNum = 1; wallNum < 5; wallNum++) {
            
            //get wall area
            const wallArea = wallShapeArea(wallNum);
            //get area of non paintable objects
            const obstacleArea = obstacleShapeArea(wallNum);
            const paintableArea = wallArea - obstacleArea;
            console.log(`Wall Area: ${wallArea}m2\nNon Paintable Area: ${obstacleArea}m2\nTotal Paintable Area for this wall: ${paintableArea}`);



            thisRoomTotalWallArea += paintableArea;
            console.log(`\nThis walls area: ${paintableArea}m2\n`);
            console.log(`Current total of room walls area: ${thisRoomTotalWallArea}m2\n`);
        }
        //add room area to array
        roomsArea.push(thisRoomTotalWallArea)

        console.log(roomsArea)
    }

    return roomsArea

}




//ask for wall shape and calculate area
function wallShapeArea(wallNum, wallOrObstacle = "wall") {
    const wallShapeNum = parseFloat(prompt(`\nWhat shape is ${wallOrObstacle} on wall ${wallNum}?\n1. Rectange\n2. Circle\n3. Triangle\n\n`));

    let wallArea = 0
    switch(wallShapeNum) {
        case 1:
            console.log("\nYou have chosen Rectange: ");
            wallArea = rectArea()
          break;
        case 2:
            console.log("\nYou have chosen Circle: ");
            wallArea = cirArea()
          break;
        case 3:
            console.log("\nYou have chosen Triangle: ");
            wallArea = triArea()
        default:
            console.log("\nError: you must select from the provided options ");
      }



      return wallArea
}



function obstacleShapeArea(wallNum) {
    const wallShapeNum = parseFloat(prompt(`\nAre there any non paintable objects on wall ${wallNum}?(e.g. doors, radiators)\n1. Yes\n2. No\n\n`));




    const totalNonPaintArea = 0
    let wallArea = 0
    switch(wallShapeNum) {
        case 1:

            const numberOfNonPaintAreas = parseFloat(prompt('\nHow many non paintable objects do you have on wall ${wallNum}?'));

            for (let nonPaintNum = 1; nonPaintNum < +(numberOfNonPaintAreas) + +(1); nonPaintNum++) {

                wallArea += wallShapeArea(wallNum, wallOrObstacle = "obstacle " + nonPaintNum)
                //console.log("\nRoom " + nonPaintNum);
            }

          break;
        case 2:
            return 0
        default:
            console.log("\nError: you must select from the provided options ");
      }

      return wallArea
}










//functions for calculating area shapes
function rectArea() {
    //request measurements and return wall area
    const width = parseFloat(prompt('Please enter the width of the wall in m2: '));
    const height = parseFloat(prompt('Please enter the height of the wall in m2: '));
    return width * height
}

function triArea() {
    //request measurements and return wall area
    const width = parseFloat(prompt('Please enter the width of the wall in m2: '));
    const height = parseFloat(prompt('Please enter the height of the wall in m2: '));
    return (width/2) * height
}

function cirArea() {
    //request measurements and return wall area
    const radius = parseFloat(prompt('Please enter the radius of the circular wall in meters: '));
    return Math.round(Math.PI * Math.pow(radius, 2));
}

