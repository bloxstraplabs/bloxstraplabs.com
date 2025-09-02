---
title: Bloxstrap isn't working
---

:::note
This is about Bloxstrap not working. If your issue is about Roblox itself not working, [see here](/wiki/help/roblox-crashes-or-does-not-launch/).
:::

## It's not launching with Roblox

**Problem:** Roblox launches, but it doesn't launch with Bloxstrap features. You don't see the Bloxstrap launcher show.

To fix this, launch Roblox with Bloxstrap manually once. This will register Bloxstrap as Roblox's web launch handler.

Don't launch Roblox through the normal 'Roblox Player' icon when using Bloxstrap, as it'll undo that.

![Screenshot of the Windows Desktop, showing both the 'Roblox Player' and Bloxstrap's 'Launch Roblox' icons.](@assets-wiki/shortcuts-roblox-and-bloxstrap.webp)

## Bloxstrap doesn't open at all

**Problem:** Bloxstrap does nothing when trying to run it. No installer, no main menu, absolutely nothing. 

This is happening likely because you have an outdated version of the .NET 6 runtime installed.

Be sure that you have the latest version installed. [Download it here.](https://aka.ms/dotnet-core-applaunch?missing_runtime=true&arch=x64&rid=win11-x64&apphost_version=6.0.20&gui=true)

![Screenshot of the Windows Settings app in 'Apps & Features', showing 'Microsoft Windows Desktop Runtime - 6.0.16'](@assets-wiki/runtime.webp)
