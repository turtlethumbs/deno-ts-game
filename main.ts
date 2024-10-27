import { Player } from "./src/Player.ts";
import { Location } from "./src/Location.ts";

function load_locations(crossroads: Location): Location[] {
  const locations = [];
  const forest = new Location("forest", crossroads);
  const castle = new Location("castle", crossroads);

  locations.push(crossroads);
  locations.push(forest);
  locations.push(castle);
  
  return locations;
}

function displayLocations(locations: Location[]): void {
  console.log("Available locations:");
  locations.forEach((location, index) => {
    console.log(`${index + 1}: ${location.getName()}`);
  });
}

async function getPlayerInput(): Promise<string> {
  const buf = new Uint8Array(1024);
  const bytesRead = await Deno.stdin.read(buf);
  if (bytesRead === null) {
    return ""; // Return empty if read fails
  }
  return new TextDecoder().decode(buf.subarray(0, bytesRead)).trim();
}

async function main() {
  const player_name = "not_sure";
  const player = new Player(player_name);
  console.log(`Player name: ${player.name}`);

  const crossroads = new Location("crossroads");
  const LOCATIONS = load_locations(crossroads);
  displayLocations(LOCATIONS);

  while (true) {
    console.log("Choose a location by number (or 0 to return to crossroads):");
    const choice = await getPlayerInput();

    // Validate input choice
    const choiceNumber = Number(choice);

    if (choice === "0") {
      console.log(`You have returned to the ${crossroads.getName()}.`);
    } else if (!isNaN(choiceNumber) && choiceNumber > 0 && choiceNumber <= LOCATIONS.length) {
      const selectedLocation = LOCATIONS[choiceNumber - 1];
      console.log(`You have chosen to go to the ${selectedLocation.getName()}.`);

      if (selectedLocation.getName() === "forest") {
        await selectedLocation.explore(player);
      } else {
        console.log(selectedLocation.returnToCrossroads());
      }
    } else if (choice.toLowerCase() === "check health") {
      player.checkHealth();
    } else if (choice.toLowerCase() === "check inventory") {
      player.checkInventory();
    } else if (choice.toLowerCase().startsWith("use ")) {
      const itemIndex = parseInt(choice.split(" ")[1]) - 1; // Get item index from input
      player.useItem(itemIndex); // Use the item
    } else {
      console.log("Invalid choice. Please try again.");
    }
  }
}

if (import.meta.main) {
  await main();
}
