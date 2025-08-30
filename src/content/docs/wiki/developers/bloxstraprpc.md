---
title: BloxstrapRPC
description: Learn how you can integrate Bloxstrap's functions into your game as a developer
---

:::note
This feature requires [activity tracking](/wiki/features/activity-tracking/) to be enabled.

This topic is open for discussion and feedback on [this DevForum article](https://devforum.roblox.com/t/add-custom-discord-rich-presence-to-your-game-with-bloxstraprpc/2565551).
:::

BloxstrapRPC is a one-way messaging system that allows for a Roblox LocalScript to send data to the Bloxstrap application running on the player's computer.

See this [video](https://www.youtube.com/watch?v=8yGinJMO1Ms) for a demo, showing how it can control the user's Discord Rich Presence. To try it out for yourself, see the [Bloxstrap Test Place](https://www.roblox.com/games/13307536247/Bloxstrap-Test-Place) or [BloxstrapRPC Showcase, by 1011025m](#https://www.roblox.com/games/476005980/BloxstrapRPC-Showcase).

The **BloxstrapRPC SDK** is a script module that will provide you with everything you need. Get it from the [Roblox marketplace](https://www.roblox.com/library/14278970228/BloxstrapRPC-SDK), [roblox-ts](https://www.npmjs.com/package/@rbxts/bloxstrap-rpc-sdk), or [GitHub](https://github.com/bloxstraplabs/bloxstrap-rpc-sdk/releases/latest).

## Methods

### SetRichPresence

```luau
SetRichPresence(data: RichPresence) : ()
```

Sets the player's Discord Rich Presence.

When structuring a RichPresence type, here's what to keep in mind:

- Bloxstrap internally preserves state. A nil value of a property indicates that it should be kept as what it already was before. You don't need to give it data everytime.
- For erasing fields:
    - string property types can be set as a blank string.
    - number property types can be set as zero.
    - RichPresenceImage property types can have their 'clear' property set to true. (you will need to reset it to have it show again)
- For reverting fields to their defaults:
    - string property types can be set as "&lt;reset&gt;".
    - RichPresenceImage property types can have their 'reset' property set to true.
- RichPresenceImage types can take either an asset ID number, or an rbxassetid string.

Example usage:

```luau
local BloxstrapRPC = require(game.ReplicatedStorage.BloxstrapRPC)

BloxstrapRPC.SetRichPresence({
    details = "Example details value",
    state = "Example state value",
    largeImage = {
        assetId = 10630555127,
        hoverText = "Example hover text"
    },
    smallImage = {
        assetId = 13409122839,
        hoverText = "Example hover text"
    }
})
```

### SetLaunchData

```luau
SetLaunchData(data: string) : ()
```

Sets the launch data for invite deeplinks created by Bloxstrap, which is done in two different places:

- The "Join server" button on the Rich Presence activity
- The player manually copying the link from the [activity tracker](/wiki/features/activity-tracking/) menu to share with their friends

This can be used to check if a player is joining through someone's Rich Presence activity, for example.

## Types

### RichPresence
```luau
type RichPresence = {
	details: string?,
	state: string?,
	timeStart: number?, -- deprecated
	timeEnd: number?,   -- deprecated
	smallImage: RichPresenceImage?,
	largeImage: RichPresenceImage?,
}
```

### RichPresenceImage
```luau
type RichPresenceImage = {
	assetId: number? | string?,
	hoverText: string?,
	clear: boolean?,
	reset: boolean?,
}
```

## Implementation

This section details how BloxstrapRPC is implemented on the application side, for people looking to implement BloxstrapRPC (with their own custom launcher, for example).

BloxstrapRPC works by tracing Roblox's log file as it's running, looking for any output entries that are prefixed with `[BloxstrapRPC]`. After this identifier comes the actual message itself (in JSON) with properties for `command` and `data`. `command` is the name of the function to execute, and `data` is the data it should use. Fairly straightforward.

This way, scripts are able to send data to Bloxstrap simply by just printing a string to the output. To better demonstrate, here's what the SDK is essentially doing whenever you send a message:

```lua
print('[BloxstrapRPC] {"command": "SetRichPresence", "data": {"details": "hi"}}')
```
All BloxstrapRPC features heavily rely on knowing the player's current playing status (what game they're in, etc). Bloxstrap handles this through its [activity tracker](/wiki/features/activity-tracking/) system. 

There aren't any libraries to handle this stuff, but you're free to [implement it yourself](https://github.com/pizzaboxer/bloxstrap/blob/main/Bloxstrap/Integrations/ActivityWatcher.cs) in your programming language of choice. Shouldn't be too difficult.

Areas of interest:
- [Bloxstrap/Watcher.cs](https://github.com/pizzaboxer/bloxstrap/blob/main/Bloxstrap/Watcher.cs)
- [Bloxstrap/Integrations/](https://github.com/pizzaboxer/bloxstrap/blob/main/Bloxstrap/Integrations)
- [Bloxstrap/Models/BloxstrapRPC/](https://github.com/pizzaboxer/bloxstrap/tree/main/Bloxstrap/Models/BloxstrapRPC)

Something to note is that BloxstrapRPC relies on the existence of nullable types, so that attributes can remain undefined when not set. This is how fields can persist their previous values with SetRichPresence. This may be problematic if your language doesn't support nullable types (like Go, which will assume type defaults).

We hope for BloxstrapRPC to be more than just a Bloxstrap thing, but for it to be an open standard for stuff like this. The [Sober](https://sober.vinegarhq.org) project has BloxstrapRPC support, so their users get game-specific rich presence too by default. People have made Bloxstrap forks that extend the command set, allowing for some really cool effects like the developers of Project: Afternight have done ([link](https://x.com/Fireable__/status/1723157635912901109)). 

There's a lot of potential to be had here.