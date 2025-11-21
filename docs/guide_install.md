FuncGodot Manual  

# Installing FuncGodot

### Preliminary Requirements

FuncGodot's official requirement is always the latest Godot 4.x release. If you manage to make it work on an older release of Godot 4, awesome! But you're on your own if you run into issues.

FuncGodot is written in pure GDScript and as such has no other dependencies.

This manual assumes you have an intermediate level of knowledge with Godot and your chosen map editor.

  

### Map Editor Compatibility

FuncGodot directly supports the following editors with configuration resources:

*   TrenchBroom 2025
*   NetRadiant Custom 1.6

FGD outputs have also been tested with these editors:

*   J.A.C.K.

FuncGodot is designed to be as map editor agnostic as possible. If you use an editor that can output Quake or Half-Life format map files, please let us know on GitHub or Discord so we can try our best to either support it directly or document the configuration process!

  

### Downloading the Plugin

There are 3 places to download FuncGodot. The first two places are both found on the [**FuncGodot GitHub Repository**](https://github.com/func-godot/func_godot_plugin). The first location is the Code Download, and it is always the most up to date version of the plugin. It includes all merges, including both feature updates and bug fixes. Sometimes this version can be significantly up to date, but may also contain less refined features than the other options below.

![An image displaying where to find the GitHub Code Download. It shows a green button that says 'Code' with an open menu. At the bottom of the menu is a button that says 'Download Zip'.](./images/guide_install_github_code.png)

The second location is the GitHub repository's Releases. This is the second most up to date download and is considered the official "Stable Release" of the plugin.

![An image displaying where to find the GitHub Stable Release. It shows a circled location on the right side of the GitHub repository page that says 'Releases'.](./images/guide_install_github_releases.png)

The final location is the Godot Asset Library. While the intent is to keep the Asset Library release in line with the GitHub Stable Release, sometimes these releases can be "desynced" for one reason or another. We're a small team of volunteers here, so please be patient with us! If you're finding some bugs or issues with the Asset Library release, try downloading the plugin from one of the other two locations.

Our intent is to keep the Stable Releases as reliable as possible, so typically only critical fixes will be pushed with some urgency while new features or quality of life improvements tend to simmer a bit more in the code base.

In any case, pick the download option that suits you best. If you downloaded the plugin from GitHub, extract the _func\_godot_ folder to your Godot project's _addons_ folder. If you downloaded from the Asset Library, it should do this for you automatically. Once the plugin is copied to your project, remember to enable the plugin in your Project Settings.

![Godot Project Settings window, Plugins tab. FuncGodot is listed and enabled.](./images/guide_install_enable_plugin.png)