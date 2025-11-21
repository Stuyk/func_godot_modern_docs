FuncGodot Manual  

# FuncGodotData

FuncGodot utilizes multiple custom data structures (**structs**) to hold information parsed from the map file and read and modified by the other core build classes.

Each data type extends from RefCounted; therefore all data is passed by reference.

## FuncGodot FaceData

Data struct representing both a single map plane and a mesh face. Initially generated during parsing, reading plane definitions in the map file. Further modified and utilized during the geometry generation stage to populate face vertex, normal, UV, tangent, and index data.

### Methods

|     |     |     |
| --- | --- | --- |
| Method | Description | Return type |
| get\_centroid() | Returns the centroid of all vertices in the face. Only valid when the face has at least one vertex. | Vector3 |
| get\_basis() | Returns an arbitrary coplanar direction to use for winding the face. Only valid when the face has at least two vertices. | Vector3 |
| wind() | Prepares the face for OpenGL triangle winding order. Sorts the vertex array in-place by increasing clockwise angle from the face's centroid. | Void |
| index\_vertices() | Repopulates the vertex indices array to create a triangle fan. The face must be properly wound for the resulting indices to be valid. | Void |

### Properties

|     |     |     |
| --- | --- | --- |
| Property | Type | Description |
| Vertices | PackedVector3Array | Vertex array for the given face. Only populated in combination with other faces, as a result of planar intersections. |
| Indices | PackedInt32Array | Index array for the given face. Used in ArrayMesh creation. |
| Normals | PackedVector3Array | Vertex normal array for the given face. By default, set to the planar normal, which results in flat shading. May be modified to adjust shading. |
| Tangents | PackedFloat32Array | Tangent data for the given face. |
| Texture | String | Local path to the texture without the extension, relative to the FuncGodotMap node's settings' base texture directory. |
| UV  | Transform2D | UV transform data generated during the parsing stage. Used for both Standard and Valve 220 UV formats, though rotation is not applied to the transform when using Valve 220. |
| UV Axes | PackedVector3Array | Raw vector data provided by the Valve 220 format during parsing. It is used to calculate rotations. The presence of this data determines how face UVs and tangents are calculated. |
| Plane | Plane | The face's plane, defined from the map file using the id Tech coordinate system. Used to calculate intersections of faces. |

  

* * *

## FuncGodotBrushData

Data struct representing a single map format brush. It is largely meant as a container for face data.

### Properties

|     |     |     |
| --- | --- | --- |
| Property | Type | Description |
| Planes | Array\[Plane\] | Raw plane data parsed from the map file using the id Tech coordinate system. |
| Faces | Array\[FuncGodotFaceData\] |
| Origin | Bool | True if this brush is completely covered in the Origin texture defined in the FuncGodotMap node's settings. Determined during the parsing stage and utilized during the geometry generation stage. |

  

* * *

## FuncGodotPatchData

Data struct representing a patch mesh entity.

### Properties

|     |     |     |
| --- | --- | --- |
| Property | Type | Description |
| Texture | String | Local path to the texture without the extension, relative to the FuncGodotMap node's settings' base texture directory. |
| Size | PackedInt32Array | Defines the width **M** and height **N** dimensions of the control point grid used to sample a quadratic Bezier surface. |
| Points | PackedVector3Array | Flat array of size M x N containing the control points defining quadratic Bezier curves. |
| UVs | PackedVector2Array | Flat array of size M x N containing the UV coordinates for each control point. |

  

* * *

## FuncGodotGroupData

Data struct representing a TrenchBroom Group, TrenchBroom Layer, or Valve VisGroup. Generated during the parsing stage and utilized during both parsing and entity assembly stages.

### Properties

<div class="joplin-table-wrapper"><table class="props"><tbody><tr class="header"><td>Property</td><td>Type</td><td>Description</td></tr><tr><td>Type</td><td>GroupType</td><td>Defines whether the group is a Group or a Layer. Currently only determines the name of the group.<ul><li><b>Group : </b>Default group type representing a TrenchBroom Group or a Valve VisGroup.</li><li><b>Layer : </b>Group type representing a TrenchBroom Layer.</li></ul><br></td></tr><tr><td>ID</td><td>Int</td><td>Group ID retrieved from the map file. Utilized during the parsing and entity assembly stages to determine which entities belong to which groups as well as which groups are children of other groups.</td></tr><tr><td>Name</td><td>String</td><td>Generated during the parsing stage using the format of type_id_name, eg: group_2_Arkham.</td></tr><tr><td>Parent ID</td><td>Int</td><td>ID of the parent group data, used to determine which group data is this group's parent.</td></tr><tr><td>Parent</td><td>FuncGodotGroupData</td><td>Pointer to another group data that this group is a child of.</td></tr><tr><td>Node</td><td>Node3D</td><td>Pointer to generated Node3D representing this group in the SceneTree.</td></tr><tr><td>Omit</td><td>Bool</td><td>If true, erases all entities assigned to this group and then the group itself at the end of the parsing stage, preventing those entities from being generated into nodes. Can be set in TrenchBroom on layers using the "omit layer" option.</td></tr></tbody></table></div>

  

* * *

## FuncGodotEntityData

Data struct representing a map format entity.

### Properties

|     |     |     |
| --- | --- | --- |
| Property | Type | Description |
| Properties | Dictionary | All of the entity's key value pairs from the map file, retrieved during parsing. The func\_godot\_properties dictionary generated at the end of entity assembly is derived from this. |
| Brushes | Array\[FuncGodotBrushData\] | The entity's brush data collected during the parsing stage. If the entity's FGD resource cannot be found, the presence of a single brush determines this entity to be a Solid Entity. |
| Patches | Array\[FuncGodotPatchData\] | The entity's patch def data collected during the parsing stage. If the entity's FGD resource cannot be found, the presence of a single patch def determines this entity to be a Solid Entity. |
| Group | FuncGodotGroupData | Pointer to the group data this entity belongs to. |
| Definition | FuncGodotFGDEntityClass | The entity's FGD resource, determined by matching the classname properties of each. This can only be a [FuncGodotFGDSolidClass](ref_fgd_resources.html#Solid), [FuncGodotFGDPointClass](ref_fgd_resources.html#Point), or [FuncGodotFGDModelPointClass](ref_fgd_resources.html#ModelPoint). |
| Mesh | ArrayMesh | Mesh resource generated during the geometry generation stage. |
| Mesh Instance | MeshInstance3D | MeshInstance3D node generated during the entity assembly stage. |
| Mesh Metadata | Dictionary | Optional mesh metadata compiled during the geometry generation stage, used to determine face information from collision. |
| Shapes | Array\[Shape3D\] |     |
| Collision Shapes | Array\[CollisionShape3D\] | A collection of _CollisionShape3D_ nodes generated during the entity assembly stage. Each node corresponds to a shape in the _shapes_ array. |
| Occluder Instance | OccluderInstance3D | _OccluderInstance3D_ node generated during the entity assembly stage using the _mesh_ resource. |
| Origin | Vector3 | True global position of the entity's generated node that the mesh's vertices are offset by during the geometry generation stage. |

### Methods

|     |     |     |
| --- | --- | --- |
| Method | Description | Return type |
| is\_visual() | Checks the entity's FGD resource definition, returning whether the Solid Class has a _MeshInstance3D_ built for it. | Bool |
| is\_collision\_convex() | Checks the entity's FGD resource definition, returning whether the Solid Class CollisionShapeType is set to Convex. | Bool |
| is\_collision\_concave() | Checks the entity's FGD resource definition, returning whether the Solid Class CollisionShapeType is set to Concave. | Bool |
| is\_smooth\_shaded(smoothing\_property: String = "\_phong") | Determines if the entity's mesh should be processed for face smoothing. The smoothing property can be retrieved from the map node's settings. | Bool |
| get\_smoothing\_angle(smoothing\_angle\_property: String = "\_phong\_angle") | Retrieves the entity's smoothing angle to determine if the face should be smoothed. The smoothing angle property can be retrieved from the map node's settings. | Float |