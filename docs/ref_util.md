FuncGodot Manual  

# FuncGodotUtil

Static class with a number of reuseable utility methods that can be called at Editor or Run Time.

### Methods

|     |     |     |
| --- | --- | --- |
| Method | Description | Return type |
| print\_profile\_info(message: String, signature: String) | Connected by the [FuncGodot Map](ref_func_godot_map.md) node to the build process' sub components if the _Show Profiling Info_ build flag is set. Also called by the Map node. | Void |
| newline() | Return a string that corresponds to the current OS's newline control characters. | String |

|     |     |     |
| --- | --- | --- |
| Math |     |     |
| op\_vec3\_sum(lhs: Vector3, rhs: Vector3) | Returns the sum of the two input vectors. Useful for lambda operations. | Vector3 |
| op\_vec3\_avg(array: Array\[Vector3\]) | Returns the average vector of an array of vectors. | Vector3 |
| op\_swizzle\_vec3\_w(xyz: Vector3, w: float) |     | PackedFloat32Array |
| id\_to\_opengl(vec: Vector3) | Conversion from id tech coordinate system to Godot, from a top-down perspective. | Vector3 |
| is\_point\_in\_convex\_hull(planes: Array\[Plane\], vertex: Vector3) | Check if a point is inside a convex hull defined by a series of planes by an epsilon constant. | Bool |
| Patch Def |     |     |
| elevate\_quadratic(p0: Vector3, p1: Vector3, p2: Vector3) | Returns the control points that defines a cubic curve for a equivalent input quadratic curve. | Array\[Vector3\] |
| create\_curve(start: Vector3, control: Vector3, end: Vector3, bake\_interval: float = 0.05) | Create a Curve3D and bake points. | [Curve3D](class_curve3d.md) |
| update\_ref\_curve(curve: Curve3D, p0: Vector3, p1: Vector3, p2: Vector3, bake\_interval: float = 0.05) | Update a Curve3D given quadratic inputs. | Void |
| Textures |     |     |
| load\_texture(texture\_name: String, wad\_resources: Array\[QuakeWadFile\], map\_settings: FuncGodotMapSettings) | earches for a Texture2D within the base texture directory or the WAD files added to map settings. If not found, a default texture is returned. | [Texture2D](class_texture2d.md) |
| is\_skip(texture: String, map\_settings: FuncGodotMapSettings) | Filters faces textured with Skip during the geometry generation step of the build process. | Bool |
| is\_clip(texture: String, map\_settings: FuncGodotMapSettings) | Filters faces textured with Clip during the geometry generation step of the build process. | Bool |
| is\_origin(texture: String, map\_settings: FuncGodotMapSettings) | Filters faces textured with Origin during the parsing and geometry generation steps of the build process. | Bool |
| filter\_face(texture: String, map\_settings: FuncGodotMapSettings) | Filters faces textured with any of the tool textures during the geometry generation step of the build process. | Bool |
| build\_base\_material(map\_settings: FuncGodotMapSettings, material: BaseMaterial3D, texture: String) | Adds PBR textures to an existing [BaseMaterial3D](class_basematerial3d.md). | Void |
| build\_texture\_map(entity\_data: Array\[EntityData\], map\_settings: FuncGodotMapSettings) | Builds both materials and sizes dictionaries for use in the geometry generation step of the build process. Both dictionaries use texture names as keys. The materials dictionary uses \[Material\] as values, while the sizes dictionary saves the albedo texture sizes to aid in UV mapping. | Array\[Dictionary\] |
| UV Mapping |     |     |
| get\_valve\_uv(vertex: Vector3, u\_axis: Vector3, v\_axis: Vector3, uv\_basis := Transform2D.IDENTITY, texture\_size := Vector2.ONE) | Returns UV coordinate calculated from the Valve 220 UV format. | Vector2 |
| get\_quake\_uv(vertex: Vector3, normal: Vector3, uv\_basis := Transform2D.IDENTITY, texture\_size := Vector2.ONE) | Returns UV coordinate calculated from the original id Standard UV format. | Vector2 |
| get\_face\_vertex\_uv(vertex: Vector3, face: FaceData, texture\_size: Vector2) | Determines which UV format is being used and returns the UV coordinate. | Vector2 |
| get\_valve\_tangent(u: Vector3, v: Vector3, normal: Vector3) | Returns the tangent calculated from the Valve 220 UV format. | PackedFloat32Array |
| get\_quake\_tangent(normal: Vector3, uv\_y\_scale: float, uv\_rotation: float) | Returns the tangent calculated from the original id Standard UV format. | PackedFloat32Array |
| get\_face\_tangent(face: FaceData) | Determines which UV format is being used and returns the tangent. | PackedFloat32Array |