FuncGodot Manual  

# FuncGodot Geometry Generator

Geometry generation class that is instantiated by a [FuncGodotMap](ref_func_godot_map.md) node.

### Signals

|     |     |
| --- | --- |
| Signal | Description |
| declare\_step | Emitted when a step in the geometry generation process is completed. It is connected to [FuncGodotUtil](ref_util.md)'s `print_profile_info()` method if the FuncGodotMap's _Show Profiling Info_ build flag is set. |

### Methods

|     |     |     |
| --- | --- | --- |
| Method | Description | Return type |
| Tools |     |     |
| is\_skip(face: FaceData) | Returns whether a given face is skipped entirely for both collision shape and visual mesh generation. Local method bound to the supplied Map Settings. | Bool |
| is\_clip(face: FaceData) | Returns whether a given face is considered only for collision shape generation only. Local method bound to the supplied Map Settings. | Bool |
| is\_origin(face: FaceData) | Returns whether a given face is considered only for entity origin calculations only. Local method bound to the supplied Map Settings. | Bool |
| Patches |     |     |
| sample\_bezier\_curve(controls: Array\[Vector3\], t: float) | Sample a Bezier curve defined by an array of control points at a given parametric value t. While not limited to \[0.0, 1.0\], it is assumed to be normalized unless extrapolation is desired. | Vector3 |
| sample\_bezier\_surface(controls: Array\[Vector3\], width: int, height: int, u: float, v: float) | Sample a Bezier surface defined by a flat array of control points with a given width M and height N, along two parametric values U and V. Note: U and V here are not related to texture UV coordinates. | Vector3 |
| get\_triangle\_indices(width: int, height: int) | Returns an integer index array for triangulation of a vertex grid with a given size width x height. | Array\[int\] |
| create\_patch\_mesh(data: Array\[PatchData\], mesh: Mesh) | Not yet implemented. |     |
| Brushes |     |     |
| generate\_brush\_vertices(entity\_index: int, brush\_index: int) | Performs planar intersections for each face in a single brush to populate the vertex, normal, UV and tangent arrays. | Void |
| generate\_entity\_vertices(entity\_index: int) | Generates vertex data for each brush in a given Solid Class entity. | Void |
| determine\_entity\_origins(entity\_index: int) | Calculates entity origin information depending on its Solid Class Origin Type. | Void |
| wind\_entity\_faces(entity\_index: int) | Winds and indexes each face's vertices in each brush of a given Solid Class entity. | Void |
| generate\_entity\_surfaces(entity\_index: int) | Generates visual and collision shapes for a given entity. Optionally generates surface metadata, if defined by the entity's definition. | Void |
| unwrap\_uv2s(entity\_index: int, texel\_size: float) | Performs UV2 unwrapping for a given entity. | Void |
| Main Build Process |     |     |
| build(build\_flags: int, entities: Array\[EntityData\]) | Main entrypoint for generating geometry given entities retrieved from parsing a map file. Perform entity and brush vertex generation, determines entity origins, winds and indexes each face, then generates output surfaces and collision shapes for each entity. | Error |