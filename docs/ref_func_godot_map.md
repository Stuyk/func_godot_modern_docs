FuncGodot Manual  

# FuncGodotMap

A scene generator node that parses a Quake MAP or Hammer VMF file using a [FuncGodotFGDFile](ref_fgd_resources.html#File). Uses a [FuncGodotMapSettings](#MapSettings) resource to define map build settings.

### Signals

|     |     |
| --- | --- |
| Signal | Description |
| build\_failed | Emitted when the build process fails. |
| build\_complete | Emitted when the build process succesfully completes. |

### Methods

|     |     |     |
| --- | --- | --- |
| Method | Description | Return type |
| fail\_build(reason: String, notify: bool = false) | Map build failure handler. Displays error message and emits _build\_failed _signal.__ | Void |
| clear\_children() | Frees all children of the map node. WARNING! Does not distinguish between generated and placed nodes! | Void |
| verify() | Validates the map file for the build process. | Bool |
| build() | Cleans the map node of any children, then initiates and oversees the build process. | Void |

### Properties

<div class="joplin-table-wrapper"><table class="props"><tbody><tr class="header"><td>Property</td><td>Type</td><td>Description</td></tr><tr class="header"><td>Map</td><td></td><td></td></tr><tr><td>Local Map File</td><td>String, Local File, .map, .vmf</td><td>Local path to MAP or VMF file to build a scene from.</td></tr><tr><td>Global Map File</td><td>String, Global File, .map, .vmf</td><td>Global path to MAP or VMF file to build a scene from. Overrides <i>Local Map File</i>.</td></tr><tr><td>Map Settings</td><td><a href="#MapSettings">FuncGodotFGDMapSettings</a></td><td>Map settings resource that defines map build scale, textures location, and more.</td></tr><tr class="header"><td>Build</td><td></td><td></td></tr><tr><td>Build Flags</td><td>Int</td><td>Bitflag settings that control various aspects of the build process.<br><ul><li><b>Unwrap UV2 :</b> Unwrap UV2s during geometry generation for lightmap baking.</li><li><b>Show Profiling Info :</b> Print build step information during build process.</li><li><b>Disable Smoothing :</b> Force disable processing of vertex normal smooth shading.</li></ul></td></tr></tbody></table></div>

  

* * *

## FuncGodotMapSettings

Reusable map settings configuration for _FuncGodotMap_ nodes.

  

|     |     |     |
| --- | --- | --- |
| Property | Type | Description |
| Build Settings |     |     |
| Inverse Scale Factor | Float | Ratio between map editor units and Godot units. FuncGodot will divide brush coordinates by this number when building. This does not affect entity properties unless scripted to do so.  <br>See [Inverse Scale Factor](guide_building_maps.html#InverseScaleFactor) for more information. |
| Entity Fgd | [FuncGodotFGDFile](ref_fgd_resources.html#File) | Resource file that translates map file classnames into Godot nodes and packed scenes. |
| Use Groups Hierarchy | Bool | If true, will organize Scene Tree using TrenchBroom Layers and Groups or Hammer Visgroups. Groups will be generated as _Node3D_ nodes. All non-entity structural brushes will be moved out of their groups and merged into the Worldspawn entity. Any Layers toggled to be omitted from export in TrenchBroom and their child entities and groups will not be built. |
| Uv Unwrap Texel Size | Float | Texel size for UV2 unwrapping. Actual texel size is uv\_unwrap\_texel\_size / inverse\_scale\_factor. A ratio of 1/16 is usually a good place to start with (if inverse\_scale\_factor is 32, start with a uv\_unwrap\_texel\_size of 2). Larger values will produce less detailed lightmaps. To conserve memory and filesize, use the largest value that still looks good. |
| Entity Settings |     |     |
| Entity Node Groups | Array\[String\] | Optional array of node groups to add all generated nodes to. |
| Entity Name Property | String | Default class property to use in naming generated nodes. This setting is overridden by `name_property` in [FuncGodotFGDEntityClass](ref_fgd_resources.html#Entity). Naming occurs before adding to the _SceneTree_ and applying properties. Nodes will be named `"entity_" + name_property`.  <br>  <br>_NOTE: Node names should be unique, otherwise you may run into unexpected behavior!_ |
| Entity Smoothing Property | String | Class property that determines whether the Solid Entity performs mesh smoothing operations. |
| Entity Smoothing Angle Property | String | Class property that contains the angular threshold that determines when a Solid Entity's mesh vertices are smoothed. |
| Vertex Merge Distance Property | String | Class property that contains the snapping epsilon for generated vertices of _FuncGodotFGDSolidClass_ entities. Utilizing this property can help reduce instances of seams between polygons. |
| Textures |     |     |
| Base Texture Dir | String | Base directory for textures. When building materials, FuncGodot will search this directory for texture files with matching names to the textures assigned to map brush faces. |
| Texture File Extensions | Array | File extensions to search for texture data. |
| Clip Texture | String | Optional path for the clip texture, relative to _Base Texture Dir_. Brush faces textured with the clip texture will have those faces removed from the generated _Mesh_ but not the generated _Shape3D_. |
| Skip Texture | String | Optional path for the skip texture, relative to _Base Texture Dir_. Brush faces textured with the skip texture will have those faces removed from the generated _Mesh_. If the [FuncGodotFGDSolidClass](ref_fgd_resources.html#Solid) _collision\_shape\_type_ is set to concave then it will also remove collision from those faces in the generated _Shape3D_. |
| Origin Texture | String | Optional path for the origin texture, relative to _Base Texture Dir_. Brush faces textured with the origin texture will have those faces removed from the generated _Mesh_ and _Shape3D_. The bounds of these faces will be used to calculate the origin point of the entity. |
| Texture Wads | Array\[Resource\] | Optional _QuakeWADFile_ resources to apply textures from. See the [Quake Wiki](https://quakewiki.org/wiki/Texture_Wad) for more information on Quake Texture WADs. Supports both Quake WAD2 and Half-Life WAD3 formats. |
| Materials |     |     |
| Material File Extension | String | File extension to search for _Material_ definitions. |
| Base Material Dir | String | Base directory for loading and saving materials. When building materials, FuncGodot will search this directory for material resources with matching names to the textures assigned to map brush faces. If not found, will fall back to _Base Texture Dir_. |
| Default Material | Material | Material used as a template when generating missing materials. |
| Default Material Albedo Uniform | String | [Sampler2D](https://docs.godotengine.org/en/stable/tutorials/shaders/shader_reference/shading_language.html#data-types) uniform that supplies the Albedo in a custom shader when _Default Material_ is a [ShaderMaterial](class_shadermaterial.md). |
| Shader Material Uniform Map Patterns | Dictionary\[String, String\] | Automatic _ShaderMaterial_ generation mapping patterns. Only used when _default\_material_ is a _ShaderMaterial_. Keys should be the names of the shader uniforms while the values should be the suffixes for the texture maps. Patterns only use one replacement String: the texture name, ex: **"%s\_normal"**. |
| Albedo Map Pattern | String | Automatic PBR material generation albedo map pattern. |
| Normal Map Pattern | String | Automatic PBR material generation normal map pattern. |
| Metallic Map Pattern | String | Automatic PBR material generation metallic map pattern. |
| Roughness Map Pattern | String | Automatic PBR material generation roughness map pattern. |
| Emission Map Pattern | String | Automatic PBR material generation emission map pattern. |
| Ao Map Pattern | String | Automatic PBR material generation ambient occlusion map pattern. |
| Height Map Pattern | String | Automatic PBR material generation height map pattern. |
| Orm Map Pattern | String | Automatic PBR material generation ORM map pattern. |
| Save Generated Materials | Bool | Save automatically generated materials to disk, allowing reuse across _FuncGodotMap_ nodes.  <br>_NOTE: Materials do not use the Default Material settings after saving._ |