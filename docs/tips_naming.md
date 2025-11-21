FuncGodot Manual  

# Naming Patterns

Recall that every entity has a **classname** that we define in our Entity Definition resource. One important consideration to make is that _naming conventions matter_. The first word of an entity's name up until the first underscore will be provided its own group in the map editor. Taking advantage of this can help keep your entities organized in a few spots and in some editors provide convenient filtering options.

![](./images/tips_naming_1.png) ![](./images/tips_naming_2.png)

When combined with [brush tags](ref_trenchbroom_resources.html#Tag) in TrenchBroom configurations, this feature gains additional powers like in-editor transparency and keyboard shortcuts.

![](./images/tips_naming_3.png) ![](./images/tips_naming_4.png)

FuncGodot has a pair of prebuilt TrenchBroomTag resources for **func\*** and **trigger\*** brush classes. Feel free to use these either directly or as a base for your own brush tags.

Additionally, your map editor will also handle Point Class orientation through the key value pairs **angle** and **mangle** differently depending upon the classname. Setting the mangle for an entity type in the "light\_\*" group or with the "info\_intermission" classname will have altered orientation behavior. To see the differences, try to parse the code block in [FuncGodotMap](ref_func_godot_map.md) that handles translating Quake angles into Godot rotations:

![Image showing how node rotation is calculated by the FuncGodotMap.](./images/tips_naming_angles.png)

Anyway, just make sure to give a little bit more thought to your naming conventions.