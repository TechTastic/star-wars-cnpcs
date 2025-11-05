function hasBounty() {
    return event.player.getStoredData("existing_bounty") == true;
}

function isDimensionBlacklisted(world) {
    return false;
}

function getRandomDimension() {
    var worlds = array.filter(world => {return !isDimensionBlacklisted(world)}, API.getWorlds());
    return worlds[Math.floor(Math.random() * worlds.length)];
}

function getRandomPosition(x, z, radius) {
    var randomX = x + (Math.random() * radius * 2) - radius;
    var randomZ = z + (Math.random() * radius * 2) - radius;
    var highestY = world.getBlock(randomX, 255, randomZ).getHeight();
    return randomX, highestY, randomZ;
}

function getQuestCategory(name) {
    var categories = API.getQuests().categories();
    for (var c in categories) {
        if (categories[c].getName() === name) {
            return categories[c];
        }
    }
    return null;
}

// Test for existing bounty
// If bounty, refute
if (hasBounty()){
    event.setCancelled(true);
    return;
}

// Spawn new NPC in a random dimension and location
var world = getRandomDimension();
var x, y, z = getRandomPosition(0, 0, 500);
var target = API.spawnNpc(world, x, y, z);

// Create new Quest with necessary info
var category = getQuestCategory("Bounty Hunting");
var quest = category.create();
quest.setCompleteText("Good job, we will be in touch again.")
quest.setLogText("Your target is " + target.getName() + ".\nThey are on " + world.getDimensionID() + " around " + x + ", " + y + ", " + z + ".\n\nDo not fail us.")
quest.setName("The " + target.getName() + " Contract")
quest.setType(2); // kill
// set target
// set rewards

// Assign quest to player
