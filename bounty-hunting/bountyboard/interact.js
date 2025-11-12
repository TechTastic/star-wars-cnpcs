function hasBounty() {
    return event.player.getStoredData("existing_bounty") === true;
}

function getValidWorlds() {
    return [API.getIWorldLoad(79), API.getIWorldLoad(4), API.getIWorldLoad(5), API.getIWorldLoad(3), API.getIWorldLoad(80)];
}

function isDimensionWhitelisted(world) {
    var id = world.getDimensionID();
    return id == 79 || id == 4 || id == 5 || id == 3 || id == 80;
}

function getRandomDimension() {
    var worlds = getValidWorlds();
    return worlds[Math.floor(Math.random() * worlds.length)];
}

function getRandomPosition(world, x, z, radius) {
    var randomX = x + (Math.random() * radius * 2) - radius;
    var randomZ = z + (Math.random() * radius * 2) - radius;
    for (var y = 255; y > 0; y++) {
        if (world.getBlock(randomX, y, randomZ) != null) {
            return randomX, y + 1, randomZ;
        }
    }
    return randomX, 70, randomZ;
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

if (hasBounty()){
    event.setCancelled(true);
}

var world = getRandomDimension();
var x, y, z = getRandomPosition(world, 0, 0, 500);
var target = API.spawnNPC(world, x, y, z);

var category = getQuestCategory("Bounty Hunting");
var quest = category.create();
quest.setCompleteText("Good job, we will be in touch again.");
quest.setLogText("Your target is " + target.getName() + ".\nThey are on " + world.getDimensionID() + " around " + x + ", " + y + ", " + z + ".\n\nDo not fail us.");
quest.setName("The " + target.getName() + " Contract");
quest.setType(5);
quest.command = "pay @dp 1000";
quest.save();
// Still need to assign to player