FuncGodot Manual  

# Map Editor Configuration

In order to map for Godot in your chosen map editor, you'll need to tell your map editor about your game. Each map editor has its own method of doing this. While FuncGodot can import any map file using the Quake Map format, official support is currently limited to only those that support the FGD format.

## [TrenchBroom](https://trenchbroom.github.io/)

![TrenchBroom logo](./images/me_tb.png)

TrenchBroom is the most commonly recommended editor for FuncGodot, with [multiple resources](ref_trenchbroom_resources.md) dedicated to configuring it. The primary configuration resource is the _TrenchBroomGameConfig_, with the _TrenchBroomTag_ providing additional quality of life options in the editor.

You'll need a TrenchBroom Game Config resource in order to build and export a game configuration file for TrenchBroom. Let's take a look at the resource properties:

![TrenchBroomGameConfig properties](./images/ref_tb_gameconfig.png)

Most of these properties should be fairly obvious in their purpose. The FGD File should be your master FGD that contains all of your other base FGDs and entities. Entity Scale only scales the display models.

Brush Tags and Brushface Tags are strictly for TrenchBroom and have no effect in Godot. They can affect shortcut keys and have transparency effects applied to them, along with a few other features. FuncGodot comes with a few pre-made common tags. Feel free to use them in your own GameConfig resources.

Exporting the Game Config will use the directory set in your [Local Configuration's _Trenchbroom Game Config Folder_](ref_local_config.md). Consult the [TrenchBroom Manual's Game Configuration documentation](https://trenchbroom.github.io/manual/latest/#game_configuration_files) for more information. Once you've exported your Game Config, open up TrenchBroom and click _New Map_. You should now see your project in the games list.

![TrenchBroom Config 2](./images/guide_me_tb_cfg_2.png)

You'll need to set the game path so that TrenchBroom can find your game's textures and any models if you created some for it. Open TrenchBroom's preferences and set your game's path to the one you set to _Map Editor Game Path_ with the Local Configuration.

![TrenchBroom Config 3](./images/guide_me_tb_cfg_3.png)

Now you should be ready to start mapping for Godot with TrenchBroom!

![TrenchBroom Config 3](./images/guide_me_tb_cfg_4.png)

  
  

* * *

  

## [J.A.C.K.](https://crystice.com/jack/)

![J.A.C.K. logo](./images/me_jack.png)

Due to how games are configured in J.A.C.K., FuncGodot does not have any dedicated resources for it but the process is still fairly simple.

Make sure your [Local Configuration's _FGD Output Folder_](ref_local_config.md) is pointing to your game's folder in J.A.C.K.'s game configuration folder. When you export an FGD file, FuncGodot will print in the Godot Output where it was saved to.

![J.A.C.K. Config 1](./images/guide_me_jack_0.png)

Once exported, you'll need to add your game to the Game Configurations list. Be sure to add your newly exported FGD as well.

![J.A.C.K. Config 2](./images/guide_me_jack_1.png) ![J.A.C.K. Config 3](./images/guide_me_jack_2.png)

Lastly you'll want to set your Base Game and Source Maps directories.

![J.A.C.K. Config 4](./images/guide_me_jack_3.png)

When it comes to textures, something to keep in mind is that you do not have to use the same exact texture files from your project. You can set up a WAD file for use with J.A.C.K. but then in your Godot project have loose texture files and premade materials. As long as the relative texture paths match without the file extensions, FuncGodot will be able to select the correct textures. That said, FuncGodot _does_ support using WAD files with your maps. Use whichever method is right for your project.

And with that, you should be all set to start mapping in J.A.C.K.!

![J.A.C.K. Config 5](./images/guide_me_jack_4.png)

  
  

* * *

  

## [NetRadiant Custom](https://github.com/Garux/netradiant-custom)

![NetRadiant Custom logo](./images/me_nrc.png)

NetRadiant Custom receives FuncGodot support through both local configuration and [dedicated resources](ref_netradiant_custom_resources.md). The primary configuration resource is the _NetRadiantCustomGamepackConfig_. The _NetRadiantCustomShader_ resource offers additional options for texture display in the editor. It is highly recommended that you familiarize yourself with NetRadiant Custom before attempting to use it with FuncGodot.

You'll need a NetRadiant Custom Gamepack Config resource in order to build and export a gamepack configuration for NetRadiant Custom. Let's take a look at the resource properties:

![NetRadiantCustomGamepackConfig properties](./images/ref_nrc_gamepackconfig.png)

The **Gamepack Name** is the most important one to get right. This will be the name of your gamepack folder, your base game folder, and your gamepack file. The _Gamepack Name **MUST**_ be all lower case with _**NO**_ special characters. Bad things can happen otherwise!

The **Game Name** and **Fgd File** properties should be fairly obvious. Make sure that the FGD file you choose is the master FGD that contains all of your other base FGDs and entities.

The **Base Game Path** is the folder containing your maps and textures, relative to your project directory without _res://_. Leave this blank to use your project's root directory. If you do use a separate mapping folder within your project make sure that you follow the same formatting as the _Gamepack Name_: all lower case and no special characters.

The **Netradiant Custom Shaders** array is a resource array for... [NetRadiantCustomShader](ref_netradiant_custom_resources.html#Shader) resources! These will be compiled into a _.shader_ file included with the rest of your gamepack configuration. Simply empty the array if you don't wish to use any special shaders. This only affects NetRadiant Custom and has no effect on your Godot shaders and materials.

The **Texture Types**, **Model Types**, and **Sound Types** arrays are the lists of compatible file types that NetRadiant Custom will attempt to look for. It's generally fine to leave this as is and is offered for the sake of more advanced users.

The **Default Scale** sets the default texture scale.

The **Skip** and **Clip Texture** properties set the texture paths for a number of different shader settings in the gamepack, including _caulk_\> and _nodraw_.

Exporting the Gamepack Config will use the directory set in your [Local Configuration's _NetRadiant Custom Gamepacks Folder_](ref_local_config.md). After you've built the gamepack, open up NetRadiant Custom.

Once open, you'll want to go to **_Edit > Preferences > Global > Game_**. If you did everything correctly so far you should find your game in the list. Select it and then select **Okay**. NetRadiant Custom will need to restart.

![NetRadiant Custom setup 1](./images/guide_me_nrc_1.png)

You'll be prompted to find your game's engine path. Use your Godot project's root folder.

![NetRadiant Custom setup 2](./images/guide_me_nrc_2.png)

Lastly, you'll want to go to **_Edit > Preferences > Settings > Brush_**, then change **New map Brush Type** to **Valve 220**.

![NetRadiant Custom setup 2](./images/guide_me_nrc_4.png)

Now you should be ready to start mapping for Godot with NetRadiant Custom!

![NetRadiant Custom setup 3](./images/guide_me_nrc_3.png)