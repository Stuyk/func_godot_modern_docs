FuncGodot Manual  

# Project Configuration

### Directory Structure

Designing a directory structure for your game is its own art, and the layout of your project files can depend greatly on the kind of game you're making. That said, it is generally recommended you create an organization that splits off your **TrenchBroom resources** from the rest of your **Godot assets**.

If you're using TrenchBroom, you may already be aware it has a handy backup feature where it creates an autosave folder to periodically save backups of your map file. Less useful is the tendency for Godot to import these backups as well.

However, Godot has its own handy feature to combat this. Any directory with a **.gdignore** file will not be scanned and imported by Godot. To save yourself some headache later, open the _autosave_ sub-directory in your operating system's file explorer. If using Windows, make sure you have _File Name Extensions_ enabled under the _View_ tab. Create a new text document in the sub-directory and rename it _.gdignore_, exactly like that with the _.txt_ extension removed.

![](./images/guide_project_config_gdignore.png)

And just like that, we won't have to deal with Godot constantly importing hundreds of backup map files from our project! You can do this for any directory that you don't want Godot to import files from, such as the folder that contains all of your display models intended to be used only with your map editor.

### FuncGodot Local Config

FuncGodot has the option of using a [**FuncGodotLocalConfig**](ref_local_config.md) resource to create local project wide settings for your other FuncGodot resources. These settings are applied only to your machine, in order to better facilitate working with a team that may not have the same drive or directory setup or even the same map editor as you yourself use.

You won't create the FuncGodotLocalConfig resource for your project, as this resource doesn't actually save anything to itself directly. Instead you will use the pre-made _func\_godot\_local\_config.tres_ resource found in the _addons/func\_godot/_ folder.

![Location of func_godot_local_config.tres in the Godot project File System.](./images/guide_project_config_res_loc.png)

### Local Config Properties

Viewing this resource's properties in the inspector, you'll be greeted with some options. We'll ignore the _Export Func Godot Settings_ and _Reload Func Godot Settings_ property for now.

![FuncGodotLocalConfig resource inspector.](./images/ref_local_config.png)

For the **FGD Output Folder**, you'll want to locate your map editor's game configuration folder or installation folder. Create a sub folder for your game's configuration and set the **FGD Output Folder** to that sub-folder. This might look something like _C:/GameDev/TrenchBroom/Games/MyGame/_ or _C:/GameDev/J.A.C.K/MyGame/_. This tells FuncGodot where to save generated configuration and FGD files when you click on their export button.

The **Trenchbroom Game Config Folder** is the location of your game's TrenchBroom Game Config folder. This might (but doesn't have to be) the same as your _FGD Output Folder_. When you export your [TrenchBroomGameConfig](ref_trenchbroom_resources.html#GameConfig) resource, it will automatically export the FGD file to this folder as well, overriding the _FGD Output Folder_ property.

The **Netradiant Custom Gamepack Folder** is a little different, in that it should point to your NetRadiant Custom's _gamepacks_ folder (eg: _C:/GameDev/NetRadiant Custom/gamepacks/_). This will also override the _FGD Output Folder_ when you export your [NetRadiantCustomGamepackConfig](ref_netradiant_custom_resources.html#GamepackConfig) resource, as NetRadiant Custom splits up gamepack configurations across several folders and files.

The **Map Editor Game Path** refers to what your Map Editor considers the location of your project. This might look something like _C:/GameDev/MyGodotProject/_ or _C:/GameDev/MyGodotProject/trenchbroom/_. The intended use for this is to streamline certain FGD resource paths, like the [**FuncGodotFGDModelPointClass**](ref_fgd_resources.html#ModelPoint)'s model export location.

The **Game Path Models Folder** is the default folder path relative to your Map Editor Game Path that tells FuncGodot where to save generated model files to. For example, with a Map Editor Game Path value of _C:/GameDev/MyGodotProject/trenchbroom/_ and a Game Path Models Folder value of _models_, the generated model file will be saved to _C:/GameDev/MyGodotProject/trenchbroom/models/_. Currently only used by _FuncGodotFGDModelPointClass_.

The **Default Inverse Scale Factor** setting doesn't affect _FuncGodotMapSettings_ resources or how the map builds. It currently only affects scaling display models for _FuncGodotFGDModelPointClass_ definitions in map editors other than TrenchBroom.

### Exporting the Local Config

Remember that _Export Func Godot Settings_ property I told you to ignore earlier? Once you have your settings in place, go ahead and click it. It will automatically generate a _MyGameFuncGodotConfig.json_ file in your [Godot project's user data folder](https://docs.godotengine.org/en/stable/tutorials/io/data_paths.html#accessing-persistent-user-data-user).

> _NOTE: You need to run your project at least once before attempting to export settings, so that the_ user:// _folder can be created by Godot! Otherwise you will run into an error and the config file will not export!_

This is how we keep local settings local. Upon opening your project, FuncGodot will automatically update _func\_godot\_local\_config.tres_ to load the data from the generated JSON file found in your user data folder, and setting the resource's _Export_ property to true will overwrite that file with the new settings. These settings are not saved to source control, allowing teams to work together more easily and more flexibly.

If you make a change you didn't mean to commit and you haven't yet exported, you can use the _Reload_ option to revert your unwanted changes.