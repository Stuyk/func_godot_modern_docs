FuncGodot Manual  

# Building Maps

You've configured FuncGodot. You've configured your map editor. You've made your first test map of what will undoudbtedly be countless thousands. It's time to build.

When you get back into Godot, create a new scene. In that scene make your root node a base [Node](class_node.md) type. Call it whatever you'd like.

After that create a [FuncGodotMap](ref_func_godot_map.md) node as a child of this node.

![Building the map 1](./images/guide_build_1.png)

Why do we make the FuncGodot Map a child and not the root? When a FuncGodot Map builds its scene it frees **_all_** of its children, including manually placed or edited nodes. Any work you did within the FuncGodot Map's branch of your Scene Tree will be erased when you rebuild the map (and you _will_ rebuild it). Instead, do your post build customizations as siblings to the FuncGodot Map rather than children.

Let's take a look at our FuncGodot Map's properties.

![FuncGodotMap properties](./images/ref_func_godot_map.png)

Not much here. We have **Local Map File** and **Global Map File**. These point to the map file you want to build. The _Global Map File_ will override the _Local Map File_. If you're working with a team and using source control it's probably best to stick with _Local_ (res://) so you don't have to have matching drive and directory structures leading to the map files. The _Global_ option is there partly as a potential Runtime build option.

The **Map Settings** property points to a [FuncGodotMapSettings](ref_func_godot_map.html#MapSettings) resource. FuncGodot uses this resource to define how your maps get built. Not all maps need to use the same Map Settings; it's possible to get clever and use different Map Settings resources on the same map file and get completely different results like referencing completely different textures or completely different entities utilizing common relative texture paths or class names.

Lastly we have some **Build Flag** options. You can generally leave these alone, but they can be helpful if you find yourself having unexpected problems.

Let's take a quick peek at our _Map Settings_.

![Building the map 2](./images/guide_build_2.png)

We went over most of these properties in the [Textures Chapter](guide_textures.md), so we'll just go over the the ones we didn't cover: **Inverse Scale Factor**, **Entity Fgd**, **UV Unwrap Texel Size**, and **Use Groups Hierarchy**.

The **Entity Fgd** property should be fairly obvious; like the map editor configurations, make sure this is the master FGD that contains all of your base FGDs and entity definitions. **UV Unwrap Texel Size** is for lightmapping; [consult the Godot documentation](https://docs.godotengine.org/en/stable/tutorials/3d/global_illumination/using_lightmap_gi.html#setting-up) for more information.

## Inverse Scale Factor

One of the most impactful properties is the **Inverse Scale Factor**. It tells FuncGodot how big or small your map should be built. As it's an _inverse_ scale, this means larger numbers will build smaller maps. How do you decide on the right inverse scale for your game though? To figure it out, it helps to know what you're scaling against.

In Godot, units are measured by meters. By default the modeling program Blender is as well. Quake maps however are all measured in _Quake Units_. Incidentally, a pixel in a map texture rendered at 100% scale on a brush face is equal to 1 Quake Unit.

How many pixels does a meter equal out to? 137? 22? The truth is that it's arbitrary; it really depends on what you want the average resolution of your game to be at. The _FuncGodot Map Settings_ default to 32 because this puts a 1.5-2 meter tall player at a similar texture resolution to Quake. Feel free to experiment with this value to find the right scale for your game.

![32x32 Quake Unit Block](./images/guide_build_isf1.png) ![1x1 Godot Unit Block](./images/guide_build_isf2.png)

> _NOTE: Accounting for the Inverse Scale Factor in your class scripts will better allow you to design your entities within the map editor, i.e: using Quake Units to determine a moving platforms travel distance in your map editor and on import letting your node script translate that value into Godot Units using your Inverse Scale Factor._

## Use Groups Hierarchy

TrenchBroom has some unique features in the form of _Layers_ and _Groups_ (not to be confused with _func\_group_, but also they're func\_groups; they're weird). They add a convenient level of organization to the map making process.

Hammer based editors also have a similar feature called _VisGroups_ that can also provide a similar level of organization and a tree like hierarchy to your map.

In some cases mappers may want to design their maps in such a way as too create a hierarchy for their nodes using TrenchBroom Layers and Groups or VMF VisGroups. FuncGodot offers this option using the **Use Groups Hierarchy** property.

Let's say you created two layers and two groups of brush entities, both groups on separate layers.

![TrenchBroom screenshot depicting 2 layers named Texas and Massachusetts and 2 groups of brush entities named Richardson and Arkham.](./images/guide_build_groups1.png)

If _Use Trenchbroom Groups Hierarchy_ is disabled, your built FuncGodotMap scene structure will look something like this:

![Scene tree showing a flat entity hierarchy](./images/guide_build_groups2.png)

However, if you build your FuncGodotMap with _Use Groups Hierarchy_ enabled, you'll get this instead:

![Scene tree showing a multi level entity hierarchy based upon the map layers and groups](./images/guide_build_groups3.png)

TrenchBroom Layers also have an extra omit feature that FuncGodot can take advantage of. Any TrenchBroom Layers with omit set will not be built, nor will their child groups or entities.

## Default Map Settings

Every time you instantiate a new FuncGodotMap node the map settings applied default to the resource found in the addons folder. Instead of forcing you to set the map settings to your custom one each time, FuncGodot does have a Project Setting that allows you to choose a custom Map Settings resource as your default.

![FuncGodotMap buttons](./images/guide_build_proj_settings.png)

Keep in mind that this only affects new FuncGodotMap nodes. Any already instantiated with the old settings will retain them unless manually changed.

## Building

You have your map file selected. You have your map settings ready. You've decided on an inverse scale factor and, if you're using TrenchBroom, you've decided whether you want a flat or multi-level scene tree hierarchy. It's time to build the map.

![FuncGodotMap buttons](./images/ref_func_godot_map.png)

The **Build** button will build the map scene and apply all the appropriate ownership and settings to the map scene.

Go ahead and perform a _Build_ and marvel in your master level craftsmanship.

![](./images/guide_build_3.png)

Congratulations! You've built your first FuncGodot Map!