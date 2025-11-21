FuncGodot Manual  

# Forge Game Data

> FGD stands for "Forge Game Data", leftover from when the Half-Life 2 level editor Hammer used to be the Half-Life 1 editor Worldcraft, and before that when it was a Quake tool called Forge.
> 
> [**The Level Design Book**](https://book.leveldesignbook.com/appendix/resources/formats/fgd#history)

FuncGodot utilizes [**FuncGodotFGD Resources**](ref_fgd_resources.md) to act as a translation guide for the map build process. These resources are largely separated into two different types: the **FuncGodotFGDFile** and the **FuncGodotFGDEntityClass**. Think of the FGD File as a dictionary, and the FGD Entity Classes as the entries.

![FuncGodot FGD Resource List.](./images/guide_fgd_res_list.png)

## FGD File Resource

Some of you may only want to build map geometry with some control over collision and occlusion, and prefer to add all of your lights, actors, scripting, etc... in Godot directly. To that end there is a basic default _func\_godot\_fgd.tres_ included with FuncGodot. You can find it under _addons/func\_godot/fgd/func\_godot\_fgd.tres_.

![func_godot_fgd.tres location.](./images/guide_fgd_res_loc.png)

This is the default FGD file set in the [**FuncGodotMapSettings**](ref_func_godot_map.html#MapSettings) resource. The basic entity definitions included with it are _Worldspawn_, _func\_geo_, _func\_detail_, _func\_detail\_illusionary_, _func\_illusionary_, and _Phong_. We'll go over what each of these entity types are a little farther below.

But what if you want to add your own custom entity types? It's always best practice to create your own FGD File resource and **_NEVER_** a good idea to just modify the pre-existing default FGD File. Any time FuncGodot is updated, it will overwrite the _func\_godot\_fgd.tres_ that comes with it and erase any changes you've made to that resource. While the goal is to keep the default FGD File as basic as possible, we cannot guarantee it won't be changed at some point in the future.

That said, it is possible to include the default FuncGodot FGD File into your own as a Base FGD. Create a new _FuncGodotFGDFile_ resource and examine it in the inspector.

![FuncGodotFGDFile resource properties.](./images/ref_fgd_file.png)

The **Export File** property does exactly what you might think: it generates and saves your FGD file to the **Map Editor Game Config Folder** set by the [FuncGodot Local Config](ref_local_config.md). Use this whenever you need to update your FGD.

The next property, **Target Map Editor**, is intended to help with specific key words that aren't shared across the different map editors. Point class entities in map editors can have display models assigned to them according to their FGD definitions. Most map editors seem to use the "studio" key word to define the model path, but TrenchBroom instead optionally allows the "model" key word while also including additional display options and expressions. When set to _false_, FuncGodot will omit entity definition meta properties using the "model" key word in order to prevent errors in your chosen map editor. When exporting the FGD File through a [TrenchBroom Game Config](ref_trenchbroom_resources.html#GameConfig) resource the setting will be overridden to _true_. See the [Valve Developer Wiki](https://developer.valvesoftware.com/wiki/FGD#Class_Types_and_Properties) for more information.

**Fgd Name** should be self evident: this will be your exported FGD's filename, minus the file extension. Best practice would be to set this to either your game's name or its acronym.

**Base Fgd Files** is an array of **FuncGodotFGDFile** resources that will be prepended to our final FGD file output. It is not necessary to export these base FGD Files; only the FGD File they are added to needs to be exported and the rest will be built by and merged into what you could consider your "Master FGD File".  

> _NOTE: This is **not** where you would put your **FuncGodotFGDBaseClass** resources! Those are not the same as FuncGodotFGDFile resources and are considered entities! More information on FuncGodotFGDBaseClass found below._

To add the _func\_godot\_fgd.tres_ as a base FGD file to your custom FGD file, all you need to do is locate _func\_godot\_fgd.tres_ and drag and drop it onto the **Base Fgd Files** array in the inspector.

![FuncGodotFGDFile base FGD example.](./images/guide_fgd_base_fgd.png)

The last property is **Entity Definitions**. This is where you'll drop all of your custom entity resources to be built or instanced by FuncGodot. Let's take a look at what a populated one looks like by viewing the default _func\_godot\_fgd.tres_ in the inspector.

![FuncGodotFGDFile default FGD.](./images/guide_fgd_func_godot_fgd.png)

## Entity Class Definitions

In terms of how to map with the Quake Map File > FuncGodot > Godot pipeline, it's best to think of the entities in Quake design terms. That is to say, _everything_ is an entity: the player, the enemies, the ambient sounds, the doors, the lifts, the trigger volumes, the map geometry itself... all of these should be thought of as **entities**.

All map editors and FuncGodot support at least 2 different kinds of entities: **Solid (Brush) Entities** and **Point Entities**. Using _FuncGodotFGDSolidClass_ and _FuncGodotFGDPointClass_ resources, you can generate any type of Godot node and apply any script to it.

Every entity is comprised of 2 things: **Metadata** and **Key Value Pairs**.

_Metadata_ tells the map editor how to display your entity, things like bounding box color or display models for Point Entities, but have no effect in Godot.

_Key Value Pairs_ on the other hand can be thought of as your entity's properties. In a map file, all entities are comprised of **Key Value Pairs**. Each entity will _always_ have a **classname**; this classname is what FuncGodot uses to determine what node or packed scene is generated and how upon building the _FuncGodotMap_.

The _FuncGodotMap_ attempts to call two methods on each entity at the end of the build process. As an added advantage of using these calls, you can guarantee that all FuncGodotMap generated nodes now exist and can reference each other.

## Modifying Entities on Map Build

![FuncGodotMap GDScript method showing application of 'func_godot_properties' and callback of '_func_godot_apply_properties' and '_func_godot_build_complete'.](./images/guide_fgd_apply_props.png)

If you decide you want to make modifications to your generated entities on map build using any of the following methods, you'll need to make sure that your entity's script is set as a [](running_code_in_the_editor.md)`@tool` script.

The first method call is to `_func_godot_apply_properties(entity_properties: Dictionary)`. Because `_func_godot_apply_properties` passes the entity properties in the function, you do not need to declare a _func\_godot\_properties_ dictionary in your node script; instead, just apply your properties as needed in this callback.

After every entity has called `_func_godot_apply_properties`, FuncGodot will cycle through all of them again and attempt to call `_func_godot_build_complete()` as a deferred call. Since we're calling this method deferred after every entity has already called the previous method, we can guarantee any nodes generated by our entities in `_func_godot_apply_properties` can be referenced during _\_func\_godot\_build\_complete_.

Additionally upon building, all of the entity's key value pairs will be added to the generated node's `func_godot_properties` Dictionary (provided that the property is set as an exported variant).

We'll examine this _FuncGeo_ class as a demonstration of the relationships between the FuncGodotFGDBaseClass, the FuncGodotFGDSolidClass, the func\_geo brush entity in the map editor, and the final generated Godot FuncGeo StaticBody3D node.

The image on the left depicts a _Base Class_ resource that contains other base classes to accumulate _Class Properties_. The image on the right is a _Solid Class_ resource containing that Base Class and defines our FuncGeo entity.

![Func Base Class](./images/guide_fgd_funcgeo0.png) ![FuncGeo Solid Class](./images/guide_fgd_funcgeo1.png)

This is our FuncGeo entity's properties as they appear in TrenchBroom.

![func_geo brush entity properties in TrenchBroom](./images/guide_fgd_funcgeo2.png)

The generated FuncGeo node's properties in the inspector. See how our _Func Godot Properties_ Dictionary matches our Class Properties from our map editor.

![Generated FuncGeo node in Godot](./images/guide_fgd_funcgeo4.png)

With FuncGodot, your entity does not necessarily need a tool script. And even if you provide it a tool script, it does not need a `func_godot_properties` dictionary. FuncGodot will still generate and instantiate these entities without providing any properties. However, to take full advantage of FuncGodot's power it is highly recommended that you provide your nodes with both.

See the chapters on [**FuncGodotFGDEntityClass**](ref_fgd_resources.html#Entity) resources and [Entity Key Value Pairs](ref_key_value_pairs.md) for more information.

## Default Entities

All default FuncGodot entities, except for _Phong_, are FuncGodotFGDSolidClass entities. All of the SolidClass entities are very similar, mostly differing in occlusion and collision.

*   **Phong :** A FuncGodotFGDBaseClass that provides _\_phong_ and _\_phong\_angle_ properties to most of the entities below. See the [Wikipedia article on Phong Shading](https://en.wikipedia.org/wiki/Phong_shading) for quick primer.  
    
*   **VertexMergeDistance :** A FuncGodotFGDBaseClass that provides a _\_vertex\_merge\_distance_ property to all of the entities below. This property is used in the build process to better ensure vertices between brushes get connected, to reduce instances of gaps between seams in polygons.

> _NOTE: Some map editors are strict about entity definition order! To stay safe, make sure that any entity classes that inherit from a base class come **after** that base class. This includes other base classes! Otherwise you may run into issues where properties are not properly inherited._

*   **worldspawn :** A geometry class that mimics the Worldspawn entity found in Quake and Half-Life. In the FuncGodot implementation, Worldspawn generates a single [StaticBody3D](class_staticbody3d.md) with a child [MeshInstance3D](class_meshinstance3d.md) and multiple convex [CollisionShape3D](class_collisionshape3d.md) children. It also generates an [OccluderInstance3D](class_occluderinstance3d.md) with an [ArrayOccluder3D](class_arrayoccluder3d.md).  
    Under normal circumstances, there can only ever be one Worldspawn entity in a map file. While there technically are ways to create multiple Worldspawn entities this manual will not explore that possibility.
  
*   **func\_geo :** Identical to Worldspawn, with the exception being that you can (and should) create multiple func\_geos. See [Why Not Worldspawn?](tips_worldspawn.md) for more information.
  
*   **func\_detail :** Almost identical to _func\_geo_, with the exception that they do not generate OccluderInstance3D children.
  
*   **func\_illusionary :** Geometry that has no collision. It generates a [Node3D](class_node3d.md), a MeshInstance3D child, and an OccluderInstance3D child.
  
*   **func\_detail\_illusionary :** Identical to func\_illusionary, except that it does not generate an OccluderInstance3D child.