/*
 Stock: {
     name: String;
     value: number;
 }

 Seen: {
     name: String;
     emoji: String;
     seen: String;   // in date format, use `new Date(seen)`
 }

 Refreshed: {
     wasRefreshed: bool
     lastRefresh: number   // ms since 1970
     timeSinceRefresh: number  // also ms i think
     expectigUpdate: bool
 }

Object map
 - easterStock: [Stock]
 - gearStock: [Stock]
 - eggStock: [Stock]
 - nightStock: [Stock]
 - eventStock: [Stock]
 - cosmeticsStock: [Stock]
 - seedsStock: [Stock]
 - lastSeen
     - Seeds: [Seen]
     - Gears: [Seen]
     - Weather: [Seen]
     - Eggs: [Seen]
 - restockTimers        // im guessing these are in seconds? or ms? ms seems more reasonable cuz "honey" was "1522436"
     - seeds: number
     - gears: number
     - eggs: number
     - honey: number
     - cosmetics: number
 - categoryRefreshStatus
     - seeds: Refreshed
     - gears: Refreshed
     - eggs: Refreshed
     - honey: Refreshed
     - cosmetics: Refreshed
 - timerCalculatedAt: number    // epoch ms
 - serverStartTime: number      // epoch ms also
 - lastApiFetch: number         // epoch ms
 - nextScheduledFetch: number   // also epoch ms
 - imageData: { name: String, url: String }
*/