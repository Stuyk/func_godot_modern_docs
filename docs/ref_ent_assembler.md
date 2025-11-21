FuncGodot Manual  

# FuncGodotEntityAssembler

Entity assembly class that is instantiated by a [FuncGodotMap](ref_func_godot_map.md) node.

### Signals

|     |     |
| --- | --- |
| Signal | Description |
| declare\_step | Emitted when a step in the entity assembly process is completed. It is connected to [FuncGodotUtil](ref_util.md)'s `print_profile_info()` method if the FuncGodotMap's _Show Profiling Info_ build flag is set. |

### Methods

|     |     |     |
| --- | --- | --- |
| Method | Description | Return type |
| get\_script\_by\_class\_name(name\_of\_class: String) | Attempts to retrieve a script via class name, to allow for GDScript class instantiation. | Script |
| generate\_group\_node(group\_data: GroupData) | Generates a Node3D for a group's SceneTree representation and links the new Node3D to that group. | Node3D |
| generate\_solid\_entity\_node(node: Node, node\_name: String, data: EntityData, definition: FuncGodotFGDSolidClass) | Generates and assembles a new Node based upon processed entity data. Depending upon provided data, additional MeshInstance3D, CollisionShape3D, and OccluderInstance3D nodes may also be generated. | Node |
| generate\_point\_entity\_node(node: Node, node\_name: String, properties: Dictionary, definition: FuncGodotFGDPointClass) | Generates and assembles a new Node or PackedScene based upon processed entity data. | Node |
| apply\_entity\_properties(node: Node, data: EntityData) | Converts the String values of the entity data's _properties_ Dictionary to various Variant formats based upon the entity definition's class properties, then attempts to send those properties to a _func\_godot\_properties_ Dictionary and an _apply\_func\_godot\_properties()_ method on the node. A deferred call to _build\_complete()_ is also made. | Void |
| generate\_entity\_node(entity\_data: EntityData, entity\_index: int) | Generate a node from entity data. The returned node value can be null, in the case of Solid Class entities with no brush data. | Error |
| build(map\_node: FuncGodotMap, entities: Array\[EntityData\], groups: Array\[GroupData\]) | Main entity assembly process called by the map node. Generates and sorts group nodes in the SceneTree first. Then generates and assembles nodes based upon the provided entity data and adds them to the SceneTree. | Error |