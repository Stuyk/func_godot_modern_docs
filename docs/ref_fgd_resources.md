FuncGodot Manual  

# FuncGodot FGD Resources

## FuncGodotFGDFile

Resource file used to express a set of _FuncGodotFGDEntity_ definitions. Can be exported as an FGD file for use with a Quake map editor. Used in conjunction with a [FuncGodotMapSettings](ref_func_godot_map.html#MapSettings) resource to generate nodes in a [FuncGodotMap](ref_func_godot_map.md) node.

[Level Design Book FGD Chapter](https://book.leveldesignbook.com/appendix/resources/formats/fgd)  
[Valve Developer Wiki FGD Article](https://developer.valvesoftware.com/wiki/FGD)

  

|     |     |     |
| --- | --- | --- |
| Property | Type | Description |
| Export File | Bool | Used as a button to build and export the FGD file. Automatically sets to off after exporting. |
| Map Editor |     |     |
| Target Map Editor | FuncGodotTargetMapEditor | Some map editors do not support the features found in others (ex: TrenchBroom supports the "model" key word while others require "studio", J.A.C.K. uses the "shader" key word while others use "material", etc...). If you get errors in your map editor, try changing this setting and re-exporting. This setting is overridden when the FGD is built via a game config resource. |
| FGD |     |     |
| Fgd Name | String | FGD output filename without the extension. |
| Base Fgd Files | Array\[Resource\] | Array of _FuncGodotFGDFile_ resources to include in FGD file output. All of the entities included with these FuncGodotFGDFile resources will be prepended to the outputted FGD file. |
| Entity Definitions | Array\[Resource\] | Array of resources that inherit from _FuncGodotFGDEntityClass_. This array defines the entities that will be added to the exported FGD file and the nodes that will be generated in a _FuncGodotMap_. |

  

* * *

## FuncGodotFGDEntityClass

Base entity definition class. Not to be used directly, use _FuncGodotFGDBaseClass_, _FuncGodotFGDSolidClass_, or _FuncGodotFGDPointClass_ instead.

[Quake Wiki Entity Article](https://quakewiki.org/wiki/Entity)  
[Level Design Book: Entity Types and Settings](https://book.leveldesignbook.com/appendix/resources/formats/fgd#entity-types-and-settings-basic)  
[Valve Developer Wiki FGD Article](https://developer.valvesoftware.com/wiki/FGD#Class_Types_and_Properties)  
[Valve Developer Wiki Entity Descriptions](https://developer.valvesoftware.com/wiki/FGD#Entity_Description)

  

|     |     |     |
| --- | --- | --- |
| Property | Type | Description |
| Entity Definition |     |     |
| Classname | String | Entity classname. **_This is a required field in all entity types_** as it is parsed by both the map editor and by FuncGodot on map build. |
| Description | String | Entity description that appears in the map editor. Not required. |
| Func Godot Internal | Bool | Entity does not get written to the exported FGD. Entity is only used for _FuncGodotMap_ build process. |
| Base Classes | Array\[Resource\] | _FuncGodotFGDBaseClass_ resources to inherit _Class Properties_ and _Class Descriptions_ from. |
| Class Properties | Dictionary | Key value pair properties that will appear in the map editor. After building the _FuncGodotMap_ in Godot, these properties will be added to a _func\_godot\_properties_ Dictionary that gets applied to the generated node, as long as that node is a _@tool_ script with an exported _func\_godot\_properties_ Dictionary. See [Entity Key Value Pairs](ref_key_value_pairs.md) for more information. |
| Class Property Descriptions | Dictionary | Map editor descriptions for the previously defined key value pair properties. Optional but recommended. |
| Auto Apply To Matching Node Properties | Bool | Automatically applies entity class properties to matching properties in the generated node. When using this feature, class properties need to be the correct type or you may run into errors on map build. |
| Meta Properties | Dictionary | Appearance properties for the map editor. Supports _String_ entries literally. Will [JSON.stringify()](https://docs.godotengine.org/en/stable/classes/class_json.html#class-json-method-stringify) _Dictionary_ entries. See the [Valve Developer Wiki](https://developer.valvesoftware.com/wiki/FGD#Entity_Description) and [TrenchBroom](https://trenchbroom.github.io/manual/latest/#display-models-for-entities) documentation for more information. |
| Node Generation |     |     |
| Node Class | String | Node to generate on map build. This can be a built-in Godot class, a GDScript class, or a GDExtension class.  <br>  <br>For Point Class entities that use Scene File instantiation leave this blank.  <br>  <br>There is no restriction on what Node Classes can be generated. |
| Name Property | String | Optional class property to use in naming the generated node. Overrides FuncGodotMapSettings' _name\_property_. Naming occurs before adding to the SceneTree and applying properties. Nodes will be named _"entity\_" + name\_property_. An entity's name should be unique, otherwise you may run into unexpected behavior. |
| Node Groups | Array\[String\] | Optional array of node groups to add the generated node to. |

  

* * *

## FuncGodotFGDBaseClass

Special inheritance class for _Solid Class_ and _Point Class_ entity definitions. Useful for adding shared or common properties and descriptions. Does not have any unique properties on its own but is defined separately to facilitate FGD building and lookup.

[Quake Wiki Entity Article](https://quakewiki.org/wiki/Entity)  
[Level Design Book: Entity Types and Settings](https://book.leveldesignbook.com/appendix/resources/formats/fgd#entity-types-and-settings-basic)  
[Valve Developer Wiki FGD Article](https://developer.valvesoftware.com/wiki/FGD#Class_Types_and_Properties)

  

* * *

## FuncGodotFGDSolidClass

FGD SolidClass entity definition that generates a mesh from [Brush Data](ref_data.html#brush)  
.  
  
A _MeshInstance3D_ will be generated by FuncGodotMap according to this definition's Visual Build settings. If _node\_class_ inherits _CollisionObject3D_ then one or more _CollisionShape3D_ nodes will be generated according to Collision Build settings.

[Quake Wiki Entity Article](https://quakewiki.org/wiki/Entity)  
[Level Design Book: Entity Types and Settings](https://book.leveldesignbook.com/appendix/resources/formats/fgd#entity-types-and-settings-basic)  
[Valve Developer Wiki FGD Article](https://developer.valvesoftware.com/wiki/FGD#Class_Types_and_Properties)  
[Valve Developer Wiki Entity Descriptions](https://developer.valvesoftware.com/wiki/FGD#Entity_Description)  
[dumptruck\_ds' Quake Mapping Entities Tutorial](https://www.youtube.com/watch?v=gtL9f6_N2WM)

  

<div class="joplin-table-wrapper"><table class="props"><tbody><tr class="header"><td>Property</td><td>Type</td><td>Description</td></tr><tr><td>Spawn Type</td><td>SpawnType</td><td>Controls whether this Solid Class is the worldspawn, is combined with the worldspawn, or is spawned as its own free-standing entity.<br><ul><li><b>WORLDSPAWN : </b>Builds the geometry of this entity relative to the FuncGodotMap position.</li><li><b>MERGE WORLDSPAWN : </b>This entity's geometry is merged with the <i>worldspawn</i> entity and this entity is removed. Behavior mimics <i>func_group</i> in modern Quake compilers.</li><li><b>ENTITY : </b>This entity is built as its own object. It finds the origin of the entity based on <i>origin_type</i>.</li></ul></td></tr><tr><td>Origin Type</td><td>OriginType</td><td>Controls how this Solid Class determines its center position. Only valid if <i>Spawn Type</i> is set to ENTITY.<br><ul><li><b>AVERAGED : </b>Use averaged brush vertices for center position. This is the old Qodot behavior.</li><li><b>ABSOLUTE : </b>Use <code>origin</code> class property in global coordinates as the center position.</li><li><b>RELATIVE : </b>Calculate center position using <code>origin</code> class property as an offset to the entity's bounding box center.</li><li><b>BRUSH : </b>Calculate center position based on the bounding box center of all brushes using the <a href="guide_textures.html#Origin" target="main">origin texture</a> specified in the <a href="ref_func_godot_map.html#MapSettings" target="main">FuncGodotMapSettings</a>. If no Origin Brush is found, fall back to BOUNDS_CENTER. This is the default option and recommended for most entities.</li><li><b>BOUNDS_CENTER : </b>Use the center of the entity's bounding box for center position.</li><li><b>BOUNDS_MINS : </b>Use the lowest bounding box coordinates for center position. This is standard Quake and Half-Life brush entity behavior.</li><li><b>BOUNDS_MAXS : </b>Use the highest bounding box coordinates for center position.</li></ul></td></tr><tr class="header"><td>Visual Build</td><td></td><td></td></tr><tr><td>Build Visuals</td><td>Bool</td><td>Controls whether a MeshInstance3D is built for this Solid Class.</td></tr><tr><td>Global Illumination Mode</td><td><a href="https://docs.godotengine.org/en/stable/classes/class_geometryinstance3d.html#enum-geometryinstance3d-gimode" target="_blank">GIMode</a></td><td>Global illumination mode for the generated <i>MeshInstance3D</i>. Setting to <b>GI_MODE_STATIC</b> will unwrap the mesh's UV2 during build. See the <a href="https://docs.godotengine.org/en/stable/classes/class_geometryinstance3d.html#enum-geometryinstance3d-gimode" target="_blank">Godot documentation</a> for more information.</td></tr><tr><td>Shadow Casting Setting</td><td><a href="https://docs.godotengine.org/en/stable/classes/class_geometryinstance3d.html#enum-geometryinstance3d-shadowcastingsetting" target="_blank">ShadowCastingSetting</a></td><td>Shadow casting setting allows for further lightmapping customization. See the <a href="https://docs.godotengine.org/en/stable/classes/class_geometryinstance3d.html#enum-geometryinstance3d-shadowcastingsetting" target="_blank">Godot documentation</a> for more information.</td></tr><tr><td>Build Occlusion</td><td>Bool</td><td>Automatically build <a href="class_occluderinstance3d.md" target="_blank">OccluderInstance3D nodes</a> for this entity. See the <a href="occlusion_culling.md" target="_blank">Godot documentation on Occlusion Culling</a> for more information.</td></tr><tr><td>Render Layers</td><td>Int, 3D Render Flags</td><td>This Solid Class' MeshInstance3D will only be visible for Camera3Ds whose cull mask includes any of these render layers.</td></tr><tr class="header"><td>Collision Build</td><td></td><td></td></tr><tr><td>Collision Shape Type</td><td>CollisionShapeType</td><td>Controls how collisions are built for this Solid Class.<br><ul><li><b>None : </b>No collision shape is built. Useful for decorative geometry like vines, hanging wires, grass, etc...</li><li><b><a href="https://docs.godotengine.org/en/stable/tutorials/physics/collision_shapes_3d.html#convex-collision-shapes" target="_blank">Convex</a> : </b>Will build a Convex CollisionShape3D for each brush used to make this Solid Class. Required for non-StaticBody3D nodes like Area3D and RigidBody3D.</li><li><b><a href="https://docs.godotengine.org/en/stable/tutorials/physics/collision_shapes_3d.html#concave-or-trimesh-collision-shapes" target="_blank">Concave</a> : </b>Will build a single Concave CollisionShape3D from the entire set of brushes. Skips brush faces textured with the FuncGodotMapSettings' <i>Skip Texture</i>.</li></ul><br>See <a href="https://docs.godotengine.org/en/stable/tutorials/physics/collision_shapes_3d.html#performance-caveats" target="_blank">the Godot documentation</a> to make an informed decision on what collision type would work best for this entity for your game's needs.</td></tr><tr><td>Collision Layer</td><td>Int, 3D Physics Flags</td><td>The physics layers this Solid Class can be detected in.</td></tr><tr><td>Collision Mask</td><td>Int, 3D Physics Flags</td><td>The physics layers this Solid Class scans.</td></tr><tr><td>Collision Priority</td><td>Float</td><td>The priority used to solve colliding when penetration occurs. The higher the priority is, the lower the penetration into the SolidClass will be. This can for example be used to prevent the player from breaking through the boundaries of a level.</td></tr><tr><td>Collision Shape Margin</td><td>Float</td><td>The collision margin for the Solid Class' collision shapes. Not used in Godot Physics. See <a href="https://docs.godotengine.org/en/stable/classes/class_shape3d.html#class-shape3d-property-margin" target="_blank">Shape3D documentation</a> for details.</td></tr><tr class="header"><td>Mesh Metadata</td><td></td><td>The following properties tell FuncGodot to add a <i>"func_godot_mesh_data"</i> Dictionary to the metadata of the generated node upon build. This data is parallelized, so that each element of the array is ordered to reference the same face in the mesh.</td></tr><tr><td>Add Textures Metadata</td><td>Bool</td><td>Add a texture lookup table to the generated node's metadata on build.<br><br>The data is split between an Array of <a href="class_stringname.md" target="_blank">StringName</a> called <i>"texture_names"</i> containing all currently used texture materials and a <a href="class_packedint32array.md" target="_blank">PackedInt32Array</a> called <i>"textures"</i> where each element is an index corresponding to the <i>"texture_names"</i> entries.</td></tr><tr><td>Add Vertex Metadata</td><td>Bool</td><td>Add a <a href="class_packedvector3array.md" target="_blank">PackedVector3Array</a> called <i>"vertices"</i> to the generated node's metadata on build.<br><br>This is a list of every vertex in the generated node's <i>MeshInstance3D</i>. Every 3 vertices represent a single face.</td></tr><tr><td>Add Face Position Metadata</td><td>Bool</td><td>Add a <i>PackedVector3Array</i> called <i>"positions"</i> to the generated node's metadata on build.<br><br>This is a list of positions for each face, local to the generated node, calculated by averaging the face's vertices to find its center.</td></tr><tr><td>Add Face Normal Metadata</td><td>Bool</td><td>Add a <i>PackedVector3Array</i> called <i>"normals"</i> in the generated node's metadata on build.<br><br>Contains a list of each face's normal.</td></tr><tr><td>Add Collision Shape Face Indices Metadata</td><td>Bool</td><td>Add a <i>Dictionary</i> called <i>"collision_shape_to_face_indices_map"</i> to the generated node's metadata on build.<br><br>Contains keys of <i>Strings</i>, which are the names of child <i>CollisionShape3D</i> nodes, and values of <a href="class_packedint32array.md" target="_blank">PackedInt32Array</a>, , containing indices of that child's faces.<br><br>For example, an element of<br><code>{ "entity_1_brush_0_collision_shape" : [0, 1, 3] }</code><br>shows that this solid class has been generated with one child collision shape named <i>entity_1_brush_0_collision_shape</i> which handles 3 faces of the mesh with collision, at indices 0, 1, and 3.</td></tr><tr class="header"><td>Scripting</td><td></td><td></td></tr><tr><td>Script Class</td><td><a href="class_script.md" target="_blank">Script</a></td><td>An optional Script file to attach to the node generated on map build.</td></tr></tbody></table></div>

  

* * *

## FuncGodotFGDPointClass

A resource used to define an FGD PointClass entity. PointClass entities can use either the _Node Class_ or the _Scene File_ property to tell a _FuncGodotMap_ what to generate on map build.

[Quake Wiki Entity Article](https://quakewiki.org/wiki/Entity)  
[Level Design Book: Entity Types and Settings](https://book.leveldesignbook.com/appendix/resources/formats/fgd#entity-types-and-settings-basic)  
[Valve Developer Wiki FGD Article](https://developer.valvesoftware.com/wiki/FGD#Class_Types_and_Properties)  
[dumptruck\_ds' Quake Mapping Entities Tutorial](https://www.youtube.com/watch?v=gtL9f6_N2WM)  
[Level Design Book: Display Models for Entities](https://book.leveldesignbook.com/appendix/resources/formats/fgd#display-models-for-entities)  
[Valve Developer Wiki FGD Article: Entity Description Section](https://developer.valvesoftware.com/wiki/FGD#Entity_Description)  
[TrenchBroom Manual: Display Models for Entities](https://trenchbroom.github.io/manual/latest/#display-models-for-entities)  

  

|     |     |     |
| --- | --- | --- |
| Property | Type | Description |
| Scene |     |     |
| Scene File | [PackedScene](class_packedscene.md) | An optional scene file to instantiate on map build. Overrides _Node Class_ and _Script Class_. |
| Scripting |     |     |
| Script Class | [Script](class_script.md) | An optional _Script_ resource to attach to the node generated on map build. Ignored if _scene\_file_ is specified. |
| Build |     |     |
| Apply Rotation On Map Build | Bool | Toggles whether entity will use _angles_, _mangle_, or _angle_ to determine rotations on FuncGodotMap build, prioritizing the key value pairs in that order. Set to _false_ if you would like to define how the generated node is rotated yourself. |
| Apply Scale On Map Build | Bool | Toggles whether entity will use \`scale\` to determine the generated node or scene's scale. This is performed on the top level node. The property can be a _float_, _Vector3_, or _Vector2_. Set to _false_ if you would like to define how the generated node is scaled yourself. |

  

* * *

## FuncGodotFGDModelPointClass

A special type of [FuncGodotFGDPointClass](ref_fgd_resources.html#Point) entity that automatically generates a special simplified, scaled, and reoriented GLB model file for the map editor display. Only supported in map editors that support GLTF or GLB.

[Quake Wiki Entity Article](https://quakewiki.org/wiki/Entity)  
[Level Design Book: Entity Types and Settings](https://book.leveldesignbook.com/appendix/resources/formats/fgd#entity-types-and-settings-basic)  
[Valve Developer Wiki FGD Article](https://developer.valvesoftware.com/wiki/FGD#Class_Types_and_Properties)  
[dumptruck\_ds' Quake Mapping Entities Tutorial](https://www.youtube.com/watch?v=gtL9f6_N2WM)  
[Level Design Book: Display Models for Entities](https://book.leveldesignbook.com/appendix/resources/formats/fgd#display-models-for-entities)  
[Valve Developer Wiki FGD Article: Entity Description Section](https://developer.valvesoftware.com/wiki/FGD#Entity_Description)  
[TrenchBroom Manual: Display Models for Entities](https://trenchbroom.github.io/manual/latest/#display-models-for-entities)

  

|     |     |     |
| --- | --- | --- |
| Property | Type | Description |
| Target Map Editor | TargetMapEditor | Determines how the entity definition defines the display model.  <br>  <br>**GENERIC:** Entity definition uses the **@studio** key word. **scale\_expression** is ignored. Supported by all map editors.  <br>  <br>**TRENCHBROOM:** Entity definition uses the **@model** key word. **scale\_expression** is applied if set. |
| Models Sub Folder | String | Display model export folder relative to [ProjectSettings](ref_local_config.md) **func\_godot/model\_point\_class\_save\_path**. |
| Scale Expression | String | Scale expression applied to model. Only used by TrenchBroom. If left empty, uses [ProjectSettings](ref_local_config.md) **func\_godot/default\_inverse\_scale\_factor**.  <br>  <br>See the [TrenchBroom Documentation](https://trenchbroom.github.io/manual/latest/#display-models-for-entities) for more information. |
| Generate Size Property | Bool | Model Point Class can override the _size_ meta property by auto-generating a value from the meshes' [AABB](class_aabb.md). Proper generation requires _scale\_expression_ set to a float or Vector3.  <br>  <br>**WARNING:** Generated size property unlikely to align cleanly to grid! |
| Rotation Offset | Vector3 | Degrees to rotate model prior to export. Different editors may handle GLTF transformations differently. If your model isn't oriented correctly, try modifying this property. |
| Generate GD Ignore File | Button | Creates a .gdignore file in the model export folder to prevent Godot importing the display models. Only needs to be generated once. |